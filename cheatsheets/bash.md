---
title: Terminal (bash)
image: "/assets/images/bash.svg"
---

## Índice

- [Índice](#índice)
- [¿Qué terminal usar?](#qué-terminal-usar)
- [Sistema de archivos](#sistema-de-archivos)
  - [Rutas absolutas](#rutas-absolutas)
  - [Rutas relativas](#rutas-relativas)
- [Comandos básicos](#comandos-básicos)
  - [Comandos de navegación en directorios](#comandos-de-navegación-en-directorios)
  - [Comandos de programas](#comandos-de-programas)

<br>

## ¿Qué terminal usar?

Para utilizar los comandos que aparecerán en este documento, no será posible utilizar la terminal de Windows (cmd). Para ello, se recomienda utilizar la terminal Windows PowerShell o la terminal de Linux (Ubuntu).

## Sistema de archivos

### Rutas absolutas

Las rutas absolutas son una forma de ubicar un archivo en una computadora/servidor de manera global, es decir, desde cualquier ubicación arbitraria, es posible acceder al archivo especificado por medio de estas. Las utilizamos todos los días por ejemplo en el explorador de archivos, todos tenemos los archivos de los distintos programas en ‘C:\Program Files’ la cual es una ruta absoluta ya que empieza con el disco (`C:\`).

### Rutas relativas

Las rutas relativas, en cambio, son una forma de localizar un archivo desde la ubicación actual en la que se encuentra el usuario. Podemos pensarlo como las direcciones que le damos a alguien que ya está ubicado en una ruta, para llegar al lugar que queremos. Para esta tarea, utilizaremos los siguientes comandos:

**‘./’**: Este comando representa la carpeta actual del archivo en cuestión.
**‘../’**: Este comando representa la carpeta padre de la carpeta actual.

**Ejemplo:**
Si el árbol de carpetas fuera el siguiente:

Si nosotros estamos en el archivo `index.php`, entonces para acceder a la carpeta test debemos utilizar la ruta relativa `../test/`, la cual significa subir una carpeta en el árbol y luego entrar a la carpeta `test`.

## Comandos básicos

### Comandos de navegación en directorios

| Comando | Uso                   | Descripción                   |
| ------- | --------------------- | ----------------------------- |
| `cd`    | `cd carpeta_proyecto` | Cambia de directorio          |
| `cd`    | `cd ..`               | Vuelve al directorio anterior |
| `ls`    | `ls`                  | Lista los archivos            |
| `pwd`   | `pwd`                 | Muestra la ruta actual        |

### Comandos de programas

| Comando    | Uso          | Descripción                                                                                                                       |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `explorer` | `explorer .` | Abre el explorador de archivos en la carpeta actual                                                                               |
| `code`     | `code .`     | Abre Visual Studio Code en la carpeta actual                                                                                      |
| `git`      | `git status` | Muestra el estado del repositorio ([para más comandos](https://cheatsheets-nachovigilante.vercel.app/cheatsheet/git))          |
| `npm`      | `npm start`  | Ejecuta el comando `start` de `package.json` ([para más comandos](https://cheatsheets-nachovigilante.vercel.app/cheatsheet/node)) |
