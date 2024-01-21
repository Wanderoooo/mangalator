import React from 'react';
import './HomeScreen.css'; // Importing a CSS file
import wellwin from '../assets/well_win.png'
import gojoraw from '../assets/gojoraw.png'
import narutoeng from '../assets/narutoeng.png'
import narutojap from '../assets/narutojap.png'


function HomeScreen() {
    return (
        <div className="home">
            <section className='snap'>
            <h1 className="title">Mangalator</h1>
            <div className="intro-container">
                
                <p className="intro">Welcome to Mangalator, a revolutionary platform that bridges the gap between mangakas and their global audience.</p>
                
            </div>
            <div className="image-container">
                <div className="row">
                    <div className="column">
                        <img src={narutojap} alt="Image 4" className="intro-image2"/>
                        <img src={narutoeng} alt="Image 3" className="intro-image2"/>
                    </div>
                </div>
            </div>

            </section>
            <section className='snap'>
            <h2 className="description subtitle">Description</h2>
            <p className="description">Mangalator is a unique platform designed to empower mangakas by helping them reach a wider audience. By allowing artists to upload their work, which is then automatically translated using our advanced DeepL translation system, we make their creations accessible to readers worldwide. Our primary goal is to help mangakas overcome the language barrier that often hinders their work from gaining the popularity it deserves. With Mangalator, we're bringing down these barriers one manga at a time.</p>
            <h2 className="subtitle">Features</h2>
            <ul className="features">
                <li><strong>Upload Your Work:</strong> Mangakas can upload their manga directly to Mangalator, providing them with a simple and efficient way to share their work with the world.</li>
                <li><strong>Automatic Translation:</strong> Uploaded manga are automatically translated into multiple languages, making them accessible to a global audience. This is made possible by our integration with the powerful DeepL translation system.</li>
                <li><strong>Read Anywhere:</strong> Internet users worldwide can read the translated manga on any device, at any time. This makes it easier for readers to enjoy their favorite manga, no matter where they are.</li>
                <li><strong>Reliable Security:</strong> We understand the importance of security. That's why we've implemented a robust authentication system to ensure that your translated works are kept safe and secure.</li>
            </ul>
            </section>
        </div>
    );
}

export default HomeScreen;
