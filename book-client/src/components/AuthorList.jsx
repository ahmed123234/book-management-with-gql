
import { graphql } from 'graphql'
import { AUTHORS } from '../quires'
import { useQuery } from '@apollo/client'



export default function AuthorList() {

    const { loading, error, data } = useQuery(AUTHORS);

    if (loading) return <div id='new-book'> <Spinner /> </div>
    if (error) return <p>Something went wrong</p>

    if (!loading && !error) {
        console.log(data);
    }

    return (
    <>
        <select className='form-select' name="author" id="" required>
            <option value="">Select Author</option>
            {
                data && (
                    data.Authors.map(author => 
                        
                        <option  value={author.id}>{ author.name }</option>    
                    )

                )
            }                    
        </select>
    </>
  )
}
