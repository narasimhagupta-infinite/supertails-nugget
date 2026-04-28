import './ErrorBanner.css';

export default function ErrorBanner({ message }) {
    if (!message) return null;

    return (
        <div className="error-banner" role="alert">
            <svg className="error-banner__icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="#c62828" strokeWidth="1.5" />
                <path d="M9 5v5" stroke="#c62828" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="9" cy="13" r="1" fill="#c62828" />
            </svg>
            <span>{message}</span>
        </div>
    );
}
