 let map = new Map();
map.set("Hola",[{1:1,2:2}])
map.set("Chao", [{1:1}])
map.set("Chaaao", [{2:2}])
map.delete("Hola")
console.log(map)
/*
if(map.has(1)){
    map.get(1).push({3:3,4:4})
}
//console.log(map)
map.forEach((value, key, map) =>{
    console.log(map.size)
})

let ob = {idCliente : 3, cantidadSopaipilla: 2, hora2:1}
//console.log(ob.idCliente)
let array = [1,2,"hola",4]
/* array.forEach((value, index, array) => {
    (array.at(index) == 2 )?array.splice(index,1):console.log(index)
    
})
array = array.filter((item) => item !== "hola")
console.log(array)
 */
//console.log(array) 


