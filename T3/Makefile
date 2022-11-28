
wordcount:	
	docker exec namenode hdfs dfs -mkdir -p /input/
	docker cp ./wikipedia/ namenode:/tmp/
	docker cp ./WordCountCode/WordCount.jar namenode:/tmp/
	docker exec namenode hdfs dfs -copyFromLocal -f /tmp/wikipedia/ /input/
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/Mochila1.txt /output/Salida1
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/Felipe2.txt /output/Salida2  
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/RatonInformatica3.txt /output/Salida3
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/LeagueofLegends4.txt /output/Salida4
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/IntelCore5.txt /output/Salida5
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/Habo6.txt /output/Salida6
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/Chile7.txt /output/Salida7
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/Faker8.txt /output/Salida8
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/Ryzen9.txt /output/Salida9
	docker exec namenode hadoop jar /tmp/WordCount.jar WordCount /input/wikipedia/YouTube10.txt /output/Salida10
	docker exec namenode mkdir /tmp/output/
	docker exec namenode mkdir /tmp/output/Salida1
	docker exec namenode mkdir /tmp/output/Salida2
	docker exec namenode mkdir /tmp/output/Salida3
	docker exec namenode mkdir /tmp/output/Salida4
	docker exec namenode mkdir /tmp/output/Salida5
	docker exec namenode mkdir /tmp/output/Salida6
	docker exec namenode mkdir /tmp/output/Salida7
	docker exec namenode mkdir /tmp/output/Salida8
	docker exec namenode mkdir /tmp/output/Salida9
	docker exec namenode mkdir /tmp/output/Salida10
	docker exec namenode hadoop fs -get /output/Salida1/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida1/
	docker exec namenode hadoop fs -get /output/Salida2/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida2/
	docker exec namenode hadoop fs -get /output/Salida3/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida3/
	docker exec namenode hadoop fs -get /output/Salida4/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida4/
	docker exec namenode hadoop fs -get /output/Salida5/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida5/
	docker exec namenode hadoop fs -get /output/Salida6/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida6/
	docker exec namenode hadoop fs -get /output/Salida7/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida7/
	docker exec namenode hadoop fs -get /output/Salida8/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida8/
	docker exec namenode hadoop fs -get /output/Salida9/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida9/
	docker exec namenode hadoop fs -get /output/Salida10/part-00000
	docker exec namenode mv part-00000 /tmp/output/Salida10/
	docker cp namenode:/tmp/output/ ./
	docker exec namenode hdfs dfs -rm -r /input
	docker exec namenode hdfs dfs -rm -r /output
	docker exec namenode rm -R /tmp/output
  