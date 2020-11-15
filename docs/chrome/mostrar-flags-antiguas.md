# Cómo volver a mostrar flags antiguas
!!! info "Sobre las flags de Chrome"
    Las **_flags_ de Chrome** son opciones que permiten activar funciones que todavía están en desarrollo, o para configurar ciertos aspectos de Chrome de manera experimental.

    En todo caso, se trata de opciones experimentales que pueden desaparecer en actualizaciones futuras de Chrome (por ejemplo, si la función en desarrollo ya se ha acabado de desarrollar y se ha incorporado a Chrome, o si se decide no continuar desarrollando dicha función y eliminarla completamente de Chrome).

Cuando una _flag_ desaparece, normalmente es posible volverla a mostrar (y configurar) en las 2 versiones de Chrome posteriores a la última versión que la mostraba.[^1] Para volver a mostrar _flags_ antiguas, sigue los siguientes pasos:

1. Accede a **`chrome://flags`** (copia y pega esta dirección en la barra de direcciones y pulsa enter).
2. Activa la _flag_ **Temporarily unexpire Mv flags**, donde **v** es la última versión donde estaba disponible la _flag_ que ha desaparecido.

    !!! tip "Consejo"
        Hay dos _flags_ del tipo _Temporarily unexpire Mv flags_, una para cada una de las 2 versiones anteriores de Chrome, por lo que si no estás seguro/a puedes activar ambas.

3. **Reinicia Chrome** haciendo clic en el botón azul que aparece.
4. Ve otra vez a **`chrome://flags`**.
5. Ahora ya debería aparecer la _flag_ que había desaparecido.

[^1]: [Flag Expiry - //docs/flag_expiry.md - Chromium Docs](https://chromium.googlesource.com/chromium/src/+/master/docs/flag_expiry.md) (_en inglés_)
