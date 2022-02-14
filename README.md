### This is The SERVER ONLY The complete project is [https://github.com/aknjoroge/Socket.io-Chat](https://github.com/aknjoroge/Socket.io-Chat)

---

## Socket.io V.4 Chat Application (No Database)

---

### This application completed the AKA:"Homework" given in the socket.io get started section [https://socket.io/get-started/chat](https://socket.io/get-started/chat)

---

## Homework requirements and implementations

1. ### Broadcast a message to connected users when someone connects or disconnects.

- Implemented for the public group chat and individual private groups

2. ### Add support for nicknames.

- Users provide a user name that is stored the redux in the react app, and also get provided a socket Token from the server.
- The user details are stored in the io instance

3. ### Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.

- This chat mechanism is implemented by appending the sent message through a socket callback function, while the message is delivered to all other sockets using a broadcast signal.

4. ### Add “{user} is typing” functionality.

- similar to user joining events

5. ### Show who’s online.

- From users stored in io instance I map an array that I use to show a list of users

6.  ### Add private messaging.

- Implemented through private groups and direct messages, I use socket io and its instance to create rooms and broadcast to name spaces

---

### ETC

#### Authentication - Implemented using socket Middlewares

```js
exports.protected = function name(socket, next) {
  let authData = socket.handshake.auth;
  if (!authData.id || authData.id === "" || authData.id == "xxxxxxxxxxxx") {
    return next(new Error("user not identified"));
  }
  next();
};
```

#### Cors is handled during io initialization

```js
let io = new Server(server, {
  cors: { origin: ["http://localhost:3000", "http://localhost"] },
});
```

#### Connected user are stored in the io instance in the `server\middleware\authMiddleware.js`

```js
//Check is there are users, if not create an empty array
if (!io.PUBLIC_USER) {
  io.PUBLIC_USER = [];
}
//add user to the object
io.PUBLIC_USER.push({
  authSocketid: socket.id,
  name: authData.name,
  id: authData.id,
  date: curentdate,
});
```

#### All controlllers are stored in `./controller/loadAppData`

1. `exports.loadApp = function name(socket) {} ` To provide active client to the client
2. `exports.publicChat = function name(socket) {}` To register a disconencted client
3. `exports.loadGroups = function name(socket) {}` Used to add users to groups and send group messages to the resp rooms
4. `exports.inboxChat = function name(socket) {}` sending individual messages

---

## Note

### Users not yet in a group will not find messages already sent, since no database is in use and thus messages can be stored

### A reload will log you out and assign you a new socket token, user will need to relink to your token to message you

#### Use this project to learn Socket.io add improvements as you need. I may build a later version with a database.

---

## Suggestions

### Use redux to store the socket connections and access them appwide

### Add a database to the app to add more functionality

- You can use database adapters listed in the documentation

```js
const mongoClient = new MongoClient(
  "mongodb://localhost:27017/?replicaSet=rs0",
  { useUnifiedTopology: true }
);
```

#### Info

#### The server runs on port 4000 defined in `server.js `

```js
let port = 4000;
```

### The front End client uses `socket.io-client` through NPM

### For more docs view the individual documentations

### During setup install both the server folder node modules and the react app as well

## API url

#### The online API is hosted on : but for your local development, change the URL in `react app\src\store\var.js`

```js
let API_ULR = "http://localhost:4000/";
export default API_ULR;
```
