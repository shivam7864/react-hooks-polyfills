const array = [1, 2, [3, 4, [5, 6, [7, 8, 9, [10]]]]];

function flatten(array,level=100){
    const result=[];
    array.forEach(function(element){
        if(Array.isArray(element) && level>0){
            result.push(...flatten(element,level-1));
        }else{
            result.push(element);
        }
    });
    return result;
}

// console.log(flatten(array,4));


//Inbuilt Method 
//If all the elements are number then
// console.log(array.toString().split(",").map(Number));
// console.log(array.flat(3));
