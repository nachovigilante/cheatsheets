---
title: Node.js
image: "/assets/images/nodejs.png"
---

## Índice

- [Índice](#índice)
- [Inicializar un proyecto](#inicializar-un-proyecto)
- [Instalar dependencias](#instalar-dependencias)
  - [Carpeta `node_modules`](#carpeta-node_modules)
- [Instalar dependencias de desarrollo](#instalar-dependencias-de-desarrollo)
- [Instalar dependencias de forma global](#instalar-dependencias-de-forma-global)
- [Sección `scripts`](#sección-scripts)
- [Express](#express)
  - [Crear un servidor](#crear-un-servidor)

<br>

## Inicializar un proyecto

Para inicializar un projecto deberemos ejecutar el siguiente comando:

```bash
npm init
```

Este comando nos creará un archivo `package.json` con la información del proyecto, como el nombre, la versión, la descripción, etc.

## Instalar dependencias

Para instalar dependencias deberemos ejecutar el siguiente comando:

```bash
npm install <nombre-de-la-dependencia>
```

Si corremos este comando sin el nombre de ninguna dependencia, nos instalará todas las dependencias que tengamos en el archivo `package.json` en la sección `dependencies`.

### Carpeta `node_modules`

La carpeta `node_modules` es donde se instalan todas las dependencias de nuestro proyecto. Esta carpeta no se sube al repositorio, ya que es muy pesada y no es necesario que esté en el mismo. Para evitar esto, deberemos crear un archivo `.gitignore` en la raíz del proyecto y añadir la siguiente línea:

```bash
node_modules/
```

## Instalar dependencias de desarrollo

Para instalar dependencias de desarrollo deberemos ejecutar el siguiente comando:

```bash
npm install <nombre-de-la-dependencia> --save-dev
```

## Instalar dependencias de forma global

Para instalar dependencias de forma global deberemos ejecutar el siguiente comando:

```bash
npm install <nombre-de-la-dependencia> -g
```

## Sección `scripts`

Esta sección del archivo `package.json` es donde podemos añadir comandos que queramos ejecutar desde la terminal. Por ejemplo, si queremos utilizar `nodemon` para que se reinicie el servidor cada vez que guardemos un archivo, podemos añadir el siguiente comando:

```json
{
    "name": "node",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "npx nodemon index.js"
    },
    "author": "",
    "license": "ISC"
}
```

Y luego ejecutarlo con el siguiente comando:

```bash
npm run dev
```

## Express

Para instalar Express deberemos ejecutar el siguiente comando:

```bash
npm install express
```

### Crear un servidor

Para crear un servidor con Express deberemos crear un archivo `index.js` y añadir el siguiente código:

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
```

Y luego ejecutarlo con el siguiente comando:

```bash
node index.js
```
