import styles from './Header.module.css';
import {SportSeeIcon} from "../icon/SportSeeIcon.jsx";
import {Link} from "react-router-dom";
import {colorMain, colorSecondary} from "../../shared/variables.module.scss";

export const Header = () => {
    return <>
        <header className={styles.content}>
            <div className={styles.headerIcon}>
                <SportSeeIcon fill={colorMain} background={colorSecondary} />
                <h1>SportSee</h1>
            </div>
            <nav className={styles.nav}>
                <Link to={'/'}>Accueil</Link>
                <Link to={'/'}>Profil</Link>
                <Link to={'/'}>Réglage</Link>
                <Link to={'/'}>Communauté</Link>
            </nav>

        </header>
    </>
}
