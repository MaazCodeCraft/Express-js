const p = new Promise ((resolve, reject) => {
    // kisck os some async work
    // ....
    setTimeout(() => {
        resolve(1); // pending => resolved, fullfiled
        reject(new Error('message')); // pending => rejected
    }, 2000);
});

p
    .then(result => console.log('Result : ', result))
    .catch(err => console.log('Error', err.message));