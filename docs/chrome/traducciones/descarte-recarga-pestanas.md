# Descarte y recarga de pestañas

Este artículo es una adaptación del siguiente documento original: **[Tab Discarding and Reloading - The Chromium Projects](https://www.chromium.org/chromium-os/chromiumos-design-docs/tab-discarding-and-reloading)**

## ¿Por qué se están recargando mis pestañas?
Tu dispositivo se ha quedado sin memoria. Igual que hace tu móvil o tablet Android, Chrome cierra silenciosamente pestañas que estén en segundo plano para que haya más memoria disponible. Así pues, cuando haces clic en una de estas pestañas se recarga.

## ¿Qué está consumiendo toda mi memoria?
Abre el administrador de tareas de Chrome (en el **menú de Chrome** ( **⋮** ) > **Más herramientas** > **Administrador de tareas**, o usa la combinación de teclas `Shift+Esc`) para ver el uso de memoria que hacen las pestañas y extensiones. La página `about:memory` tiene información aún más detallada.

## ¿Cómo puedo parar esto?
Cierra algunas pestañas o desinstala extensiones que usen mucha memoria. Si hay alguna pestaña en específico que no quieres que se descarte automáticamente, haz clic derecho encima de ella y haz clic en **Fijar pestaña**.

## ¿Cómo decide Chrome qué pestaña descartar?
Puedes ir a la página `about:discards` para ver el ranking actual de tus pestañas. Chrome descarta las pestañas en el siguiente orden:

1. Páginas internas como la página de nueva pestaña, administrador de marcadores, etc.
2. Pestañas seleccionadas hace mucho tiempo
3. Pestañas seleccionadas recientemente
4. Pestañas que reproducen audio
5. Aplicaciones ejecutándose en una ventana
6. Pestañas fijadas
7. La pestaña seleccionada

## ¿Con qué frecuencia afecta esto los usuarios?
La mayoría de usuarios solo tienen abiertas una o dos pestañas. Incluso los usuarios con más pestañas abiertas raramente se quedan sin memoria. Algunos usuarios que se quedan sin memoria nunca ven una recarga (cierran la sesión sin mirar la pestaña que se había descartado). Tenemos métricas internas para todas estas condiciones. Los Googlers (empleados de Google) suelen tener un número muy grande de pestañas abiertas con sitios muy complejos y suelen tener recargas más a menudo.
