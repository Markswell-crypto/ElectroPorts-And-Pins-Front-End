import React from 'react';
import { Carousel } from 'react-bootstrap';
import Accessories from './Accessories';
import Phones from './Phones';
import SoundDevices from './SoundDevices';
import "../HomePage.css"

function HomePage() {
  const carouselItems = [
    {
      img: "https://www.reliancedigital.in/medias/Smartwatch-Carnival-Carousel-Banner-D.jpg?context=bWFzdGVyfGltYWdlc3w5MTMyMnxpbWFnZS9qcGVnfGltYWdlcy9oYmYvaGFmLzk5Mjk4MzI1NjI3MTguanBnfDBkOTJjZDk5YTI1MTU3NWU5MDc1NGQ0ZDg2YjFlOWRhOGRhN2FiMzgxMDY3YWI5Y2M1NDk0MjNjZjU1MzNjYjY",
      caption: "Slide   1",
    },
    {
      img: "https://www.reliancedigital.in/medias/Accessories-Fiesta-Carousel-Banner-D.jpg?context=bWFzdGVyfGltYWdlc3w5MTAwN3xpbWFnZS9qcGVnfGltYWdlcy9oY2MvaDI5Lzk5Mjk4MTAyMTQ5NDIuanBnfGUxYTc3MTMzNThhNzlkZGQyNTNlYTYxMzM3OWM4NzQzYjY2YWYwYzFkNjhhMjA5M2YwNDhiYTMwMzA2ZGY5MTY",
      caption: "Slide   2",
    },
    {
      img: "https://www.reliancedigital.in/medias/Entertainment-Fest-Carousel-Banner-08-D.jpg?context=bWFzdGVyfGltYWdlc3wyMDEwMzl8aW1hZ2UvanBlZ3xpbWFnZXMvaGQxL2g2MS85OTI5MTgxNjI2Mzk4LmpwZ3w2MjQzNGNlODRiMmRkZmE1ZDA1Njg3MTNmM2ExMWE5ZDQ4MDJhN2VkYTBmOWVjMjg1MTdhNTM3YmNhM2E3YjM0",
      caption: "Slide   3",
    },
    {
      img: "https://www.reliancedigital.in/medias/Laptop-Carnival-Carousel-Banner-D.jpg?context=bWFzdGVyfGltYWdlc3w5MTcwNXxpbWFnZS9qcGVnfGltYWdlcy9oM2UvaDJiLzk5MzA5MTgwNjgyNTQuanBnfDM0NDIxMjI1ZmE2NjQ1MDk4MWY2MjJlMjU2Mjg0YzAxNDViYTRiM2YzMTEyYjU5OGUwNTZlNDY4NzcxYzk3M2Y",
      caption: "Slide   4",
    },
  
  ];

  const slideImages1 = [
    {
      id: 1,
      url: "https://www.reliancedigital.in/medias/GOVO-Gosurround-900-CLP-Banner-03-02-2023.jpg?context=bWFzdGVyfGltYWdlc3w3NTU5OHxpbWFnZS9qcGVnfGltYWdlcy9oMDgvaDMwLzk5NjA3OTg5NDUzMTAuanBnfDczZjA1MjFhY2Q3MTEzOWUyMDE1MzRiODYwNWM5OTNjYjFhODM0NWYwYzY4NDgzOWJkNjY1MmQ1NjgzZWM0N2Y",
    },
    {
      id: 2,
      url: "https://www.reliancedigital.in/medias/MacBook-Pro-CLP-Banner-31-01-2023.jpg?context=bWFzdGVyfGltYWdlc3w3MDc1OHxpbWFnZS9qcGVnfGltYWdlcy9oMmMvaDlkLzk5NTU0OTI2MjY0NjIuanBnfDY1YTA2ZGYyYjU0YzQxZmFkMDk3MDQ5N2RmZmVlODg0MTczYWE5YWNlOTJkMDQ1NmMyMzAwNzFhNGY5MDM2MDA",
    },
    {
      id: 3,
      url: "https://www.reliancedigital.in/medias/One-Plus-11-CLP-Desktop.jpg?context=bWFzdGVyfGltYWdlc3w3MDM0OHxpbWFnZS9qcGVnfGltYWdlcy9oMDQvaGUwLzk5NjI2MTEzMTA2MjIuanBnfGIxYTZiNzVkMjE4ZmEyY2E1NDQxMWExYWZkNGUzYTQyZDNiZTMxMWI5YmM2NWJmMjhkZWQzNzFhMjQ1ZTk5NzY",
    },
    {
      id: 4,
      url: "https://www.reliancedigital.in/medias/jiobook-Banner-1680x320.jpg?context=bWFzdGVyfGltYWdlc3wxMTYxMDJ8aW1hZ2UvanBlZ3xpbWFnZXMvaGYxL2hhNS85OTU2MjE0OTMxNDg2LmpwZ3wyOGE5ODcwYTUwYmI4ZjllZDc3NjQ4NzQyNGM5MTM0ZmViMjk1ZDVmYmE5Nzk5OTA5NzA4MzNiYzcyMmRjYzIw",
    },
    {
      id: 5,
      url: "https://www.reliancedigital.in/medias/JBL-CLP-Banner-21-02-2023.jpg?context=bWFzdGVyfGltYWdlc3wxNDY4ODh8aW1hZ2UvanBlZ3xpbWFnZXMvaDUyL2gwYS85OTY0MzM5NzU3MDg2LmpwZ3w0ZWQxMjlkMjIxMjEzMGQ1MjMyM2Q2OTY3Mjk4ZTI3MDMwY2Q2Y2Y4M2NiMjQzMzY3YzE4OTQzMGYyMGMyYzc3",
    },
  ];

  
  return (
    <div>
      <Carousel>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.img}
              alt={item.caption}
            />
            <Carousel.Caption style={{ backgroundColor: item.bgColor, color: 'white' }}>
              <h3>{item.caption}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      
      <Accessories />
      
      <Carousel>
        {slideImages1.map((slide, index) => (
          <Carousel.Item key={slide.id}>
            <img
              className="d-block w-100"
              src={slide.url}
              alt={`Slide ${slide.id}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      
      
      
      <Phones />
      <SoundDevices />
    </div>
  );
}

export default HomePage;
