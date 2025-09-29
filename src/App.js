import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';

function Header(){
  return (
    <header>
      <h1>Pokemon Gallery</h1>
    </header>
  )
}

function PokemonCard({item, index}) {
  return (
    <div className="flex-item" key={index}>
      <h2>{item.name}</h2>
      <img src={item.image} />
    </div>
  )
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const BASE_URL_IMAGES = `https://img.pokemondb.net/artwork/`;
function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  async function getOnePokemon(id) {
    const url = BASE_URL + id;
    const response = await fetch(url);

    const data = await response.json();
    return data;
  }

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
      <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className='flex-container'>
      {items.map((item, index) => (
        <PokemonCard key={index} item={item} index={index}/>
      ))
      }

      </div>
    </InfiniteScroll>
    </>
  )
}

export default App;
