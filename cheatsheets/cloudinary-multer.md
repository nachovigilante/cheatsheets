---
title: Subir Imagenes (Multer & Cloudinary)
image: "/assets/images/cloudinary_icon.png"
---


## Índice


- [Índice](#índice)
- [Introducción](#introducción)
- [Crear Cuenta (Cloudinary)](#creacion-cuenta)
- [Instalación](#instalación)
- [Configuracion (Multer)](#config-multer)
- [Conexion (Cloudinary)](#conexion)
- [Almacenamiento de Fotos (Local)](#almacenamiento-local)
- [Subida a la nube con Cloudinary](#subir-cloudinary)
- [Archivos temporales con Multer (para subir a la nube)](#temporal-multer)


<br>


## Introducción


Con estas dos herramientas vamos a poder subir imagenes a cloudinary con el objetivo de tener el link publico para acceder desde cualquier lado. Desde `Multer` vamos a recibir los archivos de fotos en este caso y con la conexion a `Cloudinary` vamos a tener acceso a subirlas.


## Crear Cuenta (Cloudinary)


Primero debemos crearnos una cuenta en Cloudinary donde vamos a subir nuestras fotos (recomendable hacerlo con GitHub).


URL: https://console.cloudinary.com/users/register_free




## Instalación


Para instalar `Multer` y `Cloudinary` deberemos ejecutar los siguientes dos comandos en la consola (dentro de un proyecto de Node.js):


```bash
npm i cloudinary
npm i multer
```


## Configuracion (Multer)


Para configurar Multer debemos primero crear una carpeta donde se van a almacenar las imagenes localmente (puede ser tanto temporal o para siempre). La misma debe estar ubicada dentro del proyecto, tanto en la carpeta SRC como una capreta separada.


La configuracion de multer debe estar ubicada en el Router de la ruta donde queremos trabajar. En el caso de querer trabajar en la subida de fotos de perfil el ejemplo seria trabajarlo en el router de usuarios.


Primero debemos importar el modulo de Multer:


```js
import multer from 'multer';
```


A continuacion debemos hacer la configuracion de Multer, asi deberia ser:


```js
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Poner la ubicacion de la carpeta de Uploads correspondiente, en este caso se ubica dentro del SRC
const uploadDir = join(__dirname, "../uploads");


// Se define donde se va a ubicar el archivo que vamos a subir y el nombre, este se puede modificar, en este caso el nombre que se le va a asignar es la fecha de subida sumado del nombre del archivo original
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});


// El siguiente filtro es para que se suban unicamente archivos con extensiones especificas. En este caso serian JPEG, PNG y JPG
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, PNG, JPEG, and JPG files are allowed.'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
```


## Conexion (Cloudinary)


Para hacer la conexion con cloudinary debemos entrar a nuestro dashboard de Cloudinary personal en el siguiente link para obtener nuestras credenciales.


Desde ahi vamos a poder acceder a nuestro Cloudname en el centro que debemos copiarlo y a continuacion debemos entrar a "Go to API Keys" que el boton se encuentra a la derecha del Cloudname donde encontraremos la API Key y el API Secret que tambien debemos copiarlo.


En nuestro proyecto debemos crear un archivo llamado upload.js donde vamos a crear toda la configuracion


```js
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: "<cloudname>",
  api_key: "<api_key>",
  api_secret: "<api_secret>"
});


export default cloudinary;
```


## Almacenamiento de Fotos (Local)


Para hacer que los archivos se suban localmente hay que definir desde que ruta lo vamos a hacer primero desde el Router configurando que ruta vamos a usar. El siguiente ejemplo es con la creacion de usuarios, modificar para las rutas.


```js
// Crear Usuarios
router.post("/registerUsers", upload.single('file'), registerController.registerUsers);
```


De esta manera cuando se suban las imagenes se van a guardar en la carpeta de Uploads que creamos.


Despues desde el controller tambien podemos manipular las extensiones que se suben con esto:


```js
// Crear Usuarios
const imageFile = req.file.path;




const extension = imageFile.split('.').pop();
const extensionesPermitidas = ['pdf', 'png', 'jpeg', 'jpg'];


if (!extensionesPermitidas.includes(extension)) {
    console.error('Extensión de archivo no permitida');
    return res.status(400).send('Error: Extensión de archivo no permitida. Extensiones admitidas: PDF, PNG, JPEG, y JPG');
}
```


## Subida a la nube con Cloudinary


Para subir las imagenes de Cloudinary debemos importar la configuracion desde el archivo de configuracion que habiamos creado (upload.js) con el siguiente codigo en el controller de donde vamos a trabajar:


```js
import cloudinary from '../upload.js';
```


Para subirlas a Cloudinary dentro de donde querramos trabajar debemos traer el imageFile que estabamos usando con Multer y deberiamos ejecutar la siguiente funcion para subirlas que nos va a devolver un JSON con la informacion y con la variable vamos a almacenar la URL de donde se va a ubicar la imagen:


```js
const imageFile = req.file.path;


const result = await cloudinary.uploader.upload(imageFile, {
    folder: 'analisis',
});


const imageUrl = result.secure_url;
```


Que a continuacion de eso se podria guardar el link en la base de datos de la siguiente forma


```js
const query = 'INSERT INTO public.users (imagen) VALUES ($1)';


await client.query(query, [imageUrl]);
```


## Archivos temporales con Multer (para subir a la nube)


Para hacer que los archivos se hagan temporales es tan sencillo como importar el modulo FS al controller y ejecutar la funcion de unlinkSync funcion a lo que ya teniamos creado:


```js
import fs from "fs";


const imageFile = req.file.path;


const result = await cloudinary.uploader.upload(imageFile, {
    folder: 'analisis',
});


const imageUrl = result.secure_url;


const query = 'INSERT INTO public.users (imagen) VALUES ($1)';


await client.query(query, [imageUrl]);


fs.unlinkSync(imageFile); // Eliminar el archivo local
```

