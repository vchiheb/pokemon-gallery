
import InfiniteScroll from 'react-infinite-scroll-component';

import GalleryCard from './GalleryCard';
import './Gallery.css';

export default function Gallery({items, fetchData, hasMore}) {
    return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<div id="loading"><h4>Loading...</h4></div>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className='gallery'>
      {items.map((item, index) => (
        <GalleryCard key={index} item={item} index={index}/>
      ))
      }

      </div>
    </InfiniteScroll>
    )
}