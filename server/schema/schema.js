const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, 
        GraphQLID, GraphQLSchema, GraphQLNonNull, GraphQLError } = require('graphql');
const { BookModel } = require('../models/book-model')
const { AuthorModel } = require('../models/author-model')
// const _ = require('lodash');

// define the object types used in the schema and the realtion between them and how to query them to get the data back

/**
 * The main key roles of schema is to:
 * 1. define the objects types that used to determine the type of the queried data
 * 2. define the relation between these object types
 * 3. root quires: which is the process of determine the root or entery query ( 
 * the starting point ) that used to start quering the data from and from it you
 *  can jump to the other quires in the graph  
 */
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        title: {
            type: GraphQLString,
        },

        genre: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) { //parent refers to the original query for the required 
                return AuthorModel.findById(parent.authorId);
            }
        }

    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return  BookModel.find({
                    authorId: parent.id
                })
            }
        }
    })
});

// define the root quires that can be used as an entry point to start retriving the data (how to jump in the graph to fetch the data)
const query = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        Book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return BookModel.findById(args.id)
            }
        },
        Books: {
            type: new GraphQLList(BookType),
            resolve() {
                return BookModel.find();
            }
        },
        Author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) { // parent holds the initial object that will be requested 
                return AuthorModel.findById(args.id)
                   
            }
        },
        Authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return AuthorModel.find();
            }
        },

    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt),
                }
            },
            resolve(parent, args) {
                return AuthorModel.create({
                    name: args.name,
                    age: args.age
                });
            }
        },
        deleteAuthor: {
            type: AuthorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
           async resolve(parent, args) {
                // delete the author raelated books
                 await BookModel.deleteMany({
                    authorId: args.id
                });

                return await AuthorModel.findByIdAndRemove(args.id)
            }
        },
        updateAuthor: {
            type: AuthorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
                books: {
                    type: new GraphQLList(GraphQLID)
                },

            },
            resolve(parent, args) {

                AuthorModel.findById(args.id).select('bookIds').exec().then((doc) => {
                    console.log("before", doc.bookIds);

                    args.books.forEach(id => {
                        doc.bookIds.push(id);
                    })

                    console.log("after", doc.bookIds);
                    return AuthorModel.findByIdAndUpdate(args.id, {
                        $set: {
                            bookIds: doc.bookIds
                        }
                    })
                });

            }
        },

        addBook: {
            type: BookType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent, args) {
            
                const book = await BookModel.create({
                    title: args.title,
                    genre: args.genre,
                    description: args.description,
                    authorId: args.authorId
                });

                
                AuthorModel.findById(args.authorId).select('bookIds').exec().then(async (doc) => {
                    console.log("before", doc.bookIds);

                    doc.bookIds.push(book.id);
            
                    console.log("after", doc.bookIds);
                   await AuthorModel.findByIdAndUpdate(args.id, {
                        $set: {
                            bookIds: doc.bookIds
                        }
                    })
                });
                return book;
            }
        },

        deleteBook: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent, args) {

                const data = await BookModel.findByIdAndRemove(args.id);

                console.log("data ", data);

                AuthorModel.findById(data.authorId).select('bookIds').exec().then(async (doc) => {
                    console.log("before", doc.bookIds);
                    const index = doc.bookIds.indexOf(args.id);

                    doc.bookIds.splice(index, 1);

                    console.log("after", doc.bookIds);
                   await AuthorModel.findByIdAndUpdate(data.authorId, {
                        $set: {
                            bookIds: doc.bookIds
                        }
                    })
                });

               return data;

            }
        }

    }
})

module.exports.schema = new GraphQLSchema({
    query,
    mutation
});


