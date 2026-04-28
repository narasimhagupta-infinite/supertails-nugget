import { SUCCESS_GIF_URL } from '../constants/config';
import './SuccessScreen.css';

export default function SuccessScreen() {
    return (
        <div className="success-screen">
            <img
                src={SUCCESS_GIF_URL}
                alt="Success animation"
                className="success-screen__gif"
            />
            <h2 className="success-screen__title">Image Uploaded Successfully!</h2>
        </div>
    );
}
