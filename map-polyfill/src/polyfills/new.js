function Superhero(name){
    this.name = name;
    this.villain = "Shivam"
}

function myNew(ConstructorFn,...args){

    const newObj={};
    Object.setPrototypeOf(newObj,ConstructorFn.prototype);
    const result = ConstructorFn.apply(newObj,args);
    return result instanceof Object ? result : newObj;
}

const superhero = new Superhero("Silver Surfer");
const newSuperhero = myNew(Superhero,"Iron Man");

// console.log(superhero);
// console.log(newSuperhero);

