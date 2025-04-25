import styles from './userDetails.module.css';
import {useParams} from "react-router-dom";
import {Layout} from "../layout/Layout.jsx";
import {StatisticCard} from "../components/statistic-card/StatisticCard.jsx";
import {FlameIcon} from "../components/icon/FlameIcon.jsx";
import {AppleIcon} from "../components/icon/AppleIcon.jsx";
import {ChickenLegIcon} from "../components/icon/ChickenLegIcon.jsx";
import {BurgerIcon} from "../components/icon/BurgerIcon.jsx";
import {getUserDetails} from "../api/BackendCaller.jsx";
import {useEffect, useState} from "react";
import {DailyActivity} from "../components/daily-activity/DailyActivity.jsx";
import {Score} from "../components/score/Score.jsx";
import {Performance} from "../components/performance/Performance.jsx";
import {AverageSessions} from "../components/average-sessions/AverageSessions.jsx";

export const UserDetails = () => {
    let { id } = useParams();

    const [user, setUser] = useState(null);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingError(null);
                const data = await getUserDetails(id);
                setUser(data);
            } catch (err) {
                setLoadingError(err.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className={styles.container}>
            <Layout>
                <div className={styles.content}>
                { loadingError ? (
                    <div className={styles.error}>
                        <h1>Oups!!</h1>
                        <p>Une erreur est survenue lors de la récupération des données, merci de réessayer plus tard</p>
                    </div>
                ) :
                    <div>
                        <div className={styles.header}>
                            { user ?
                                <>
                                    <h1 className={styles.head}>
                                        { user ? <>Bonjour <span className={styles.accentColor}>{user.userInfos.firstName}</span></> : <>Loading</>}

                                    </h1>
                                    <span className={styles.subHeader}>Félicitation ! Vous avez explosé vos objectifs hier 👏</span>
                                </>
                            :
                                <>
                                    <div className="pulseAnimation">
                                        <h1 className={styles.head}>
                                            <div className="skeleton" style={{ height: '58px', width: '300px', marginBottom: '30px'}}></div>
                                        </h1>
                                        <span className={styles.subHeader}>
                                        <div className="skeleton" style={{ height: '24px', width: '400px'}}></div>
                                        </span>
                                    </div>
                                </>
                            }
                        </div>
                        <div className={`${styles.statisticsContainer} ${styles.mt50}`}>
                            <article className={styles.grid2}>
                                <DailyActivity userId={id}/>
                                <div className={`${styles.statisticsContainer} ${styles.statisticsContainer30}`}>
                                    <AverageSessions userId={id} />
                                    <Performance userId={id} />
                                    { user ?
                                        <>
                                            <Score score={user.score} />
                                        </>
                                        :
                                        <>
                                            <div className="pulseAnimation">
                                                <div className="skeleton rounded" style={{ height: '250px'}}></div>
                                            </div>
                                        </>
                                    }
                                </div>

                            </article>
                            <article className={styles.statisticsCards}>
                                { user ?
                                    <>
                                        <StatisticCard
                                            title={`${user.keyData.calorieCount}kCal`}
                                            subTitle={'Calories'}
                                            glyph={FlameIcon({fill: '#FF0000'})}
                                            color={'#FF0000'}
                                        />
                                        <StatisticCard
                                            title={`${user.keyData.proteinCount}g`}
                                            subTitle={'Proteines'}
                                            glyph={ChickenLegIcon({fill: '#4AB8FF'})}
                                            color={'#4AB8FF'}
                                        />
                                        <StatisticCard
                                            title={`${user.keyData.carbohydrateCount}g`}
                                            subTitle={'Glucides'}
                                            glyph={AppleIcon({fill: '#FDCC0C'})}
                                            color={'#FDCC0C'}
                                        />
                                        <StatisticCard
                                            title={`${user.keyData.lipidCount}g`}
                                            subTitle={'Lipides'}
                                            glyph={BurgerIcon({fill: '#FD5181'})}
                                            color={'#FD5181'}
                                        />
                                    </>
                                    :
                                    <>
                                        <div className="pulseAnimation">
                                            <div className="skeleton rounded" style={{ height: '130px', marginBottom: '34px'}}></div>
                                            <div className="skeleton rounded" style={{ height: '130px', marginBottom: '34px'}}></div>
                                            <div className="skeleton rounded" style={{ height: '130px', marginBottom: '34px'}}></div>
                                            <div className="skeleton rounded" style={{ height: '130px'}}></div>
                                        </div>
                                    </>
                                }
                            </article>
                        </div>
                    </div>
                }
                </div>
            </Layout>
        </div>
    );
};
