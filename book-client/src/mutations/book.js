import { gql } from "@apollo/client";

const ADD_BOOK = gql`
    mutation addBook($title: String!,
            $genre: String!
            $description: String!,
            $authorId: ID! 
        ) {
            addBook(title: $title,
                genre: $genre,
                description: $description,
                authorId: $authorId       
            ) {
                id
                title
                description
                genre
                author {
                    id
                    name
                    age 
                    books {
                        id
                        title
                        genre
                        description
                    } 
                }
            }
        }
`


const DELETE_BOOK = gql`
    mutation deleteBook(
            $id: ID! 
        ) {
            deleteBook(
                id: $id       
            ) {
                id
                title
                genre
                description
                author {
                    id
                    name
                }
            }
        }
`

export { ADD_BOOK, DELETE_BOOK }