import styles from "./Performance.module.css";
import {string} from "prop-types";
import {getUserPerformance} from "../../api/BackendCaller.jsx";
import {colorGraphMain, colorWhite} from "../../shared/variables.module.scss";
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer} from "recharts";

export const Performance = ({userId}) => {
    const performance  = getUserPerformance(userId).data;

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
        <article className={styles.content}>
            <ResponsiveContainer width={'100%'}  height={'100%'} >
                <RadarChart outerRadius={'60%'} data={performance.data.map(item => ({...item, kind: getKindLabel(performance.kind[item.kind])}))}>
                    <PolarGrid radialLines={false} stroke={colorWhite} />
                    <PolarAngleAxis dataKey="kind" tick={{fill: colorWhite, fontSize: 12, fontWeight: 500, dominantBaseline: 'middle'}} />
                    <Radar dataKey="value" fill={colorGraphMain} fillOpacity={0.7} width={100} />
                </RadarChart>
            </ResponsiveContainer>
        </article>
    </>
}

Performance.propTypes = {
    userId: string.isRequired
}
