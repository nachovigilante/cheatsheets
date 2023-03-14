---
title: Git-GitHub
image: "/assets/images/git-github.png"
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

## Git

Git es un sistema de control de versiones distribuido, es decir, que cada usuario tiene una copia completa del repositorio. Esto nos permite trabajar de forma local y sincronizar los cambios con el repositorio remoto cuando queramos.

### Crear un nuevo repositorio

```bash
git init
```

### Clonar un repositorio

```bash
git clone https://www.github.com/username/repo.git
```

### Añadir un archivo

```bash
git add file.txt
```

### Añadir todos los archivos

```bash
git add .
```

### Hacer un commit

```bash
git commit -m "Mensaje del commit"
```

#### Descripción completa

```bash
git commit -m "Mensaje del commit" -m "Descripción del commit"
```

### Hacer un push

```bash
git push origin main
```

Puede también ser en repositorios más viejos que sea `git push origin master`. Master o Main son los nombres de la branch que están pusheando, y puede variar si están pusheando otra branch.

### Hacer un pull

```bash
git pull origin main
```

Al igual que en push, en repositiorios más viejos puede ser `git pull origin master`

### Ver el estado del repositorio

```bash
git status
```

### Ver el historial de commits

```bash
git log
```

## GitHub

GitHub es una plataforma de desarrollo colaborativo que permite alojar proyectos utilizando el sistema de control de versiones Git.

### Crear un nuevo repositorio en GitHub

Para crear un nuevo repositorio deberemos ir a la página de [GitHub](www.github.com) y hacer click en el botón `New repository`.

<img src="/assets/images/images/home.png"  width="100%" alt="Home">
<img src="/assets/images/images/home_create.png"  width="100%" alt="Home Create Highlight">
<img src="/assets/images/images/new.png"  width="100%"  alt="New">
<img src="/assets/images/images/new_bottom.png"  width="100%" alt="New Button">
<img src="/assets/images/images/new_bottom_button.png"  width="100%" alt="New Highlight">

### Clonar un repositorio de GitHub

Para clonar un repositorio deberemos ir a la página del repositorio y hacer click en el botón `Clone or download`.

### Añadir un colaborador

Para añadir un colaborador deberemos ir a la página del repositorio y hacer click en `Settings`. Una vez dentro, deberemos ir a la sección `Collaborators` y añadir el nombre de usuario del colaborador.
