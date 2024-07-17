import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/SlideComponent.css';

// @ts-ignore
const SlideComponent = ({ heading, genreImage, bookImages}) => {
    // Local state to control re-rendering animation
    const [render, setRender] = useState(false);

    useEffect(() => {
        // When the component receives new props, it will render with animation
        setRender(true);
        const timer = setTimeout(() => setRender(false), 500); // 500ms for the fade effect duration

        return () => clearTimeout(timer); // Cleanup the timer
    }, [heading, genreImage, bookImages]);

    return (
        <div className={`slide ${render ? 'fade-in' : ''}`}>
            <div className="first">
                <p className="quote">{heading}</p>
                <img src={genreImage} alt="Genre" className="genre"/>
                <p className="quote3">Fans</p>
            </div>
            <br/><br/>
            <div className="second">
                {bookImages.map((image : string, index: number) => (
                    <img key={index} src={image} alt={`Book ${index}`} className="book"/>
                ))}
            </div>
        </div>
    );
};

export default SlideComponent;
