import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgimage1 from "../assets/images/pic3.webp"

// Import images for collage
import image1 from "../assets/images/pic1.webp";
import image2 from "../assets/images/pic2.webp";
import image3 from "../assets/images/pic5.jpg";
import image4 from "../assets/images/pic6.jpg";
import image5 from "../assets/images/pic7.jpg";
import image6 from "../assets/images/pic8.jpg";
import image7 from "../assets/images/pic9.jpg";
import image8 from "../assets/images/pic10.jpg";
import image9 from "../assets/images/pic1.webp";

function HomeScreen() {
  const [showFirstImage, setShowFirstImage] = useState(true); 
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    window.addEventListener('resize', checkMobile);
    checkMobile(); 

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExploreClick = () => {
    navigate('/events'); // change '/events' to the actual route for your events list page
  };

  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

  return (
    <div className="App">
      <div className="app-banner">
        <div className={`image1 ${showFirstImage ? 'show' : ''}`} style={{ backgroundImage: `url(${bgimage1})` }}></div>

        <div className={`navbarmain ${scrolled ? 'navbarmain-scrolled' : ''}`} style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <Header />
        </div>

        <div className="text-container" style={{ position: 'relative', zIndex: 2 }}>
          <header className="header" 
            style={{ 
              marginTop: isMobile ? '50%' : '19%', 
              marginLeft: isMobile ? '2%' : '5%',
              color: "white"  
            }}
          >
            <h1 className="large-title header-black">Crafting Unforgettable Moments,<br/> One Event at a Time</h1>
            <p style={{ color: 'white', fontSize: '1.2rem', marginTop: '10px' }}>
              Choose the Perfect Experience for Your Special Day
            </p>
            <button 
              onClick={handleExploreClick} 
              className="main-btn mt-3"
            ><span> Design Your Perfect Day</span>
            </button>
          </header>
        </div>
      </div>

      {/* About Section */}
{/* About Section */}
{/* About Section */}
<section className="about-section py-5" style={{ backgroundColor: '#f9f9f9', maxWidth: '90%', margin: '0 auto' }}>
  <Row className="align-items-center" style={{ margin: 0 }}>
    {/* Collage Section */}
    <Col md={6} style={{ padding: 0 }}>
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // Adjusts to 3 images per row
          gap: '8px', // Creates consistent spacing between images
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`About ${index + 1}`}
            className="img-fluid shadow"
            style={{
              width: '100%',
              height: '150px', // Set a fixed height
              objectFit: 'cover',
            }}
          />
        ))}
      </div>
    </Col>

    {/* Text Section */}
    <Col md={6}>
      <h2 className="about-title mb-3" style={{ fontWeight: 'bold', fontSize: '2rem', color: '#333' }}>About Us</h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
      Atham Events – Thrissur was established with a strong desire to become an integral part of the wedding planning process, to make it a wonderful and enjoyable experience for the family. We use our imagination, creative flair and resources to accommodate everything within your budget with the disciplined track wherein we start at the basic and do the means during the course so that the pursuit does not leave out anything in the process.
        Here, we specialize in transforming visions into memorable events. With years of experience
        in event planning and management, our dedicated team brings a touch of creativity and professionalism to every occasion.
        We work on everything from start to finish - invites, venue selection, caterers, decor concepts, hospitality and transport arrangements etc.
      </p>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
        Our mission is simple – to create unforgettable moments that leave a lasting impact. Let us handle the details while you
        enjoy your perfect day, surrounded by loved ones, creating memories to cherish forever.We promise to make your wedding a unique and elegant affair so the wedding remains etched in your memory forever!
      </p>
 
    </Col>
  </Row>
</section>



      <Footer />
    </div>
  );
}

export default HomeScreen;
