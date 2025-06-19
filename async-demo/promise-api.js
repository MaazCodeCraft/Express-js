/*
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));
*/

/*
const p = Promise.reject(new Error ('reason for rejection.....'));
p.catch(error => console.log(error));
*/

const p1 = new Promise ((resolve) => {
    setTimeout(() => {
        console.log('Async opreation1....');
        resolve(1);
    }, 2000);
});

const p2 = new Promise ((resolve) => {
    setTimeout(() => {
        console.log('Async opreation2....');
        resolve(2);
    }, 2000);
});

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error ', err.message));