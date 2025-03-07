import styles from './userDetails.module.css';
import {useParams} from "react-router-dom";
import {Layout} from "../layout/Layout.jsx";
import {StatisticCard} from "../components/statistic-card/StatisticCard.jsx";
import {FlameIcon} from "../components/icon/FlameIcon.jsx";
import {AppleIcon} from "../components/icon/AppleIcon.jsx";
import {ChickenLegIcon} from "../components/icon/ChickenLegIcon.jsx";
import {BurgerIcon} from "../components/icon/BurgerIcon.jsx";
import {getUserDetails} from "../api/BackendCaller.jsx";
import {useState} from "react";
import {DailyActivity} from "../components/daily-activity/DailyActivity.jsx";
import {Score} from "../components/score/Score.jsx";
import {Performance} from "../components/performance/Performance.jsx";

export const UserDetails = () => {
    let { id } = useParams();

    const [user, setUser] = useState(getUserDetails(id));

    return (
        <div className={styles.container}>
            <Layout>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1 className={styles.head}>
                            Bonjour <span className={styles.accentColor}>{user.data.userInfos.firstName}</span>
                        </h1>
                        <span className={styles.subHeader}>Félicitation ! Vous avez explosé vos objectifs hier 👏</span>
                    </div>
                    <div className={`${styles.statisticsContainer} ${styles.mt50}`}>
                        <article className={styles.grid2}>
                            <DailyActivity userId={id}/>

                            <div className={styles.statisticsContainer}>
                                <h1>card</h1>
                                <Performance />
                                <Score score={user.data.score} />
                            </div>

                        </article>
                        <article className={styles.statisticsCards}>
                            <StatisticCard
                                title={`${user.data.keyData.calorieCount}kCal`}
                                subTitle={'Calories'}
                                glyph={FlameIcon({fill: '#FF0000'})}
                                color={'#FF0000'}
                            />
                            <StatisticCard
                                title={`${user.data.keyData.proteinCount}g`}
                                subTitle={'Proteines'}
                                glyph={ChickenLegIcon({fill: '#4AB8FF'})}
                                color={'#4AB8FF'}
                            />
                            <StatisticCard
                                title={`${user.data.keyData.carbohydrateCount}g`}
                                subTitle={'Glucides'}
                                glyph={AppleIcon({fill: '#FDCC0C'})}
                                color={'#FDCC0C'}
                            />
                            <StatisticCard
                                title={`${user.data.keyData.lipidCount}g`}
                                subTitle={'Lipides'}
                                glyph={BurgerIcon({fill: '#FD5181'})}
                                color={'#FD5181'}
                            />
                        </article>
                    </div>
                </div>
            </Layout>
        </div>
    );
};
