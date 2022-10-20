# Server Producer

### Levantar el Servidor Productor
1. Dirigir al directorio /T2/ServerProducer.

    ``` cd SD/T2/ServerProducer ```

2. Instalar las depedencias del proyecto.

    ``` npm install ```

3. Levantar el servidor con npm, en modo desarollador (Utilizara nodemon).

    ```npm run dev ```

---

### Endpoints implementados.

| Nombre Endpoint | Entidad EndPoint | HTTP Method | Route | Body params |
| ------ | ------ | ------ | ------ | ------ |
| 1.RegistrarMiembro | Miembro | Post | localhost:3000/Miembro/RegistarMiebro | Ninguno|
| 2.EliminarMiembro | Miembro | Delete | localhost:3000/Miembro/EliminarMiembro | id(Miembro a Eliminar) |
|3.CarritoProfugo | Carrito | Post | localhost:3000/Carrito/CarritoProfugo | id(Carrito) |
|4.PosicionCarrito | Carrito | Patch | localhost:3000/Carrito/PosicionCarrito | id(Carrito)|
|5.RegistarVenta | Venta | Post | localhost:3000/Venta/RegistarVenta | Ninguno |
|6.EliminarVenta | Venta | Delete | localhost:3000/Venta/EliminarVenta | id(Venta)|

#### Ejemplo de uso de Endpoints.
<p align="center">
  <img src="https://user-images.githubusercontent.com/67931071/196556330-7c145d74-275a-45fe-a5af-163d61369ea9.png" />
</p>
