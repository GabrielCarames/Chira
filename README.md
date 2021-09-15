Chira
=============

> Página web similar a "WhatsApp" o "Telegram".

<br />

## Tecnologías

<br />

[![Mongodb](https://img.shields.io/badge/-Mongodb-lightblue?style=for-the-badge&logo=Mongodb)](https://www.mongodb.com/es)
[![Express](https://img.shields.io/badge/-express-black?style=for-the-badge&logo=express)](https://expressjs.com/es/)
[![React](https://img.shields.io/badge/-React-black?style=for-the-badge&logo=React)](https://es.reactjs.org/)
[![Node](https://img.shields.io/badge/-Node-black?style=for-the-badge&logo=Node.js)](https://nodejs.org/es/)
[![Socket](https://img.shields.io/badge/-Socket-black?style=for-the-badge&logo=Socket.io)](https://socket.io/)
[![Firebase](https://img.shields.io/badge/-Firebase-white?style=for-the-badge&logo=firebase)](https://firebase.com/)
[![Javascript](https://img.shields.io/badge/-Javascript-critical?style=for-the-badge&logo=Javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![SASS](https://img.shields.io/badge/-sass-white?style=for-the-badge&logo=sass)](https://sass-lang.com/)
[![Html](https://img.shields.io/badge/-html-black?style=for-the-badge&logo=html5)](https://developer.mozilla.org/es/docs/Web/HTML)
[![Figma](https://img.shields.io/badge/-Figma-white?style=for-the-badge&logo=figma)](https://figma.com/)

<br />

## Funcionalidades

<br />

> Chat en tiempo real

* Contiene un chat en donde se pueden enviar, recibir y mostrar mensajes entre dos usuarios en tiempo real. Cada mensaje se muestra con su contenido, fecha de creación, y su ícono de "visto". ***Hecho con Socket.io***

> Sistema de notificaciones

* Cada vez que un usuario envía a otro un mensaje nuevo, este último será ***notificado*** por un ícono de mensaje nuevo sin ver.

> Sistema de "visto".

* Si un usuario tiene mensajes sin leer, al acceder al chat correspondiente, colocará ***automáticamente un doble tick*** representando que vio el mensaje. Todo en ***tiempo real***.

> Historial de mensajes

* Los mensajes son almacenados en una ***base de datos*** dentro de ***MongoDB***. Al ingresar dentro de un chat, se envía una petición a la tabla correspondiente y mostrará todos los ***mensajes*** del chat existente.

> Registro e ingreso con autenticación por teléfono

* Al momento de crear una cuenta o ingresar a la misma, la página enviará un ***código de autenticación*** al ***número de celular*** ingresado en el formulario, el cual deberá ser ingresado para acceder a la misma. Proceso realizado con ***Firebase Auth***.

> Sistema de notificaciones de errores

* La página cuenta con un sistema de notificaciones que informará al usuario cuando haya algún ***error*** con la base de datos, api's, o simplemente su cuenta no sea correcta, etc.
