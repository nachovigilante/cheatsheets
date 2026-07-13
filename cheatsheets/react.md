---
title: React
image: "/assets/images/react.svg"
---

## Índice

- [Índice](#índice)
- [Elementos](#elementos)
  - [Sintaxis de un elemento](#sintaxis-de-un-elemento)
  - [Atributos de un elemento](#atributos-de-un-elemento)
- [Componentes](#componentes)
  - [Fragmentos de React](#fragmentos-de-react)
- [Propiedades](#propiedades)
  - [Destructuring de props](#destructuring-de-props)
- [Eventos](#eventos)
  - [onClick](#onclick)
  - [onChange](#onchange)
  - [onSubmit](#onsubmit)
- [Formularios controlados](#formularios-controlados)
- [Condicionales](#condicionales)
  - [Operadores ternarios](#operadores-ternarios)
  - [If](#if)
- [Listas](#listas)
- [Hooks](#hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useContext](#usecontext)
  - [useRef](#useref)
  - [useMemo](#usememo)
  - [useCallback](#usecallback)
  - [Custom hooks](#custom-hooks)
- [Fetch con useEffect](#fetch-con-useeffect)

<br>

## Elementos

### Sintaxis de un elemento

Los elementos de React se escriben igual que los de HTML, hay algunas diferencias pero dentro de React se puede escribir HTML puro.
<br><br>
Una diferencia con HTML, por ejemplo, es que no se pueden escribir elementos que no se cierran, como imagenes o saltos de línea.

Por ejemplo, en HTML una imagen podría usarse así

```html
<img src="/image" alt="imagen" />
```

Pero en React debe cerrarse ese tag, de esta manera

```html
<img src="/image" alt="imagen" />
```

### Atributos de un elemento

Los atributos en React no pueden contener caracteres especiales, por lo que algunos serán diferentes a los de HTML.

Un cambio importante en React es el del atributo clase, el cual cambia de `class` a `className`.

HTML:

```html
<div class="clase"></div>
```

React:

```html
<div className="clase"></div>
```

## Componentes

Los componentes de React pueden ser escritos como clases o como funciones.

Un componente funcional de React se expresa de la siguiente manera

```javascript
function App() {
    return <div>Hello world!</div>;
}
```

Los componentes de React deben empezar con una letra mayúscula obligatoriamente y devolver código JSX (HTML de React)

### Fragmentos de React

Los componentes de React deben devolver un único elemento. Por ejemplo, esto no es válido.

```javascript
function App() {
  return (
     <div>Hello world!</div>
     <div>Hello world!</div>
  );
}
```

Si se quiere devolver más de un elemento sin encerrarlo en otro, como un div, se debe usar un Fragmento, el cual puede expresarse de 2 maneras.

```javascript
function App() {
    return (
        <>
            <div>Hello world!</div>
            <div>Hello world!</div>
        </>
    );
}
```

```javascript
function App() {
    return (
        <React.Fragment>
            <div>Hello world!</div>
            <div>Hello world!</div>
        </React.Fragment>
    );
}
```

## Propiedades

Al crear componentes en React, podemos añadirle propiedades. Estas se reciben como un objeto llamado `props` que contiene todos los atributos pasados al componente.

```javascript
function App() {
    return <User nombre="John Doe" edad={30} />;
}

function User(props) {
    return <h1>Hola, {props.nombre}. Tenés {props.edad} años.</h1>;
}
```

Hay algunas propiedades que se pasan por defecto, como `children`, la cual contiene los elementos que pusiste adentro del componente.

```javascript
function App() {
    return (
        <Tarjeta>
            <h1>Hola, John Doe</h1>
        </Tarjeta>
    );
}

function Tarjeta(props) {
    return <div className="tarjeta">{props.children}</div>;
}
```

### Destructuring de props

Es una práctica muy común desestructurar las props directamente en el parámetro de la función, lo que hace el código más limpio y legible.

```javascript
// Sin destructuring
function User(props) {
    return <h1>Hola, {props.nombre}. Tenés {props.edad} años.</h1>;
}

// Con destructuring (forma recomendada)
function User({ nombre, edad }) {
    return <h1>Hola, {nombre}. Tenés {edad} años.</h1>;
}

// Con valor por defecto
function User({ nombre, edad = 18 }) {
    return <h1>Hola, {nombre}. Tenés {edad} años.</h1>;
}
```

## Eventos

En React, los eventos se manejan con atributos similares a los de HTML pero escritos en camelCase y pasando una función (no una cadena de texto).

### onClick

Se dispara cuando el usuario hace clic en un elemento.

```javascript
function App() {
    const handleClick = () => {
        console.log("¡Botón clickeado!");
    };

    return <button onClick={handleClick}>Hacer clic</button>;
}
```

Si necesitás pasar argumentos a la función, usá una arrow function:

```javascript
function App() {
    const saludar = (nombre) => {
        console.log(`Hola, ${nombre}!`);
    };

    return <button onClick={() => saludar("Juan")}>Saludar</button>;
}
```

### onChange

Se dispara cada vez que el valor de un input cambia. Recibe el evento `e` del cual se puede extraer `e.target.value`.

```javascript
function App() {
    const handleChange = (e) => {
        console.log("Valor actual:", e.target.value);
    };

    return <input type="text" onChange={handleChange} />;
}
```

### onSubmit

Se dispara cuando se envía un formulario. Es importante llamar a `e.preventDefault()` para evitar que la página se recargue.

```javascript
function App() {
    const handleSubmit = (e) => {
        e.preventDefault(); // evita la recarga de la página
        console.log("Formulario enviado");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" />
            <button type="submit">Enviar</button>
        </form>
    );
}
```

## Formularios controlados

Un formulario controlado es aquel en el que el valor de los inputs está ligado a un estado de React. Esto permite tener control total sobre los datos del formulario en todo momento.

```javascript
import { useState } from "react";

function FormularioLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
            />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}
```

## Condicionales

Los condicionales en React se pueden hacer de 2 maneras, con operadores ternarios o con if.

### Operadores ternarios

Los operadores ternarios se pueden usar para mostrar un componente si se cumple una condición.

Por ejemplo, si quiero mostrar un componente si el usuario está logueado, puedo usar un operador ternario de la siguiente manera

```javascript
function App() {
    const isLogged = true;
    return <div>{isLogged ? <User /> : <Login />}</div>;
}
```

### If

Los condicionales if se pueden usar para mostrar un componente si se cumple una condición.

Por ejemplo, si quiero mostrar un componente si el usuario está logueado, puedo usar un if de la siguiente manera

```javascript
function App() {
    const isLogged = true;

    if (isLogged) {
        return <User />;
    } else {
        return <Login />;
    }
}
```

## Listas

Para renderizar una lista desde un array, se usa el método `map`. Cada elemento renderizado **debe tener una prop `key` única**, que ayuda a React a identificar qué elementos cambiaron, se agregaron o eliminaron.

```javascript
function App() {
    const users = [
        { id: 1, nombre: "John Doe" },
        { id: 2, nombre: "Jane Doe" },
        { id: 3, nombre: "Jack Doe" },
    ];

    return (
        <div>
            {users.map((user) => (
                <User key={user.id} nombre={user.nombre} />
            ))}
        </div>
    );
}
```

> ⚠️ Evitá usar el índice del array como `key` si la lista puede reordenarse o filtrarse. Usá siempre un identificador único como un `id`.

## Hooks

Los hooks son funciones que nos permiten usar características de React sin tener que crear un componente. Acá hay una lista de los hooks mas conocidos.

### useState

El hook useState nos permite crear variables de estado, las cuales se pueden modificar y React se encargará de actualizar el componente.

Por ejemplo, si quiero crear una variable de estado que se llame count y que empiece en 0, puedo usar el hook useState de la siguiente manera

```javascript
function App() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
        </div>
    );
}
```

### useEffect

`useEffect` permite ejecutar código como efecto secundario (side effect) del renderizado. Recibe dos argumentos: una función y un **array de dependencias** que controla cuándo se ejecuta.

```javascript
useEffect(() => {
    // código a ejecutar
}, [dependencias]);
```

**Sin array de dependencias** → se ejecuta en cada renderizado:

```javascript
useEffect(() => {
    console.log("Se ejecuta en cada render");
});
```

**Con array vacío `[]`** → se ejecuta solo una vez, al montar el componente:

```javascript
useEffect(() => {
    console.log("Se ejecuta solo al montar el componente");
}, []);
```

**Con dependencias** → se ejecuta cada vez que cambia alguna de las variables listadas:

```javascript
function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("count cambió a:", count);
    }, [count]); // solo se ejecuta cuando cambia count

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
        </div>
    );
}
```

**Función de limpieza (cleanup)** → se ejecuta antes de que el efecto se vuelva a correr o cuando el componente se desmonta:

```javascript
useEffect(() => {
    const intervalo = setInterval(() => {
        console.log("tick");
    }, 1000);

    return () => clearInterval(intervalo); // limpieza
}, []);
```

### useContext

El hook useContext nos permite usar el contexto de un componente padre en un componente hijo.

Por ejemplo, si quiero usar el contexto de un componente padre en un componente hijo, puedo usar el hook useContext de la siguiente manera

```javascript
const UserContext = React.createContext();

function App() {
    return (
        <UserContext.Provider value="John Doe">
            <User />
        </UserContext.Provider>
    );
}

function User() {
    const user = useContext(UserContext);
    return <h1>Hola, {user}</h1>;
}
```

### useRef

El hook useRef nos permite crear una referencia a un elemento del DOM.

Por ejemplo, si quiero crear una referencia a un elemento del DOM, puedo usar el hook useRef de la siguiente manera

```javascript
function App() {
    const inputRef = useRef(null);
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>Focus</button>
        </div>
    );
}
```

### useMemo

El hook useMemo nos permite crear una variable que se actualiza solo cuando una variable de estado cambia.

Por ejemplo, si quiero crear una variable que se actualiza solo cuando el contador cambia, puedo usar el hook useMemo de la siguiente manera

```javascript
function App() {
    const [count, setCount] = useState(0);
    const countDoble = useMemo(() => {
        return count * 2;
    }, [count]);
    return (
        <div>
            <p>Count: {count}</p>
            <p>Count doble: {countDoble}</p>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
        </div>
    );
}
```

### useCallback

El hook useCallback nos permite crear una función que se actualiza solo cuando una variable de estado cambia.

Por ejemplo, si quiero crear una función que se actualiza solo cuando el contador cambia, puedo usar el hook useCallback de la siguiente manera

```javascript
function App() {
    const [count, setCount] = useState(0);
    const incrementar = useCallback(() => {
        setCount(count + 1);
    }, [count]);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={incrementar}>Incrementar</button>
        </div>
    );
}
```

### Custom hooks

Un custom hook es una función que empieza con `use` y que encapsula lógica reutilizable usando otros hooks. Permiten extraer lógica de los componentes y compartirla.

Por ejemplo, un hook para manejar el valor de un input:

```javascript
// useInput.js
import { useState } from "react";

function useInput(valorInicial = "") {
    const [valor, setValor] = useState(valorInicial);

    const handleChange = (e) => setValor(e.target.value);

    const reset = () => setValor(valorInicial);

    return { valor, handleChange, reset };
}

export default useInput;
```

```javascript
// App.jsx
import useInput from "./useInput";

function App() {
    const nombre = useInput("");
    const email = useInput("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nombre.valor, email.valor);
        nombre.reset();
        email.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={nombre.valor} onChange={nombre.handleChange} placeholder="Nombre" />
            <input value={email.valor} onChange={email.handleChange} placeholder="Email" />
            <button type="submit">Enviar</button>
        </form>
    );
}
```

## Fetch con useEffect

Uno de los usos más comunes de `useEffect` es hacer una petición a una API cuando el componente se monta. El patrón estándar es: estado para los datos, estado para el loading, y estado para el error.

```javascript
import { useState, useEffect } from "react";

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");

                if (!response.ok) {
                    throw new Error("Error al obtener los usuarios");
                }

                const datos = await response.json();
                setUsuarios(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []); // [] = solo se ejecuta al montar el componente

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {usuarios.map((u) => (
                <li key={u.id}>{u.name}</li>
            ))}
        </ul>
    );
}
```
