import { useQuery } from "@apollo/client"
import { BOOKS, BOOK } from "../quires";
import { Navigate } from "react-router-dom";
import BookDetails from "./BookDetails";
import AddBook from "./AddBook";
import { useState } from "react";
import Spinner from "./Spinner";

const dispalyBookDetails = () => {
    const side = document.getElementById('book-side');
    side.style.right = '0px';
    // Navigate("/new")
}

const AddNewBook = () => {
    // document.getElementById('cover').style.display= "block" 
    document.getElementById('new-book').style.top = '100px';
}

export default function Books() {

    const [select, setSelect] = useState(null);
    const [bookInfo, setBookInfo] = useState(null);

    const { loading, error, data } = useQuery(BOOKS);

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>

    if (!loading && !error) {
        console.log(data);
    }

    

    return (
        <>
            {
                !error && !loading && data && (
                    <>
                        <AddBook />
                        <a onClick={AddNewBook} className="btn btn-light">New Book</a>
                        <div className="cards">
                            {data.Books.map(book =>
                                <a key={book.id} className="card" style={{ textDecoration: 'none' }}
                                    onClick={(e) => {

                                        dispalyBookDetails();
                                        setSelect(book.id);
                                        
                                    }}
                                >
                                    <span>{book.title}</span>
                                </a>

                            )}
                        </div>
                        <BookDetails bookId={select} />
                        
                    </>
                )
            }

        </>
    )
}
