

# JSON PLACEHOLDER API 
<strong>Work with Async/Await + Promise.all</strong>


## Functions:
- [X] - init - first function to run on the load of the app. runs the function "getUsers()" asynchronous then filter only the first 5 users. After the filter, it runs promise.all() with the function "getPostsByUserID()" for each user to get each user posts. Then when all the data arrived, it'll run the function setUsersAndPostsOnPage to map and store the data on the DOM. 


- [X] - getUsers() - makes a fetch request to [JSONPLACEHOLDER USERS](https://jsonplaceholder.typicode.com/users/) and return the response in json format.


- [X] - getPostsByUserID(id) - get id parameter and run a promise make a fetch request to [JSONPLACEHOLDER POSTS](https://jsonplaceholder.typicode.com/posts?userId=1) and return the data in json format. 


- [X] - setUsersAndPostsOnPage(users, posts) - get users data and posts data, mapping them and storing them in the DOM as Ordered list of users and unordered list of posts for each user.


## API used in this app:
[JSONPLACEHOLDER](https://jsonplaceholder.typicode.com)
