import Login from "../LoginScreen/Login";
import RegisterPage from "../LoginScreen/Register";

function HomeScreen() {
    return (
        <div>
            <h1>Mangalator</h1>
            <h2>Description</h2>
            Mangalator is a platform designed to help mangakas reach a wider audience. It allows artists to upload their work, which is then automatically translated, making it accessible to readers worldwide. Our goal is to help mangakas overcome the language barrier that often prevents their work from gaining popularity.

            <h2>Features</h2>
            <ul>
  
            <li><strong>Upload Your Work:</strong> Mangakas can upload their manga directly to Mangalator.  </li>

            <li><strong>Automatic Translation:</strong> Uploaded manga are automatically translated, making them accessible to a global audience. </li>

            <li><strong>Read Anywhere:</strong> Internet users worldwide can read the translated manga.</li>

            </ul>

            <h2>Contact</h2>

            For more information, questions, or feedback, please reach out to us at ___.

            <h2>Acknowledgements</h2>
            We would like to express our gratitude to all the mangakas who use Mangalator to share their work with the world.
        </div>
    );
}

export default HomeScreen;