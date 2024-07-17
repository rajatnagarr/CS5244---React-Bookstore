import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Home.css'; // Ensure your paths are correct
import genreImage1 from '../assets/site-images/House_of_Cards_logo 1.png';
import genreImage2 from '../assets/site-images/love_logo.png';
import genreImage3 from '../assets/site-images/narcos_logo.png';
import book1Image from '../assets/site-images/sh1.jpg';
import book2Image from '../assets/site-images/sh2.jpg';
import book3Image from '../assets/site-images/sh3.jpg';
import book4Image from '../assets/site-images/sh4.jpg';
import book5Image from '../assets/site-images/sh5.jpg';
import book6Image from '../assets/site-images/sh6.jpg';
import book7Image from '../assets/site-images/sh7.jpg';
import book8Image from '../assets/site-images/sh8.jpg';
import book9Image from '../assets/site-images/sh9.jpg';
import book10Image from '../assets/site-images/sh10.jpg';
import book11Image from '../assets/site-images/sh11.jpg';
import book12Image from '../assets/site-images/sh12.jpg';
import '../assets/css/global.css';
import { useCategory } from "../contexts/CategoryContext";
import SlideComponent from "./SlideComponent"; // Updated import to use custom hook


function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Slide data containing headings and book image arrays
    const slides = [
        {
            heading: "Stranger Reads: Books for",
            genreImage: genreImage1,
            bookImages: [book1Image, book2Image, book3Image, book4Image],
            style: { backgroundColor: '#00132d'},
            category: 'Horror'
        },
        {
            heading: "First Glance Romances: Books for",
            genreImage: genreImage2,
            bookImages: [book5Image, book6Image, book7Image, book8Image],
            style: { backgroundColor: '#000000'},
            category: 'Romance'
        },
        {
            heading: "Cartel Chronicles: Books for",
            genreImage: genreImage3,
            bookImages: [book9Image, book10Image, book11Image, book12Image],
            style: { backgroundColor: '#040404'},
            category: 'Classics'

        }
    ];

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="container">
            <div className="mid" style={slides[currentSlide].style}>
                <div className="slider-controls">
                    <button className="left-arrow" style={slides[currentSlide].style} onClick={goToPreviousSlide} >&lt;</button>
                    <button className="right-arrow" style={slides[currentSlide].style} onClick={goToNextSlide}>&gt;</button>
                </div>
                <SlideComponent
                    heading={slides[currentSlide].heading}
                    genreImage={slides[currentSlide].genreImage}
                    bookImages={slides[currentSlide].bookImages}
                />
                <br/><br/>
                {/* The third div remains unchanged */}
                <div className="third">
                    <p className="quote2">Ready to dive into a world of books? Sign up with your email and enjoy a 40% discount on your first purchase!</p>
                    <Link to={`/categories/${slides[currentSlide].category}`} className="no-underline">
                        <button className="button shop-button">SHOP NOW!</button>
                    </Link>
                </div>
                <br/>
            </div>
        </div>
    );
}

export default Home;
