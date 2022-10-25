let map = new Map();
map.set("Hola",[{1:1,2:2}])
if(map.has(1)){
    map.get(1).push({3:3,4:4})
}
//console.log(map)
map.forEach((value, key, map) =>{
    console.log(map.size)
})

let ob = {idCliente : 3, cantidadSopaipilla: 2, hora2:1}
console.log(ob.idCliente)
let array = [1,2,3,4]
array.splice(2,1)
//console.log(array)