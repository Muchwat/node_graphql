const { Sequelize } = require('sequelize');
var faker = require('faker');
import _ from 'lodash';

const connection = new Sequelize('node_db', 'postgres', '702040001', {
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
        connectTimeout: 6000000
    }
});

const User = connection.define('User', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    }
});

const Post = connection.define('Post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

User.hasMany(Post);
Post.belongsTo(User);

// connection.sync({force:false}).then(() => {
//     _.times(20000, () => User.create({
//         userName: faker.internet.userName(),
//         firstName: faker.name.findName(),
//         lastName: faker.name.findName(),
//         email: faker.internet.email()
//       }).then(user => user.createPost(
//         {title: faker.lorem.words(),
//             content: faker.lorem.sentence(),
//             date: faker.date.recent(),}
//       )).catch(err => console.log(err)));
// }).catch(err => console.log(err));

connection.sync({force:false});

export default connection;