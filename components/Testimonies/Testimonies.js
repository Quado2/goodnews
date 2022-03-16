import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "styled-components";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { gql } from "apollo-server-micro";
import { useMutation } from "@apollo/client";

import styles from "./Testimonies.module.scss";
import { data } from "./data";
import QuickForm from "../QuickForm/QuickForm";
import BriefNotification from "../Notification/BriefNotification";

const VISITOR_INPUT_MUTATION = gql`
  mutation ($visitorInput: VisitorInput) {
    visitorSubmit(visitorInput: $visitorInput) {
      success
      userErrors {
        message
      }
    }
  }
`;

const inputData = [
  {
    type: "input",
    inputType: "text",
    inputName: "name",
    placeHolder: "Full Name",
  },
  {
    type: "input",
    inputType: "text",
    inputName: "phone",
    placeHolder: "Phone Number",
  },
  {
    type: "textarea",
    inputType: "",
    inputName: "content",
    placeHolder: "Testimony",
  },
];

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
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [showBriefNotification, setShowBriefNotification] = useState(false);
  const [clearFormInputs, setClearFormInputs] = useState();

  const [submitVisitorInput] = useMutation(VISITOR_INPUT_MUTATION, {
    variables: {
      visitorInput: {
        name: "",
        phone: "",
        content: "'",
        type: "",
      },
    },
  });

  function displayNotification(message, stats) {
    setNotificationMessage(message);
    setNotificationStatus(stats);
    setShowBriefNotification(true);
    const timeout = setTimeout(() => {
      setShowBriefNotification(false);
      return () => clearTimeout(timeout);
    }, 4000);
  }

  function handleQuickform(formContent, inputData) {
    setErrorFlag(false);
    setErrorMessage([]);
    setLoading(true);
    let isError = false;
    setLoadingMessage("Submiting your testimony");
    Object.keys(formContent).map((key) => {
      if (formContent[key].length < 1) {
        setErrorFlag(true);
        isError = true;
        //setLoading(false);
        const { placeHolder } = inputData.find((o) => o.inputName === key);
        setErrorMessage((prevMessage) => [
          ...prevMessage,
          placeHolder + " cannot be empty",
        ]);
      }
    });
    if (isError) {
      return;
    }

    const { name, content, phone } = formContent;
    submitVisitorInput({
      variables: {
        visitorInput: {
          content,
          phone,
          type: "Testimony",
          name,
        },
      },
    })
      .then((resp) => {
        console.log({ resp });
        const { success, userErrors } = resp.data.visitorSubmit;
        if (userErrors.length >= 1) {
          displayNotification(
            "Something went wrong, check your network and try again",
            "failure"
          );
          setLoading(false);
        } else {
          displayNotification(
            "Successfull !! We have recieved your testimony",
            "success"
          );
          setClearFormInputs(new Date().getTime());
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        displayNotification(
          "Something went wrong, check your network and try again",
          "failure"
        );
        setLoading(false);
      });
  }

  const theme = useTheme();
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(1);
  const [intervalCall, resetIntervalCall] = useState(1);
  const [mark, setMark] = useState({
    border: `2px solid #1fe5ff`,
    backgroundColor: "white",
  });

  useEffect(() => {
    intervalRef.current = setInterval(next, 7000);
    return () => {
      // componentwillunmount in functional component.
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [intervalCall]);

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
    resetIntervalCall(index);
  }

  function nextTestimony() {
    const newIndex = index >= data.length - 1 ? 0 : index + 1;
    nextClicked(newIndex);
  }

  function prevTestimony() {
    const newIndex = index <= 0 ? data.length - 1 : index - 1;
    nextClicked(newIndex);
  }

  return (
    <div className={styles.main_testimonies_wrapper}>
      {showBriefNotification && (
        <BriefNotification
          status={notificationStatus}
          message={notificationMessage}
        />
      )}
      <div className={`${styles.testimonies_wrapper}`}>
        <div className={styles.next_Icons}>
          <IconContext.Provider value={{ color: theme.colorButtonPrimary }}>
            <div onClick={prevTestimony}>
              <span
                onClick={prevTestimony}
                style={{ border: `1px solid ${theme.colorButtonPrimary}` }}
              >
                <BsFillCaretLeftFill />
              </span>
            </div>
            <div onClick={nextTestimony}>
              <span
                onClick={nextTestimony}
                style={{ border: `1px solid ${theme.colorButtonPrimary}` }}
              >
                <BsFillCaretRightFill />
              </span>
            </div>
          </IconContext.Provider>
        </div>
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
        s
      </div>
      <div className={styles.quick_form}>
        <QuickForm
          inputData={inputData}
          message="Share your Testimony"
          handleQuickform={handleQuickform}
          errorFlag={errorFlag}
          errorMessage={errorMessage}
          loading={loading}
          loadingMessage={loadingMessage}
          clearFormInputs={clearFormInputs}
        />
      </div>
    </div>
  );
}

export default Testimonies;
