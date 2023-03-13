!!! note "Nota"

    Este artículo es una traducción al español del artículo publicado por Jasika Bawa, miembro del Equipo de Seguridad de Chrome: [Google Online Security Blog: Thank you and goodbye to the Chrome Cleanup Tool](https://security.googleblog.com/2023/03/thank-you-and-goodbye-to-chrome-cleanup.html)

# Gracias y adiós al Limpiador de Chrome

Desde Chrome 111 empezaremos a desactivar el Limpiador de Chrome, una aplicación distribuida a los usuarios de Chrome en Windows para ayudarles a encontrar y eliminar software no deseado.

## El origen
El Limpiador de Chrome se lanzó en 2015 para ayudar a los usuarios a revertir cambios inesperados a la configuración, y detectar y eliminar software no deseado. Hasta la fecha, ha realizado más de 80 millones de limpiezas, ayudando a construir el camino hacia una web más limpia y segura.

## Un paisaje cambiante
Durante los últimos años varios factores nos han llevado a reevaluar la necesidad de esta aplicación para mantener a los usuarios de Chrome seguros.

Primero, la perspectiva del usuario –las quejas de los usuarios de Chrome sobre software no deseado han bajado continuadamente durante los años, llegando a una media del 3% sobre el total de quejas en el último año. De acuerdo con esto, también hemos observado un continuado descenso en la detección de software no deseado en las máquinas de los usuarios. Por ejemplo, el último mes solo un 0.06% de los escaneados del Limpiador de Chrome ejecutados por usuarios detectaron software no deseado conocido.

Además, varios cambios positivos en el ecosistema de la plataforma han contribuido a definir una postura de seguridad más proactiva que reactiva. Por ejemplo, ahora tanto la [Navegación Segura de Google](https://support.google.com/chrome/answer/9890866?hl=es) como los programas antivirus bloquean software no deseado basado en archivos de una manera más efectiva, que era el objetivo original del Limpiador de Chrome. Cuando el software no deseado basado en archivos migró a las extensiones, la inversión sustancial que hemos hecho en el [proceso de revisión](https://developer.chrome.com/docs/webstore/review-process/) en la Chrome Web Store ha ayudado a detectar extensiones maliciosas que violan las políticas de la Chrome Web Store.

Finalmente, hemos observado tendencias cambiantes en el espacio del malware con técnicas como por ejemplo el [robo de cookies](https://blog.google/threat-analysis-group/phishing-campaign-targets-youtube-creators-cookie-theft-malware/) al alza. Así pues, nos hemos enfocado en construir defensas ante este malware medinate una serie de mejoras que incluyen flujos de autenticación reforzados y heurísticas avanzadas para bloquear correos de phishing e ingeniería social, páginas que contienen malware, y descargas.

## Qué esperar
A partir de Chrome 111, los usuarios ya no podrán pedir un escaneo del Limpiador de Chrome mediante una comprobación de seguridad ni usando la opción "Recuperar configuración y limpiar" ofrecida en chrome://settings en Windows. Chrome también eliminará el componente que periódicamente escanea las máquinas Windows y pide a los usuarios hacer una limpieza si encuentra algo sospechoso.

Incluso sin el Limpiador de Chrome, los usuarios están automáticamente protegidos por la [Navegación Segura en Chrome](https://support.google.com/chrome/answer/9890866?hl=es). Los usuarios también tienen la opción de activar la [protección avanzada](https://security.googleblog.com/2022/12/enhanced-protection-strongest-level-of.html) yendo a chrome://settings/security –este modo incrementa sustancialmente la protección contra páginas web y descargas peligrosas compartiendo información en tiempo real con Navegación Segura.

Aunque echaremos de menos el Limpiador de Chrome, queríamos aprovechar esta oportunidad para reconocer el rol que ha desempeñado en combatir el software no deseado durante los últimos 8 años. Continuaremos monitorizando los comentarios de los usuarios y las tendencias en el ecosistema del malware, y cuando los adversarios adapten sus técnicas de nuevo –que lo harán– nosotros estaremos listos.

Como siempre, por favor siéntete libre de [mandarnos comentarios](https://support.google.com/chrome/answer/95315?hl=es) o encontrarnos en Twitter ([@googlechrome](https://twitter.com/googlechrome)).
