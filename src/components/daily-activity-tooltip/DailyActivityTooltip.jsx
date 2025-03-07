import PropTypes from "prop-types";
import styles from "./DailyActivityTooltip.module.css";

export const DailyActivityTooltip = (props) => {
    const getLabel = (dataKey) => {
        switch (dataKey) {
            case "kilogram":
                return "kg";
            case "calories":
                return "Kcal";
        }
    }
    return <>
        <div className={styles.content} style={{"backgroundColor": props.contentStyle.backgroundColor, "color": props.itemStyle.color}}>
            { props.payload.map((item, index) => (<div key={index} className={styles.item}>{`${item.value}${getLabel(item.dataKey)}`}</div>)) }
        </div>
    </>
}

DailyActivityTooltip.propTypes = {
    payload: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.number || PropTypes.string,
    active: PropTypes.bool,
    contentStyle: PropTypes.object,
    itemStyle: PropTypes.object
};
