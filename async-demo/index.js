console.log('Before');
const user = getUser(1);
console.log(user);
console.log('Afer');


// Callbacks
// Promises
// Async/await

function getUser (id) {
    setTimeout(() => {
        console.log('Reading a user from a database....');
        return { id: id, gitHubUserName: 'maaz' };
    }, 2000);

    return 1;
}