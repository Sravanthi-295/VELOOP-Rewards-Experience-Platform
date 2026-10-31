import { useEffect, useRef, useState } from "react";
import {
  Activity, ArrowRight, Award, Check, ChevronRight,
  Crown, Gamepad2, Gift, LockKeyhole, Medal,
  Shield, Sparkles, Star, Target, Trophy, Zap
} from "lucide-react";

import styles from "./Dashboard.module.css";

const levels = [
  { level: 1, name: "Starter", tone: "bronze", icon: Star },
  { level: 2, name: "Explorer", tone: "silver", icon: Shield },
  { level: 3, name: "Achiever", tone: "gold", icon: Medal },
  { level: 4, name: "Champion", tone: "champion", icon: Crown },
  { level: 5, name: "Elite", tone: "platinum", icon: Trophy },
  { level: 6, name: "Legend", tone: "legend", icon: Crown },
];

const currentXP = 4200;
const currentLevel = 4;
const nextLevelXP = 5000;
const progress = Math.round((currentXP / nextLevelXP) * 100);

function LevelBadge({ item, active = false, locked = false, large = false }) {
  const Icon = item.icon;

  return (
    <div className={`${styles.badgeWrap} ${large ? styles.badgeLarge : ""}`}>
      <div className={`${styles.badge} ${styles[item.tone]} ${active ? styles.badgeActive : ""}`}>
        <span className={styles.badgeShine} />
        <span className={styles.badgeNumber}>
          {String(item.level).padStart(2, "0")}
        </span>
        <Icon className={styles.badgeIcon} />

        {active && (
          <span className={styles.badgeCrown}>
            <Crown size={18} />
          </span>
        )}
      </div>

      {active && <span className={styles.badgeRibbon}>CHAMPION</span>}

      {locked && (
        <span className={styles.lockDot}>
          <LockKeyhole size={12} />
        </span>
      )}

      {!locked && !active && item.level < currentLevel && (
        <span className={styles.checkDot}>
          <Check size={13} />
        </span>
      )}
    </div>
  );
}

function GiftIllustration() {
  return (
    <div className={styles.giftStage}>
      <div className={styles.giftHalo} />

      <div className={styles.giftBox}>
        <div className={styles.giftLid}>
          <span className={styles.ribbonLoopLeft} />
          <span className={styles.ribbonLoopRight} />
          <span className={styles.ribbonKnot} />
        </div>

        <div className={styles.giftBody}>
          <span className={styles.giftRibbonVertical} />
          <span className={styles.giftRibbonHorizontal} />
          <span className={styles.giftV}>V</span>
        </div>
      </div>

      <div className={styles.giftBase} />
      <Sparkles className={styles.giftSparkleOne} />
      <Sparkles className={styles.giftSparkleTwo} />
    </div>
  );
}

