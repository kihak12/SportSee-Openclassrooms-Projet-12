import styles from './StatisticCard.module.css';
import PropTypes from "prop-types";

export const StatisticCard = ({title, subTitle, glyph, color}) => {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <div className={styles.iconBackground} style={{'backgroundColor': color}}></div>
                    {glyph}
                </div>
                <div>
                    <h1 className={styles.title}>{title}</h1>
                    <h2 className={styles.subTitle}>{subTitle}</h2>
                </div>
            </div>
        </>
    )
}

StatisticCard.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    glyph: PropTypes.element.isRequired,
    color: PropTypes.string.isRequired,
}
