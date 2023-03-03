---
title: "NEXT.JS V12"
image: "/assets/images/nextjs.jpg"
---


## Indice:
- [Inicializar el proyecto](#inicializar-eL-proyecto)
- [Rutas](#rutas)
    - [Sub Rutas](#sub-rutas)
    - [Rutas Indice(index routes)](#rutas-indice)
    - [Rutas Dinamicas(dynamic routes)](#rutas-dinamicas)
- [Next/Link](#next-link)
- [Rutas en el Frontend](#rutas-del-frontend)
- [SSR vs SSG](#ssr-vs-ssg)
    - [SSG sin data](#ssg-sin-data)
    - [getStaticProps](#getstaticprops)
    - [SSR(server side rendering)](#ssr)
    - [ISR(Incremental Static Regeneration)](#isr)
- [Fetch de datos en el cliente](#fetch-de-datos-en-el-cliente)
- [Rutas del backend](#rutas-del-backend)
    - [Ruta simple](#ruta-simple)
    - [Tipos de requests](#tipos-de-requests)
    - [Tipos de respuestas](#tipos-de-respuestas)
    - [Dandole un codigo de status a una respuesta](#dandole-un-codigo-de-status-a-una-respuesta)
    - [Asegurando Tipos en el backend](#asegurando-tipos-en-el-backend)
- [Self-Hosting ISR](#self-hosting-isr)
- [Deploy](#deploy)
    - [Vercel](#vercel)

## INICIALIZAR EL PROYECTO

Podes crear un nuevo proyecto usando:

```bash
npx create-next-app@latest
# o
yarn create next-app
# o
pnpm create next-app
```

esto te va a crear una plantilla comun y corriente de Next.js, si queres usar typescript debes agergar --typescript luego del create-next-app y eso se veria algo asi:

```bash
npx create-next-appp@latest --typescript
# o
yarn create next-app --typescript
# o
pnpm create next-app 
```

podes ver que aparte de npm/npx estamos usando yarn o pnpm que son package managers mas nuevos que suelen tener un mejor rendimiento 

[docs originales](https://nextjs.org/docs/getting-started)

# Rutas

Next.js usa un sistema de archivos como rutas que significa que cualquier archivo dentro del directorio pages se considerara una ruta nueva.

## Sub Rutas

Para crear sub rutas como `/blog/post/123` debes crear un archivo dentro de una carpeta con el nombre que quieras para la sub ruta. Por ejemplo: si creas una carpeta blog con una carpeta post adentro y luego un archivo llamado `123.js` la ruta anterior funcionara.

[docs originales](https://nextjs.org/docs/api-routes/introduction)

## Rutas indice

El servidor automaticamente convierte cualquier archivo index.js a su indice. Osea si vos tenes `/blog/index.js` eso seria equivalente a `/blog` en el buscador.

[docs originales](https://nextjs.org/docs/routing/introduction#index-routes)

## Rutas Dinamicas

Las rutas dinamicas en Next.js se hacen poniendo el nombre del archivo entre `[]`. Por ejemplo: `/blog/post/[id].js` esto va a crear una ruta dinamica despues de `/post`. Para aceder a la info ingresada a la ruta dinamica podes usar el parametro dentro de `getInitialProps(ctx)/getServerSideProps(ctx)`. Tambien podes usar el `useRouter()` hook. Si se ingresa a /blog/post/123 este codigo pondria en display Post: 123.

```js
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { id } = router.query
  // se usa id porque ese es el nombre de la ruta dinamica([id].js).

  return <p>Post: {id}</p>
}

export default Post
```

Esto tambien se puede usar para destructurar queries ingresadas en la URL por ejemplo si se ingresa a /blog/post/123?foo=bar `router.query` va a ser igual a:
```json
{"foo": "bar", "id": "123"}
```

en el caso de que tus rutas necesiten mas de una ruta dinamica podes tener rutas dinamicas con rutas dinamicas poniendole `[]` a el nombre de la carpeta. Por ejemplo /blog/[postName]/[id].js. El hook useRouter devolvera algo asi:

```json
{"postName": "...", "id": "..."}
```
[docs originales](https://nextjs.org/docs/routing/dynamic-routes)

# Next Link

next/link esta bueno de usar ya que precarga tus paginas a las que linkeas mejorando el rendimiento cuando el usuario apreta cualquier link. Un ejemplo del next/link en uso seria:

```js
import Link from "next/link"

function Home() {
    return(
        <ul>
              <li>
        <Link href="/">Home</Link>
      </li>
            <li>
        <Link href="/">Home</Link>
      </li>
            <li>
        <Link href="/">Home</Link>
      </li>
        </ul>
    )
}
```
[docs orignales](https://nextjs.org/docs/routing/introduction#linking-between-pages)

## Rutas del frontend

Para crear una nueva ruta en el frontend lo unico que debes crear es un nuevo archivo .jsx, .tsx, .js, o .ts si estas usando typescript en la carpeta /pages y mientras que no este dentro de la carpeta /pages/api ese archivo ahora va a ser una ruta del frontend.

 por ejemplo si creas un archivo en /pages/juan.jsx que exporta un codigo asi: 

```js
export default function Juan() {
    return(
        <h1>JUAN</h1>
    )
}
```
[docs originales](https://nextjs.org/docs/basic-features/pages)


# SSR vs SSG

Cuales son las principales diferencias entre SSG y SSR y para que sirven?

SSG genera el HTML cuando buildeas el proyecto y luego renderea ese HTML "compilado". Esto puede llegar a ser util para cosas como blogs en las que el SEO es importante y rendimiento es importante y el contenido no cambia demasiado.

SSR encambio genera una pagina de HTML nueva por cada request que recibe la pagina. Esto seria util para algo como una pagina como twitch en la que los streams activos cambian constantemente

[docs originales](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)


## SSG sin data

Por default next.js elige SSG como metodo de rendereo eso sea si tu pagina hace algun requesta a una pagina externa o no.

En el caso de querer usar SSG y importar data de algo como una API ver [getStaticProps](#getstaticprops)

[docs originales](https://nextjs.org/docs/basic-features/pages#static-generation-without-data)

### GetStaticProps

GetStaticProps es un metodo de hacer request desde el servidor antes de que cargue la pagina si siempre es igual la data que va a recibir o si no cambia seguido. Esto se suele usar con SSG ya que como indica el nombre GetStaticProps no va a cambiar el resultado de esta funcion amenos que se haga un build nuevo. 

Esta funcion se puede usar en cualquier pagina que sea del frontend de esta manera:

```javascript
export default function Blog({ posts }) {
// Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
// Call an external API endpoint to get posts
const res = await fetch('https://.../posts')
const posts = await res.json()

// By returning { props: { posts } }, the Blog component
// will receive `posts` as a prop at build time
return {
    props: {
        posts,
        },
    }
}
```
[docs originales](https://nextjs.org/docs/basic-features/pages#scenario-1-your-page-content-depends-on-external-data)


## SSR

Como vimos anteriormente SSR genera el HTML para cada pagina apenas recibe el request. Lo que tiene de bueno esto es que el HTML que devuelve la pagina se sigue generando en el servidor que nos da la posibilidad de hacer SEO con esto



## GetServerSideProps

La funcion mas conocida de SSR es getServerSideProps en la que se puede hacer un request a un servidor externo antes de que cargue la pagina. GetServerSideProps es similar a getStaticProps la unica diferencia siendo que getServerSideProps se corre en cada request y getStaticProps se corre unicamente una ves en el build y luego nunca mas. Un Ejemplo de getServerSideProps en accion es:


```js
export async funcion getServerSideProps(ctx){
// como pueden ver la funcion recibe un parametro, en este caso ctx
// ctx va a tener info del request que luego podemos usar por ejemplo si es una ruta dinamica
// el ctx nos va a dejar agarrar la parte que esta cambiando y usarla para lo que necesitemos

const res = await fetch(`https://.../data/${ctx.query.id}`)
// aqui usamos ctx.query.id porque estamos asumiendo que la ruta dinamica es */[id].js
const data = await res.json()

return { props: { data } }

}
```

[docs originales](https://nextjs.org/docs/basic-features/pages#server-side-rendering)


## ISR

Que es ISR? ISR es corto para incremental static regeneration y nos permite darle un "tiempo de expiracion" a las paginas que usan cosas como getStaticProps para que puedan actualizar la data que esta ahi ya que sabemos que getStaticPaths  solo se corre cuando se buildea y luego nunca mas. Para poder hacer que la funcion getStaticProps se revalide cada X tiempo debes hacerlo asi:


``` js
export async function getStaticProps(){
const res = await fetch('https://.../posts')
const posts = await res.json()

return {
    props: {
        posts,
    },
    revalidate: X, // osea se va a revalidar cada X segundos
    // 
    esto causa que se revaliden los datos de toda la pagina cada como maximo X segundos.
  }
}
```

[docs originales](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

# Fetch de datos en el cliente

Para fetchear datos del cliente similar a como se suele hacer en react debes hacerlo dentro de un useEffect de la siguiente manera:


```js
import { useState, useEffect } from 'react'

function Page() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return Loading...
  if (!data) return No profile data

  return (
    <div>
      <h1>{data.name}</h1>
      {data.bio}
    </div>
  )
}
```
[docs originales](https://nextjs.org/docs/basic-features/data-fetching/client-side#client-side-data-fetching-with-useeffect)

# Rutas del backend

Next.js es un lenguaje full stack entonces eso signfica que muchas de las cosas que normalmente hacemos con node.js  se puden hacer en las rutas /api de una manera serverless.

si usas `next export` estas rutas no se exportaran, `next export` es solo para el frontend aka cliente.

[docs originales](https://nextjs.org/docs/api-routes/introduction)

## Ruta simple

para crear una ruta del backend en next.js comun y corriente lo unico que debes hacer es crear un archivo en /pages/api/. Por ejemplo:

```js
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
```

esta ruta va devolver un objeto de JSON cuando se le haga un request, sea GET, POST, PUT, DELETE o el que sea.

[docs originales](https://nextjs.org/docs/api-routes/introduction)

## Tipos de requests

Para poder separar por tipos de requests, osea GET, POST PUT, DELETE y mas debes usar un if por ejemplo:

```js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Procesar el request POST
  } else {
    // Procesar cualquier otro tipo de request
  }
}
```
[docs originales](https://nextjs.org/docs/api-routes/introduction)

## Tipos de respuestas

res como en express.js tiene muchas posibles respuestas algunas son:

- `res.status(codigo)` - es una funcion que devuelve un estado, por ejemplo el codigo 200 que dice que esta todo bien o el 404 que dice que no se encontro la pagina.
- `res.json(JSON)` - es una funcion que devuelve `JSON`
- `res.send(body)` - es una funcion que puede devolver `strings`, `JSON`, o un `Buffer`.
- `res.redirect([status], ruta)` - es una funcion que redirecciona al usuario como dice el nombre. 

[docs originales](https://nextjs.org/docs/api-routes/response-helpers)

## Dandole un codigo de status a una respuesta

esto es util para debugear luego en el frontend ya que muchas veces es mas facil fijarse si la respuesta fue un 200, 300, 201 o algun otro tipo de respuesta en ves de fijarse el JSON.

esto se puede hacer de tal manera:
```js
export default function handler() {
  res.status(200).json({nombre:"DAN"})
}
```
[docs originales](https://nextjs.org/docs/api-routes/response-helpers#setting-the-status-code-of-a-response)

### Asegurando tipos en el backend

para mejor seguridad de tipos no es recomendado extender los objetos req/res en ves usa funcines para trabajar con ellos.

`utils/cookies.ts`
```js
// utils/cookies.ts

import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}
```
`pages/api/cookies.ts`
```js
// pages/api/cookies.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Llamando nuestra funcion pura usando los objetos `res` va a crear el encabezado `set-cookie`.
  // Agregar el encabezado `set-cookie` en el dominio principal y va a expirar despues de 30 dias.
  setCookie(res, 'Next.js', 'api-middleware!', { path: '/', maxAge: 2592000 })
  // devolver el encabezado `set-cookie` para que podamos verlo en el buscador
  res.end(res.getHeader('Set-Cookie'))
}

export default handler
```

Un paquete que tambien puede ayudar mucho con seguridad de tipos y legibilidad de codigo es [tRPC](https://trpc.io/).

[docs originales](https://nextjs.org/docs/api-routes/request-helpers#extending-the-reqres-objects-with-typescript)

# Self-Hosting ISR

Self-Hosting lo unico que significa es que no lo haces en vercel en este caso donde todo te es mas facil. Para hostear en cualquier otro lugar que no sea vercel debes subir la carpeta .next que es el build y ya estas listo.

[docs originales](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#self-hosting-isr)

# Deploy

Podes usar `next build` para generar una version optimizada de tu aplicacion para produccion. Esta version suele consistir de:

- HTML para las paginas que usan `getStaticProps` o Optimizacion Automatica Estatica
- CSS estilos globales o estilos para componentes en especificos 
- JS para pre-renderizar contenido dinamico del servidor de Next.js
- JS para interactividad en el cliente por React.js

la salida estara en la carpeta `.next`

- `.next/static/chunks/pages` - Cada archivo de JS en esta carpeta se relaciona con una pagina con ese mismo nombre. Por ejemplo si tenes `.next/static/chunks/pages/about.js` ese archivo seria el que se carga cuando entras a /about.
- `.next/static/media` - Las imagenes importadas estaticamente usando `next/image` son hasheadas y copeadas aqui.
- `.next/static/css` - CSS global/especifico para todas las pagina de la app.
- `.next/server/pages` - Todo lo prerendereado del servidor se guarda aca con la extension `.nft.json` y estos archivos muestran todos los caminos que dependen de cierta pagina.
- `.next/cache` - El cache de build, imagenes, respuestas y paginas de Next.js. Esto ayuda al rendimiento de la pagina y de los builds.

[docs originales](https://nextjs.org/docs/deployment)

## Vercel
Si usas vercel podes subir tu codig a GitHub y luego importarlo directamente desde vercel donde ellos se ocupan de los builds y lo demas.

