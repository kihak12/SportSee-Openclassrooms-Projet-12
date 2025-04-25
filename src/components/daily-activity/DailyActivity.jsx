import styles from "./DailyActivity.module.css";
import {string} from "prop-types";
import {getUserDailyActivity} from "../../api/BackendCaller.jsx";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {colorGraphMain, colorGraphSecondary, colorWhite, colorGraphLightGray} from "../../shared/variables.module.scss";
import {DailyActivityTooltip} from "../daily-activity-tooltip/DailyActivityTooltip.jsx";
import {useEffect, useState} from "react";

export const DailyActivity = ({userId}) => {

    const [dailyActivities, setDailyActivities] = useState(null);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingError(null);
                const data = await getUserDailyActivity(userId);
                setDailyActivities(data);
            } catch (err) {
                console.error(err)
                setLoadingError(err.message);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <>
            { loadingError ? (
                    <div className={styles.error}>
                        <h1>Oups!!</h1>
                        <p>Une erreur est survenue lors de la récupération des données, merci de réessayer plus tard</p>
                    </div>
                )
                : dailyActivities ?
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
                                    <Bar
                                        barSize={10}
                                        dataKey="kilogram"
                                        radius={[5, 5, 0, 0]}
                                        fill={colorGraphSecondary}
                                    />
                                    <Bar
                                        barSize={10}
                                        dataKey="calories"
                                        radius={[5, 5, 0, 0]}
                                        fill={colorGraphMain}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                    :
                    <>
                        <div className="pulseAnimation">
                            <div className="skeleton rounded" style={{ height: '340px'}}></div>
                        </div>
                    </>
            }
        </>
    );
}

DailyActivity.propTypes = {
    userId: string.isRequired
};
