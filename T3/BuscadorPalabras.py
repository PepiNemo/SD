frase = input("Que frase desea buscar: ")
frase= str(frase)
seachWords= frase.split(' ')

startPath ="./output/Salida"
endPath="/part-00000"

output={}

for i in range(10):
   
    actualPath = startPath+str(i+1)+endPath
    myfile = open(actualPath, "r")
    Lines = myfile.readlines()
    for line in Lines:
        if(line!=""):
            key, value = line.replace("\n", "").split('\t')
            if(key in seachWords):
                if(output.get(key) == None):
                    output[key]=" ("+str(i+1)+" , "+str(value)+ ") ;"
                else:
                    output[key]=str(output.get(key))+" ("+str(i+1)+" , "+str(value)+ ") ;"
    myfile.close()

print(output)
with open('salidaContadorPalabras.txt', 'w') as w:
    for key in output:
        w.write(str(key)+ " : "+ str(output.get(key)) +"\n")



        


