import styles from "./HeroGlow.module.css";

export default function HeroGlow() {
  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.baseGlow} />
      <div className={styles.wave} style={{ animationDelay: "0s" }} />
      <div className={styles.wave} style={{ animationDelay: "1.16s" }} />
      <div className={styles.wave} style={{ animationDelay: "2.32s" }} />
      <div className={styles.logoWrapper}>
        <img src="/kopfwerk-symbol.svg" alt="" className={styles.logo} />
      </div>
    </div>
  );
}
