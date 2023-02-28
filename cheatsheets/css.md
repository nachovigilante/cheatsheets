---
title: CSS
image: "/assets/images/css.png"
---

## Índice

- [Índice](#índice)
- [CSS](#css)
  - [Criterios para el estilo que se aplica](#criterios-para-el-estilo-que-se-aplica)
- [Tipos de seletores](#tipos-de-seletores)
  - [Seletores de elemento](#seletores-de-elemento)
  - [Seletores de clase](#seletores-de-clase)
  - [Seletores de ID](#seletores-de-id)
  - [Seletores de atributo](#seletores-de-atributo)
  - [Seletores de pseudo-clase](#seletores-de-pseudo-clase)
- [Tipos de unidades](#tipos-de-unidades)
- [Disposición de elementos](#disposición-de-elementos)
  - [Elementos de bloque (display: block)](#elementos-de-bloque-display-block)
  - [Elementos de línea (display: inline)](#elementos-de-línea-display-inline)
  - [Elementos de línea en bloque (display: inline-block)](#elementos-de-línea-en-bloque-display-inline-block)
  - [Flexbox (display: flex)](#flexbox-display-flex)
    - [Justify-content](#justify-content)
      - [Flex-start (justify-content)](#flex-start-justify-content)
      - [Flex-end (justify-content)](#flex-end-justify-content)
      - [Center (justify-content)](#center-justify-content)
      - [Space-between (justify-content)](#space-between-justify-content)
      - [Space-around (justify-content)](#space-around-justify-content)
      - [Space-evenly (justify-content)](#space-evenly-justify-content)
      - [Stretch (justify-content)](#stretch-justify-content)
    - [Align-items](#align-items)
      - [Flex-start (align-items)](#flex-start-align-items)
      - [Flex-end (align-items)](#flex-end-align-items)
      - [Center (align-items)](#center-align-items)
      - [Stretch (align-items)](#stretch-align-items)
    - [Flex-direction](#flex-direction)
      - [Row (flex-direction)](#row-flex-direction)
      - [Row-reverse (flex-direction)](#row-reverse-flex-direction)
      - [Column (flex-direction)](#column-flex-direction)
      - [Column-reverse (flex-direction)](#column-reverse-flex-direction)
    - [Flex-wrap](#flex-wrap)
      - [No-wrap (flex-wrap)](#no-wrap-flex-wrap)
      - [Wrap (flex-wrap)](#wrap-flex-wrap)
      - [Wrap-reverse (flex-wrap)](#wrap-reverse-flex-wrap)
    - [Gap](#gap)
  - [Grid (display: grid)](#grid-display-grid)
  - [Position](#position)
    - [Static](#static)
    - [Relative](#relative)
    - [Absolute](#absolute)
      - [z-index](#z-index)
    - [Fixed](#fixed)
- [Box model](#box-model)

<br>

## CSS

CSS es un lenguaje de hojas de estilo que nos permite darle estilo a nuestros documentos HTML. CSS nos permite cambiar el color de los textos, el tamaño de las fuentes, el color de fondo, la posición de los elementos, etc. Se llama CSS por "Cascading Style Sheets" (hojas de estilo en cascada), ya que los estilos se aplican de arriba hacia abajo, y si hay dos estilos que se intentan aplciar al mismo elemento, el que predomina es el que está más abajo.

### Criterios para el estilo que se aplica

- Si alguna regla tiene una especificidad mayor, se aplica ese estilo. Que una regla tenga una especificidad mayor significa que tiene un selector más específico, por ejemplo un selector de ID tiene más especificidad que un selector de clase y un selector de clase tiene más especificidad que un selector de elemento.
- De no aplicar ninguna regla adicional, el estilo que se aplica es el que está más abajo en el documento (o documentos) CSS. El orden en que se importan los documentos CSS también es importante, ya que si se importa un documento CSS después de otro, el estilo que se aplica es el del documento CSS que se importó después.
- `!important` es una palabra clave que se puede usar para forzar que se aplique un estilo, aunque tenga una especificidad menor que otro estilo o esté más arriba. Se usa así: `color: red !important;`. **Se recomienda no usar esta palabra clave**, ya que puede causar problemas de mantenimiento en el código.

Estas reglas no implican que un estilo descarta al otro completamente, es decir, las reglas que se pisan son las que sobreescriben las reglas con más especificidad, pero no se eliminan. Por ejemplo, si tenemos el siguiente código:

```css
p {
    color: red;
}

.intro {
    color: blue;
}
```

Y en el HTML:

```html
<p class="intro">Hola</p>
<p>Mundo</p>
```

<div class="css-result result-0">
    <p class="intro" style="color: blue;">Hola</p>
    <p style="color: red;">Mundo</p>
</div>

En este caso la regla `color` del selector de clase `.intro` sobreescribe la regla `color` del selector de elemento `h1`, pero no se elimina. Por lo tanto, el color del texto es azul en el párrafo con la clase `intro`, pero rojo en el párrafo sin clase.

Otro ejemplo:

```css
p {
    color: red;
    font-size: 30px;
}

.intro {
    color: blue;
}
```

Y en el HTML:

```html
<p class="intro">Hola</p>
<p>Mundo</p>
```

<div class="css-result result-1">
    <p class="intro" style="color: blue; font-size: 30px;">Hola</p>
    <p style="color: red; font-size: 30px;">Mundo</p>
</div>

En este caso la regla `color` del selector de clase `.intro` sobreescribe la regla `color` del selector de elemento `h1`. Por lo tanto, el color del texto es azul en el párrafo con la clase `intro`, pero rojo en el párrafo sin clase. Sin embargo, la regla `font-size` del selector de elemento `h1` no se sobreescribe, por lo que el tamaño de la fuente es de 30px en ambos párrafos.

## Tipos de seletores

### Seletores de elemento

Estos selectores se utilizan para seleccionar elementos por su nombre de etiqueta. No utilizan ningún tipo de prefijo y se aplican a todos los elementos que coincidan con el nombre de la etiqueta. Por ejemplo, si queremos cambiar el color de todos los elementos `h1` en nuestra página, podemos usar el siguiente código CSS:

```css
h1 {
    color: red;
}
```

### Seletores de clase

Los selectores de clase se utilizan para seleccionar elementos por su atributo `class`. Para usar un selector de clase, debemos anteponer un punto (`.`) al nombre de la clase. Por ejemplo, si queremos cambiar el color de todos los elementos que tengan la clase `intro`, podemos usar el siguiente código CSS:

```css
.intro {
    color: red;
}
```

Y en el HTML:

```html
<p class="intro">Lorem ipsum dolor sit amet.</p>
<h3 class="intro">Lorem ipsum dolor sit amet.</h3>
<p>Lorem ipsum dolor sit amet.</p>
```

El resultado sería:

<style>
    .result-1 .intro{
        color: red;
    }
</style>

<div class="css-result result-1">
    <p class="intro">Lorem ipsum dolor sit amet.</p>
    <h3 class="intro">Lorem ipsum dolor sit amet.</h3>
    <p>Lorem ipsum dolor sit amet.</p>
</div>

### Seletores de ID

Los selectores de ID se utilizan para seleccionar elementos por su atributo `id`. Para usar un selector de ID, debemos anteponer un numeral (`#`) al nombre del ID. Notar que como los ID's deben ser únicos, estas reglas de estilos solo afectarán a un elemento. Por ejemplo, si queremos cambiar el color de un elemento que tenga el ID `intro`, podemos usar el siguiente código CSS:

```css
#intro {
    color: red;
}
```

Y en el HTML:

```html
<p id="intro">Lorem ipsum dolor sit amet.</p>
<h3>Lorem ipsum dolor sit amet.</h3>
<p>Lorem ipsum dolor sit amet.</p>
```

El resultado sería:

<style>
    .result-2 #intro{
        color: red;
    }
</style>

<div class="css-result result-2">
    <p id="intro">Lorem ipsum dolor sit amet.</p>
    <h3>Lorem ipsum dolor sit amet.</h3>
    <p>Lorem ipsum dolor sit amet.</p>
</div>

### Seletores de atributo

Los selectores de atributo se utilizan para seleccionar elementos que tengan un atributo con un valor específico. Para usar un selector de atributo, debemos especificar el nombre del atributo entre corchetes (`[]`). Si queremos seleccionar los inputs que tengan un atributo `type` con el valor `number`, podemos usar el siguiente código CSS:

```css
input[type="number"] {
    border: 3px solid red;
}
```

Y en el HTML:

```html
<input type="text" placeholder="Text" />
<input type="number" placeholder="Number" />
<input type="text" placeholder="Text" />
```

El resultado sería:

<style>
    input[type="number"]{
        border: 3px solid red;
    }
</style>

<div class="css-result result-3">
    <input type="text" placeholder="Text">
    <input type="number" placeholder="Number">
    <input type="text" placeholder="Text">
</div>

### Seletores de pseudo-clase

Los selectores de pseudo-clase se utilizan para seleccionar elementos basados en su estado. Por ejemplo, si queremos cambiar el color de un elemento cuando el usuario pasa el mouse por encima (_hover_), podemos usar el siguiente código CSS:

```css
a:hover {
    color: red;
}
```

Y en el HTML:

```html
<a href="#">Link 1</a>
<a href="#">Link 2</a>
<a href="#">Link 3</a>
```

El resultado sería:

<style>
    .result-4 a:hover{
        color: red;
    }
</style>

<div class="css-result result-4">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
</div>

## Tipos de unidades

Las unidades de CSS se utilizan para especificar el tamaño de las propiedades CSS. Existen diferentes tipos de unidades, pero las más comunes son:

- `px`: Un pixel.
- `em`: Un múltiplo del tamaño de la fuente del elemento.
- `rem`: Un múltiplo del tamaño de la fuente del elemento raíz.
- `%`: Un porcentaje del tamaño del elemento padre.
- `vh`: Un porcentaje del tamaño de la ventana del navegador.
- `vw`: Un porcentaje del ancho de la ventana del navegador.

## Disposición de elementos

### Elementos de bloque (display: block)

Los elementos de bloque se utilizan para agrupar elementos en bloques verticales. Por ejemplo, los elementos `div` y `p` son elementos de bloque por defecto. Los elementos de bloque siempre comienzan en una nueva línea y ocupan todo el ancho disponible. Es posible cambiar el comportamiento de cualquier elemento a un elemento de bloque usando la propiedad `display: block`.

Por ejemplo:

<style>
    .result-5 p{
        border: 1px solid red;
    }
</style>

<div class="css-result result-5">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</div>

### Elementos de línea (display: inline)

Los elementos de línea se utilizan para agrupar elementos en líneas horizontales. Por ejemplo, los elementos `span` y `a` son elementos de línea por defecto. Los elementos de línea no comienzan en una nueva línea y solo ocupan el espacio necesario para mostrar su contenido. Es posible cambiar el comportamiento de cualquier elemento a un elemento de línea usando la propiedad `display: inline`.

Por ejemplo:

<style>
    .result-6 span{
        border: 1px solid red;
    }
</style>

<div class="css-result result-6">
    <span>Lorem ipsum dolor sit amet</span>
    <span>Lorem ipsum dolor sit amet</span>
    <span>Lorem ipsum dolor sit amet</span>
</div>

### Elementos de línea en bloque (display: inline-block)

Los elementos de línea en bloque se utilizan para agrupar elementos en bloques verticales. Por ejemplo, los elementos `button` y `input` son elementos de línea en bloque por defecto. Los elementos de línea en bloque no comienzan en una nueva línea y solo ocupan el espacio necesario para mostrar su contenido. Es posible cambiar el comportamiento de cualquier elemento a un elemento de línea en bloque usando la propiedad `display: inline-block`.

Por ejemplo:

<style>
    .result-7 button{
        border: 1px solid red;
    }
</style>

<div class="css-result result-7">
    <button>Lorem ipsum dolor sit amet</button>
    <button>Lorem ipsum dolor sit amet</button>
    <button>Lorem ipsum dolor sit amet</button>
    <button>Lorem ipsum dolor sit amet</button>
    <button>Lorem ipsum dolor sit amet</button>
    <button>Lorem ipsum dolor sit amet</button>
    <button>Lorem ipsum dolor sit amet</button>
    <button>Lorem ipsum dolor sit amet</button>
    <button>Lorem ipsum dolor sit amet</button>
</div>

### Flexbox (display: flex)

El modelo flexbox es un modelo de diseño unidimensional que define la relación entre los elementos de un contenedor y sus elementos hijos. Es importante esta última parte, ya que será necesario tener en cuenta que cuando definimos un elemento como flexbox, son sus elementos hijos los que se comportarán de forma diferente y no dicho elemento. Para definir un elemento como flexbox, debemos usar la propiedad `display: flex`.

Este modelo de diseño se basa en dos ejes: el eje principal y el eje transversal. El eje principal se define con la propiedad `flex-direction` siendo el valor por defecto `row` (horizontal). Los elementos hijos se distribuyen en el eje principal de izquierda a derecha y se alinearán en dicho eje dependiendo de la propiedad `justify-content`. Para alinearlos en el eje transversal, debemos usar la propiedad `align-items`.

Este es un ejemplo de cómo funciona el modelo de diseño flexbox:

<style>
    .result-8 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #eee;
        padding: 20px !important;
    }
    .result-8 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
    }
</style>

#### Justify-content

Alinea los elementos hijos en el eje principal. Los valores posibles son:

##### Flex-start (justify-content)

Este valor alinea los elementos hijos al principio del eje principal. El primer elemento se alinea al principio del eje principal y el último elemento se alinea al final del eje principal.

```css
div {
    justify-content: flex-start;
}
```

<style>
    .result-8.justify-content-flex-start {
        justify-content: flex-start;
    }
</style>

<div class="css-result result-8 justify-content-flex-start">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Flex-end (justify-content)

Este valor alinea los elementos hijos al final del eje principal. El primer elemento se alinea al principio del eje principal y el último elemento se alinea al final del eje principal.

```css
div {
    justify-content: flex-end;
}
```

<style>
    .result-8.justify-content-flex-end {
        justify-content: flex-end;
    }
</style>

<div class="css-result result-8 justify-content-flex-end">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Center (justify-content)

Este valor alinea los elementos hijos al centro del eje principal. El primer elemento se alinea al principio del eje principal y el último elemento se alinea al final del eje principal.

```css
div {
    justify-content: center;
}
```

<style>
    .result-8.justify-content-center {
        justify-content: center;
    }
</style>

<div class="css-result result-8 justify-content-center">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Space-between (justify-content)

Este valor distribuye los elementos hijos de forma equitativa en el eje principal, dejando el máximo espacio posible entre ellos. El primer elemento se alinea al principio del eje principal y el último elemento se alinea al final del eje principal sin dejar ningún espacio con el borde del contenedor.

```css
div {
    justify-content: space-between;
}
```

<div class="css-result result-8">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Space-around (justify-content)

Este valor distribuye los elementos hijos de forma equitativa en el eje principal, dejando el máximo espacio entre ellos y agregando medio espacio entre ellos y los bordes. El primer elemento se alinea al principio del eje principal y el último elemento se alinea al final del eje principal dejando un espacio con el borde del contenedor.

```css
div {
    justify-content: space-around;
}
```

<style>
    .result-8.justify-content-space-around {
        justify-content: space-around;
    }
</style>

<div class="css-result result-8 justify-content-space-around">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Space-evenly (justify-content)

Este valor distribuye los elementos hijos de forma equitativa en el eje principal, dejando el máximo espacio entre ellos y agregando el mismo espacio entre ellos y los bordes. El primer elemento se alinea al principio del eje principal y el último elemento se alinea al final del eje principal dejando un espacio con el borde del contenedor.

```css
div {
    justify-content: space-evenly;
}
```

<style>
    .result-8.justify-content-space-evenly {
        justify-content: space-evenly;
    }
</style>

<div class="css-result result-8 justify-content-space-evenly">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Stretch (justify-content)

Este valor estira los elementos hijos para que ocupen todo el espacio disponible en el eje principal. El primer elemento se alinea al principio del eje principal y el último elemento se alinea al final del eje principal.

```css
div {
    justify-content: stretch;
}
```

<style>
    .result-8.justify-content-stretch {
        justify-content: stretch;
    }

    .result-8.justify-content-stretch div {
        width: 100%;
    }
</style>

<div class="css-result result-8 justify-content-stretch">
    <div></div>
    <div></div>
    <div></div>
</div>

#### Align-items

Alinea los elementos hijos en el eje transversal. Los valores posibles son:

<style>
    .result-9 {
        display: flex;
        justify-content: space-evenly;
        background-color: #eee;
        padding: 20px !important;
        height: 250px;
    }
    .result-9 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
    }
</style>

##### Flex-start (align-items)

Este valor alinea los elementos hijos al principio del eje transversal. El primer elemento se alinea al principio del eje transversal y el último elemento se alinea al final del eje transversal.

```css
div {
    align-items: flex-start;
}
```

<style>
    .result-9.align-items-flex-start {
        align-items: flex-start;
    }
</style>

<div class="css-result result-9 align-items-flex-start">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Flex-end (align-items)

Este valor alinea los elementos hijos al final del eje transversal. El primer elemento se alinea al principio del eje transversal y el último elemento se alinea al final del eje transversal.

```css
div {
    align-items: flex-end;
}
```

<style>
    .result-9.align-items-flex-end {
        align-items: flex-end;
    }
</style>

<div class="css-result result-9 align-items-flex-end">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Center (align-items)

Este valor alinea los elementos hijos al centro del eje transversal. El primer elemento se alinea al principio del eje transversal y el último elemento se alinea al final del eje transversal.

```css
div {
    align-items: center;
}
```

<style>
    .result-9.align-items-center {
        align-items: center;
    }
</style>

<div class="css-result result-9 align-items-center">
    <div></div>
    <div></div>
    <div></div>
</div>

##### Stretch (align-items)

Este valor estira los elementos hijos para que ocupen todo el espacio disponible en el eje transversal. El primer elemento se alinea al principio del eje transversal y el último elemento se alinea al final del eje transversal.

```css
div {
    align-items: stretch;
}
```

<style>
    .result-9.align-items-stretch {
        align-items: stretch;
    }

    .result-9.align-items-stretch div {
        height: 100%;
    }
</style>

<div class="css-result result-9 align-items-stretch">
    <div></div>
    <div></div>
    <div></div>
</div>

#### Flex-direction

Establece la dirección del eje principal. Los valores posibles son:

##### Row (flex-direction)

Este valor establece el eje principal horizontalmente, de izquierda a derecha.

```css
div {
    flex-direction: row;
}
```

<style>
    .result-10 {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        background-color: #eee;
        padding: 20px !important;
    }
    .result-10 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
    }
</style>

<div class="css-result result-10">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

##### Row-reverse (flex-direction)

Este valor establece el eje principal horizontalmente, de derecha a izquierda.

```css
div {
    flex-direction: row-reverse;
}
```

<style>
    .result-10.flex-direction-row-reverse {
        flex-direction: row-reverse;
    }
</style>

<div class="css-result result-10 flex-direction-row-reverse">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

##### Column (flex-direction)

Este valor establece el eje principal verticalmente, de arriba a abajo.

```css
div {
    flex-direction: column;
}
```

<style>
    .result-10.flex-direction-column {
        flex-direction: column;
        justify-content: center;
    }
</style>

<div class="css-result result-10 flex-direction-column">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

##### Column-reverse (flex-direction)

Este valor establece el eje principal verticalmente, de abajo a arriba.

```css
div {
    flex-direction: column-reverse;
}
```

<style>
    .result-10.flex-direction-column-reverse {
        flex-direction: column-reverse;
        justify-content: center;
    }
</style>

<div class="css-result result-10 flex-direction-column-reverse">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

#### Flex-wrap

Establece si los elementos hijos deben ajustarse a una sola línea o pueden ajustarse a múltiples líneas. Los valores posibles son:

##### No-wrap (flex-wrap)

Este valor establece que los elementos hijos no deben ajustarse a múltiples líneas.

```css
div {
    flex-wrap: nowrap;
}
```

<style>
    .result-11 {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-evenly;
        background-color: #eee;
        padding: 20px !important;
    }
    .result-11 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
    }
</style>

<div class="css-result result-11">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
</div>

##### Wrap (flex-wrap)

Este valor establece que los elementos hijos deben ajustarse a múltiples líneas.

```css
div {
    flex-wrap: wrap;
}
```

<style>
    .result-11.flex-wrap-wrap {
        flex-wrap: wrap;
        justify-content: flex-start;
    }
</style>

<div class="css-result result-11 flex-wrap-wrap">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
</div>

##### Wrap-reverse (flex-wrap)

Este valor establece que los elementos hijos deben ajustarse a múltiples líneas, pero en orden inverso.

```css
div {
    flex-wrap: wrap-reverse;
}
```

<style>
    .result-11.flex-wrap-wrap-reverse {
        flex-wrap: wrap-reverse;
        justify-content: flex-start;
    }
</style>

<div class="css-result result-11 flex-wrap-wrap-reverse">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
</div>

#### Gap

Establece el espacio entre los elementos hijos. Este espacio se distribuye uniformemente entre los elementos hijos.

```css
div {
    gap: 20px;
}
```

<style>
    .result-12 {
        display: flex;
        gap: 20px;
        justify-content: flex-start;
        background-color: #eee;
        padding: 20px !important;
        flex-wrap: wrap;
    }
    .result-12 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
    }
</style>

<div class="css-result result-12">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
</div>

### Grid (display: grid)

Información sobre el módulo Grid: [Grid](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout)

### Position

Esta propiedad establece el tipo de posicionamiento de un elemento. Los valores posibles son:

#### Static

Este valor establece que el elemento no se posiciona de ninguna manera. Es el valor por defecto.

```css
div {
    position: static;
}
```

<style>
    .result-13 {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
        padding: 20px !important;
    }
    .result-13 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
        position: static;
    }
</style>

<div class="css-result result-13">
    <div>1</div>
</div>

#### Relative

Este valor establece que el elemento se posiciona de forma relativa a su posición normal. Es decir, se desplaza respecto a la posición que tendría si no se aplicara ningún tipo de posicionamiento. Su desplazamiento se realiza mediante las propiedades top, right, bottom y left, y no afecta a los elementos que se encuentren a su alrededor. Por ejemplo:

```css
div {
    position: relative;
}
```

<style>
    .result-14 {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
        padding: 20px !important;
        height: 250px;
    }
    .result-14 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
    }
    .result-14 .dos {
        position: relative;
        top: -50px;
        left: 50px;
    }
</style>

<div class="css-result result-14">
    <div>1</div>
    <div class="dos">2</div>
    <div>3</div>
</div>

#### Absolute

Este valor establece que el elemento se posiciona de forma absoluta respecto a su elemento padre más cercano que tenga un posicionamiento distinto de static. Si no existe ningún elemento padre con un posicionamiento distinto de static, el elemento se posiciona respecto a la ventana del navegador. Su desplazamiento se realiza mediante las propiedades top, right, bottom y left, y no afecta a los elementos que se encuentren a su alrededor de ninguna manera ya que virtualmente desaparece de la página a la hora de desplazar el resto de elementos. Por ejemplo:

```css
div {
    position: absolute;
}
```

<style>
    .result-15 {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
        padding: 20px !important;
        height: 250px;
        position: relative;
    }
    .result-15 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
    }
    .result-15 .dos {
        position: absolute;
        top: 50px;
        left: 50px;
    }
</style>

<div class="css-result result-15">
    <div>1</div>
    <div class="dos">2</div>
    <div>3</div>
</div>

En este ejemplo el elemento "2" se posiciona de forma absoluta respecto al elemento padre "result-15" que tiene un posicionamiento relativo.

##### z-index

Esta propiedad establece el orden de los elementos que se encuentran en una misma posición. El valor por defecto es 0, y cuanto mayor sea el valor, más adelante se mostrará el elemento. Solo se aplicará a los elementos que tengan un posicionamiento distinto de static. Por ejemplo:

```css
div {
    position: absolute;
    z-index: 1;
}
```

<style>
    .result-16 {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
        padding: 20px !important;
        height: 250px;
        position: relative;
    }
    .result-16 div {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
    }
    .result-16 .dos {
        position: absolute;
        top: 50px;
        left: 50px;
        z-index: 3;
    }
    .result-16 .cuatro {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 2;
    }
</style>

<div class="css-result result-16">
    <div>1</div>
    <div class="dos">2</div>
    <div>3</div>
    <div class="dos cuatro">4</div>
</div>

En este ejemplo el elemento "4" se posiciona de forma absoluta respecto al elemento padre "result-16" que tiene un posicionamiento relativo, y tiene un z-index de 2, por lo que se mostrará por encima del elemento "2" que tiene un z-index de 3.

#### Fixed

Este valor establece que el elemento se posiciona de forma absoluta respecto a la ventana del navegador. Su desplazamiento se realiza mediante las propiedades top, right, bottom y left, y no afecta a los elementos que se encuentren a su alrededor de ninguna manera ya que virtualmente desaparece de la página a la hora de desplazar el resto de elementos. A diferencia del valor absolute, este valor se desplaza cuando se hace scroll en la página junto con ella. Por ejemplo el header de la página en la que estás leyendo este cheatsheet.

## Box model

El box model es el modelo de caja que se utiliza para representar los elementos HTML en la pantalla. Cada elemento HTML se representa como una caja rectangular que contiene tanto el contenido como el relleno, el borde y el margen. El box model se compone de los siguientes elementos:

- Content: es el contenido del elemento HTML.
- Padding: es el espacio que hay entre el contenido y el borde.
- Border: es el borde que rodea al contenido y al padding.
- Margin: es el espacio que hay entre el borde y los elementos vecinos.

Diagrama del box model:

<style>
    .result-17 {
        border: none !important;
    }

    .margin {
        background: #f1f1f1;
        padding: 45px;
        width: 100%;
        height: 100%;
        position: relative;
        border: 2px dashed #bbb;
        transition: all .25s ease-in-out;
        color: black;
    }
    .margin:before {
        content: "Margin";
        font-size: 1.4em;
        position: absolute;
        left: 0;
        top: 1.8%;
        width: 100%;
        text-align: center;
        font-family: "Fira Code", monospace;
    }
    .border {
        padding: 45px;
        width: 100%;
        height: 100%;
        position: relative;
        background: var(--acc-color);
    }
    .border:before {
        content: "Border";
        font-size: 1.4em;
        color: black;
        position: absolute;
        left: 0;
        top: 2.5%;
        width: 100%;
        text-align: center;
        font-family: "Fira Code", monospace;
    }
    .padding {
        color: black;
        padding: 45px;
        width: 100%;
        height: 100%;
        position: relative;
        background: #f1f1f1;
    }
    .padding:before {
        content: "Padding";
        font-size: 1.4em;
        position: absolute;
        left: 0.5%;
        top: 3.7%;
        width: 100%;
        text-align: center;
        font-family: "Fira Code", monospace;
    }
    .content {
        padding: 20px;
        width: 100%;
        height: 100%;
        position: relative;
        background: white;
        border: 2px dashed #bbb;
    }
    .content:before {
        content: "Content";
        font-size: 1.4em;
        display: block;
        text-align: center;
        line-height: 3.5;
        font-family: "Fira Code", monospace;
    }
</style>

<div class="css-result result-17">
    <div class="margin">
        <div class="border w3-theme">
            <div class="padding">
                <div class="content"></div>
            </div>
        </div>
    </div>
</div>
