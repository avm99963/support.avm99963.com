# Un curso rápido sobre diagnóstico de problemas con chrome://net-internals

Este documento es una traducción del siguiente documento: [A Crash Course in Debugging with chrome://net-internals - The Chromium Project (24/03/2020)](https://chromium.googlesource.com/chromium/src/+/71f386b74676de71601fd8d2472a12ca3bfa0ce9/net/docs/crash-course-in-net-internals.md)

La versión más actualizada del documento (en inglés) se puede encontrar [aquí](https://chromium.googlesource.com/chromium/src/+/HEAD/net/docs/crash-course-in-net-internals.md).

---

Este documento tiene como objetivo ayudar a la gente a empezar a diagnosticar problemas de red con `chrome://net-internals`, con algunos consejos y trucos comunmente útiles. Este documento está encarado más a explicar cómo empezar a usar algunas de las funciones para investigar informes de errores, más que como una vista general de la función.

Probablemente sería útil leer [vida-de-una-url-request.md](vida-de-una-url-request.md) antes de este documento.

## Qué información contiene Net-Internals

`chrome://net-internals` proporciona una vista de la actividad del navegador desde la perspectiva de `net/`. Por esta razón, le falta información sobre las pestañas, la navegación, los _frames_, los tipos de recursos, etc.

La columna de la izquierda del todo presenta una lista de vistas. La mayoría del diagnóstico se hace con la vista **Eventos**, que será todo lo cubre este documento.

El objeto de máximo nivel de la pila de red es el `URLRequestContext`. La vista Eventos tiene información sobre todos los `URLRequestContexts` de Chrome que están acoplados a un objeto Netlog único y global. Esto incluye ambos los perfiles de incógnito y no incógnito, a parte de otras cosas. La vista Eventos muestra solo los eventos durante el periodo que net-internals estaba abierto y corriendo. El código intenta añadir un evento arriba del todo para los `URLRequests` que estaban activos cuando la pestaña `chrome://net-internals` fue abierta, para ayudar a diagnosticar peticiones colgadas, pero eso es solo de máximo esfuerzo, y solo incluye peticiones para el perfil actual y el `URLRequestContext` del sistema.

Las otras vistas son todas instantáneas del estado actual de los componentes principales de `URLRequestContext`. Estos mostrarán objetos que fueron creados antes de que `chrome://net-internals` fuera abierto.

## Eventos versus fuentes

La vista Eventos muestra **eventos** registrados por `NetLog`. El modelo de `NetLog` es que los objetos de la pila de red duraderos, llamados **fuentes**, emiten eventos durante su vida. Un objeto `NetLogWithSource` contiene un ID de fuente, un `NetLogSourceType`, y un puntero al `NetLog` al que la fuente emite sus eventos.

La vista Eventos tiene una lista de las fuentes en una columna adyacente a la columna de la lista de vistas. Las fuentes que incluyen un evento con un parámetro `net_error` con valor negativo (esto es, algún tipo de ERR_) se muestran con fondo rojo. Las fuentes cuyos eventos de abertura todavía no hayan acabado se muestran con un fondo blanco. Las otras fuentes tienen fondos verdes. Los términos de búsqueda correspondientes a los dos primeros tipos son `is:error` y `is:active`.

Cuando una o más fuentes están seleccionadas, los eventos correspondientes se muestran en otra columna a la derecha, ordenados por fuente, y por tiempo dentro de cada fuente. Hay dos valores del tiempo: `t` se mide desde algún punto de referencia común a todas las fuentes, y `st` se mide desde el primer evento para cada fuente. El tiempo se muestra en milisegundos.

Como la pila de red es asíncrona, los eventos de las diferentes fuentes suelen estar entremezcladas durante el tiempo, pero la vista Eventos no ofrece la función de mostrar los eventos de diferentes fuentes ordenados por tiempo. Esacios de tiempo grande en la lista de eventos de una sola fuente normalmente significa que el tiempo se está gastando en el contexto de otra fuente.

Algunos eventos vienen en parejas: un evento de inicio y otro de fin, entre los cuales pueden ocurrir otros eventos. Se muestran con los prefijos `+` y `-` respectivamente. El evento de inicio tiene un valor `dt` que muestra la duración. Si el evento de fin fue capturado, entonces la duración se calcula como la diferencia de tiempo entre los eventos de inicio y fin. Si no, se trata del tiempo que ha pasado desde el evento de inicio hasta que se paró la captura de datos (es una cota inferior para la duración real), seguido por un signo `+` (por ejemplo, `dt=120+`).

Si no hay otros eventos entre medio del de inicio y el de fin, y el evento de fin no tiene parámetros, entonces colapsan en una única línea que no tiene signos de prefijo.

Otros eventos solo ocurren en un solo momento en el tiempo, y no tendrán ningún signo de prefijo o un valor de duración `dt`.

Generalmente solo puede ocurrir un evento a la vez para una fuente en un instante de tiempo. Si pueden haber varios eventos haciendo cosas completamente independientes, el código a menudo usará nuevas fuentes para representar el paralelismo.

La mayoría de eventos, pero no todos ellos, corresponden a una fuente. Las excepciones son eventos globales, que no tienen ningúna fuente y se muestran como entradas individuales en la lista de fuentes. Ejemplos de eventos globales incluyen `NETWORK_CHANGED`, `DNS_CONFIG_CHANGED` y `PROXY_CONFIG_CHANGED`.

## Tipos de fuentes comunes

Las **fuentes** corresponden a ciertos objetos de `net`, aunque muchas veces múltiples capas de `net/` se registrarán como una sola fuente. Aquí hay los principales tipos de fuentes y lo que incluyen (excluyendo HTTP2 [SPDY]/QUIC):

* **`URL_REQUEST`**:  Corresponde al objeto `URLRequest`. Incluye eventos de todas las implementaciones de `URLRequestJobs`, `HttpCache::Transactions`, `NetworkTransactions`, `HttpStreamRequests`, `HttpStream` y `HttpStreamParsers` usados para atender una respuesta. Si `URL_REQUEST` sigue redirecciones HTTP, incluirá cada redirección. Esto es mucha cosa, pero generalmente solo un objeto está trabajando a la vez. Esta fuente de eventos incluye la URL entera y generalmente incluye las cabeceras de la petición y la respuesta (exceptuando cuando la caché gestiona la respuesta).

* **`HTTP_STREAM_JOB`**:  Corresponde al `HttpStreamFactory::Job` (nótese que una petición puede tener múltiples _jobs_). También incluye las consultas de DNS y proxy. Los eventos registrados de `HTTP_STREAM_JOB` están separados de `URL_REQUEST` porque dos _stream jobs_ podrían ser creados y realizarse a la vez, en algunos casos -- uno para QUIC y uno para HTTP.

    Uno de los eventos finales de esta fuente, antes del evento `HTTP_STREAM_JOB_BOUND_TO_REQUEST`, indica cómo se creó un `HttpStream`:

    + Un evento `SOCKET_POOL_BOUND_TO_CONNECT_JOB` significa que un nuevo _socket_ TCP fue creado, mientras que un evento `SOCKET_POOL_REUSED_AN_EXISTING_SOCKET` indica que un _socket_ TCP existente fue reusado para una petición que no sea HTTP/2.

    + Un evento `HTTP2_SESSION_POOL_IMPORTED_SESSION_FROM_SOCKET` indica que una nueva sesión HTTP/2 fue abierta por este _job_.

    + Un evento `HTTP2_SESSION_POOL_FOUND_EXISTING_SESSION` indica que la petición fue realizada en una sesión HTTP/2 preexistente.

    + Un evento `HTTP2_SESSION_POOL_FOUND_EXISTING_SESSION_FROM_IP_POOL` significa que la petición fue añadida a la piscina de una sesión HTTP/2 preexistente que tenía una `SpdySessionKey` diferente, pero que la resolución DNS resultó en la misma IP y el certificado coincide.

    + Actualmente no se registran eventos cuando se abren nuevas sesiones QUIC o se reusan sesiones existentes.

* **`*_CONNECT_JOB`**: Corresponde a las subclases de `ConnectJob` que usan cada piscina de _sockets_. Un `CONNECT_JOB` satisfactorio devuelve un `SOCKET`. Los eventos aqí varían un montón dependiendo del tipo de _job_. Su principal evento es generalmente crear un _socket_ o pedir un _socket_ de otra piscinas de _sockets_ (lo que crea otro `CONNECT_JOB`) y luego realizar un poco de trabajo adicional encima de eso -- como por ejemplo establecer una conexión SSL encima de una conexión TCP.

* **`SOCKET`**: Corresponden a los `TCPSockets`, pero podrían tener otras clases puestas encima de ellas (como un `SSLClientSocket`). Esta clase es un poco diferente deque las otras, ya que el nombre corresponde a la clase de arriba del todo en vez de la de abajo del todo. Esto es así por el hecho que el _socket_ se crea primero, y después el `SSL` (o una conexión proxy) se pone encima de él. Los _sockets_ pueden ser reutilizados entre múltiples peticiones, y una petición podría acabar cogiendo el _socket_ creado por otra petición.

* **`HOST_RESOLVER_IMPL_JOB`**: Corresponden a `HostResolverImpl::Job`. Incluyen información sobre durante cuánto tiempo se puso en cola una consulta, cada consulta DNS que se intentó (con la plataforma o el resolvedor incorporado) y todas las otras fuentes que están esperando al _job_.

Cuando una fuente depende en otra, el código generalmente registra un evento a las dos fuentes con un valor `source_dependency` apuntando a la otra fuente. Estos valores se pueden clicar en la interfaz, añadiendo la fuente referida a la lista de fuentes seleccionadas.

## Diagnóstico

Cuando recibes un informe de un usuario, la primera cosa que generalmente querrás encontrar es los `URL_REQUEST[s]` que están funcionando mal. Si el usuario da un código `ERR_*` o la URL exacta del recurso que no carga, puedes buscarlo directamente. Si es una subida, puedes buscar `post`, y si es un problema con redirecciones, puedes buscar `redirect`. Aun así, a menudo no tendrás mucha información sobre el problema. Hay dos filtros en _net-internals_ que te ayudarán en muchos casos:

* `type:URL_REQUEST is:error` restringirá al lista de fuentes a objetos `URL_REQUEST` que tengan algún tipo de error. Los errores de caché no son fatales a menudo, así que generalmente los puedes ignorar, y buscar otros más interesantes.

* `type:URL_REQUEST sort:duration` mostrará las peticiones ordenadas por duración. Esto es útil a menudo para encontrar peticiones que se han colgado o que son lentas.

Para una lista de otros comandos de filtrado, puedes poner el ratón encima del interrogante al lado del campo de búsqueda.

Una vez encuentras la petición problemática, lo siguiente es encontrar dónde está el problema -- a menudo es uno de los últimos eventos, aunque también podría estar relacionado con las cabeceras de la respuesta o la petición. Puedes usar los enlaces `source_dependency` para navegar entre fuentes relacionadas. Puedes usar el nombre de un evento para buscar el código responsable de ese evento, e intentar deducir qué fue mal antes o después de un evento particular.

Algunas cosas que puedes buscar mientras estás diagnosticando el problema:

* Los eventos `CANCELLED` casi siempre vienen de fuera de la pila de red.

* Cambiar de redes o entrar o salir del modo suspender puede tener un montón de efectos divertidos en la actividad de red. Cambios de red registran un evento `NETWORK_CHANGED`. Los eventos de suspender no se registran actualmente.

* Los eventos `URL_REQUEST_DELEGATE_\*`, `NETWORK_DELEGATE_\*` y `DELEGATE_INFO` significanque una
`URL_REQUEST` está bloqueada por un `URLRequest::Delegate` o el `NetworkDelegate`, que están implementados fuera de la pila de red. Una petición a veces se cancelará aquí por razones que solo conce el _delegate_. O el delegado podría causar un cuelgue. En general, para diagnosticar problemas relacionados con delegados, uno necesita descubrir qué método de qué objeto está causando el problema. El objeto podría ser un `NetworkDelegate`, un `ResourceThrottle`, un `ResourceHandler`, el `ResourceLoader` mismo, o el `ResourceDispatcherHost`.

* Los _sockets_ son a menudo reusados entre peticiones. Si una petición está en un _stale socket_ (_socket_ reusado), ¿cuál fue la petición anterior que usó el _socket_, y hace cuánto que se realizó? (Echa un vistazo a los eventos `SOCKET_IN_USE`, y los `HTTP_STREAM_JOBS` a los cuales apuntan a través del valor `source_dependency`.)

* La negociación SSl es un proceso lleno de peligros, particularmente con proxies rotos. Estos generalmente se detienen o fallan en la fase `SSL_CONNECT` en la capa `SOCKET`.

* Solicitudes de rango (_range_) tienen magia para gestionarlos al nivel de la caché, y a menudo son creados por código de multimedia o PDF.

* Enlace tardío: Los `HTTP_STREAM_JOBs` no se asocian con ningún `CONNECT_JOB` hasta que un `CONNECT_JOB` se conecta. Esto es así para que el `HTTP_STREAM_JOB` pendiente de más alta prioridad coge el primer _socket_ disponible (que puede ser un nuevo _socket_ o un viejo que ya está disponible). Por esta razón, puede ser difícil relacionar `HTTP_STREAM_JOBs` que se han colgado con `CONNECT_JOBs`.

* Cada `CONNECT_JOB` pertenece a un "grupo", que tiene un límite de 6 conexiones. Si todos los `CONNECT_JOBs` que pertenecen a un grupo (el campo de descripción del `CONNECT_JOB`) se han parado esperando a un _socket_ disponible, el grupo problemente tiene 6 _sockets_ que se han colgado -- ya sea intentando conectarse, o usados por peticiones que se han parado y por tanto fuera del control de la piscina de _sockets_.

* Hay un límite en el número de resoluciones DNS que se pueden empezar a la vez. Si todo se ha parado mientras se resuelven direcciones DNS, probablemente has llegado a este límite, y las consultas DNS se están comportando mal también de alguna manera.

# Miscelánea

Estas son solo cosas misceláneas que puedes notar mientras miras el registro de eventos.

* Las `URLRequests` que parecen empezar dos veces por ningún motivo aparente. Estas son típicamente peticiones de un _frame_ principal, y la primera petición es AppCache. Puedes ignorar la primera y seguir viviendo.

* Algunas peticiones HTTP no se gestionan por `URLRequestHttpJobs`. Estas incluyen cosas como redirecciones HSTS (`URLRequestRedirectJob`), AppCache, ServiceWorker, etc. Estas generalmente no registran tanta información, así que puede ser difícil saber qué está pasando con estas.

* Peticiones no HTTP pueden aparecer también en el registro, y generalmente no registran mucha información (URLs blob, URLs chrome, etc).

* Las preconexiones crean un evento `HTTP_STREAM_JOB` que podría crear múltiples `CONNECT_JOBs` (o ninguno) y después es destruído. Estos se pueden identificar por los eventos `SOCKET_POOL_CONNECTING_N_SOCKETS`.
