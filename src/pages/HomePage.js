import React from 'react';
// import '../assets/styles/main.css';  // Import CSS for HomePage
// import xeravaoImg from '../assets/imgs/xeravao.png';  // Import image
import backGroundIMG1 from '../assets/imgs/backgroundIMG1.jpg'

function HomePage() {
  return (
    <div 
    style={{
      backgroundImage: `url(${backGroundIMG1})`,
      // backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '85vh',
      marginTop: '-10px',
      // width: '90',
      // height: '550',
    }}>
      
      {/* <h1>Welcome to the HomePage</h1> */}
      {/* <img 
        src={xeravaoImg} 
        alt="Description of the image" 
        className="homepage-image"
      /> */}
    </div>
  );
}

export default HomePage;

