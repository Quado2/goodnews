import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "../../../utils";
import { client2, client } from "../../_app";
import { gql } from "apollo-server-micro";
import { useMutation } from "@apollo/client";
import { useTheme } from "styled-components";

import Table from "../../../components/Table";
import Spinner from "../../../components/Spinner/Spinner";
import { Context } from "../../../context/Context";
import BriefNotification from "../../../components/Notification/BriefNotification";
import DashboardLayout from "../../../HOC/DashboardLayout";
import { monthList } from "../../../utils";
import styles from "./style.module.scss";
import BackdropedLoading from "../../../components/BackdropedLoading";

const CREATE_MUTATION = gql`
  mutation ($partnerInput: PartnerCreateInput!) {
    partnerCreate(partnerInput: $partnerInput) {
      partnerPayments {
        _id
        date
        plan
        date
        paidDate
        amount
        status
      }
      partnerDetails {
        memberId
        startDate
        _id
        plan
      }
    }
  }
`;

const PAY_MUTATION = gql`
  mutation ($amount: Float!, $status: String!) {
    partnerPay(amount: $amount, status: $status) {
      userErrors {
        message
      }
      partnerPayments {
        _id
        date
        plan
        date
        paidDate
        amount
        status
      }
    }
  }
`;

interface Tithe {
  date: number;
  amount: number;
  _id: string;
  isConfirmed: Boolean;
}

interface PartnerDetails {
  _id: string;
  memberId: string;
  startDate: string;
  plan: string;
}

interface DataFromServer {
  me: {
    member: {
      partnership: {
        partnerDetails: PartnerDetails;
        partnerPayments: [];
      };
      profile: [];
    };
  };
}

interface FORMINPUTS {
  inputType: string;
  prompt: string;
  name: string;
  initialValue: string | number;
}

interface themeTypes {
  colorTextPrimary: string;
  colorTextSecondary: string;
  colorSecondaryMuted: string;
  colorBorderSecondary: string;
}

interface PartnerDetails {
  plan: string;
  _id: string;
  startDate: string;
  memberId: string;
}

function getNumberOfMonths(month: string, year: number): number {
  const months = new Date().getMonth() - monthList.indexOf(month) + 1;
  const years = new Date().getFullYear() - year;
  const monthsInYears = years * 12;
  return months + monthsInYears;
}

const plans = {
  Senior: 5000,
  Junior: 2000,
  senior: 5000,
  junior: 2000,
};

function processTableData(
  partnerPayments: any[],
  partnerDetails: PartnerDetails,
  setTotalPending: any
): any {
  let tableData: any[] = [];
  let month: string;
  let year: number | string;

  //Decide the unpaid year and month
  if (partnerDetails) {
    if (partnerPayments.length > 0) {
      tableData = partnerPayments.map((data: any) => {
        return {
          ...data,
          disableButton: true,
        };
      });
      const [lastMonth, lastYear] =
        partnerPayments[partnerPayments.length - 1].date.split(" ");
      let nextMonth, nextYear;
      if (monthList.indexOf(lastMonth) >= 11) {
        nextMonth = monthList[0];
        nextYear = parseInt(lastYear) + 1;
      } else {
        nextMonth = monthList[monthList.indexOf(lastMonth) + 1];
        nextYear = parseInt(lastYear);
      }

      month = nextMonth;
      year = nextYear;
    } else {
      [month, year] = partnerDetails.startDate.split(" ");
      year = parseInt(year);
    }

    //get number of months
    const totalMonths = getNumberOfMonths(month, year);
    let startMonthIndex = monthList.indexOf(month);

    const amount = plans[partnerDetails.plan as keyof typeof plans];
    let pendingAmount = 0;
    //create array of the upaid  months..
    for (let i = 0; i < totalMonths; i++) {
      if (startMonthIndex > 11) {
        startMonthIndex = 0;
        year++;
      }
      const paymentArray = {
        date: `${monthList[startMonthIndex]} ${year}`,
        plan: partnerDetails.plan,
        amount,
        status: "Not paid",
        disableButton: false,
      };
      tableData.push(paymentArray);
      startMonthIndex++;
      pendingAmount = pendingAmount + amount;
    }
    setTotalPending(pendingAmount);
  }

  return tableData;
}

