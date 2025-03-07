import styles from './Score.module.css';
import {number} from "prop-types";
import {Pie, PieChart} from "recharts";
import {colorLightGray, colorGraphRed} from "../../shared/variables.module.scss";

export const Score = ({score}) => {
    const scoreData = [
        {
            "value": score * 100,
            fill: colorGraphRed
        },
        {
            "value": 100 - score * 100,
            fill: colorLightGray
        },
    ];

    const getScoreValueLabel =() => score * 100;

    return <>
        <article className={styles.content}>
            <h1 className={styles.title}>Score</h1>


            <div className={styles.scoreGraphContainer}>
                <div className={styles.scoreGraphDetailsContainer}>
                    <div className={styles.scoreGraphDetails}>
                        <h2 className={styles.title}>{getScoreValueLabel()}%</h2>
                        <span className={styles.subTitle}>de votre objectif</span>
                    </div>
                </div>
                <PieChart width={180} height={180}>
                    <Pie data={scoreData} dataKey="value" nameKey="name"
                         cx="50%" cy="50%"
                         startAngle={210}
                         endAngle={-30}
                         innerRadius={65}
                         outerRadius={80}
                         cornerRadius={10}
                    />
                </PieChart>
            </div>
        </article>
    </>
}

Score.propTypes = {
    score: number.isRequired
}
