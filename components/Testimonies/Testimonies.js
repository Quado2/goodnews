import React, { Component } from "react";
import Image from "next/image";
import { useTheme } from "styled-components";

import styles from "./Testimonies.module.scss";
import nigerian1 from "../../assets/images/nigerianman1.jpg";
import nigerian2 from "../../assets/images/nigerian2.jpg";
import nigerian3 from "../../assets/images/nigerian.jpg";
import south from "../../assets/images/south.jpg";
import malawi from "../../assets/images/malawi.webp";

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

class Testimonies extends Component {
  data = [
    {
      index: 0,
      name: "Jacinta Akintoye",
      image: nigerian2,
      testimony:
        "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths",
    },

    {
      index: 1,
      name: "Okoro David",
      image: south,
      testimony:
        "Do nothing from selfish ambition or conceit, but in humility count others more significant than yourselves. Let each of you look not only to his own interests, but also to the interests of others.",
    },
    {
      index: 2,
      name: "Kwame Wedeh",
      image: nigerian1,
      testimony:
        "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.",
    },

    {
      index: 3,
      Name: "Kelvin Babafemi",
      image: nigerian3,
      testimony:
        "And we know that for those who love God all things work together for good, for those who are called according to His purpose.",
    },
    {
      index: 4,
      name: "Ekrema Mayamiko",
      image: malawi,
      testimony: "God took me to the next level",
    },
  ];

  state = {
    index: 1,
    mark: {
      border: `2px solid #1fe5ff`,
      backgroundColor: "white",
    },
    intervalId: null,
  };

  componentDidMount = () => {
    const intervalId = setInterval(this.next, 7000);
    this.setState({ intervalId: intervalId });
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  nextClicked = (index) => () => {
    this.setState({ index: index });
    //there is need to start interval afresh so we have to
    //clear it and set it again
    clearInterval(this.state.intervalId);
    const intervalId = setInterval(this.next, 7000);
    this.setState({ intervalId: intervalId });
  };

  next = () => {
    if (this.state.index >= this.data.length - 1) {
      this.setState({ index: 0 });
    } else {
      this.setState({ index: this.state.index + 1 });
    }
  };

  render = () => {
    const { index, mark } = this.state;

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
            {this.data.map((datum) => (
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
            onClick={this.nextClicked(0)}
          ></div>
          <div
            style={index === 1 ? mark : null}
            onClick={this.nextClicked(1)}
          ></div>
          <div
            style={index === 2 ? mark : null}
            onClick={this.nextClicked(2)}
          ></div>
          <div
            style={index === 3 ? mark : null}
            onClick={this.nextClicked(3)}
          ></div>
          <div
            style={index === 4 ? mark : null}
            onClick={this.nextClicked(4)}
          ></div>
        </div>
      </div>
    );
  };
}

export default Testimonies;
