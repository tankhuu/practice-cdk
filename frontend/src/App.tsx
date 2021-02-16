import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [allPhotos, setAllPhotos] = useState([])
  async function fetchPhotos() {
    const {data} = await axios.get(`${baseUri}photos`)
    setAllPhotos(data)
  }
  useEffect(() => {
    fetchPhotos();
  }, [])
  
  const baseUri: string = process.env.REACT_APP_API_URL!

  function getCarouselImage(photo: any) {
    return <Carousel.Item interval={1000} style={{height: 350}}>
      <img src={photo.url} alt={photo.fileName} className='h-100'/>
      <Carousel.Caption>
        <h3 style={{backgroundColor: 'rgba(0,0,0,.3)'}}>{ photo.fileName }</h3>
      </Carousel.Caption>
    </Carousel.Item>
  }
  return (
    <div className="App bg-secondary min-vh-100">
      <h1 className="display-3 p-3 mb-5">All Icons</h1>
      <Carousel>
        {allPhotos.map(photo => getCarouselImage(photo))}
      </Carousel>
    </div>
  );
}

export default App;
