// Asynchronous
console.log('Before');
getUser(1, (user) => {
    getRepositories(user.gitHubUserName, (repos) => {
        getcommits(repo, (commits) => {
            // CALLBACK HELL
        });
    });
});
console.log('Afer');

// Synchronous
console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUserName);
const commits = getCommits(repos[0]);
console.log('Afer');

// Callbacks

function getUser (id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database....');
        callback({ id: id, gitHubUserName: 'maaz' });
    }, 2000);
}

function getRepositories (username, callback) {
    setTimeout(() => {
        console.log('Calling gitHub API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}