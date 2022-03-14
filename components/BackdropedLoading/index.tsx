import Spinner from "../Spinner/Spinner";
import styles from "./style.module.scss";

function index({message}:{message:string}) {
  return (
    <div className={styles.backdroped_wrapper}>
      <div className={styles.inner_backdrop}>
        <Spinner
          textSize="1rem"
          spinnerSize="2rem"
          color="green"
          message={message}
        />
      </div>
    </div>
  );
}

export default index;
