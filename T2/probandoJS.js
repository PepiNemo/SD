let map = new Map();
map.set(1,[{1:1,2:2}])
if(map.has(1)){
    map.get(1).push({3:3,4:4})
}
console.log(map)