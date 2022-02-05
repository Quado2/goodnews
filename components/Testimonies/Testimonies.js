import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "styled-components";

import styles from "./Testimonies.module.scss";
import { data } from "./data";

function Testimony(props) {
  const theme = useTheme();

  return (
    <div className={styles.testimony} id={`${styles[`testimony_${props.id}`]}`}>
      <div
        className={styles.image}
        style={{ borderBottom: `1px solid ${theme.colorTextMuted}` }}
      >
        <Image src={props.image} alt=";" />
        <h2 style={{ color: theme.colorTextPrimary }}>{props.mName}</h2>
      </div>
      <div>
        <p style={{ color: theme.colorTextSecondary }}>
          {'" ' + props.testimony + ' "'}
        </p>
      </div>
    </div>
  );
}

function Testimonies() {
  const theme = useTheme();
  const [intervalId, setIntervalId] = useState(null);
  let [index, setIndex] = useState(1);
  const [mark, setMark] = useState({
    border: `2px solid #1fe5ff`,
    backgroundColor: "white",
  });

  useEffect(() => {
   
      const innerIntervalId = setInterval(next, 7000);
      setIntervalId(innerIntervalId);
      console.log("useEffect ran");
    

    return () => {
      // componentwillunmount in functional component.
      //clearInterval(intervalId);
    };
  }, []);

  function next() {
    setIndex((index) => {
      if (index >= data.length - 1) return 0;
      return index + 1;
    });
  }

  function nextClicked(index) {
    setIndex(index);
    //there is need to start interval afresh so we have to
    //clear it and set it again
    clearInterval(intervalId);
    const innerIntervalId = setInterval(next, 7000);
    setIntervalId(innerIntervalId);
  }

  return (
    <div className={`${styles.testimonies_wrapper}`}>
      <div
        className={`${styles.direct_wrapper} ${
          styles[`active_testimony_${index}`]
        } `}
      >
        <div
          className={`${styles.testimonies}`}
          style={{
            transform: `translateX(-${index * (100 / 5)}%)`,
          }}
        >
          {data &&
            data.map((datum) => (
              <Testimony
                key={datum.index}
                mName={datum.name}
                image={datum.image}
                testimony={datum.testimony}
                id={datum.index}
              />
            ))}
        </div>
      </div>

      <div className={styles.controls}>
        <div
          style={index === 0 ? mark : null}
          onClick={() => nextClicked(0)}
        ></div>
        <div
          style={index === 1 ? mark : null}
          onClick={() => nextClicked(1)}
        ></div>
        <div
          style={index === 2 ? mark : null}
          onClick={() => nextClicked(2)}
        ></div>
        <div
          style={index === 3 ? mark : null}
          onClick={() => nextClicked(3)}
        ></div>
        <div
          style={index === 4 ? mark : null}
          onClick={() => nextClicked(4)}
        ></div>
      </div>
    </div>
  );
}

export default Testimonies;
