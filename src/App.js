
import { useState, useEffect } from 'react';

import Gallery from './components/Gallery';
import Header from './components/Header';


const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const BASE_URL_IMAGES = `https://img.pokemondb.net/artwork/`;
function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  async function getPokemon(start, end) {

    let data = [];
    for (let i = start; i < end; i++ ) {
      let url = BASE_URL + (i + 1);
      let response = await fetch(url);
      let json = await response.json();

      const image = BASE_URL_IMAGES + json.name + '.jpg';
      json.image = image;
      data.push(json);
    }

    return data;
  }

  async function fetchData(){

    let newItems = await getPokemon(((page - 1) * itemsPerPage), page * itemsPerPage);

    if (page == 1) {
        setItems((prevItems) => [...newItems]); 
    } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
    }
    if (page >= 100 ) { 
      setHasMore(false);
    }
    if (page == 1) {
      setPage(2);
    } else {
      setPage((prevPage) => prevPage + 1);
      }  
            
  };  

  useEffect(() => {
    fetchData(); // Load initial data
  }, []);

  return (
    <>
      <Header />
      <Gallery items={items} fetchData={fetchData} hasMore={hasMore}/>
    </>
  )
}

export default App;
