---
title: SoqueTIC
image: "/assets/images/soquetic.svg"
---

(Actualizado para SoqueTIC v1.4.2 *Viudita Picoplata*)

## Índice
- [Índice](#índice)
- [¿Qué es?](#qué-es)
- [Inspiración e Idea](#inspiración-e-idea)
- [Eventos](#eventos)
  - [Nombres de los eventos](#nombres-de-los-eventos)
  - [Query params](#query-params)
- [En Frontend](#en-frontend)
  - [Instalación](#instalación)
  - [Uso](#uso)
    - [getEvent](#getevent)
    - [postEvent](#postevent)
    - [subscribeRealTimeEvent](#subscriberealtimeevent)
    - [connect2Server](#connect2server)
    - [Buenas prácticas](#buenas-prácticas)
- [En Backend](#en-backend)
  - [Instalación](#instalación-1)
  - [Uso](#uso-1)
    - [subscribeGETEvent](#subscribegetevent)
    - [subscribePOSTEvent](#subscribepostevent)
    - [realTimeEvent](#realtimeevent)
    - [startServer](#startserver)
    - [Buenas prácticas](#buenas-prácticas-1)
- [DEMOS](#demos)
- [Usos comunes con ejemplos](#usos-comunes-con-ejemplos)
  - [Comunicación iniciada por el frontend](#comunicación-iniciada-por-el-frontend)
  - [Comunicación iniciada por el backend](#comunicación-iniciada-por-el-backend)

## ¿Qué es?

¡Hola soquete! SoqueTIC es una herramienta desarrollada por el equipo de ORT TIC Belgrano para facilitar la comunicación frontend <=> backend en proyectos desarrollados con HTML, CSS, JS y Node JS. 

La idea es simplificar los proyectos y la enseñanza de programación en el primer año de la orientación, ocultando conceptos de comunicación por internet que no son tan relevantes para estos primeros pasos en el mundo de software y corresponden a enseñanzas posteriores. Sin embargo, por las herramientas que se utilizan ese año, no se puede dejar afuera este tipo de comunicación si se quiere habilitar proyectos medianamente ambiciosos. Por eso "disfrazamos" la comunicación por internet con esta herramienta.

SoqueTIC entonces no es más que un envoltorio de la librería [SocketIO](https://socket.io/), adaptándola a una sintaxis más funcional, similar a conceptos vistos en clase. Se pierde un poco del potencial de SocketIO, pero se dejo lo mínimo indispensable para desarrollar proyecto de 3ero.

## Inspiración e Idea

Para aprender a programar, se usa HTML, CSS y JS ejecutados en el browser, lo cual nos permite rápidamente crear buenas interfaces de usuario. Sin embargo, este entorno está pensado para páginas web, es decir, que estos archivos vendrían por internet para ser ejecutados por nuestro browser. Por eso, el browser los ejecuta *"sandboxeados"*, es decir, con un acceso limitadísimo a los archivos de nuestra computadora. ¡Imaginen los virus que habría si eso fuese posible!

Por eso, a pesar qué los proyectos en 3ero sean puramente locales, necesitamos obligatoriamente la división backend/frontend para saltar esta limitación. El backend sí tiene acceso total a los recursos de la computadora, entonces necesitamos tenerlo para hacer cosas tan básicas como leer y escribir archivos. Pero la interfaz de usuario se sigue haciendo en el browser.

¿Y entonces cómo comunicamos frontend y backend? Más si no sabemos comunicación a través de internet. *Enter SoqueTIC*. SoqueTIC es quien va a realizar la comunicación entre ambos programas, tal como muestra el siguiente diagrama:

<div style="display:flex;justify-content:center"><img src="/assets/images/soquetic/soqueticDiagrama.png" alt="Diagrama SoqueTIC"></div>

Algunos puntos importantes:

- El usuario interactúa con el frontend, que es el que tiene los elementos gráficos e interactivos. **El browser no puede ni leer ni escribir archivos. Tampoco leer el puerto serial para usar arduino, o cambiar características del sistema operativo.** Si la interacción del usuario requiere estas cosas, se debe enviar un mensaje al backend para que las haga usando SoqueTIC. 
- El backend tiene acceso a todo salvo a la interfaz gráfica. Es decir, responde pedidos del frontend (que recibe input del usuario) e interactúa con archivos, periféricos y sistema operativo. Si el backend necesita actualizar algo en la interfaz gráfica para informar al usuario, necesariamente debe usar soqueTIC para realizarlo. **El DOM (document) solo existe en el frontend porque modela la página web**, no puede haber un llamado a `document` en el backend.

## Eventos

SoqueTIC utiliza un sistema de eventos para comunicar acciones entre el frontend y el backend. Los eventos son mensajes que se envían a través de la conexión de SocketIO y permiten que ambos lados reaccionen a acciones del usuario o cambios en el estado de la aplicación. En particular, SoqueTIC utiliza 3 tipos de eventos:

- **GET**: Eventos iniciados desde el frontend que no requieren enviar información al backend o requieren enviar poca información. Se utilizan para solicitar datos o realizar acciones que no necesitan parámetros adicionales.
- **POST**: Eventos iniciados desde el frontend que requieren enviar información al backend. Se utilizan para enviar datos o realizar acciones que necesitan parámetros adicionales.
- **REALTIME**: Eventos iniciados desde el backend. Se utilizan para enviar datos desde el backend al frontend sin que este los haya solicitado explícitamente. Son útiles para actualizaciones en tiempo real, como notificaciones o cambios de estado.

### Nombres de los eventos

Los eventos se identifican por un nombre único, que es un string. Este nombre debe ser el mismo tanto en el frontend como en el backend para que la comunicación funcione correctamente. Por ejemplo, si el frontend envía un evento llamado "mensaje", el backend debe tener una función que escuche ese evento con el mismo nombre.

Los nombres son independientes de los tipos de eventos, es decir, se pueden usar los mismos nombres para eventos GET, POST y REALTIME. Sin embargo, recomendamos usar nombres descriptivos y específicos para cada tipo de evento para evitar confusiones.

Los único no permitido en los nombres de eventos es el caracter `?` ya que se utiliza para los query params, explicados a continuación. El resto de los caracteres son válidos, incluyendo espacios, guiones y guiones bajos. Sin embargo, recomendamos evitar espacios y usar [camelCase](https://keepcoding.io/blog/camelcase-que-es-como-funciona-y-beneficios/).

### Query params

SoqueTIC permite enviar información adicional a los eventos GET y POST mediante query params, de la misma forma que se hace con [URLs](https://medium.com/@a.herrerapuertas/query-params-path-params-614e878957ce). Estos son parámetros adicionales que se envían junto con el evento y se pueden utilizar para proporcionar información adicional al backend.
Los query params se extraen del nombre del evento, y se separan del nombre con un `?`. Por ejemplo, si el evento es "mensaje?user=Juan&color=rojo", el backend recibirá el evento "mensaje" con los query params `user` y `color`.

## En Frontend

SoqueTIC comunica frontend y backend. Esta sección se dedica a mostrar esta herramienta desde el lado de un frontend hecho con HTML, CSS y JS para ser corrido por algún browser (Chrome, Firefox, etc.)

### Instalación

Para usar a SoqueTIC en un archivo HTML, se debe hacer lo siguiente:

1) Importar el script de SocketIO y el de SoqueTIC Esto se puede hacer con los siguientes tags:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.js"></script>
<script src="https://cdn.jsdelivr.net/gh/JZylber/SoqueTIC-Client@v1.4.2/soquetic-client.js"></script>
```
2) Linkear el archivo en el que van a usar SoqueTIC debajo de estos dos `<script>`.

**IMPORTANTE:** Para poder ejecutar SoqueTIC no alcanza con abrir el HTML en el browser: hay que armar un live server. La forma más común de hacer esto es usando la [extensión de VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

### Uso

Para comunicarse con el backend, se pueden usar las funciones descritas a continuación. Obviamente, si el backend no está encendido y ejecutándose, nada va a andar.

#### getEvent

Esta función está pensada para hacer pedidos al backend donde no es necesario mandarle nada para que pueda responder al pedido, o se debe enviarle muy poquita información. Esta recibe 2 parámeteros:

- `type` con el que se pueden distinguir distintos eventos. Debe coincidir con algún evento del backend. Se le pueden adicionar [query params](#query-params) para enviar información adicional al backend.
- `callback` **función** a ser llamada cuando el servidor responda con la información deseada. Esta debe tomar un único parámetro, `data`, que sería la información a recibir. Lo que recibe es lo que sea que la función a la que respondió a este evento en el backend haya retornado.

#### postEvent

Esta función esta pensada para mandarle información al backend o para hacerle pedidos que impliquen mandarle información. Esta recibe 3 parámeteros (1 opcional):

- `type` con el que se pueden distinguir distintos eventos. Debe coincidir con alguna función del backend. Se le pueden adicionar [query params](#query-params) para enviar información adicional al backend, aunque no tiene mucho sentido si ya van a enviar el parámetro `data`.
- `data` es la información a ser enviada al servidor. Es un único parámetro, si se quiere mandar un conjunto de datos usar una estructura de datos que modele conjuntos, como listas u objetos.
- `callback` (opcional, puede quedar vacío) **función** a ser llamada cuando el servidor responda con la información deseada. Esta debe tomar un único parámetro, `data`, que sería la información que recibe del servidor. Lo que recibe es lo que sea que la función a la que respondió a este evento en el backend haya retornado.

#### subscribeRealTimeEvent

**Reservada para eventos en tiempo real**, es decir, para cuando el proyecto cuenta con actualizaciones periódicas del backend. Esta función está para procesar eventos iniciados desde el backend, y toma dos parámetros:

- `type` con el que se pueden distinguir distintos eventos. Debe coincidir con alguna función del backend.
- `callback` **función** a ser llamada cuando el servidor envía dicho evento al frontend. Esta debe tomar un único parámetro, `data`, que sería la información a recibir. Lo que recibe es lo que sea que la función que emitió el evento en el backend haya enviado.

#### connect2Server

Función necesaria para iniciar la conexión al servidor. Solo puede conectarse a servidores locales. Toma un parámetro **opcional** `PORT`, que en caso de no especificarse toma el valor 3000. Pasarle el puerto si es que el servidor está corriendo en un puerto distinto a 3000.

**IMPORTANTE:** Se debe llamar a `connect2Server` en cada archivo que utilice SoqueTIC para comunicarse con el backend.

#### Buenas prácticas

En general, cuando se tiene que buscar información al backend, se usa la función [`getEvent`](#getevent) y si se necesita hacer alguna especificación adicional se pueden usar los [query params](#query-params). Si se necesita enviar un volumen mayor de información al backend, ya sea para una búsqueda compleja o para escribir archivos, se usa la función [`postEvent`](#postevent). Si se quiere recibir información del backend sin que este lo haya pedido, se usa la función [`subscribeRealTimeEvent`](#subscriberealtimeevent).

## En Backend

SoqueTIC comunica frontend y backend. Esta sección se dedica a mostrar esta herramienta desde el lado de un backend hecho con Node JS.

### Instalación

SoqueTIC está publicado en npm, por lo tanto, para instalarlo alcanza con correr el siguiente comando dentro del proyecto:
```bash
npm i soquetic
```
Luego se deben importar las funciones correspondientes en cada archivo js que las use. Por ejemplo, para importar todas las funciones, se puede hacer
```javascript
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
```
### Uso

Para comunicarse y recibir eventos del frontend, se pueden usar las funciones descritas a continuación.

#### subscribeGETEvent

Función para escuchar eventos **GET** emitidos desde el frontend. Toma 2 parámetros.

- `type` es un string que se utiliza para identificar el evento a responder. Debe coincidir con el llamado del frontend.
- `callback` es la **función** a ser llamada cuando llegue dicho evento. Puede tomar un parámetro que representa la información enviada por query params, pero en general no toma ninguno. El retorno de esta función es lo que será enviado al frontend.

#### subscribePOSTEvent

Función para escuchar eventos **POST** emitidos desde el frontend. Toma 2 parámetros.

- `type` es un string que se utiliza para identificar el evento a responder. Debe coincidir con el llamado del frontend.
- `callback` es la **función** a ser llamada cuando llegue dicho evento. Tiene que tomar al menos un parámetro, `data`, en donde llega la información necesaria para responder al evento. Puede opcionalmente tomar un segundo parámetro que tiene los query params. El retorno de esta función es lo que será enviado al frontend.

#### realTimeEvent

**Esta función se usa para eventos de tiempo real.** Esto es ya que envía eventos al frontend sin que necesariamente los pida. Toma 2 parámetros:

- `type` con el que se pueden distinguir distintos eventos. El frontend debe tener un `subscribeRealTimeEvent` con el mismo tipo.
- `data` es la información a ser enviada al frontend. Es un único parámetro, si se quiere mandar un conjunto de datos usar una estructura de datos que modele conjuntos, como listas u objetos.

#### startServer

Sirve para inicializar el backend y colgarse escuchando eventos. Esta función se debe usar en el archivo principal a correr para levantar el servidor. Es decir, `startServer` necesariamente se debe ejecutar en el archivo siendo corrido por Node JS para que soqueTIC funcione.

Esta función toma 2 parámetros **opcionales**:

- `PORT`: número del puerto en donde el servidor va a escuchar requests. En caso de no especificar, su valor default es `3000`.
- `DEBUG`: determina si iniciar SoqueTIC en modo DEBUG o no. En caso de no especificar, su valor default es `true`. En el modo DEBUG, el servidor escribe por la consola todo lo recibido y enviado, entre otros mensajes sobre el funcionamiento de SoqueTIC.

#### Buenas prácticas

Para usar SoqueTIC hay que hacer tantos `subscribeGETEvent`/`subscribePOSTEvent` como eventos quiero saber responder, y en el archivo principal a correr con `node JS` llamar a la función `startServer`. Si hay perífericos que deban actualizar su estado al frontend, usar la función `realTimeEvent`.

## DEMOS

Muchas veces no hay nada mejor ver un ejemplo para entender mejor. A continuación una serie de proyectos de prueba hechos por el equipo docente usando SoqueTIC.

- [Demo Básica](https://github.com/nachovigilante/Demo-SoqueTIC): Envío de mensajes de frontend a backend
- [Demo Arduino](https://github.com/JZylber/Demo-Arduino): Envío de mensajes entre frontend, backend y arduino
- [Fixture](https://github.com/JZylber/Fixture): Ejemplo más complejo de frontend y backend con lectura y escritura de json.

## Usos comunes con ejemplos

A continuación exponemos y explicamos los casos de uso de SoqueTIC más comunes. Para que se entienda mejor, los exponemos con ejemplo

### Comunicación iniciada por el frontend

Como el usuario es quien realiza la mayoría de las acciones, y este interactúa con el frontend, es generalmente el frontend quien inicia la comunicación con el backend. Mostremos el caso en el que el frontend le envía cierta información al backend y hace algo con la respuesta. El siguiente diagrama modela esa situación, en donde el frontend usa la función [`postEvent`](#postevent) y el backend la función [`subscribePOSTEvent`](#subscribepostevent):

<div style="display:flex;justify-content:center"><img src="/assets/images/soquetic/postEvent.png" alt="Diagrama Hardware con SoqueTIC"></div>

La función `postEvent` envía el evento de nombre *type* con el parámetro *data* al backend. En el diagrama, type es "envio" y la data es `dataS`. `dataS` puede ser de cualquier tipo. Para enviar más de una sola cosa, usar un tipo de datos que modele conjuntos, como listas u objetos.

En el backend, hay alguien esperando el evento de este tipo: la función `subscribePOSTEvent`. En *type* tiene el mismo string que `postEvent`, en este caso `envio`. Y en callback, tiene la función que se va a encargar de procesar la data enviada por el frontend, en este caso, `f(data)`. Cuando el frontend ejecuta `postEvent` enviando datos, el backend los recibe y llama al callback con la información recibida. En este caso, llama a f, pasandole como primer y único parámetro `dataS`.

Al final la ejecución del callback de `subscribePOSTEvent`, lo que sea que retorne dicha función volverá al frontend como respuesta. En este caso, la ejecución de f con `dataS` retorna `dataR`. Del lado del frontend, el tercer parámetro de `postEvent` era el callback, en este caso, `g(data)`. Este es el encargado de recibir la respuesta del backend. Cuando el backend termina la ejecución de su callback (f), lo que sea que retorne (dataR), es enviado como primer y único parámetro a un llamado de la función de callback del frontend (g). En este caso, cuando el backend responde con `dataR`, el frontend ejecuta la función g en donde su parámetro data es `dataR`.

Para dar un ejemplo, vamos a usar el código de la [Demo Básica](https://github.com/nachovigilante/Demo-SoqueTIC). En este caso, el usuario escribe una palabra en el input, cuando apreta un botón lo envía al backend, este lo recibe y lo devuelve. El frontend toma lo devuelto y lo muestra en pantalla. Veamos el fragmento de código relevante del frontend:

```javascript
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    postEvent("message", { msg: input.value }, (data) => {
      a.innerHTML = data.msg;
    });
    input.value = "";
  }
});
```
Se puede ver como cuando se hace "submit" del formulario (apretar el botón que hace submit), se llama a una función que ejecuta postEvent. Esta entonces envía el evento "message" con un objeto de un único atributo, *msg*, que tiene lo que el usuario escribió en el input (`input.value`).

Del lado del backend, hay un onEvent apropiado esperándolo. A continuación el código:
```javascript
subscribePOSTEvent("message", (data) => {
  console.log(`Mensaje recibido: ${data.msg}`);
  return { msg: `Mensaje recibido: ${data.msg}` };
});
```
En este caso, al ejecutarse postEvent en el frontend, el backend llama a su callback recibiendo el objeto en el parámetro *data*. Lo muestra por consola y retorna **otro** objeto con un único atributo, también de nombre *msg*, que contiene el string "Mensaje recibido: " + el string recibido en el atributo *msg* del objeto enviado por el frontend.

Al retornar este objeto, el frontend lo recibe llamando a su callback y pasándoselo por parámetro. En este caso, toma el parámetro en *data*, y con ese modifica el *innerText* de un `<p>` previamente creado con el atributo *msg* del objeto con el que respondió el backend.

El caso de uso de [`getEvent`](#getevent) es muy similar, la única diferencia es que no se envía ningún parámetro, y el callback es [`subscribeGETEvent`](#subscribegetevent), por lo tanto, este pasa a ser una función que no toma parámetros.

### Comunicación iniciada por el backend

Un ejemplo de comunicación iniciada por el backend es por ejemplo cuando hay un componente de hardware.

En este caso, la comunicación iniciada por input del usuario se da igual, ya que el usuario interactúa con el frontend. La diferencia aparece para el caso en el que el backend es el que desea enviar un mensaje, sin que necesariamente lo pida el frontend. Como es el backend el que tiene la posibilidad de comunicarse a recursos externos como hardware, es el backend el que recibe información de ellos. Entonces, para informar al usuario, el backend debe iniciar la comunicación con el frontend en vez de esperar eventos. Para eso, utiliza la función [`realTimeEvent`](#realtimeevent). A su vez, el frontend recibe ese mensaje con la función [`subscribeRealTimeEvent`](#subscriberealtimeevent). El siguiente diagrama ilustra esa situación:
<div style="display:flex;justify-content:center"><img src="/assets/images/soquetic/hardware.png" alt="Diagrama Hardware con SoqueTIC"></div>

Para dar un ejemplo, vamos a usar el código de la [Demo Arduino](https://github.com/JZylber/Demo-Arduino). En esta, el usuario elige un color desde el frontend y el led toma ese color. A su vez hay un botón que prende/apaga el LED, y se ve por pantalla si el LED está prendido o apagado.

La parte de enviar el color de frontend a hardware es similar a lo visto anteriormente, la única diferencia es que la función [`subscribePOSTEvent`](#subscribepostevent) inicia comunicación serial para informar al arduino.

El caso interesante es cómo el estado del botón (el prendido y apagado del LED) llega al frontend. Lo primero que ocurre es que el estado del botón es informado al backend. Esto se hace usando comunicación serial, y el backend usa la librería serialport para realizar este tipo de comunicación. A continuación, el fragmento de código relevante del **backend**: 
```javascript
port.on("data", function (data) {
  let status = data.toString().trim();
  let ledOn = status === "on";
  realTimeEvent("boton", { on: ledOn });
});
```
No nos interesa deternos en la sintaxis de la librería [serialport](https://serialport.io/), basta saber que en el parámetro `data` viene la información recibida por el puerto serial. El backend procesa la información, pero a diferencia de lo visto en la sección anterior, no alcanza con retornar, ya que **no está respondiendo un pedido del frontend**. Debe iniciar activamente el intercambio con el frontend, y para eso utiliza la función [realTimeEvent](#realtimeevent). El frontend, por su parte, debe estar preparado para recibir los eventos del backend. A continuación el fragmento de código relevante del **frontend**: 
```javascript
function botonApretado(status){
  if(status.on){
    estado.innerText = "prendido";
  } else {
    estado.innerText = "apagado";
  }
}
receive("boton",botonApretado)
```
Como vemos, el [`subscribeRealTimeEvent`](#subscriberealtimeevent) es del mismo tipo que el [`realTimeEvent`](#realtimeevent), y toma en el parámetro del *callback* lo enviado por el frontend y en base a eso refleja información en pantalla.
