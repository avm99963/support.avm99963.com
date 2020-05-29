# ¿Por qué no están contemplados los ataques físicos en el modelo de amenazas de Chrome?
A veces el equipo de seguridad de Chromium recibe informes de personas que aseguran que se puede comprometer Chrome instalando una librería DLL maliciosa, conectando APIs (véase por ejemplo el [Issue 130284](https://crbug.com/130284)) o alterando la configuración del dispositivo, entre otras cosas.

Consideramos que estos ataques están fuera del modelo de amenazas de Chrome porque no hay ninguna manera de que Chrome (o cualquier aplicación) pueda defernderse de un usuario malicioso que haya conseguido iniciar sesión en el disposivo como tú, o que pueda ejecutar programas con los privilegios de tu cuenta del sistema operativo. Un atacante como este puede modificar ejecutables y DLLs, cambiar variables del entorno como PATH, cambiar archivos de configuración, leer cualquier información que posea tu cuenta de usuario, enviársela a ellos mismos, etc. Este atacante tiene control total de tu dispositivo, y no hay nada que Chrome pueda hacer para darte una garantía seria de defensa. Este problema no es especial de Chrome — todas las aplicaciones deben confiar el usuario que está presente físicamente.

Hay algunas cosas que puedes hacer para mitigar los riesgos de las personas que tienen acceso físico a **tu** ordenador, en ciertas circunstancias.

- Para evitar que se pueda leer tu información en caso de pérdida o robo del dispositivo, usa el cifrado de disco completo (FDE). FDE es una función estándar de la mayoría de los sistemas operativos, entre los cuales están Windows Vista y posteriores, Mac OS X Lion y posteriores, y algunas distribuciones de Linux. (Algunas versiones antiguas de Mac OS X tenían cifrado de disco parcial: podían encriptar la carpeta raíz del usuario, que contenía la mayoría de la información sensible del usuario). Algunos sistemas FDE permiten que uses diferentes fuentes de llaves, como una combinación de una contraseña y un archivo llave en un dispositivo USB. De ser posible, deberías usar múltiples fuentes de llaves para conseguir la defensa más fuerte. Chrome OS encripta la carpeta raíz de cada usuario.
- Si compartes tu ordenador con otras personas, aprovecha la funcionalidad de tu sistema operativo para administrar diferentes cuentas de usuario, y usa una cuenta distinta para cada persona. Para invitados, Chrome OS tiene incorporado una cuenta de invitados.
- Aprovecha la función de bloquear la pantalla de tu sistema operativo.
- Puedes reducir la cantidad de información (incluyendo credenciales como cookies y contraseñas) que Chrome guarda localmente usando la configuración de contenido de Chrome (`chrome://settings/content`) y desactivando las funciones de autocompletado de formularios y almacenamiento de contraseñas (`chrome://settings/search#password`).

No hay casi nada que puedas hacer para mitigar riesgos cuando uses un ordenador **público**.

- Asume que todo lo que hagas en un ordenador público será... bueno, pues público. No tienes ningún control sobre el sistema operativo de la máquina, y no hay ninguna razón por la cual debas confiar en la integridad de él.
- Si debes usar uno de estos ordenadores, usa el modo incógnito y cierra todas las ventanas de incógnito una vez hayas acabado de navegar para limitar la cantidad de información que dejas. Nótese que el modo incógnito **no proporciona ningún tipo de protección** si el sistema ya se ha comprometido como se ha indicado antes.

---

Este artículo es una traducción de una sección del siguiente artículo escrito por los colaboradores del proyecto Chromium: [Chrome Security FAQ - Why aren‘t physically-local attacks in Chrome’s threat model? (30/04/2020)](https://chromium.googlesource.com/chromium/src/+/b3f7312686bb67dc18a8f1edc3753f5857a18d58/docs/security/faq.md#why-arent-physically_local-attacks-in-chromes-threat-model)

La versión más actualizada de ese documento (en inglés) se puede encontrar [aquí](https://chromium.googlesource.com/chromium/src/+/master/docs/security/faq.md#why-arent-physically_local-attacks-in-chromes-threat-model).
