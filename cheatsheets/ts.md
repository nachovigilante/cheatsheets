---
title: TypeScript
image: "/assets/images/ts.svg"
---

## Índice

- [Índice](#índice)
- [¿Qué es TypeScript?](#qué-es-typescript)
- [Tipos básicos](#tipos-básicos)
  - [string](#string)
  - [number](#number)
  - [boolean](#boolean)
  - [any](#any)
  - [unknown](#unknown)
  - [void](#void)
  - [null y undefined](#null-y-undefined)
  - [never](#never)
- [Arrays y Tuplas](#arrays-y-tuplas)
  - [Arrays tipados](#arrays-tipados)
  - [Tuplas](#tuplas)
- [Tipos personalizados](#tipos-personalizados)
  - [Type alias](#type-alias)
  - [Union types](#union-types)
  - [Intersection types](#intersection-types)
  - [Literal types](#literal-types)
- [Interfaces](#interfaces)
  - [Declaración de interfaces](#declaración-de-interfaces)
  - [Propiedades opcionales](#propiedades-opcionales)
  - [Propiedades de solo lectura](#propiedades-de-solo-lectura)
  - [Extender interfaces](#extender-interfaces)
- [Funciones tipadas](#funciones-tipadas)
  - [Parámetros y retorno](#parámetros-y-retorno)
  - [Parámetros opcionales y por defecto](#parámetros-opcionales-y-por-defecto)
  - [Funciones como tipo](#funciones-como-tipo)
- [Genéricos](#genéricos)
  - [Funciones genéricas](#funciones-genéricas)
  - [Interfaces genéricas](#interfaces-genéricas)
  - [Restricciones en genéricos](#restricciones-en-genéricos)
- [Enums](#enums)
  - [Enum numérico](#enum-numérico)
  - [Enum de strings](#enum-de-strings)
- [Type utilities](#type-utilities)
  - [Partial](#partial)
  - [Required](#required)
  - [Readonly](#readonly)
  - [Pick](#pick)
  - [Omit](#omit)

<br>

## ¿Qué es TypeScript?

TypeScript es un superconjunto de JavaScript desarrollado por Microsoft que agrega **tipado estático opcional**. Esto significa que todo código JavaScript válido también es código TypeScript válido. TypeScript se compila a JavaScript antes de ejecutarse.

Sus principales ventajas son:
- Detectar errores en tiempo de compilación (antes de ejecutar el código)
- Mejor autocompletado e IntelliSense en editores de código
- Código más legible y autodocumentado

## Tipos básicos

En TypeScript se puede anotar el tipo de una variable usando `: tipo` después del nombre.

### string

```typescript
let nombre: string = "Juan";
let saludo: string = `Hola, ${nombre}`;
```

### number

```typescript
let edad: number = 30;
let precio: number = 9.99;
let hexadecimal: number = 0xff;
```

### boolean

```typescript
let activo: boolean = true;
let eliminado: boolean = false;
```

### any

El tipo `any` desactiva el chequeo de tipos para esa variable. Es útil como escape, pero debe evitarse en lo posible ya que elimina los beneficios de TypeScript.

```typescript
let dato: any = "hola";
dato = 42;       // OK
dato = true;     // OK
dato.metodo();   // OK (sin chequeo)
```

### unknown

Similar a `any`, pero más seguro: no se puede operar con un valor `unknown` sin antes verificar su tipo.

```typescript
let entrada: unknown = obtenerDato();

// Error: no se puede usar directamente
// entrada.toUpperCase();

// Correcto: verificar el tipo antes
if (typeof entrada === "string") {
    console.log(entrada.toUpperCase());
}
```

### void

Se usa como tipo de retorno en funciones que no devuelven ningún valor.

```typescript
const saludar = (nombre: string): void => {
    console.log(`Hola, ${nombre}`);
};
```

### null y undefined

```typescript
let sinValor: null = null;
let sinDefinir: undefined = undefined;

// Con strictNullChecks activado, null y undefined
// no son asignables a otros tipos.
let nombre: string = null; // Error
```

### never

Representa valores que nunca ocurren. Se usa en funciones que siempre lanzan un error o tienen un loop infinito.

```typescript
const lanzarError = (mensaje: string): never => {
    throw new Error(mensaje);
};
```

## Arrays y Tuplas

### Arrays tipados

Hay dos formas equivalentes de tipar un array:

```typescript
// Forma 1: tipo[]
let numeros: number[] = [1, 2, 3];
let nombres: string[] = ["Ana", "Carlos"];

// Forma 2: Array<tipo>
let numeros: Array<number> = [1, 2, 3];
```

### Tuplas

Las tuplas son arrays con una cantidad fija de elementos donde cada posición tiene un tipo específico.

```typescript
let persona: [string, number] = ["Juan", 30];

console.log(persona[0]); // "Juan" (string)
console.log(persona[1]); // 30 (number)

// Error: el orden y los tipos deben respetarse
let invalido: [string, number] = [30, "Juan"]; // Error
```

## Tipos personalizados

### Type alias

Permite crear un nombre para cualquier tipo, incluso tipos complejos.

```typescript
type ID = string | number;
type Coordenadas = [number, number];

let usuarioId: ID = "abc-123";
let punto: Coordenadas = [10, 20];
```

### Union types

Una variable puede ser de uno u otro tipo usando `|`.

```typescript
let resultado: string | number;
resultado = "hola";  // OK
resultado = 42;      // OK
resultado = true;    // Error
```

### Intersection types

Combina múltiples tipos en uno solo usando `&`. El valor debe cumplir con todos los tipos al mismo tiempo.

```typescript
type Persona = { nombre: string };
type Empleado = { empresa: string };

type PersonaEmpleada = Persona & Empleado;

const trabajador: PersonaEmpleada = {
    nombre: "Luis",
    empresa: "Acme",
};
```

### Literal types

Permiten especificar valores exactos como tipos.

```typescript
type Direccion = "norte" | "sur" | "este" | "oeste";

let rumbo: Direccion = "norte"; // OK
let rumbo2: Direccion = "arriba"; // Error
```

## Interfaces

Las interfaces definen la forma (estructura) que debe tener un objeto. Son similares a los `type`, pero están pensadas específicamente para objetos y clases.

### Declaración de interfaces

```typescript
interface Usuario {
    nombre: string;
    apellido: string;
    edad: number;
}

const usuario: Usuario = {
    nombre: "Ana",
    apellido: "García",
    edad: 25,
};
```

### Propiedades opcionales

Se marcan con `?` al final del nombre. Pueden estar presentes o no en el objeto.

```typescript
interface Producto {
    nombre: string;
    precio: number;
    descripcion?: string; // opcional
}

const producto: Producto = {
    nombre: "Laptop",
    precio: 1500,
    // descripcion es opcional, no es necesario incluirla
};
```

### Propiedades de solo lectura

Se marcan con `readonly`. Solo pueden asignarse una vez, al momento de la creación del objeto.

```typescript
interface Punto {
    readonly x: number;
    readonly y: number;
}

const punto: Punto = { x: 10, y: 20 };
punto.x = 5; // Error: no se puede modificar
```

### Extender interfaces

Una interfaz puede heredar las propiedades de otra usando `extends`.

```typescript
interface Animal {
    nombre: string;
    edad: number;
}

interface Perro extends Animal {
    raza: string;
}

const perro: Perro = {
    nombre: "Rex",
    edad: 3,
    raza: "Labrador",
};
```

## Funciones tipadas

### Parámetros y retorno

```typescript
// Se tipan los parámetros y el valor de retorno
const sumar = (a: number, b: number): number => {
    return a + b;
};

// TypeScript puede inferir el tipo de retorno automáticamente
const restar = (a: number, b: number) => {
    return a - b; // TypeScript infiere: number
};
```

### Parámetros opcionales y por defecto

```typescript
// Parámetro opcional con ?
const saludar = (nombre: string, apellido?: string): string => {
    if (apellido) {
        return `Hola, ${nombre} ${apellido}`;
    }
    return `Hola, ${nombre}`;
};

// Parámetro con valor por defecto
const incrementar = (valor: number, paso: number = 1): number => {
    return valor + paso;
};

incrementar(5);    // 6
incrementar(5, 3); // 8
```

### Funciones como tipo

```typescript
// Definir el tipo de una función
type Operacion = (a: number, b: number) => number;

const multiplicar: Operacion = (a, b) => a * b;
const dividir: Operacion = (a, b) => a / b;

// Como parámetro de otra función
const calcular = (a: number, b: number, operacion: Operacion): number => {
    return operacion(a, b);
};

calcular(10, 2, multiplicar); // 20
calcular(10, 2, dividir);     // 5
```

## Genéricos

Los genéricos permiten escribir funciones, interfaces y clases que funcionan con cualquier tipo, manteniendo el tipado. Se declaran con `<T>` (aunque el nombre puede ser cualquiera).

### Funciones genéricas

```typescript
// Sin genéricos, se perdería el tipo
const primerElemento = (array: any[]): any => array[0];

// Con genéricos, se preserva el tipo
const primerElemento = <T>(array: T[]): T => array[0];

const numeros = [1, 2, 3];
const resultado = primerElemento(numeros); // resultado: number

const palabras = ["hola", "mundo"];
const primera = primerElemento(palabras); // primera: string
```

### Interfaces genéricas

```typescript
interface Respuesta<T> {
    datos: T;
    status: number;
    mensaje: string;
}

// Respuesta con datos de tipo Usuario
const respuestaUsuario: Respuesta<{ nombre: string; edad: number }> = {
    datos: { nombre: "Ana", edad: 25 },
    status: 200,
    mensaje: "OK",
};

// Respuesta con datos de tipo string[]
const respuestaLista: Respuesta<string[]> = {
    datos: ["item1", "item2"],
    status: 200,
    mensaje: "OK",
};
```

### Restricciones en genéricos

Se puede restringir qué tipos acepta un genérico usando `extends`.

```typescript
// T debe tener al menos la propiedad length
const longitudDe = <T extends { length: number }>(valor: T): number => {
    return valor.length;
};

longitudDe("hola");      // 4 (string tiene length)
longitudDe([1, 2, 3]);   // 3 (array tiene length)
longitudDe(42);          // Error: number no tiene length
```

## Enums

Los enums permiten definir un conjunto de constantes con nombre.

### Enum numérico

Por defecto, los valores empiezan en `0` y se incrementan automáticamente.

```typescript
enum Direccion {
    Norte,  // 0
    Sur,    // 1
    Este,   // 2
    Oeste,  // 3
}

let rumbo: Direccion = Direccion.Norte;
console.log(rumbo); // 0

// Se puede cambiar el valor inicial
enum Estado {
    Activo = 1,
    Inactivo, // 2
    Suspendido, // 3
}
```

### Enum de strings

```typescript
enum Rol {
    Admin = "ADMIN",
    Usuario = "USUARIO",
    Invitado = "INVITADO",
}

const rolActual: Rol = Rol.Admin;
console.log(rolActual); // "ADMIN"
```

## Type utilities

TypeScript incluye una serie de tipos de utilidad que permiten transformar tipos existentes.

### Partial

Hace que todas las propiedades de un tipo sean opcionales.

```typescript
interface Usuario {
    nombre: string;
    edad: number;
    email: string;
}

// Útil para funciones de actualización parcial
const actualizarUsuario = (id: number, cambios: Partial<Usuario>) => {
    // cambios puede tener solo algunas propiedades de Usuario
};

actualizarUsuario(1, { nombre: "Carlos" }); // OK
actualizarUsuario(1, { edad: 30, email: "carlos@ejemplo.com" }); // OK
```

### Required

Lo opuesto a `Partial`: hace que todas las propiedades sean obligatorias.

```typescript
interface Configuracion {
    tema?: string;
    idioma?: string;
}

const config: Required<Configuracion> = {
    tema: "oscuro",   // obligatorio
    idioma: "es",     // obligatorio
};
```

### Readonly

Hace que todas las propiedades sean de solo lectura.

```typescript
interface Punto {
    x: number;
    y: number;
}

const punto: Readonly<Punto> = { x: 10, y: 20 };
punto.x = 5; // Error: no se puede modificar
```

### Pick

Crea un nuevo tipo seleccionando solo algunas propiedades de un tipo existente.

```typescript
interface Usuario {
    nombre: string;
    edad: number;
    email: string;
    password: string;
}

// Solo exponer nombre y email (sin datos sensibles)
type UsuarioPublico = Pick<Usuario, "nombre" | "email">;

const perfil: UsuarioPublico = {
    nombre: "Ana",
    email: "ana@ejemplo.com",
    // edad y password no son parte de UsuarioPublico
};
```

### Omit

Lo opuesto a `Pick`: crea un nuevo tipo excluyendo algunas propiedades.

```typescript
interface Usuario {
    nombre: string;
    edad: number;
    email: string;
    password: string;
}

// Excluir la contraseña
type UsuarioSinPassword = Omit<Usuario, "password">;

const usuarioPublico: UsuarioSinPassword = {
    nombre: "Luis",
    edad: 28,
    email: "luis@ejemplo.com",
};
```
