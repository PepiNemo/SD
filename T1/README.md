## Ejecutar el docker compose para el Web search Engine.
Para crear el web search engine se implementaron los sigiuentes servicios:
1. Cliente-http,
2. Redis Master
3. Redis Slaves(Replicas)
4. gRPC server 
5. Base de datos relacional Postgres.

Para ejecutar el web search Engine, se ejecuta el archivo docker-compose.yml que levantara los servicios, con el siguiente comando:

`docker compose up --build --scale redis=1 --scale redis-replica=3`

Para acceder al web search engine, debemos realizar una consulta POST al cliente http con la siguiente direccion.

`http://localhost:3000/url/search?keyword=<Pagina a buscar a partir del keywords>`
