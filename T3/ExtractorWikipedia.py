import wikipedia
wikipedia.set_lang("Es")

c=input()
a=wikipedia.search(c)
b=0
for i in a:
    print(b," si quiere ",i)
    b=b+1
elec=input()
elec=int(elec)
wiki = wikipedia.page(a[elec])
text = wiki.content
tit=str(a[elec])
tit_f = "./wikipedia/".join((tit, ".txt"))


with open(tit_f, 'w') as f:   
    f.write(text)

