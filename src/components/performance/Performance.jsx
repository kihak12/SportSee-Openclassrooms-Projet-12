import styles from "./Performance.module.css";
import {string} from "prop-types";
import {getUserPerformance} from "../../api/BackendCaller.jsx";
import {colorGraphMain, colorWhite} from "../../shared/variables.module.scss";
import {PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer} from "recharts";
import {useEffect, useState} from "react";

export const Performance = ({userId}) => {
    const [performance, setPerformance] = useState(null);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingError(null);
                const data = await getUserPerformance(userId);
                setPerformance(data);
            } catch (err) {
                console.error(err)
                setLoadingError(err.message);
            }
        };

        fetchData();
    }, [userId]);

    const getKindLabel = (kind) => {
        switch (kind) {
            case 'cardio':
                return 'Cardio';
            case 'energy':
                return 'Energie';
            case 'endurance':
                return 'Endurance';
            case 'strength':
                return 'Force';
            case 'speed':
                return 'Vitesse';
            default:
                return 'Intensité';
        }
    }

    return <>
        { loadingError ? (
                <div className={styles.error}>
                    <h1>Oups!!</h1>
                    <p>Une erreur est survenue lors de la récupération des données, merci de réessayer plus tard</p>
                </div>
            )
            : performance ?
                <>
                    <article className={styles.content}>
                        <ResponsiveContainer width={'100%'}  height={'100%'} >
                            <RadarChart outerRadius={'75%'} data={performance.data.map(item => ({...item, kind: getKindLabel(performance.kind[item.kind])})).reverse()}>
                                <PolarGrid radialLines={false} stroke={colorWhite} />
                                <PolarAngleAxis dataKey="kind" tick={{fill: colorWhite, fontSize: 12, fontWeight: 500, dominantBaseline: 'middle'}} />
                                <Radar dataKey="value" fill={colorGraphMain} fillOpacity={0.7} width={100} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </article>
                </>
                :
                <>
                    <div className="pulseAnimation">
                        <div className="skeleton rounded" style={{ height: '100%'}}></div>
                    </div>
                </>
        }
    </>
}

Performance.propTypes = {
    userId: string.isRequired
}
