import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} from 'graphql';
import db from './db';

const User = new GraphQLObjectType({
    name: 'User',
    description: 'User object information',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve: (user) => user.id
            },
            userName: {
                type: GraphQLString,
                resolve: (user) => user.userName
            },
            firstName: {
                type: GraphQLString,
                resolve: (user) => user.firstName
            },
            lastName: {
                type: GraphQLString,
                resolve: (user) => user.lastName
            },
            email: {
                type: GraphQLString,
                resolve: (user) => user.email
            },
            posts: {
                type: GraphQLList(Post),
                resolve: (user) => user.getPosts()
            }
        };
    }
});

const Post = new GraphQLObjectType({
name: 'Post',
description: 'Post object information',
fields: () => {
    return {
        id: {
            type: GraphQLInt,
            resolve: (post) => post.id
        },
        title: {
            type: GraphQLString,
            resolve: (post) => post.title
        },
        content: {
            type: GraphQLString,
            resolve: (post) => post.content
        },
    }
}
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Query entry point',
    fields: () => {
        return {
            users: {
                type: GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt,
                    },
                    email: {
                        type: GraphQLString,
                    }
                },
                resolve: (root, args) => db.models.User.findAll({where: args})
            },
            posts: {
                type: GraphQLList(Post),
                resolve: (root, args) => db.models.Post.findAll({where: args})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Functions to mutate database content',
    fields: () => {
        return {
            addUser: {
                type: User,
                args: {
                    userName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                },
                resolve: (_, args) => db.models.User.create({
                    userName: args.userName,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email.toLowerCase(),
                })
            },
            deleteUser: {
                type: User,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt),
                    },
                },
                resolve: (_, args) => db.models.User.destroy({where: args}),
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});

export default Schema;