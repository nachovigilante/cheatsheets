---
title: SoqueTIC
image: "/assets/images/soquetic.svg"
---

(Actualizado para SoqueTIC 1.0.4)

## Índice
- [Índice](#índice)
- [¿Qué es?](#qué-es)
- [En Frontend](#en-frontend)
  - [Instalación](#instalación)
  - [Uso](#uso)
    - [fetchData](#fetchdata)
    - [postData](#postdata)
    - [receive](#receive)
    - [send](#send)
- [En Backend](#en-backend)
  - [Instalación](#instalación-1)
  - [Uso](#uso-1)
    - [onEvent](#onevent)
    - [sendEvent](#sendevent)
    - [startServer](#startserver)
- [DEMOS](#demos)

## ¿Qué es?

¡Hola soquete! SoqueTIC es una herramienta desarrollada por el equipo de ORT TIC Belgrano para facilitar la comunicación frontend <> backend en proyectos desarrollados con HTML, CSS, JS y Node JS. 

La idea es simplificar los proyectos y la enseñanza de programación en el primer año de la orientación, ocultando conceptos de comunicación por internet que no son tan relevantes para estos primeros pasos en el mundo de software y corresponden a enseñanzas posteriores. Sin embargo, por las herramientas que se utilizan ese año, no se puede dejar afuera este tipo de comunicación si se quiere habilitar proyectos medianamente ambiciosos. Por eso "disfrazamos" la comunicación por internet con esta herramienta.

SoqueTIC entonces no es más que un envoltorio de la librería [SocketIO](https://socket.io/), adaptándola a una sintaxis más funcional, similar a conceptos vistos en clase. Se pierde un poco del potencial de SocketIO, pero se dejo lo mínimo indispensable para desarrollar proyecto de 3ero.

## En Frontend

SoqueTIC comunica frontend y backend. Esta sección se dedica a mostrar esta herramienta desde el lado de un frontend hecho con HTML, CSS y JS para ser corrido por algún browser (Chrome, Firefox, etc.)
### Instalación

Para usar a SoqueTIC en un archivo HTML, se debe hacer lo siguiente:

1) Importar el script de SocketIO. Esto se puede hacer con el siguiente tag:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.4/socket.io.js"></script>
```
2) Descargar el archivo `socket.js`. Esto se puede hacer sacándolo de cualquiera de las demos o descargarlo de <a href="/download/socket.js" download>acá</a>. Linkearlo en el HTML con un tag `<script>` debajo del tag anterior.
   
3) Linkear el archivo en el que van a usar SoqueTIC debajo de estos dos `<script>`.

**IMPORTANTE:** Para poder ejecutar SoqueTIC no alcanza con abrir el HTML en el browser: hay que armar un live server. La forma más común de hacer esto es usando la [extensión de VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
### Uso

Para comunicarse con el backend, se pueden usar las funciones descritas a continuación. Obviamente, si el backend no está encendido y ejecutándose, nada va a andar.
#### fetchData

Esta función está pensada para hacer pedidos al backend pero no es necesario mandarle nada para que pueda responder al pedido. Esta recibe 2 parámeteros:
- `type` con el que se pueden distinguir distintos eventos. Debe coincidir con alguna función del backend.
- `callback` **función** a ser llamada cuando el servidor responda con la información deseada. Esta debe tomar un único parámetro, `data`, que sería la información a recibir. Lo que recibe es lo que sea que la función a la que respondió a este evento en el backend haya retornado.

#### postData

Esta función esta pensada para mandarle información al backend o para hacerle pedidos que impliquen mandarle información. Esta recibe 3 parámeteros (1 opcional):
- `type` con el que se pueden distinguir distintos eventos. Debe coincidir con alguna función del backend.
- `data` es la información a ser enviada al servidor. Es un único parámetro, si se quiere mandar un conjunto de datos usar una estructura de datos que modele conjuntos, como listas u objetos.
- `callback` (opcional, puede quedar vacío) **función** a ser llamada cuando el servidor responda con la información deseada. Esta debe tomar un único parámetro, `data`, que sería la información que recibe del servidor. Lo que recibe es lo que sea que la función a la que respondió a este evento en el backend haya retornado.

#### receive

**Reservada para eventos en tiempo real**, es decir, para cuando el proyecto cuenta con actualizaciones periódicas del backend. Esta función está para procesar eventos iniciados desde el backend, y toma dos parámetros:
- `type` con el que se pueden distinguir distintos eventos. Debe coincidir con alguna función del backend.
- `callback` **función** a ser llamada cuando el servidor envía un evento al front. Esta debe tomar un único parámetro, `data`, que sería la información a recibir. Lo que recibe es lo que sea que la función que emitió el evento en el backend haya enviado.

#### send

**DEPRECADA** al ser redundante con postData. Queda *legacy* para algunos proyectos en versiones previas de SoqueTIC.

## En Backend
### Instalación
### Uso
#### onEvent
#### sendEvent
#### startServer

## DEMOS

Muchas veces no hay nada mejor ver un ejemplo para entender mejor. A continuación una serie de proyectos de prueba hechos por el equipo docente usando SoqueTIC.
- [Demo Básica](https://github.com/nachovigilante/Demo-SoqueTIC): Envío de mensajes de frontend a backend
- [Demo Arduino](https://github.com/JZylber/Demo-Arduino): Envío de mensajes entre frontend, backend y arduino
- [Fixture](https://github.com/JZylber/Fixture): Ejemplo más complejo de frontend y backend con lectura y escritura de json.

