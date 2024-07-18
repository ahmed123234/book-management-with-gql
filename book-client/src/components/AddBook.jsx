import AuthorList from "./AuthorList";
import { useState } from "react";
import { AUTHORS, BOOKS } from '../quires'
import { ADD_BOOK } from "../mutations";
import { useQuery, useMutation } from '@apollo/client'
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const cancelAddition = () => {
    // document.getElementById('cover').style.display= "block" 
    document.getElementById('new-book').style.top = '-500px';
}

export default function AddBook() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [authorId, setAuthorId] = useState('')


    // const navigate = useNavigate();
    const [addBook] = useMutation(ADD_BOOK, {
        variables: {
            title,
            genre,
            description,
            authorId
        },

        // refetchQueries: [{
        //     query: BOOKS
        // }],
        update(cache, {
                 data: { addBook }
             }) {
                 const { Books} = cache.readQuery({
                     query: BOOKS
                 });
     
                 cache.writeQuery({
                     query: BOOKS,
                     data: {
                         Books: [...Books, addBook]
                     }
                 })
             },
        onCompleted: () => {
            // navigate("/")
            cancelAddition()
        }
    })

    // const { loading, error, data } = useQuery(AUTHORS);

    // if (loading) return <div id='new-book'> <Spinner /> </div>;
    // if (error) return <p>Something went wrong</p>

    // if (!loading && !error) {
    //     console.log(data);
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(title, genre, description, authorId);
        addBook(title, genre, description, authorId);

        setAuthorId('');
        setDescription('');
        setTitle('');
        setGenre('');
        // cancelAddition();
    }

    return (
        <>
            {/* <div id="cover" > */}
                <form id="new-book" onSubmit={onSubmit}>

                    <div className="mt-3">
                        <label className="form-label" htmlFor="title">Book Title</label>
                        <input className="form-control" type="text" name="title" id="title" required

                            value={title} onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <label className="form-label" htmlFor="genre">Book Genre</label>
                        <textarea className="form-control" name="genre" id="genre" required

                            value={genre} onChange={(e) => setGenre(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mt-3">
                        <label className="form-label" htmlFor="desc">Book Description</label>
                        <textarea className="form-control" name="desc" id="desc" required

                            value={description} onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mt-3">
                        <label className="form-label" htmlFor="">Author</label>
                        {/* <AuthorList /> */}
                        <select className='form-select' name="author" id="" required
                            value={`${authorId}`} onChange={(e) => setAuthorId(e.target.value)}
                        >
                            {/* <option value="">Select Author</option>
                            {
                                data && (
                                    data.Authors.map(author =>

                                        <option key={author.id} value={author.id}>{author.name}</option>
                                    )

                                )
                            } */}
                            <AuthorList />
                        </select>
                    </div>

                    <div className="mt-3">

                        <button type="submit" className="btn btn-primary ms-4">
                            <FaBook /> Submit
                        </button>

                        <button  type="button" className="btn btn-secondary ms-4"
                            onClick={cancelAddition}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            {/* </div> */}


        </>
    )
}
