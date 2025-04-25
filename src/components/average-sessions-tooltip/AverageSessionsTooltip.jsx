import PropTypes from "prop-types";
import styles from "./AverageSessionsTooltip.module.css";


export const AverageSessionsTooltip = (props) => {
    return <>
        <div className={styles.content}>
            { props.payload.map((item, index) => (<h1 key={index} className={styles.item}>{`${item.value} min`}</h1>)) }
        </div>
    </>
}

AverageSessionsTooltip.propTypes = {
    payload: PropTypes.arrayOf(PropTypes.object),
};
