import { FaCalculator } from 'react-icons/fa'
import { BOOK, BOOKS } from '../quires';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_BOOK } from '../mutations/book';
import {Spinner} from "../components"

const closeDetails = () => {
    const side = document.getElementById('book-side');
    side.style.right = '-500px';
}

export default function BookDetails({ bookId }) {

    //    const { id } = useParams();

    const navigate = useNavigate();

    const [deleteBook] = useMutation(DELETE_BOOK,
        {
            variables: {
                id: bookId
            },

            update(cache, {
                data: { deleteBook }
            }) {
                const { Books} = cache.readQuery({
                    query: BOOKS
                });
    
                cache.writeQuery({
                    query: BOOKS,
                    data: {
                        Books: Books.filter(book => book.id  !== deleteBook.id)
                    }
                })
            },
    
            onCompleted: () => {
                // navigate('/')
                console.log("Deleted successfully");
                closeDetails()
            },    
            // refetchQueries: [{
            //     query: BOOKS
            // }]
        })

    const { loading, error, data } = useQuery(BOOK, {
        variables: {
            id: bookId
        }
    });

    if (loading) return <div id="book-side"> <Spinner/> </div>;

    if (error) return <p>Something went wrong</p>

    if (data) {
        console.log(data);
    }

    if (data.Book === null) return <div id="book-side" style={{ background: 'transparent' }}></div>;

    return (
        <>
            <div id="book-side" className='card d-flex align-items-center justify-content-center'>

                {/* <a href="/" className="btn btn-light">Go Back</a> */}
                <button type='button' className='btn btn-secondary' id='close' onClick={closeDetails}>Close</button>
                {
                    !loading && !error && data && (
                        <>

                    {/* // <div className="col-md-4">
                    // <div className="d-flex " style={{flexDirection: "column", textAlign:"center", justifyContent:"start" }}> */}
                     
                        <h5> { data.Book.title }</h5>
                      
                        <div className='mb-3 about'> 
                            <h6>About the book</h6>

                            <p id='genre'>genre: { data.Book.genre }</p>
    
                            <p id='description'>Description: { data.Book.description }</p>
                        </div>

                        <div className='mb-3 about'> 
                            <h6>About the Author</h6>

                            <p id='genre'>Author: { data.Book.author.name }</p>
    
                            <p id='description'>Related Books:</p>
                            {  data.Book.author.books.filter(book =>
                                    book.id !== data.Book.id
                                ).map(book => 
                                    
                                    <div key={book.id}>
                                        <p>{book.title}</p>
                                    </div>
                                )
                            }
                        </div>

                    </>
                    )
                }
                <button type='button' onClick={() => deleteBook(bookId)} className="btn btn-danger">Delete Book</button>
            </div>


        </>
    )
}
