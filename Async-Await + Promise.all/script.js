const url = `https://jsonplaceholder.typicode.com`;

const init = async () => {
    let users = await getUsers();
    users = users.filter((user) => user.id <= 5);
    const promises = [
        getPostsByUserID(users[0].id),
        getPostsByUserID(users[1].id),
        getPostsByUserID(users[2].id),
        getPostsByUserID(users[3].id),
        getPostsByUserID(users[4].id)
    ]

    Promise.all(promises).then((posts) => {
        setUsersAndPostsOnPage(users, posts);
    })
}

const getUsers = async () => {
    const response = await fetch(`${url}/users`)
    if (!response.ok) throw new Error(`An error has occured: ${response.status}`)
    return response.json();
}

const getPostsByUserID = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/posts?userId=${id}`)
            .then((response) => response.json())
            .then((json) => resolve(json))
            .catch((e) => reject(e));
    })
}

const setUsersAndPostsOnPage = (users, posts) => {
    document.getElementById('content').innerHTML = `
    <h1 align="center"> <a href="${url}" target="_blank">JSONPLACEHOLDER</a> Users and their posts </h1>
    <ol>
    ${users.map((user) => `
    <li>
        ${user['name']} - posts:
        <ul>
            ${posts[user.id - 1].map((post) => `
            <li>
                <strong style="text-transform:capitalize">${post['title']}</strong> - ${post['body']}
            </li>
            `).join('')}
        </ul>
    </li>
    `).join('')}    </ol>
    `
}

init();


