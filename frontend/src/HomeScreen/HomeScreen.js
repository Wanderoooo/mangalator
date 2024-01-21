import React from 'react';
import Login from "../LoginScreen/Login";
import RegisterPage from "../LoginScreen/Register";
import './HomeScreen.css'; // Importing a CSS file
import wellwin from '../assets/well_win.png'
import example1 from '../assets/example1.png'
import example2 from '../assets/example2.png'
import example3 from '../assets/example3.png'


function HomeScreen() {
    return (
        <div className="home">
            <section className='snap'>
            <h1 className="title">Mangalator</h1>
            <div className="intro-container">
                
                <p className="intro">Welcome to Mangalator, a revolutionary platform that bridges the gap between mangakas and their global audience. Scroll down to learn more...</p>
                
            </div>
            <img src={wellwin} alt="Example 1" className="intro-image"/>
            <img src={wellwin} alt="Example 2" className="intro-image right"/>
            </section>
            <section className='snap'>
            <h2 className="description subtitle">Description</h2>
            <p className="description">Mangalator is a unique platform designed to empower mangakas by helping them reach a wider audience. By allowing artists to upload their work, which is then automatically translated using our advanced DeepL translation system, we make their creations accessible to readers worldwide. Our primary goal is to help mangakas overcome the language barrier that often hinders their work from gaining the popularity it deserves. With Mangalator, we're bringing down these barriers one manga at a time.</p>
            <div className='sep' />
            <h2 className="subtitle">Features</h2>
            <ul className="features">
                <li><strong>Upload Your Work:</strong> Mangakas can upload their manga directly to Mangalator, providing them with a simple and efficient way to share their work with the world.</li>
                <li><strong>Automatic Translation:</strong> Uploaded manga are automatically translated into multiple languages, making them accessible to a global audience. This is made possible by our integration with the powerful DeepL translation system.</li>
                <li><strong>Read Anywhere:</strong> Internet users worldwide can read the translated manga on any device, at any time. This makes it easier for readers to enjoy their favorite manga, no matter where they are.</li>
                <li><strong>Reliable Security:</strong> We understand the importance of security. That's why we've implemented a robust authentication system to ensure that your translated works are kept safe and secure.</li>
            </ul>
            </section>
            <section className='snap'>
            <h2 className='subtitle'>Our Tech Stack</h2>
            <p className="tech-stack">Mangalator was built using a modern tech stack to ensure optimal performance and user experience. We used React.js for the frontend to create a dynamic and responsive user interface. The backend was developed using FastAPI, a high-performance framework for building APIs. We chose MongoDB for our database due to its flexibility and scalability. And lastly, we integrated DeepL for the translation functionality, which is at the heart of Mangalator.</p>
            <div className="flex-container">
                <div className="flex-item">
                    <h2 className='subtitle'>Setup</h2>
                    <pre><code>python -m venv .venv<br />
                    ./.venv/Scripts/Activate<br />
                    pip install -r requirements.txt<br />
                    cd manga-image-translator<br />
                    pip install -r requirements.txt<br />
                    </code></pre>
                </div>
                <div className="flex-item">
                    <h2 className="subtitle contact">Contact</h2>
                    <p className="contact">For more information, questions, or feedback, please reach out to us at ___. We value your input and look forward to hearing from you.</p>
                </div>
            </div>
            <h2 className="subtitle">Acknowledgements</h2>
            <p className="acknowledgements">We would like to express our deepest gratitude to all the mangakas who use Mangalator to share their work with the world. Your creativity and passion inspire us every day.</p>
            </section>
        </div>
    );
}

export default HomeScreen;
