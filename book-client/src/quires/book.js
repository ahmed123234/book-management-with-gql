import { gql } from "@apollo/client";


const BOOKS = gql`
   query getBooks {
        Books {
            id
            title
            genre
            description
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

const BOOK = gql`

query getBook($id: ID) {
    Book(id: $id) {
        id
        title
        genre
        description
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

export { BOOKS, BOOK };