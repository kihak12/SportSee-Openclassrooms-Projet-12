import styles from './Layout.module.css';

import {Header} from "../components/header/Header.jsx";
import {SideBar} from "../components/sidebar/SideBar.jsx";
import PropTypes from "prop-types";

export const Layout = ({children}) => {
    return (
        <>
            <Header />
            <div className={styles.content}>
                <SideBar />
                {children}
            </div>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.element.isRequired
}
