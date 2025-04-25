import styles from './AverageSessions.module.css';
import {string} from "prop-types";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {colorWhite25, colorWhite75, colorWhite} from "../../shared/variables.module.scss";
import {AverageSessionsTooltip} from "../average-sessions-tooltip/AverageSessionsTooltip.jsx";
import {useEffect, useState} from "react";
import {getUserAverageSessions} from "../../api/BackendCaller.jsx";

export const AverageSessions = ({userId}) => {
    const [averageSessions, setAverageSessions] = useState(null);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingError(null);
                const data = await getUserAverageSessions(userId);
                setAverageSessions(data);
            } catch (err) {
                console.error(err)
                setLoadingError(err.message);
            }
        };

        fetchData();
    }, [userId]);

    const numberToDay = (number) => {
        switch (number) {
            case 1:
                return 'L';
            case 2:
                return 'M';
            case 3:
                return 'M';
            case 4:
                return 'J';
            case 5:
                return 'V';
            case 6:
                return 'S';
            case 7:
                return 'D';
        }
    };

    return <>
    { loadingError ? (
            <div className={styles.error}>
                <h1>Oups!!</h1>
                <p>Une erreur est survenue lors de la récupération des données, merci de réessayer plus tard</p>
            </div>
        ) : averageSessions ?
        <article className={styles.content}>
            <h1 className={styles.title}>Durée moyenne des sessions</h1>
            <ResponsiveContainer width="100%" height="100%" >
                <LineChart data={averageSessions.sessions} >
                    <XAxis axisLine={false} tickLine={false} padding={{ left: 10, right: 10}} dataKey="day" stroke={colorWhite75} tickFormatter={(value) => numberToDay(value)} />
                    <Tooltip content={<AverageSessionsTooltip />} cursor={false}/>
                    <Line stroke="url(#colorUv)"  activeDot={{ stroke: colorWhite25, strokeWidth: 10, fill: colorWhite }} type="natural" dataKey="sessionLength" strokeWidth={3} dot={false} />
                    <YAxis hide domain={['dataMin-15', 'dataMax+30']} />
                    <defs>
                        <linearGradient
                            id="colorUv"
                        >
                            <stop
                                offset="0%"
                                stopColor="rgba(255, 255, 255, 0.4)"
                            />
                            <stop
                                offset="40%"
                                stopColor="rgba(255, 255, 255, 0.5)"
                            />
                            <stop
                                offset="60%"
                                stopColor="rgba(255, 255, 255, 0.6)"
                            />
                            <stop
                                offset="100%"
                                stopColor="rgba(255, 255, 255, 1)"
                            />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>
        </article>
        :
        <>
            <div className="pulseAnimation">
                <div className="skeleton rounded" style={{ height: '200px'}}></div>
            </div>
        </>
    }
    </>
}

AverageSessions.propTypes = {
    userId: string.isRequired
}
