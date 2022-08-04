# Cheatsheets de TIC

Este es el repositorio de la web de cheatsheets de TIC. Para acceder a la web [hacer click acá](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

## ¿Cómo hago un cambio?

### ¿Mi cambio tiene que ser fundamental?

No. Todos los cambios son importantes, incluso si el cambio únicamente incluye agregar una tilde en este mismo documento. Cada uno puede aportar su parte para mejorar la calidad de este (y otros...) repositorios. De eso se trata la filosofía [Open Source](https://opensource.org/about), no es necesario saber programar mejor que otro, o entender más de un lenguaje u otra herramienta, todos cometemos errores y cualquiera puede ser capaz de corregirlos. Incluso si el cambio no es significativo, es una buena forma de practicar el proceso que conlleva realizar una [pull request](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (PR).

### Pasos a seguir

Para proponer algún cambio que agregue información o mejore algo en el repo hay que seguir los siguientes pasos:

- Hacer un fork al repo
- Realizar algún cambio detallando en el/los commits (utilizando [conventional commits](https://www.conventionalcommits.org/)) lo realizado
- [Hacer un PR](#ejemplo-de-PR) con el/los commits realizados
- Esperar la respuesta al PR

### Ejemplo de PR

En esta sección podemos ver un [ejemplo de un PR](https://github.com/nachovigilante/cheatsheets/pull/1) que realizó [@Sponja](https://github.com/Sponja-) para arreglar un problema en el índice del cheatsheet de PHP.

![Ejemplo de PR](/public/assets/images/PR.png)

El PR puede recibir una respuesta positiva o negativa, si la respuesta es positiva el cambio se acepta y si es negativa se rechaza, lo que no significa que la corrección o el arreglo no es necesario, sino que tal vez es necesario mejorar la corrección antes de aceptarla.

Una vez que el PR es aceptado, el cambio se aplica al repo y se generará un nuevo commit con el cambio, como el que podemos [ver en este commit](https://github.com/nachovigilante/cheatsheets/commit/1fc56153a09720a09a724b600c7386423c83cd66).

## Agregar nuevos cheatsheets

Si se quiere agregar un nuevo cheatsheet de algún lenguaje o herramienta que no se encuentra en el repo, ésta debe ser agregada en formato de archivo `.md`, en la carpeta `/cheatsheets/` con el nombre del lenguaje o la herramienta en cuestión. Es importante, además de seguir los pasos en la [sección anterior](#cómo-hago-un-cambio), cumplir los requerimientos obligatorios.

### Requisitos

- Agregar además del `.md` una imágen en la carpeta `/assets/images/`

- Tener una sección de metadata que tenga la siguiente estructura:

```plaintext
---
title: {título}
image: "/assets/images/{nombre_de_la_imágen}"
---
```

- La primer sección debe ser llamada "Índice" y debe contener una tabla de contenidos (`TOC`), con la misma estructura que la presente en los cheatsheets que se encuentran actualmente en la carpeta `/cheatsheets/`, seguida de un `<br>` por razones puramente estéticas

### Recomendaciones 

- Citar las fuentes de información para acelerar el proceso de verificación y validación
- Hacer uso de las herramientas que brinda markdown para mejorar la legibilidad de la información, aligerando también el proceso de feedback
