const villain = {
    fightWith : "Shivam"
}

const superHero = {
    name : "Tiwari"
}



Object.prototype.myCreate = function(parentObject,keysObject){
    function F(){}
    F.prototype = parentObject;
    const newObj = new F();
    Object.defineProperties(newObj,keysObject)
    return newObj;

}

const obj = Object.myCreate(superHero,{origin:{value:"Prashant"}});
// console.log(obj);
