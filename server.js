var express = require('express');
var { graphqlHTTP } = require('express-graphql');
import Schema from './schema';


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));

app.listen(3000);

// fetch users and posts
// {
//   users {
//     id,
//     userName,
//     firstName,
//     lastName,
//     email,
//     posts {
//       id,
//       title,
//       content
//     }
//   }
//   }
// fetch users and posts
// {
//   users {
//     id,
//     userName,
//     firstName,
//     lastName,
//     email,
//     posts {
//       id,
//       title,
//       content
//     }
//   }
//   }


// add user 
// mutation addUser {
//   addUser(
// userName: "Muchu",
// firstName: "Kevin"
// lastName: "Muchwat"
// email: "kevinmuchwat@gmail.com"
// ) {
//   id
// }
// }