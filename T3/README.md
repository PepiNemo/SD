# Tarea3 Hadoop

### Que es Hadoop?
Apache Hadoop es una estructura de software utilizado para manejar grandes vol ́umenes de datos en paralelo en
cluster de hardware comercial, por lo cual funcionando de manera distribuida. Hadoop es confiable, tolerante a
fallos, de bajo coste y escalable siendo una soluci ́on completa en su  ́area.

### Que es Map-Reducer?
Es un paradigma de procesamiento de daatos el cual se divide en dos etapas. Primero se realiza el Mapeo(Map) y
luego la reducci ́on(Reduce) de los datos. La gracia de este paradigma es que permite realizar estas etapas en varios
nodos de manera distribuida, un grupo puede estar realizando la fase de mapeo y otro grupo la reducci ́on. La forma
de controlar y gestionar la ejecuci ́on es por medio de un Master o JobTracker.
Al tener varios nodos accediendo al mismo almacenamiento surge un cuello de botella al turnarse por acceder al
recurso, por lo que este paradigma funciona muy buen con un almacenamiento distribuido, por ejemplo HDFS.
La etapa Map, en una etapa de contar palabras repetidas, consiste en leer y agrupar partes del texto de entrada, y
contar las palabras dentro del grupo.
Luego en la etapa de reducer, se juntas los varios grupos formados en la etapa de Map, y se juntan las palabras
iguales sumando su contador de repeticiones.


## Comandos
1. Levantar las servicios de hadoop desde el docker compose.

`docker compose up -d --build`

2. Lanzar el Script que realiza los pasos de la tarea

`make wordcount`

3. Realizar una busqueda de palabras y su cantidad de apariciones por pagina.

`python3 BuscadorPalabras.py`

## Extra:
Si se quiere cambiar los textos extraidos de wikipedia, se debe:
1. Ejecutar el programa que genera el nuevo texto

`python3 ExtractorWikipedia.py`

2. Cambiar el nombre del texto anterior, al nuevo texto en el archivo MakeFile.


