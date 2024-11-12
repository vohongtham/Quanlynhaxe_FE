import React from 'react';
// import '../assets/styles/main.css';  // Import CSS for HomePage
// import xeravaoImg from '../assets/imgs/xeravao.png';  // Import image
// import backGroundIMG1 from '../assets/imgs/xeravao.png'
import background from '../assets/imgs/background.png'

function HomePage() {
  return (
    <div 
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '85vh',
      // marginTop: '20px',
      // margin: '60px',
      width: '80',
      height: '350',
    }}
    >
    </div>
  );
}

export default HomePage;

