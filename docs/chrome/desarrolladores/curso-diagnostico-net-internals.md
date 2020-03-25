# Un curso rápido sobre diagnóstico de problemas con chrome://net-internals

Este documento es una traducción del siguiente documento: [A Crash Course in Debugging with chrome://net-internals - The Chromium Project (24/03/2020)](https://chromium.googlesource.com/chromium/src/+/71f386b74676de71601fd8d2472a12ca3bfa0ce9/net/docs/crash-course-in-net-internals.md)

La versión más actualizada del documento (en inglés) se puede encontrar [aquí](https://chromium.googlesource.com/chromium/src/+/HEAD/net/docs/crash-course-in-net-internals.md).

---

Este documento tiene como objetivo ayudar a la gente a empezar a diagnosticar problemas de red con `chrome://net-internals`, con algunos consejos y trucos comunmente útiles. Este documento está encarado más a explicar cómo empezar a usar algunas de las funciones para investigar informes de errores, más que como una vista general de la función.

Probablemente sería útil leer [vida-de-una-url-request.md](vida-de-una-url-request.md) antes de este documento.

## Qué información contiene Net-Internals

`chrome://net-internals` proporciona una vista de la actividad del navegador desde la perspectiva de net/. Por esta razón, le falta información sobre las pestañas, la navegación, los frames, los tipos de recursos, etc.

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

!!! info "Falta la traducción"
    Esta sección todavía no ha sido traducida, pero se puede consultar en el documento original (en inglés) enlazado al principio de este documento.

## Diagnóstico

!!! info "Falta la traducción"
    Esta sección todavía no ha sido traducida, pero se puede consultar en el documento original (en inglés) enlazado al principio de este documento.

# Miscelánea

!!! info "Falta la traducción"
    Esta sección todavía no ha sido traducida, pero se puede consultar en el documento original (en inglés) enlazado al principio de este documento.
