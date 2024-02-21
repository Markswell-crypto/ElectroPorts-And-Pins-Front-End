import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../landingpage.css';

 const product = [
    {
        "id": 1,
        "title": "iPhone 9",
        
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        ]
    },
    {
        "id": 2,
        "title": "iPhone X",
       
        "price": 899,
        "discountPercentage": 17.94,
        "rating": 4.44,
        "stock": 34,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/2/1.jpg",
            "https://i.dummyjson.com/data/products/2/2.jpg",
            "https://i.dummyjson.com/data/products/2/3.jpg",
            "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
        ]
    },
    {
        "id": 3,
        "title": "Samsung Universe 9",
        
        "price": 1249,
        "discountPercentage": 15.46,
        "rating": 4.09,
        "stock": 36,
        "brand": "Samsung",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/3/1.jpg"
        ]
    },
    {
        "id": 4,
        "title": "OPPOF19",
       
        "price": 280,
        "discountPercentage": 17.91,
        "rating": 4.3,
        "stock": 123,
        "brand": "OPPO",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/4/1.jpg",
            "https://i.dummyjson.com/data/products/4/2.jpg",
            "https://i.dummyjson.com/data/products/4/3.jpg",
            "https://i.dummyjson.com/data/products/4/4.jpg",
            "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
        ]
    },
    {
        "id": 5,
        "title": "Huawei P30",
       
        "price": 499,
        "discountPercentage": 10.58,
        "rating": 4.09,
        "stock": 32,
        "brand": "Huawei",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/5/1.jpg",
            "https://i.dummyjson.com/data/products/5/2.jpg",
            "https://i.dummyjson.com/data/products/5/3.jpg"
        ]
    },
    {
        "id": 6,
        "title": "MacBook Pro",
       
        "price": 1749,
        "discountPercentage": 11.02,
        "rating": 4.57,
        "stock": 83,
        "brand": "Apple",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/6/thumbnail.png",
        "images": [
            "https://i.dummyjson.com/data/products/6/1.png",
            "https://i.dummyjson.com/data/products/6/2.jpg",
            "https://i.dummyjson.com/data/products/6/3.png",
            "https://i.dummyjson.com/data/products/6/4.jpg"
        ]
    },
    {
        "id": 7,
        "title": "Samsung Galaxy Book",
       
        "price": 1499,
        "discountPercentage": 4.15,
        "rating": 4.25,
        "stock": 50,
        "brand": "Samsung",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/7/1.jpg",
            "https://i.dummyjson.com/data/products/7/2.jpg",
            "https://i.dummyjson.com/data/products/7/3.jpg",
            "https://i.dummyjson.com/data/products/7/thumbnail.jpg"
        ]
    },
    {
        "id": 8,
        "title": "Microsoft Surface Laptop 4",
       
        "price": 1499,
        "discountPercentage": 10.23,
        "rating": 4.43,
        "stock": 68,
        "brand": "Microsoft Surface",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/8/1.jpg",
            "https://i.dummyjson.com/data/products/8/2.jpg",
            "https://i.dummyjson.com/data/products/8/3.jpg",
            "https://i.dummyjson.com/data/products/8/4.jpg",
            "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
        ]
    },
    {
        "id": 9,
        "title": "Infinix INBOOK",
       
        "price": 1099,
        "discountPercentage": 11.83,
        "rating": 4.54,
        "stock": 96,
        "brand": "Infinix",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/9/1.jpg",
            "https://i.dummyjson.com/data/products/9/2.png",
            "https://i.dummyjson.com/data/products/9/3.png",
            "https://i.dummyjson.com/data/products/9/4.jpg",
            "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
        ]
    },
    {
        "id": 10,
        "title": "HP Pavilion 15-DK1056WM",
       
        "price": 1099,
        "discountPercentage": 6.18,
        "rating": 4.43,
        "stock": 89,
        "brand": "HP Pavilion",
        "category": "laptops",
        "thumbnail": "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
        "images": [
            "https://i.dummyjson.com/data/products/10/1.jpg",
            "https://i.dummyjson.com/data/products/10/2.jpg",
            "https://i.dummyjson.com/data/products/10/3.jpg",
            "https://i.dummyjson.com/data/products/10/thumbnail.jpeg"
        ]
    },
   
];
function LandingPage() {
  return (
    
    <div className="product-grid">
      <div className="product-info">
            <h2>Cashback Offer</h2>
            <p>Up to  80% off</p>
          </div>
      
      {product.map((item) => (
        <div key={item.id} className="product-card">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{ ...arrowStyles, left:  15 }}
                >
                  {/* Replace with your custom arrow icon */}
                  <span aria-hidden="true">&#10094;</span>
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{ ...arrowStyles, right:  15 }}
                >
                  {/* Replace with your custom arrow icon */}
                  <span aria-hidden="true">&#10095;</span>
                </button>
              )
            }
          >
            {item.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${item.title} slide ${index +  1}`} />
              </div>
            ))}
          </Carousel>
          <h2>{item.title}</h2>
          <p>Price: ${item.price}</p>
          <p>Rating: {item.rating}</p>
        </div>
      ))}
    </div>
  );
}

const arrowStyles = {
  position: 'absolute',
  top: 'calc(30% -  20px)',
  background: 'transparent',
  border: 'none',
  fontSize: '2rem',
  color: 'red',
  cursor: 'pointer',
  zIndex:  2,
  
};

export default LandingPage;