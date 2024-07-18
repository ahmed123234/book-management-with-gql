import { gql } from "@apollo/client";

const AUTHORS = gql`
    query getAuthors {
        Authors {
            id
            name
            age
            books {
                id
                title
                description
            }
        }
    }     
`

const AUTHOR = gql`
    query getAuthor($id: ID) {
        Author(id: $id) {
            id
            name
            age
            books {
                id
                title
                description
            }
    }
`

export { AUTHORS };