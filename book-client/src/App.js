import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import { Books } from './components';
// import AddBook from './components/AddBook';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      Books: {
        merge(exsiting, incoming) {
          return incoming;
        }
      },
      Authors: {
        merge(exsiting, incoming) {
          return incoming;
        }
      }
    }
  }
})


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache
  
})

function App() {

  return (
    <>
      <ApolloProvider client={client}>

        <div className='container'>
              <h1>Book Reading List</h1>
              <Router>
                <Routes>
                  <Route path='/' element={ <Books/> } />
                  {/* <Route path='/books/new' element={ <AddBook /> } /> */}
                  {/* <Route path='/books/:id' element={ <BookDetails/> } /> */}
                </Routes>
              </Router>

              {/* <BookDetails />
              }></Route> */}
        </div>  

      </ApolloProvider>
    </>
  );
}

export default App;