const Partnership = ({
  dataFromServer,
}: {
  dataFromServer: DataFromServer;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [showBackedLoading, setShowBackedLoading] = useState(false);
  const [tableData, setTableData] = useState<Tithe[] | []>([]);
  const [showBriefNotification, setShowBriefNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [partnerDetails, setPartnerDetails] = useState<PartnerDetails>();
  const [chosenPlan, setChosenPlan] = useState("");
  const [totalPending, setTotalPending] = useState(0);

  //@ts-ignore
  const theme: themeTypes = useTheme();

  const { setLoggedInUser, setShowDashboard } = useContext(Context);

  const [createPartner] = useMutation(CREATE_MUTATION, {
    variables: {
      partnerInput: {
        plan: "",
      },
    },
  });

  const [sendPartnerPayment] = useMutation(PAY_MUTATION, {
    variables: {
      amount: 0,
      status: "",
    },
  });

  function displayNotification(message: string, stats: string) {
    setNotificationMessage(message);
    setNotificationStatus(stats);
    setShowBriefNotification(true);
    const timeout = setTimeout(() => {
      setShowBriefNotification(false);
      return () => clearTimeout(timeout);
    }, 4000);
  }

  useEffect(() => {
    console.log(dataFromServer);
    let isMounted = true;
    const { member } = dataFromServer.me;
    const { partnerDetails, partnerPayments } = member.partnership;
    if (isMounted) {
      setTableData(
        processTableData(partnerPayments, partnerDetails, setTotalPending)
      );
      setPartnerDetails(partnerDetails);
      setLoggedInUser(member.profile);
      setShowDashboard(true);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  function registerPartnership() {
    setLoading(true);
    createPartner({
      variables: {
        partnerInput: {
          plan: chosenPlan,
        },
      },
    })
      .then((response) => {
        if (response.data) {
          const { partnerDetails, partnerPayments } =
            response.data.partnerCreate;
          setPartnerDetails(partnerDetails);
          setTableData(
            processTableData(partnerPayments, partnerDetails, setTotalPending)
          );
          displayNotification(
            "You have rigistered succesfully to partner with prophetic voice",
            "success"
          );
          setLoading(false);
        } else {
          displayNotification(
            "Could not register you, please try again",
            "failure"
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        displayNotification(
          "Something went wrong, please try again",
          "failure"
        );
      });
  }

  async function havePaid() {
    if (partnerDetails) {
      const amount = plans[partnerDetails.plan as keyof typeof plans];
      const status = "Awaiting Review";
      setShowBackedLoading(true);
      sendPartnerPayment({
        variables: {
          amount,
          status,
        },
      })
        .then((response) => {
          if (response.data) {
            const { userErrors, partnerPayments } = response.data.partnerPay;
            if (userErrors.length >= 1) {
              displayNotification(userErrors[0].message, "failure");
              setShowBackedLoading(false);
            } else {
              setTableData(
                processTableData(
                  partnerPayments,
                  partnerDetails,
                  setTotalPending
                )
              );
              displayNotification(
                "Updated your payment successfully",
                "success"
              );
              setShowBackedLoading(false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          displayNotification(
            "Failed to record the payment. Please try again.",
            "failure"
          );
          setShowBackedLoading(false);
        });
    }
  }

  function deleteRequest() {}
  function payNow() {}

  const tableHeaders = ["Date", "Plan", "Amount", "Status", "Pay Now", "Paid"];
  const tableKeys = ["date", "plan", "amount", "status"];
  const actionsData = [
    { title: "Pay Now", actioin: deleteRequest },
    { title: "I have paid", action: havePaid, color: "#08dd08" },
  ];

  const themeStyle = {
    border: `1px solid ${theme.colorTextPrimary}`,
    color: `${theme.colorTextPrimary}`,
  };

  const wrapperStyle = {
    border: `1px solid ${theme.colorBorderSecondary}`,
  };

  const disable =
    chosenPlan === "Junior" || chosenPlan === "Senior" ? false : true;

  const requestSpinner = (
    <Spinner
      textSize="1rem"
      spinnerSize="2rem"
      color="green"
      message="Registering ..."
    />
  );
  return (
    <DashboardLayout>
      <div className={styles.partner_wrapper}>
        {showBriefNotification && (
          <BriefNotification
            status={notificationStatus}
            message={notificationMessage}
          />
        )}
        {partnerDetails && partnerDetails._id ? (
          <div className={styles.partner_details}>
            {showBackedLoading && <BackdropedLoading message="Taking record" />}
            <div className={styles.prev_details} style={wrapperStyle}>
              <h3 style={{ color: theme.colorSecondaryMuted }}>
                Total pending payments:{" "}
                <span style={{ color: theme.colorTextSecondary }}>
                  {"₦" +totalPending}
                </span>{" "}
              </h3>
              <div className={styles.add_button}>
                <button style={themeStyle} onClick={() => payNow()}>
                  Pay Some
                </button>
                <button onClick={() => payNow()}>
                  Pay All - {"₦" + totalPending}
                </button>
              </div>
            </div>

            <Table
              tableData={tableData}
              tableHeaders={tableHeaders}
              tableKeys={tableKeys}
              actionsData={actionsData}
            />
          </div>
        ) : (
          <div className={styles.sign_up}>
            <h3 style={themeStyle}>
              You have not signed up to Partner with Prophetic Voice. Choose a
              plan and click the Register button bellow to get started
            </h3>
            <div className={styles.controls}>
              <select
                style={themeStyle}
                onChange={(e) => setChosenPlan(e.target.value)}
              >
                <option value="">Choose a Plan</option>
                <option value="Senior">Senior Partner - 5000</option>
                <option value="Junior">Junior Partner - 2000</option>
              </select>
              {loading ? (
                requestSpinner
              ) : (
                <button onClick={registerPartnership} disabled={disable}>
                  Register Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Partnership;

export async function getServerSideProps(context: any) {
  const cookies = context.req.headers.cookie;
  const token = getCookie("nekot", cookies);
  const { data } = await client2.query({
    query: gql`
      query {
        me {
          member {
            email
            profile {
              firstName
              sureName
              gender
              phone
            }
            partnership {
              partnerDetails {
                _id
                memberId
                plan
                startDate
              }
              partnerPayments {
                _id
                date
                plan
                memberId
                paidDate
                amount
                status
              }
            }
          }
        }
      }
    `,
    context: {
      headers: {
        authorization: token,
      },
    },
    fetchPolicy: "no-cache",
  });

  if (data.me.member.profile === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/logout",
      },
      props: {},
    };
  }

  return {
    props: {
      dataFromServer: data,
    },
  };
}
