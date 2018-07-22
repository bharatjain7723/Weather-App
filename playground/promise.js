var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            }
            else{
                reject("Arguments must be numbers");
            }
        }, 1500);    
    });
};

asyncAdd(5, "das").then((result)=>{
    console.log("Result:", result); 
}, (errorMessage)=>{
    console.log("Error:", errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("Promise me, Ned. Promise me.");
//         // reject("Kya hua tera waada..Woh kasam ..woh iraada")
//     }, 2500);
// });

// somePromise.then((message) => {
//     console.log("Success:", message);
// }, (errorMessage) => {
//     console.log("Error:", errorMessage);
// });