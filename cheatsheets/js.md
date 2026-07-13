---
title: JavaScript
image: "/assets/images/js.svg"
---

## Índicel

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
    - [Keyword Function](#keyword-function)
    - [Arrow Functions](#arrow-functions)
    - [Función de una sola línea](#función-de-una-sola-línea)
- [Operadores](#operadores)
  - [Operadores aritméticos](#operadores-aritméticos)
  - [Operadores de asignación](#operadores-de-asignación)
  - [Operadores lógicos](#operadores-lógicos)
  - [Operadores de comparación](#operadores-de-comparación)
  - [Operadores de concatenación](#operadores-de-concatenación)
  - [Operadores de acceso](#operadores-de-acceso)
    - [Acceso a elementos de un objeto](#acceso-a-elementos-de-un-objeto)
    - [Acceso a elementos de un array](#acceso-a-elementos-de-un-array)
- [Estructuras de control](#estructuras-de-control)
  - [If](#if)
  - [If else](#if-else)
  - [If else if](#if-else-if)
  - [Switch](#switch)
- [Estructuras de repetición](#estructuras-de-repetición)
  - [While](#while)
  - [Do while](#do-while)
  - [For](#for)
- [Estructuras de control de flujo](#estructuras-de-control-de-flujo)
  - [Break](#break)
  - [Continue](#continue)
- [Callbacks](#callbacks)
- [Funciones sobre arrays](#funciones-sobre-arrays)
  - [Función push](#función-push)
  - [Función pop](#función-pop)
  - [Función slice](#función-slice)
  - [Función forEach](#función-foreach)
  - [Función map](#función-map)
  - [Función filter](#función-filter)
  - [Función find](#función-find)
  - [Operador spread](#operador-spread)
- [Destructuring](#destructuring)
  - [Destructuring de arrays](#destructuring-de-arrays)
  - [Destructuring de objetos](#destructuring-de-objetos)
  - [Valores por defecto](#valores-por-defecto)
  - [Renombrar variables](#renombrar-variables)
  - [Rest en destructuring](#rest-en-destructuring)
  - [Destructuring en parámetros de funciones](#destructuring-en-parámetros-de-funciones)
- [Async / Await](#async--await)
  - [Funciones asíncronas](#funciones-asíncronas)
  - [Await](#await)
  - [Manejo de errores con try/catch](#manejo-de-errores-con-trycatch)
- [Fetch](#fetch)
  - [GET](#get)
  - [POST](#post)
- [Módulos ES](#módulos-es)
  - [Exportación nombrada](#exportación-nombrada)
  - [Exportación por defecto](#exportación-por-defecto)
  - [Importación](#importación)

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
let cadena2 = 'Hola'; // Comillas simples
let cadena3 = `${cadena}   
Mundo`; // Comillas que aceptan multilinea y variables 
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

Es importante destacar que los objetos de JavaScript no son objetos como los que se conocen en otros lenguajes. En JavaScript, los objetos son una colección de pares clave-valor, como por ejemplo un diccionario de Python, un array asociativo de PHP o un mapping en Solidity. No necesitan tener que instanciarse desde una clase, ya que javascript usa otro paradigma de objetos llamado prototipado.

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

Se pueden declarar funciones de dos formas. A efectos cotidianos, son equivalentes, pero hay una sutil diferencia: al usar el keyword `function` se puede hacer uso del keyword `this` que es usado en prototipado.

#### Keyword Function

Se pueden declarar funciones mediante el uso de la palabra reservada del sistema, `function`.

```javascript
function nombreDeLaFuncion(parametros) {
    // Código de la función
}
```

De forma equivalente, se puede hacer también

```javascript
const nombreDeLaFuncion = function (parametros) {
    // Código de la función
}
```

#### Arrow Functions

En JavaScript, a partir de ES6 se pueden declarar funciones de la siguiente forma.

```javascript
const nombreDeLaFuncion = (parametros) => {
    // Código de la función
};
```

Como mencionamos antes, este tipo de declaración es equivalente salvo por el uso del `this`

#### Función de una sola línea

En algunos casos, es más fácil declarar una función con una sola línea de código. Esto es posible únicamente si la función tiene una única línea de código. Además, podemos omitir el `return` de la función, ya que JavaScript asume que la función devuelve el resultado de esa línea.

```javascript
const multiplicarPor2 = (x) => x * 2;
```

## Operadores

Los operadores son un conjunto de funciones que nos permiten realizar operaciones matemáticas, comparaciones, procesos sobre strings, etc.

### Operadores aritméticos

Son los operadores que nos permiten realizar operaciones aritméticas, es decir, operaciones sobre números.

```javascript
// Suma
let resultado = 3 + 2; // 5
// Resta
let resultado = 3 - 2; // 1
// Multiplicación
let resultado = 3 * 2; // 6
// División
let resultado = 3 / 2; // 1.5
// Exponente
let resultado = 3 ** 2; // 9
// Modulo (resto de la división)
let resultado = 3 % 2; // 1
```

### Operadores de asignación

Son los operadores que nos permiten asignar valores y cambiar el contenido de las variables.

```javascript
let x = 1;
x += 2; // x = x + 2
x -= 2; // x = x - 2
x *= 2; // x = x * 2
x /= 2; // x = x / 2
x %= 2; // x = x % 2
x++; // x = x + 1
x--; // x = x - 1
```

### Operadores lógicos

Son los operadores que nos permiten realizar operaciones lógicas, es decir, operaciones sobre booleanos.

```javascript
let x = true;
let y = false;
// AND (&&)
let z = x && y; // false
// OR (||)
let w = x || y; // true
// NOT (!)
let v = !x; // false
```

### Operadores de comparación

Son los operadores que nos permiten realizar comparaciones entre valores.

```javascript
let x = 1;
let y = 2;
// Menor que (<)
let z = x < y; // true
// Mayor que (>)
let w = x > y; // false
// Menor o igual que (<=)
let v = x <= y; // true
// Mayor o igual que (>=)
let u = x >= y; // false
// Igualdad (==)
let t = x == y; // false
// Desigualdad (!=)
let s = x != y; // true
```

### Operadores de concatenación

Son los operadores que nos permiten concatenar strings, es decir, pegar uno o más strings para formar uno más largo con el contenido de todos.

```javascript
let x = "Hola";
let y = " mundo";
// Concatenación (+)
let z = x + y; // "Hola mundo"
// Concatenación en la asignación (+=)
let x += y; // x = x + y
// Cadenas multilinea (`)
let w = `${x} ${y}`; // "Hola mundo"
let v = `Hola mundo.
         Esto es una cadena multilinea.`; // "Hola mundo.\nEsto es una cadena multilinea."
```

### Operadores de acceso

Son los operadores que nos permiten acceder a los elementos de un objeto o un array.

#### Acceso a elementos de un objeto

```javascript
let x = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
};

// Acceso a una propiedad (.)
let y = x.nombre; // "Juan"

// Acceso a una propiedad (["nombre"])
let z = x["nombre"]; // "Juan"
```

#### Acceso a elementos de un array

```javascript
let x = [1, 2, 3, 4, 5];
x[0]; // 1
x[1]; // 2
x[2] = 10; // x = [1, 2, 10, 4, 5]
x[3]; // 4
```

## Estructuras de control

### If

```javascript
if (condición) {
    // Código a ejecutar si la condición es verdadera
}
```

### If else

```javascript
if (condición) {
    // Código a ejecutar si la condición es verdadera
} else {
    // Código a ejecutar si la condición es falsa
}
```

### If else if

```javascript
if (condición1) {
    // Código a ejecutar si la condición1 es verdadera
} else if (condición2) {
    // Código a ejecutar si la condición2 es falsa
} else {
    // Código a ejecutar si ninguna de las condiciones es verdadera
}
```

### Switch

```javascript
switch (variable) {
    case valor1:
        // Código a ejecutar si la variable es igual al valor1
        break;
    case valor2:
        // Código a ejecutar si la variable es igual al valor2
        break;
    default:
        // Código a ejecutar si ninguna de las condiciones es verdadera
        break;
}
```

## Estructuras de repetición

### While

```javascript
while (condición) {
    // Código a ejecutar mientras la condición es verdadera
}
```

### Do while

```javascript
do {
    // Código a ejecutar mientras la condición es verdadera
} while (condición);
```

### For

```javascript
for (let i = 0; i < 10; i++) {
    // Código a ejecutar 10 veces
}
```

## Estructuras de control de flujo

### Break

```javascript
while (true) {
    // Código a ejecutar
    if (condición) {
        // Código a ejecutar si la condición es verdadera
        break; // El código se detiene acá
    }
}
```

### Continue

```javascript
while (true) {
    // Código a ejecutar
    if (condición) {
        // Código a ejecutar si la condición es verdadera
        continue; // El código continúa con la siguiente vuelta
    }
}
```

## Callbacks

Los callbacks son funciones que se pasan como parámetros a otras funciones.

```javascript
const saludoInformal = (nombre) => {
    console.log(`Hola ${nombre}`);
};

const saludoFormal = (nombre) => {
    console.log(`Bienvenido ${nombre}`);
};

const saludo = (nombre, callback) => {
    callback(nombre);
};

saludo("Juan", saludoInformal);

saludo("Roberto", saludoFormal);
```

## Funciones sobre arrays

Los arrays tienen una serie de métodos que nos permiten realizar operaciones sobre ellos, sin tener que iterarlos con algún bucle, o facilitan alguna tarea. La mayoría de estas utilizan callbacks.

### Función push

Esta función agrega un elemento al final del array.

```javascript
let x = [1, 2, 3, 4, 5];
x.push(6); // x = [1, 2, 3, 4, 5, 6]
```

### Función pop

Esta función elimina el último elemento del array.

```javascript
let x = [1, 2, 3, 4, 5];
x.pop(); // x = [1, 2, 3, 4]
```

### Función slice

Esta función devuelve una copia del array en un rango especificado por parámetros.

```javascript
let x = [1, 2, 3, 4, 5];
// El primer parámetro indica el índice del primer elemento a devolver.
// El segundo parámetro indica el índice del primer elemento que no se incluirá.
x.slice(2, 4); // [3, 4, 5]
x.slice(0, 1); // [1]
x.slice(0, -2); // [1, 2, 3]

// Podemos omitir el segundo parámetro para indicar que se devuelvan todos los elementos a partir del primer parámetro.

x.slice(2); // [3, 4, 5]
x.slice(0); // [1, 2, 3, 4, 5]
```

### Función forEach

Esta función nos permite aplicar una función (callback) a cada elemento del array y modificarlo.

```javascript
let x = [1, 2, 3, 4, 5];
x.forEach((elemento, indice) => {
    // Código a ejecutar para cada elemento del array
});
```

Podemos recibir únicamente el elemento del array.

```javascript
let x = [1, 2, 3, 4, 5];
x.forEach((elemento) => elemento * 2); // x = [2, 4, 6, 8, 10]
```

### Función map

Esta función nos permite aplicar una función (callback) a cada elemento del array y devuelve un nuevo array con los resultados de la aplicación de la función a cada elemento.

```javascript
let x = [1, 2, 3, 4, 5];
x.map((elemento, indice) => {
    // Código a ejecutar para cada elemento del array
});
```

Podemos recibir únicamente el elemento del array. Por ejemplo:

```javascript
let x = [1, 2, 3, 4, 5];
let y = x.map((elemento) => elemento + 2); // y = [3, 4, 5, 6, 7]
```

### Función filter

Esta función nos permite aplicar una función booleana (callback) a cada elemento del array y devuelve un nuevo array con los elementos que cumplen la condición de la función.

```javascript
let x = [1, 2, 3, 4, 5];
x.filter((elemento, indice) => {
    // Código a ejecutar para cada elemento del array
});
```

Podemos recibir únicamente el elemento del array. Por ejemplo:

```javascript
let x = [1, 2, 3, 4, 5];
let y = x.filter((elemento) => elemento % 2 === 0); // y = [2, 4]
```

### Función find

Esta función devuelve el **primer elemento** del array que cumpla la condición de la función. Si ningún elemento la cumple, devuelve `undefined`.

```javascript
let x = [1, 2, 3, 4, 5];
let encontrado = x.find((elemento) => elemento > 3); // 4
```

Es muy útil para buscar objetos dentro de un array:

```javascript
const usuarios = [
    { id: 1, nombre: "Ana" },
    { id: 2, nombre: "Carlos" },
    { id: 3, nombre: "Luis" },
];

const usuario = usuarios.find((u) => u.id === 2);
console.log(usuario); // { id: 2, nombre: "Carlos" }
```

### Operador spread

Este operador (`...`) permite "desarmar" un array en una serie de elementos, de forma que podemos, por ejemplo, pasarlo como parámetro a una función.

```javascript
let x = [1, 2, 3, 4, 5];
let y = [7, 8, ...x, 10, 12, 16]; // y = [7, 8, 1, 2, 3, 4, 5, 10, 12, 16]
```

Ejemplo de uso:

```javascript
const sumar = (a, b, c) => {
    return a + b + c;
}

let x = [1, 2, 3];
let z = sumar(...x); // z = 6
```

## Destructuring

El destructuring es una sintaxis de ES6 que permite extraer valores de arrays u objetos y asignarlos a variables de forma concisa.

### Destructuring de arrays

Permite extraer elementos de un array por su posición.

```javascript
const numeros = [1, 2, 3];

// Sin destructuring
const a = numeros[0]; // 1
const b = numeros[1]; // 2

// Con destructuring
const [x, y, z] = numeros;
console.log(x); // 1
console.log(y); // 2
console.log(z); // 3
```

Se pueden saltear elementos usando comas:

```javascript
const [primero, , tercero] = [10, 20, 30];
console.log(primero); // 10
console.log(tercero); // 30
```

### Destructuring de objetos

Permite extraer propiedades de un objeto por su nombre.

```javascript
const persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
};

// Sin destructuring
const nombre = persona.nombre;
const edad = persona.edad;

// Con destructuring
const { nombre, apellido, edad } = persona;
console.log(nombre);   // "Juan"
console.log(apellido); // "Perez"
console.log(edad);     // 30
```

También funciona con objetos anidados:

```javascript
const usuario = {
    nombre: "Ana",
    direccion: {
        ciudad: "Buenos Aires",
        pais: "Argentina",
    },
};

const { nombre, direccion: { ciudad, pais } } = usuario;
console.log(ciudad); // "Buenos Aires"
console.log(pais);   // "Argentina"
```

### Valores por defecto

Se puede asignar un valor por defecto en caso de que la propiedad o elemento no exista.

```javascript
// En arrays
const [a = 0, b = 0, c = 0] = [1, 2];
console.log(a); // 1
console.log(b); // 2
console.log(c); // 0  ← valor por defecto

// En objetos
const { nombre = "Sin nombre", edad = 18 } = { nombre: "Carlos" };
console.log(nombre); // "Carlos"
console.log(edad);   // 18  ← valor por defecto
```

### Renombrar variables

Al hacer destructuring de objetos, se puede renombrar la variable con la sintaxis `propiedad: nuevoNombre`.

```javascript
const producto = { nombre: "Laptop", precio: 1500 };

const { nombre: nombreProducto, precio: precioProducto } = producto;
console.log(nombreProducto);  // "Laptop"
console.log(precioProducto);  // 1500
```

### Rest en destructuring

El operador rest (`...`) permite agrupar los elementos o propiedades restantes en una nueva variable.

```javascript
// En arrays
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];
console.log(primero); // 1
console.log(segundo); // 2
console.log(resto);   // [3, 4, 5]

// En objetos
const { nombre, ...datos } = { nombre: "Luis", edad: 25, ciudad: "Córdoba" };
console.log(nombre); // "Luis"
console.log(datos);  // { edad: 25, ciudad: "Córdoba" }
```

### Destructuring en parámetros de funciones

Se puede usar destructuring directamente en los parámetros de una función, lo que es muy útil cuando se recibe un objeto como argumento.

```javascript
// Sin destructuring
const saludar = (persona) => {
    console.log(`Hola, ${persona.nombre}! Tenés ${persona.edad} años.`);
};

// Con destructuring en el parámetro
const saludar = ({ nombre, edad }) => {
    console.log(`Hola, ${nombre}! Tenés ${edad} años.`);
};

const persona = { nombre: "María", edad: 28 };
saludar(persona); // "Hola, María! Tenés 28 años."
```

## Async / Await

JavaScript es un lenguaje de un solo hilo, pero puede ejecutar operaciones asíncronas (como llamadas a una API o lectura de archivos) sin bloquear el resto del código. `async` y `await` son palabras clave de ES2017 que simplifican el trabajo con código asíncrono.

### Funciones asíncronas

Una función declarada con `async` siempre devuelve una **Promise** (promesa). Esto significa que su resultado no está disponible de inmediato, sino en algún momento futuro.

```javascript
// Función asíncrona con keyword function
async function obtenerDatos() {
    return "datos";
}

// Función asíncrona con arrow function
const obtenerDatos = async () => {
    return "datos";
};

// El resultado es una Promise
console.log(obtenerDatos()); // Promise { 'datos' }
```

### Await

La palabra clave `await` solo puede usarse **dentro de una función `async`**. Pausa la ejecución de la función hasta que la Promise se resuelva, y devuelve el valor resultante.

```javascript
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ejecutar = async () => {
    console.log("Inicio");
    await esperar(2000); // espera 2 segundos
    console.log("Fin");  // se ejecuta después de los 2 segundos
};

ejecutar();
```

### Manejo de errores con try/catch

Cuando una Promise falla (es rechazada), `await` lanza un error. Para manejarlo se usa un bloque `try/catch`.

```javascript
const obtenerDatos = async () => {
    try {
        const resultado = await algunaOperacionAsincrona();
        console.log(resultado);
    } catch (error) {
        console.error("Ocurrió un error:", error);
    } finally {
        // Este bloque se ejecuta siempre, haya error o no
        console.log("Operación finalizada");
    }
};
```

## Fetch

`fetch` es la API nativa del navegador (y de Node.js 18+) para hacer peticiones HTTP. Devuelve una Promise.

### GET

Se usa para **obtener datos** de un servidor.

```javascript
const obtenerUsuario = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        // Verificar que la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const usuario = await response.json();
        console.log(usuario);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
};

obtenerUsuario(1);
```

### POST

Se usa para **enviar datos** al servidor. Se deben especificar el método, los headers y el cuerpo de la petición.

```javascript
const crearUsuario = async (nuevoUsuario) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoUsuario), // convertir objeto a JSON string
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const usuarioCreado = await response.json();
        console.log("Usuario creado:", usuarioCreado);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
    }
};

crearUsuario({ nombre: "Juan", email: "juan@ejemplo.com" });
```

## Módulos ES

Los módulos ES (ESModules) permiten dividir el código en archivos separados y compartir funcionalidades entre ellos usando `export` e `import`. Es la forma estándar de organizar código en JavaScript moderno.

### Exportación nombrada

Se pueden exportar múltiples cosas desde un mismo archivo. Al importarlas, se deben usar los mismos nombres.

```javascript
// archivo: matematica.js
export const PI = 3.1416;

export const sumar = (a, b) => a + b;

export const restar = (a, b) => a - b;
```

### Exportación por defecto

Cada archivo puede tener **una sola** exportación por defecto. Al importarla, se puede usar cualquier nombre.

```javascript
// archivo: saludo.js
const saludar = (nombre) => {
    console.log(`Hola, ${nombre}!`);
};

export default saludar;
```

### Importación

Se usa la palabra clave `import` para traer lo exportado desde otro archivo.

```javascript
// Importar exportaciones nombradas (con llaves)
import { PI, sumar, restar } from "./matematica.js";

console.log(PI);         // 3.1416
console.log(sumar(2, 3)); // 5

// Importar exportación por defecto (sin llaves, cualquier nombre)
import saludar from "./saludo.js";

saludar("Juan"); // "Hola, Juan!"

// Importar todo de un módulo bajo un alias
import * as Mate from "./matematica.js";

console.log(Mate.PI);          // 3.1416
console.log(Mate.sumar(4, 5)); // 9

// Mezclar default y nombradas en un solo import
import saludar, { PI, sumar } from "./otro-archivo.js";
```
