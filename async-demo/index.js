console.log('Before');
getUser(1, getRepositories);
console.log('Afer');

function getRepositories(user) {
    getRepositories(user.gitHubUserName, getCommits);
}

function getCommits(repos) {
    getcommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}


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