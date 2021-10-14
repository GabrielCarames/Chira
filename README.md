Chira
=============

Página web similar a "WhatsApp" o "Telegram". (Aún en desarrollo)
<br />

<div align="center">
  
## Tecnologías
  
</div>

<br />

<div align="center">

[![Mongodb](https://img.shields.io/badge/-Mongodb-lightblue?style=for-the-badge&logo=Mongodb)](https://www.mongodb.com/es)
[![Express](https://img.shields.io/badge/-express-purple?style=for-the-badge&logo=express)](https://expressjs.com/es/)
[![React](https://img.shields.io/badge/-React-black?style=for-the-badge&logo=React)](https://es.reactjs.org/)
[![Node](https://img.shields.io/badge/-Node-lightgreen?style=for-the-badge&logo=Node.js)](https://nodejs.org/es/)
[![Socket](https://img.shields.io/badge/-Socket-black?style=for-the-badge&logo=Socket.io)](https://socket.io/)
[![Firebase](https://img.shields.io/badge/-Firebase-brown?style=for-the-badge&logo=firebase)](https://firebase.com/)
[![Javascript](https://img.shields.io/badge/-Javascript-critical?style=for-the-badge&logo=Javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![SASS](https://img.shields.io/badge/-sass-white?style=for-the-badge&logo=sass)](https://sass-lang.com/)
[![Figma](https://img.shields.io/badge/-Figma-pink?style=for-the-badge&logo=figma)](https://figma.com/)

</div>

<br />
<div align="center">
  
## Funcionalidades

</div>

<br />

## Chat en tiempo real
* Contiene un chat para el envío y recibimiento de mensajes en tiempo real. Cada mensaje se muestra con su contenido, fecha de creación, y su ícono de "visto". ***Hecho con Socket.io***

## Chats de grupo
* Cuenta con un sistema de creación de grupos en donde se podrán agregar más de dos contactos, elegir un nombre para el grupo y seleccionar una foto. Cada grupo cuenta con su chat en tiempo real.

## Búsqueda de mensajes
* Sistema de búsqueda de mensajes a través de su contenido. Una vez ingresado el mensaje a buscar, se mostrará una lista con todos los mensajes semejantes. Al hacer click en alguno de ellos, se trasladará hacia la posición exacta del mismo junto a un notable fondo coloreado.

## Subir y previsualizar fotos/imágenes.
* El sistema permite seleccionar una foto o imagen de forma local, para posteriormente ser enviada hacia un contacto o chat de grupo. Además, al hacer click en una foto ya enviada, se podrá visualizarla con un mayor tamaño.

## Sistema de emojis
* Cuenta con una lista de gran variedad de emojis, en donde se podrán buscar por medio de un buscador, para luego ser enviados a un chat particular.

## Perfil de contacto/grupo
* Si se clickea en la parte superior del chat, se abrirá una pestaña lateral con la información del contacto, nombre, número de celular y foto de perfil, o en el caso de un chat de grupo, nombre del mismo, foto e integrantes que lo componen.

## Editar foto de perfil o chat de grupo
* Dentro de las opciones de perfil o chat de grupo, se podrá cambiar la foto por una nueva a través del sistema de subida de imágenes anterior mencionado.

## Agregar y buscar contactos
* Posee un botón inferior para buscar y agregar contactos por su nombre de usuario, a través de un buscador.

## Sistema de notificación por mensaje nuevo.
* Cada mensaje entrante será ***notificado*** en la sección de contactos a través de un ícono, representando un mensaje nuevo sin leer.

## Sistema de "visto".
* Si un usuario tiene mensajes sin leer, al acceder al chat correspondiente y hacer click en la barra para enviar mensajes, se colocará automáticamente *** un doble tick*** representando la lectura de mensajes. Todo en ***tiempo real***.

## Historial de mensajes
* Los mensajes son almacenados en una ***base de datos*** dentro de ***MongoDB***. Al ingresar dentro de un chat, se enviará una petición a ésta, y se mostrarán todos los ***mensajes*** del chat seleccionado.

## Registro e ingreso con autenticación por número de celular
* Al momento de crear una cuenta o ingresar a la misma, la página enviará un ***código de autenticación*** al ***número de celular*** ingresado en el formulario, el cual deberá ser ingresado para acceder a la misma. Proceso realizado con ***Firebase Auth***.

## Sistema de notificaciones de errores
* La página cuenta con un sistema de notificaciones que informará al usuario cuando haya algún ***error*** con la base de datos, api's, datos erróneos, etc.

## Diseño responsivo
* Posee un diseño adaptable a distintas resoluciones y dispositivos móviles


<br />
<br />

<div align="center">
  
## Aviso
El proyecto cuenta con una variedad de fallos en proceso de revisión y corrección.

</div>

<br />
<br />
