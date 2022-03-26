import styles from "./Message.module.scss";

export default function Message({message}:{message: string}) {
  return (
    <div className={styles.wrapper}>
      <h3>
        {message}
      </h3>
    </div>
  );
}
