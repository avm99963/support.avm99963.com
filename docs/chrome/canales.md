---
title: Canales de Chrome: ¿qué son?
---

# Canales de Chrome: ¿qué son?
¡Hola a todos!

Chromium es un proyecto muy grande que está constantemente siendo desarrollado por el equipo de Chrome y desarrolladores de todo el mundo ajenos a Google, con nuevas funciones siendo añadidas y errores siendo corregidos cada día. Lo que ocurre es que el Chrome que tenemos instalado el público en general en nuestro ordenador no se actualiza constantemente con todos los cambios que los desarrolladores están haciendo al código en tiempo real, sino que obtenemos una actualización del código cada varias semanas. Esto es porque antes de enviar una actualización de Chrome al público en general, los ingenieros tienen que asegurarse que el código funciona bien y esté libre de errores.

Y si eres como yo, tú también querrás probar estas nuevas funciones de Chrome que los ingenieros están desarrollando antes de que los demás las reciban. Aquí es donde los canales entran en juego.

Resumidamente, cuando se añade una función o se realiza un cambio en el código de Chrome, este viaja desde el canal canary que tiene los cambios más nuevos, hasta el canal estable, que es el último que recibe los cambios. Así pues, cada canal de Chrome recibe los cambios antes que otros canales.

Estos son los diferentes canales de Chrome:

- <span style="font-weight: bold; color: #cc0000;">Canal Estable</span>: Este canal se ha probado completamente por el equipo de prueba de Chrome, y es la mejor opción para evitar errores y otros problemas. Se actualiza más o menos cada dos o tres semanas para versiones menores, y cada 6 semanas para las versiones mayores.
- <span style="font-weight: bold; color: #669900;">Canal Beta</span>: Si estás interesado en ver lo próximo que viene al canal estable, con riesgo mínimo, el canal beta es el adecuado. Se actualiza casi cada semana, con actualizaciones mayores cada 6 semanas, más de un mes antes de que el canal estable las reciba.
- <span style="font-weight: bold; color: #0099cc;">Canal Dev</span>: Si quieres ver los cambios nuevos antes que lleguen al canal beta, entonces quieres el canal dev. El canal dev se actualiza una o dos veces cada semana, y muestra en lo que se está trabajando actualmente. No hay ningún tiempo de espera entre versiones mayores, cualquier código que hayamos escrito, lo recibirás. Mientras que esta compilación se prueba de antemano, está sujeta a errores, porque se quiere que quien tenga este canal instalado pueda ver qué hay de nuevo lo más pronto posible.
- <span style="font-weight: bold; color: #ff8800;">Compilación Canary</span>: Las compilaciones canary son lo más nuevo de lo más nuevo. Siendo liberadas diariamente, estas compilaciones no se han probado ni usado de antemano, y se liberan tan pronto como se compilan.
- <span style="font-weight: bold; color: #9933cc;">Otras compilaciones</span>: Si eres muy atrevido, puedes descargar la última compilación funcional (y lo de funcional está un poco cogido con pinzas) desde la página [download-chromium.appspot.com](https://download-chromium.appspot.com/). Nota: estas compilaciones no se actualizan automáticamente.

Lo bueno es que cada canal de Chrome se puede instalar independientemente de los otros, y no comparten datos, por lo que, por ejemplo, se pueden instalar el canal estable para usarlo normalmente, y el canal beta para probar de vez en cuando funciones que todavía no han llegado al canal estable.

Además, como nota, los textos de las funciones nuevas que todavía no hayan llegado al canal estable pueden no estar traducidos al español, y mostrarse en inglés.

Puedes encontrar más información sobre los canales y los enlaces de descarga para cada uno de ellos en la siguiente página web (en inglés):

- **[Chrome Release Channels - The Chromium Projects](http://www.chromium.org/getting-involved/dev-channel)**

!!! question "¿Qué es una compilación?"
    Los programas de ordenador como Chrome están programados por humanos, en un lenguaje de programación que está diseñado para ser leído y escrito por humanos (de hecho hay muchos lenguajes de programación, como también hay muchos idiomas como el español, inglés, etc.).

    La cuestión es que los ordenadores (y en concreto las CPUs, que sería el cerebro del ordenador) no pueden entender directamente ese código, y es por ese motivo que existe un proceso llamado compilar que lo que hace es traducir el código en nuestro lenguaje al llamado código máquina: una serie de instrucciones que puede ejecutar la CPU. A este resultado final es al que se le llama programa.

    Entonces esto es una compilación: el programa que resulta de compilar el código de Chrome.

---

_Este documento es una traducción y adaptación de parte del documento [http://www.chromium.org/getting-involved/dev-channel](http://www.chromium.org/getting-involved/dev-channel), disponible bajo la licencia [Creative Commons Attribution 2.5](https://creativecommons.org/licenses/by/2.5/) (The Chromium Authors)_
