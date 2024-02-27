import Menu from './Menu';
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import "../LandingPage.css";
import Search from './Search';

const BestSellers = ({ handleDispatch }) => {
   let data = [
      {
         id:1,
         imgURL:
            "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/32011675-2ad8-4b99-9787-895caf201d28_600x.png?v=1642405569",
         productName: "boAt Watch Wave Pro",
         Ksh: 999,
         Reviews: 915,
         
         
         
      },
      {
         id: 2,
         imgURL:
            "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main1_15634ca0-9f81-4d11-b891-9a1496f709b1_600x.png?v=1641801688",
         productName: "boAt Rockerz 330",
         Ksh: 1499,
         Reviews: 258,
      },
      {
         id: 3,
         imgURL:
            "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main-img-R333_600x.png?v=1641801662",
         productName: "boAt Rockerz 333",
         Ksh: 1199,
         Rating: 4.9,
         Reviews: 58,
         
      },
      {
         id: 4,
         imgURL:
            "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main2_529ecf13-c993-4fe7-a2d6-9357f1a47db4_600x.png?v=1650387008",
         productName: "boAt Watch Xtend",
         Ksh: 3199,
         Rating: 4.8,
         Reviews: 80,
         
      },
      
     {
        id: 6,
        imgURL:
           "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/2_f3aa2756-01f3-4e39-80bc-7b4f6551c7aa_400x.png?v=1625748159",
        productName: "boAt Immortal 1000D",
        Ksh: 2299,
        Rating: 4.9,
        Reviews: 12,
     },
     {
        id: 7,
        imgURL:
           "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/IM1300_main_2_400x.png?v=1632715015",
        productName: "boAt Immortal 1300",
        Ksh: 2899,
        Rating: 6.9,
        Reviews: 8,
        
        
     },
     {
        id: 8,
        imgURL:
           "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main2-700_400x.png?v=1643632679",
        productName: "boAt Immortal 400",
        Ksh: 1999,
        Rating: 4.0,
        Reviews: 10,
        
     },
     {
      id: 9,
      imgURL:
          "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/c3d0fbbd-9479-4351-bf04-91136da2ae91_400x.png?v=1625046259",
      productName: "boAt BassHeads 100",
      Ksh: 3909,
      Rating: 3.9,
      Reviews: 100,
      
  },
  {
      id: 10,
      imgURL:
          "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/103blk_400x.png?v=1574927262",
      productName: "boAt BassHeads 103",
      Ksh: 3690,
      Rating: 9.9,
      Reviews: 150,
      
  },
  {
      id: 11,
      imgURL:
          "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/f87f98c3-9b52-4f7f-9ebe-dd10ee9517d9_400x.png?v=1633152280",
      productName: "boAt BassHeads 102",
      Ksh: 449,
      Rating: 4.0,
      Reviews: 150,
      
     
     
  },
  {
    id: 9,
    imgURL:
        "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main1_0ae2597d-dee4-42fd-9a18-eb4ae0b3bc43_400x.png?v=1647765304",
    productName: "boAt Watch Wave Pro",
    Ksh: 3299,
    Rating: 5.0,
    Reviews: 10,
    
    
},
{
    id: 10,
    imgURL:
        "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/5752f5e4-89e0-4f84-b7fe-4d9f85771046_400x.png?v=1625157753",
    productName: "boAt Watch Flash",
    Ksh: 2499,
    Rating: 5.4,
    Reviews: 17,
    
},
{
    id: 11,
    imgURL:
        "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/a6549acb-b075-4c3e-8ed3-9c9fcba32d42_400x.png?v=1625046216",
    productName: "boAt Storm",
    Ksh: 2499,
    Rating: 5.8,
    Reviews: 30,
    
},
{
    id: 12,
    imgURL:
        "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main-blue_d6503e2e-e0b1-4c4e-af28-2164903baf9f_400x.png?v=1640237576",
    productName: "boAt Watch Iris",
    Ksh: 4399,
    Rating: 3.9,
    Reviews: 14,
   
},


];

   

   const navigate = useNavigate(); // Initialize the useNavigate hook

   const handleAddToCart = (e) => {
      // Redirect to the login page when "ADD TO CART" is clicked
      navigate('/login');
   };

    return (
      <div className="bestSellerDiv ">
         <h1 className="headingText d-flex justify-content-center" style={{color:'blue', fontWeight:'bold', fontSize:'xxx-Large'}}> OFFER/ SAVE UPTO 80% </h1>
         <div className="cardsDiv d-flex flex-wrap">

            {data.map((e) => (
               <div key={e.id} className="card col-md-4">
                  <div className="imageDiv">
                  <img src={e.imgURL} alt="" style={{ width: '80%', height: 'auto' }} />
                  </div>
                  <div className="dataDiv">
                  <p className="title" style={{ fontWeight: 'bold', fontSize: '20px' }}>{e.productName}</p> 
                     <p className="reviewsDiv">
                        <AiFillStar color="red" />
                        {e.Rating} ({e.Reviews} reviews)
                     </p>
                     <hr className="linedivide"/>
                     <div className="KshDiv flex">
                        
                     </div>
                     
                     <div>
                        <button
                           onClick={() => handleAddToCart(e)} // Call handleAddToCart instead of handleDispatch
                           className="cardBtn" style={{color:'white', fontWeight:'bold', fontSize:'x-Large', backgroundColor: 'red'}}
                        >
                           ADD TO CART
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

const BoatBlogs = () => {
  return (
     <div className="boatBlogs">
        <div className="blogHeading d-flex justify-content-center">
           <h1 className="blogHead" style={{color:'blue', fontWeight:'bold', fontSize:'xxx-Large'}}>Pins$ports Blogs</h1>
        </div>
        <div className="blogImageDiv d-flex flex-row justify-content-center"> 

           <div className="blogPost">
              <img
                 className="blogImage"
                 src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Earphone_1296x_540x_25759241-1386-4661-bec0-bad7c111178f_540x.png?v=1650620291"
                 alt="" 
              />
              <p className="blogText" style={{color:'blue', fontWeight:'bold', fontSize:'x-Large'}}>
                 Earphones Buying Guide - Everything You Need To Know
              </p>
           </div>
           <div className="blogPost">
              <img
                 className="blogImage"
                 src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Main-banner_520x500_540x_d7c9944e-0985-498b-9a89-3a54d32c9dd2_520x.png?v=1650620307"
                 alt=""
              />
              <p className="blogText" style={{color:'green', fontWeight:'bold', fontSize:'x-Large'}}>
                 The Ultimate Smartwatch Guide - Get The World On Your Wrist
              </p>
           </div>
           <div className="blogPost">
              <img
                 className="blogImage"
                 src="https://cdn.shopify.com/s/files/1/0057/8938/4802/articles/blog_600x.jpg?v=1654260672"
                 alt=""
              />
              <p className="blogText" style={{color:'red', fontWeight:'bold', fontSize:'x-Large'}}>
                 It Is Time To Rock The Kenyan Streets With boAt Headphones.
              </p>
           </div>
           <div className="blogPost">
              <img
                 className="blogImage"
                 src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/desktop-banner-1_1400x.png?v=1655447552"
                 alt=""
              />
              <p className="blogText" style={{color:'black', fontWeight:'bold', fontSize:'x-Large'}}>
                 The Ultimate Smartwatch Guide - Get The World On Your Wrist
              </p>
           </div>
        </div>
        
     </div>
  );
};

const CarouselDiv = () => {
  return (
     <Carousel
        className="carousel"
        autoPlay="true"
        infiniteLoop="true"
        interval="3000"
        showThumbs=""
     >
         <div>
            <img
               src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/2000x650_1400x.png?v=1655534702"
               alt="DC"
            />
         </div>
         <div>
            <img
               src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/desktop-banner-1_1400x.png?v=1655447552"
               alt="watch"
            />
         </div>
         <div>
            <img
               src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/135-WEB_1400x.jpg?v=1655189587"
               alt="stone135"
            />
         </div>
         <div>
            <img
               src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/web34_0dc3ef24-e76e-4587-b21d-948137c138e3_1400x.jpg?v=1654670966"
               alt="boathead"
            />
         </div>
      </Carousel>
   );
};

const LandingPage = () => {
   return (
    <div className="flex" style={{ backgroundColor: 'black' }}>
      <Menu />
      <Search />
    <CarouselDiv />
    <div className="flex">
       <BestSellers />
       <BoatBlogs />
    </div>
 </div>
   );
};

export default LandingPage;