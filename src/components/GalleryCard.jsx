import './GalleryCard.css';

export default function GalleryCard({item, index}) {
  return (
    <div className="gallery-card" key={index}>
      <h2>{item.name}</h2>
      <img src={item.image} />
    </div>
  )
}