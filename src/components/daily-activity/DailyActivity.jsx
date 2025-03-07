import styles from "./DailyActivity.module.css";
import {string} from "prop-types";
import {getDailyActivity} from "../../api/BackendCaller.jsx";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {colorGraphMain, colorGraphSecondary, colorWhite, colorGraphLightGray} from "../../shared/variables.module.scss";
import {DailyActivityTooltip} from "../daily-activity-tooltip/DailyActivityTooltip.jsx";

export const DailyActivity = ({userId}) => {
    const dailyActivities  = getDailyActivity(userId).data;
    return (
        <>
            <div className={styles.content}>
                <div className={styles.chartTitleContainer}>
                    <h1 className={styles.title}>Activité quotidienne</h1>
                    <div className={styles.statisticContainer} >
                        <div className={styles.statisticLine} >
                            <span className={`${styles.dot} ${styles.secondary}`}></span>
                            <span className={styles.statisticTitle}>Poids (kg)</span>
                        </div>
                        <div className={styles.statisticLine}>
                            <span className={`${styles.dot} ${styles.main}`}></span>
                            <span className={styles.statisticTitle}>Calories brûlées (kCal)</span>
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={dailyActivities.sessions} barGap={10}>
                        <CartesianGrid vertical={false} strokeDasharray="3"/>
                        <XAxis type="category" tickLine={false} tickSize={15} />
                        <YAxis type="number" orientation="right" tickLine={false} tickSize={15} color="#ffffff"/>
                        <Tooltip cursor={{fill: colorGraphLightGray}}
                                 content={<DailyActivityTooltip/>}
                                 contentStyle={{backgroundColor: colorGraphMain}}
                                 itemStyle={{color: colorWhite}}/>
                        <Bar barSize={10} dataKey="kilogram" fill={colorGraphSecondary}/>
                        <Bar barSize={10} dataKey="calories" fill={colorGraphMain}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

DailyActivity.propTypes = {
    userId: string.isRequired
};

const RoundedRectangle = (props) => {
    console.log(props);
    const { fill, x, y, width, height, value } = props;

    return (
        <svg>
            <path d={`M ${x} ${y + height} H ${x + width} V ${value / 3} H ${x} Z`} fill={fill}/>
        </svg>
    )
};
