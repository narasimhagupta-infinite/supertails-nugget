import { LOGO_URL } from '../constants/config';
import './Header.css';

export default function Header() {
    return (
        <header className="icp-header">
            <div className="icp-header__inner">
                <img
                    className="icp-header__logo"
                    src={LOGO_URL}
                    alt="Supertails Logo"
                    width="173"
                    height="36"
                    loading="eager"
                />
            </div>
        </header>
    );
}