export default function Dashboard() {
  const [gameState, setGameState] = useState("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startGame = () => {
    clearInterval(timerRef.current);

    setScore(0);
    setTimeLeft(15);
    setGameState("playing");

    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timerRef.current);
          setGameState("finished");
          return 0;
        }

        return time - 1;
      });
    }, 1000);
  };

  return (
    <main className={styles.page}>
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        <header className={styles.header}>
          <a className={styles.brand} href="/">
            <span className={styles.brandMark}>V</span>
            <span>
              <strong>VELOOP</strong>
              <small>REWARDS</small>
            </span>
          </a>

          <div className={styles.headerRight}>
            <span className={styles.status}>
              <i /> IN PROGRESS
            </span>
            <div className={styles.avatar}>S</div>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <div className={`${styles.orbit} ${styles.orbitOne}`} />
            <div className={`${styles.orbit} ${styles.orbitTwo}`} />

            <LevelBadge item={levels[3]} active large />

            <span className={styles.heroSparkle}>
              <Sparkles />
            </span>
          </div>

          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <Crown size={16} /> YOUR CURRENT LEVEL
            </span>

            <p className={styles.levelNumber}>LEVEL 04</p>
            <h1>Champion</h1>

            <p className={styles.subText}>
              You are making great progress. Keep going to unlock your next reward.
            </p>
          </div>
        </section>

        <section className={styles.xpSection}>
          <div className={styles.sectionLine}>
            <span className={styles.sectionLabel}>
              <Zap /> XP PROGRESS
            </span>

            <strong>
              {currentXP.toLocaleString()}{" "}
              <span>/ {nextLevelXP.toLocaleString()}</span>
            </strong>
          </div>

          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={styles.progressMeta}>
            <span><b>{progress}%</b> completed</span>
            <strong>{(nextLevelXP - currentXP).toLocaleString()} XP to go</strong>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.stat}>
            <Zap />
            <span>Total XP</span>
            <strong>{currentXP.toLocaleString()}</strong>
          </div>

          <div className={styles.stat}>
            <Trophy />
            <span>Current Level</span>
            <strong>{currentLevel}</strong>
          </div>

          <div className={styles.stat}>
            <Target />
            <span>Next Goal</span>
            <strong>Level 5</strong>
          </div>
        </section>

        <section className={styles.rewardCard}>
          <div className={styles.rewardCopy}>
            <span className={styles.sectionLabel}>
              <Gift /> YOUR NEXT REWARD
            </span>

            <h2>500 VEs</h2>

            <p>
              Keep earning XP to reach your next milestone.
            </p>

            <span className={styles.unlockPill}>
              <LockKeyhole /> Unlock at Level 5
            </span>
          </div>

          <GiftIllustration />
        </section>

        <section className={styles.progressionCard}>
          <div className={styles.cardHeading}>
            <h2><Activity /> LEVEL PROGRESSION</h2>
            <span>YOUR JOURNEY</span>
          </div>

          <div className={styles.levelTrack}>
            {levels.map((item, index) => {
              const locked = item.level > currentLevel;
              const active = item.level === currentLevel;

              return (
                <div className={styles.levelStep} key={item.level}>
                  <LevelBadge
                    item={item}
                    active={active}
                    locked={locked}
                  />

                  <strong className={active ? styles.activeLevelName : ""}>
                    Level {item.level}
                  </strong>

                  <span>{item.name}</span>

                  {index < levels.length - 1 && (
                    <div
                      className={`${styles.connector} ${
                        item.level < currentLevel ? styles.connectorDone : ""
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.gameCard}>
          <div className={styles.gameIcon}>
            <Gamepad2 />
          </div>

          <div className={styles.gameContent}>
            <span className={styles.gameKicker}>
              PLAY · EARN · LEVEL UP
            </span>

            <h2>Level-Up Arcade</h2>
            <p>Catch coins, earn rewards and boost your XP!</p>

            {gameState === "ready" && (
              <button className={styles.playButton} onClick={startGame}>
                Play Now <ChevronRight />
              </button>
            )}

            {gameState === "playing" && (
              <div className={styles.gameControls}>
                <span className={styles.gameScore}>
                  Time: {timeLeft}s · Coins: {score}
                </span>

                <button
                  className={styles.playButton}
                  onClick={() => setScore((s) => s + 1)}
                >
                  Catch coin <Zap />
                </button>
              </div>
            )}

            {gameState === "finished" && (
              <div className={styles.gameControls}>
                <span className={styles.gameScore}>
                  Time's up! You caught {score} coins.
                </span>

                <button className={styles.playButton} onClick={startGame}>
                  Play again <ArrowRight />
                </button>
              </div>
            )}
          </div>

          <div className={styles.floatingCoin}>V</div>
        </section>

        <section className={styles.earnCard}>
          <div>
            <span className={styles.sectionLabel}>
              <Sparkles /> KEEP YOUR MOMENTUM
            </span>

            <h2>More ways to earn</h2>

            <p>
              Complete activities and keep moving towards your next level.
            </p>
          </div>

          <div className={styles.earnIcon}>
            <Award />
          </div>
        </section>

        <footer className={styles.footer}>
          © 2026 VELOOP REWARDS
          <span>LEVEL UP YOUR JOURNEY</span>
        </footer>
      </div>
    </main>
  );
}

