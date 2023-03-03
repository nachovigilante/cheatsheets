---
title: "NEXT.JS V12"
image: "/assets/images/nextjs.jpg"
---


## Indice:
- [Inicializar el proyecto](#inicializar-eL-proyecto)
- [Rutas](#rutas)
    - [Rutas en el Frontend](#rutas-del-frontend)
        - [Rutas Dynamicas](#rutas-dynamicas)
    - [SSR vs SSG](#ssr-vs-ssg)

## INICIALIZAR EL PROYECTO

<p>Podes crear un nuevo proyecto usando:</p>

```bash
npx create-next-app@latest
# o
yarn create next-app
# o
pnpm create next-app
```

<p>esto te va a crear una plantilla comun y corriente de Next.js, si queres usar typescript debes agergar --typescript luego del create-next-app y eso se veria algo asi:</p>

```bash
npx create-next-appp@latest --typescript
# o
yarn create next-app --typescript
# o
pnpm create next-app 
```

<p>podes ver que aparte de npm/npx estamos usando yarn o pnpm que son package managers mas nuevos que suelen tener un mejor rendimiento</p> 

[docs originales](https://nextjs.org/docs/getting-started)

## Rutas

### Rutas del frontend

<p>Para crear una nueva ruta en el frontend lo unico que debes crear es un nuevo archivo .jsx, .tsx, .js, o .ts si estas usando typescript en la carpeta /pages y mientras que no este dentro de la carpeta /pages/api ese archivo ahora va a ser una ruta del frontend.</p>

<p> por ejemplo si creas un archivo en /pages/juan.jsx que exporta un codigo asi: </p>

```javascript
export default function Juan() {
return(
<h1>JUAN</h1>
)
}
```
[docs originales](https://nextjs.org/docs/basic-features/pages)

### Rutas Dynamicas

<p>Para crear rutas dynamicas por ejemplo en node.js /auth/login/:id tenes que crear un archivo y que el nombre del archivo este dentro de "[]" por ejemp lo /auth/login/[id].js</p>

[docs originales](https://nextjs.org/docs/basic-features/pages#pages-with-dynamic-routes)

### SSR vs SSG

<p>Cuales son las principales diferencias entre SSG y SSR y para que sirven?<p>

<p>SSG genera el HTML cuando buildeas el proyecto y luego renderea ese HTML "compilado". Esto puede llegar a ser util para cosas como blogs en las que el SEO es importante y rendimiento es importante y el contenido no cambia demasiado.</p>

<p>SSR encambio genera una pagina de HTML nueva por cada request que recibe la pagina. Esto seria util para algo como una pagina como twitch en la que los streams activos cambian constantemente</p>

[docs originales](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)


### SSG sin data

<p>Por default next.js elige SSG como metodo de rendereo eso sea si tu pagina hace algun requesta a una pagina externa o no.</p>

<p>En el caso de querer usar SSG y importar data de algo como una API ver [getStaticProps](#getstaticprops)


### GetStaticProps

<p>GetStaticProps es un metodo de hacer request desde el servidor antes de que cargue la pagina si siempre es igual la data que va a recibir o si no cambia seguido. Esto se suele usar con SSG ya que como indica el nombre GetStaticProps no va a cambiar el resultado de esta funcion amenos que se haga un build nuevo. </p>

<p>Esta funcion se puede usar en cualquier pagina que sea del frontend de esta manera:</p>

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


### SSR

<p>Como vimos anteriormente SSR genera el HTML para cada pagina apenas recibe el request. Lo que tiene de bueno esto es que el HTML que devuelve la pagina se sigue generando en el servidor que nos da la posibilidad de hacer SEO con esto</p>


### GetServerSideProps

<p>La funcion mas conocida de SSR es getServerSideProps en la que se puede hacer un request a un servidor externo antes de que cargue la pagina. GetServerSideProps es similar a getStaticProps la unica diferencia siendo que getServerSideProps se corre en cada request y getStaticProps se corre unicamente una ves en el build y luego nunca mas. Un Ejemplo de getServerSideProps en accion es:</p>


```js
export async funcion getServerSideProps(ctx){
// como pueden ver la funcion recibe un parametro, en este caso ctx
// ctx va a tener info del request que luego podemos usar por ejemplo si es una ruta dynamica
// el ctx nos va a dejar agarrar la parte que esta cambiando y usarla para lo que necesitemos

const res = await fetch(`https://.../data/${ctx.query.id}`
// aqui usamos ctx.query.id porque estamos asumiendo que la ruta dynamica es */[id].js
const data = await res.json()

return { props: { data } }

}
```

[docs originales](https://nextjs.org/docs/basic-features/pages#server-side-rendering)


### ISR

<p>Que es ISR? ISR es corto para incremental static regeneration y nos permite darle un "tiempo de expiracion" a las paginas que usan cosas como getStaticProps para que puedan actualizar la data que esta ahi ya que sabemos que getStaticPaths  solo se corre cuando se buildea y luego nunca mas. Para poder hacer que la funcion getStaticProps se revalide cada X tiempo debes hacerlo asi:</p>


```
export asyn fu nction getStaticProps(){
const res = await fetch('https://.../posts')
const posts = await res.json()

return {
    props: {
        posts,
    },
    revalidate: X, // osea se va a revalidar cada X segundos
    // esto causa que se revaliden los datos de toda la pagina cada como maximo X segundos.
}
```

[docs originales](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

### Self-Hosting ISR

<p>Self-Hosting lo unico que significa es que no lo haces en vercel en este caso donde todo te es mas facil. Para hostear en cualquier otro lugar que no sea vercel debes subir la carpeta .next que es el build y ya estas listo.</p>


