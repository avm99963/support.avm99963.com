---
title: Solucionar problemas con las imágenes de fondo de Meet
description: Si usas Meet en Chrome y no puedes ponerte una imagen de fondo, este artículo describe varias causas del problema que te pueden ayudar a solucionarlo.
---

# Solucionar problemas con las imágenes de fondo de Meet
Si usas Google Meet en Chrome y no puedes ponerte una imagen de fondo, este
artículo describe varias causas del problema que te pueden ayudar a
solucionarlo.

## 1. Cuenta administrada de Google Workspace
Si la persona que creó la videollamada de Meet tiene una cuenta de Google
administrada (de su empresa o institución educativa) y **su administrador ha
desactivado esta función**, ningún participante de la videollamada podrá cambiar
su imagen de fondo.[^1]

Puedes averiguar si tu cuenta está administrada
[aquí](https://support.google.com/a/answer/6208960?hl=es).

## 2. Dispositivos móviles
¡Ahora esta función ya está disponible en Meet para Android![^5] Se ha lanzado
el 7 de junio de 2021 y se irá mostrando progresivamente durante los siguientes
15 días a todos los usuarios.

Esta función se lanzará en Meet para iOS (iPhone/iPad) pronto.

## 3. Requisitos técnicos
Tu ordenador/Chrome debe cumplir una serie de requisitos para poder usar esta
función:[^2]

- Debes usar como mínimo la **versión 84** de Chrome
([comprueba tu versión](https://labs.avm99963.com/chrome/version.php)).
    - Si usas una Chromebook, debes usar como mínimo la versión 86.
    - A partir del **30 de junio de 2021**, será necesario usar como mínimo
    la **versión 87** de Chrome.[^6]
- La variante 32-bit de Chrome **no** es compatible (puedes comprobar cuál
tienes instalada en la página `chrome://version`, arriba del todo).
- La **aceleración por hardware** de Chrome debe estar activada.
- **WebGL 2.0** debe estar disponible con aceleración por hardware.

### Cómo activar la aceleración por hardware
1. Ve al **menú de Chrome** ( **⋮** ), **Configuración**.
2. En la barra lateral izquierda pulsa en **Configuración avanzada**, y pulsa la
sección **Sistema**.
3. Ahora activa la opción **Utilizar aceleración por hardware cuando esté
disponible** y reinicia Chrome.

Ahora comprobemos que la aceleración por hardware para WebGL 2.0 esté activa:

1. Para ello, abre la página `chrome://gpu` (introduce este texto en la barra de
direcciones –parte superior de Chrome– y pulsa ++enter++).
2. En la entrada **WebGL2**, asegúrate que pone
<span style="color: rgb(0, 128, 0);">**Hardware accelerated**</span>.

Si en vez de eso ves el texto
<span style="color: rgb(128, 128, 0);">**Software only, hardware acceleration unavailable**</span>
pero ya has activado la aceleración por hardware según los pasos de la sección
anterior, esto significa que:

- O bien tu tarjeta gráfica (GPU) no soporta WebGL 2.0.
- O bien sí lo soporta pero el equipo de Chrome ha decidido desactivarlo en tu
tarjeta gráfica o para una versión específica del driver, si es conocido que hay
problemas con esa combinación.[^3]

En este segundo caso, lo primero que convendría hacer es intentar actualizar los
drivers, viendo si hay alguna actualización en **Windows Update** o el gestor de
actualizaciones correspondiente a tu sistema operativo, puesto que esto puede
llegar a solucionar del problema.[^4]

### Cómo forzar la aceleración por hardware
Si los drivers están actualizados y esto no soluciona el problema, es posible
forzar la aceleración por hardware con los siguientes pasos (puedes probarlos
también si no estás seguro de si tu GPU soporta WebGL 2.0).

!!! warning "Advertencia"
    Forzar la aceleración por hardware puede causar que **Chrome se cierre
    inesperadamente**, que el navegador **funcione más lento** u **otros
    problemas**. Si ves que se produce esto, revierte esta configuración a los
    valores por defecto.

1. Accede a la página `chrome://flags/#ignore-gpu-blocklist`.
2. En el selector al lado de la opción **Override software rendering list**,
escoge la opción **Enabled**.
    - Esto desactivará la lista de GPUs/drivers prohibidos.
3. Haz clic en el botón azul **Relaunch** para reiniciar Chrome.
4. Comprueba de nuevo si ya aparece el texto
<span style="color: rgb(0, 128, 0);">**Hardware accelerated**</span> en la
entrada **WebGL 2.0** de `chrome://gpu`.
    - Si sigue apareciendo
    <span style="color: rgb(128, 128, 0);">**Software only, hardware acceleration unavailable**</span>,
    entonces tu GPU no es compatible con WebGL 2.0, y
    no podrás usar esta función.


[^1]: [Controlar si los usuarios pueden cambiar sus fondos en Meet - Ayuda de Administrador de Google Workspace](https://support.google.com/a/answer/10178768?hl=es)
[^2]: [Cambiar el fondo en Google Meet - ¿Por qué no veo la opción que permite cambiar el fondo? - Ayuda de Google Chrome](https://support.google.com/meet/answer/10058482?hl=es#zippy=%2Cpor-qu%C3%A9-no-veo-la-opci%C3%B3n-que-permite-cambiar-el-fondo)
[^3]: [//gpu/config/software\_rendering\_list.json](https://chromium.googlesource.com/chromium/src/+/master/gpu/config/software_rendering_list.json) (_en inglés, JSON_)
[^4]: Si tu driver está desactualizado y una versión más nueva arregla un
problema conocido, es posible que esta nueva versión no esté prohibida por
Chrome y se arregle el problema solo actualizándolo.
[^5]: [Option to replace your background in Google Meet is now available on Android - Google Workspace Updates](https://workspaceupdates.googleblog.com/2021/06/replace-your-background-in-google-meet-android.html)
(_en inglés_)
[^6]: [Replace your background with a video in Google Meet - Google Workspace Updates](https://workspaceupdates.googleblog.com/2021/06/replace-your-background-with-video-in.html)
(_en inglés_)
