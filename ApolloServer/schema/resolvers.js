const { db } =  require('../db/connection');
// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    Book: async (_, { id }) => {
      let collection = await db.collection("books");
      let query = { _id: new ObjectId(id) };
      return await collection.findOne(query);
    },
    Books: async () => {
      let collection = await db.collection("books");
      const books = await collection.find({}).toArray();
      return books;
    },
    Author: async (_, { id }) => {
        let collection = await db.collection("authors");
        let query = { _id: new ObjectId(id) };
        return await collection.findOne(query);
    },
    Authors: async () => {
        let collection = await db.collection("authors");
        const authors = await collection.find({}).toArray();
        return authors;
    },
  },
  Mutation: {
    createAuthor: async (_, { name, age }, context) => {
      let collection = await db.collection("authors");
      const insert = await collection.insertOne({ name, age });
      return { name, position, level, id: insert.insertedId };
    },
    createBook: async (_, args, context) => {
        let collection = await db.collection("books");
        const update = await collection.insertOne({ title: args.title, description: args.description,
                         genre: args.genre, authorId: args.authorId });
        return await collection.findOne(query);
      },
    updateBook: async (_, args, context) => {
      const id = new ObjectId(args.id);
      let query = { _id: new ObjectId(id) };
      let collection = await db.collection("books");
      const update = await collection.updateOne(query, { $set: { title: args.title, description: args.description, genre: args.genre } });
      return await collection.findOne(query);
    },
    deleteBook: async (_, { id }, context) => {
      let collection = await db.collection("books");
      const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
      return dbDelete.acknowledged && dbDelete.deletedCount == 1? true : false;
    }
  }
};

export  { resolvers };