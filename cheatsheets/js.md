---
title: JavaScript
image: "/assets/images/javascript.png"
---

## Índice

- [Índice](#índice)
- [Variables](#variables)
  - [Declaración de variables](#declaración-de-variables)
    - [var](#var)
    - [let](#let)
    - [const](#const)
- [Tipos](#tipos)
  - [Tipo de datos primitivos](#tipo-de-datos-primitivos)
    - [Números](#números)
    - [Cadenas de texto (strings)](#cadenas-de-texto-strings)
    - [Booleanos](#booleanos)
  - [Tipos de datos compuestos](#tipos-de-datos-compuestos)
    - [Arrays](#arrays)
    - [Objects](#objects)
- [Funciones](#funciones)
  - [Declaración de funciones](#declaración-de-funciones)
    - [Forma antigua](#forma-antigua)
    - [Forma nueva](#forma-nueva)
      - [Función de una sola línea](#función-de-una-sola-línea)

<br>

## Variables

### Declaración de variables

En JavaScript, existen 3 formas de declarar variables:

#### var

```javascript
var variable = valor;
```

Esta forma de declarar las variables hace que éstas sean globales. Es decir, la variable que declaremos así, podrá ser accedida desde cualquier parte del código. Por ejemplo:

```javascript
for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log("El valor de i es: " + i); // Output: El valor de i es: 10
```

Por esta razón, no es recomendable usar la forma de declaración de variables con var, y en general utilizaremos la forma siguiente.

#### let

```javascript
let variable = valor;
```

Esta forma de declarar las variables, se asegura de que sean locales, y tengan un "scope" limitado a un bloque de código. Por ejemplo:

```javascript
for (let i = 0; i < 10; i++) {
    console.log(i);
}
console.log("El valor de i es: " + i); // Output: El valor de i es: undefined
```

Utilizar las variables declaradas con `let` nos permite evitar errores. Por ejemplo, si declaramos una variable con el mismo nombre dentro de una función, y luego dentro de otra, podremos acceder a ella sin problemas.

#### const

```javascript
const variable = valor;
```

Esta es una forma particular de declarar variables, que prohibe que estas sean modificadas. Por ejemplo:

```javascript
const PI = 3.1416;
PI = 3.14; // Error
```

`const` es útil a la hora de crear variables que sabemos que no deben ser modificadas nunca y evitar problemas a posteriori.

## Tipos

JavaScript es un lenguaje de tipado dinámico. Por ello, no existe un tipo de dato para las variables explícito, sino que los tipos son inferidos automáticamente.

### Tipo de datos primitivos

#### Números

```javascript
let numero = 1; // Enteros
let numero2 = 1.5; // Floats
let numero3 = 1.5e2; // Notación científica: 1.5 x 10^2
let numero4 = 1.5e-2; // Notación científica: 1.5 x 10^-2
let numero5 = 0xff; // Hexa: 255
let numero6 = 0b1010; // Binario: 10
let numero7 = 0o777; // Octal: 503
```

#### Cadenas de texto (strings)

```javascript
let cadena = "Hola"; // Comillas dobles
let cadena2 = "Hola"; // Comillas simples
let cadena3 = `Hola`; // Comillas que aceptan multilinea y variables
```

#### Booleanos

```javascript
let booleano = true;
let booleano2 = false;
```

### Tipos de datos compuestos

#### Arrays

```javascript
let array = [1, 2, 3];
let array2 = [1, 2, 3, "Hola", true]; // Pueden tener distintos datos
let array3 = [1, 2, 3, "Hola", true, [1, 2, 3]]; // Pueden tener arrays dentro de arrays
```

#### Objects

Es importante destacar que los objetos de JavaScript no son objetos como los que se conocen en otros lenguajes. En JavaScript, los objetos son una colección de pares clave-valor, y no una clase, como por ejemplo un diccionario de Python, un array asociativo de PHP o un mapping en Solidity.

```javascript
let objeto = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
    // Los objetos pueden tener objetos dentro
    direccion: {
        calle: "Calle falsa",
        numero: 123
    }
    // y también funciones
    saludar: function() {
        console.log("Hola");
    }
}
```

## Funciones

Las funciones en JavaScript, como en cualquier otro lenguaje, son procedimientos o bloques de código que se ejecutan cuando son invocados.

### Declaración de funciones

Las funciones se pueden declarar de dos maneras diferentes que son completamente equivalentes.

#### Forma antigua

Esta es la declaración antigua de funciones, que se utilizaba antes en JavaScript.

```javascript
function nombreDeLaFuncion(parametros) {
    // Código de la función
}
```

#### Forma nueva

Esta es la forma nueva de declarar funciones, que se utiliza en JavaScript desde ES6.

```javascript
const nombreDeLaFuncion = (parametros) => {
    // Código de la función
};
```

A priori las diferencias parecen pocas, sobre todo porque el largo de las declaraciones es parecido. Sin embargo, la forma nueva de declarar funciones es más fácil de entender y manejar, además hay que tener en cuenta que "tienen el mismo largo" únicamente porque en el último ejemplo estamos guardando la función en una constante para poder llamarla, pero en los casos donde no necesitamos nombres para las funciones resultarán más cortas.

##### Función de una sola línea

En algunos casos, es más fácil declarar una función con una sola línea de código. Esto es posible únicamente si la función tiene una única línea de código. Además, podemos omitir el `return` de la función, ya que JavaScript asume que la función devuelve el resultado de esa línea.

```javascript
const multiplicarPor2 = (x) => x * 2;
```
