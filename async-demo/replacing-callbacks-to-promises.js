console.log('Before');
// Callback based-approach
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//         console.log(commits);
//         })
//     })
// });

// Promise based-approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits: ', commits))
//     .catch(err => console.log('Error: ', err));

// Async and Await based-approach
async function displayCommits () {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log('Error ', err.message);
    }
}
displayCommits();
console.log('After');

function getUser(id) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'maaz' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error ('could not get a repos..'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}