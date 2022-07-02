import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Col, Row, Timeline, Card, Button, Result, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toastNotification } from "../../../utils/toastNotification";
import {
  clearUpdateOneUser,
  updateOneUser,
  createPayment,
  clearCreateNewPayment,
} from "../../../store/actions/actions";
import { LoadingOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

const { Meta } = Card;

export default function App() {
  const token = localStorage.getItem("eBook-token");

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userResponse = useSelector(({ auth }) => auth.getOne);
  const updateResponse = useSelector(({ auth }) => auth.updateOne);
  const createResponse = useSelector(({ payments }) => payments.create);

  useEffect(() => {
    return () => {
      dispatch(clearUpdateOneUser());
      dispatch(clearCreateNewPayment());
    };
  }, []);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Credits",
            amount: {
              currency_code: "USD",
              value: 20,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      dispatch(
        createPayment({ amount: 20, user: userResponse?.data?.user?._id }, {})
      );
      const oldCredits = parseInt(userResponse?.data?.user?.credits);
      const newCredits = oldCredits + 20;
      const creditsToUpdate = newCredits.toString();
      const payload = {
        userId: userResponse?.data?.user?._id,
        username: userResponse?.data?.user?.username,
        email: userResponse?.data?.user?.email,
        credits: creditsToUpdate,
      };
      dispatch(
        updateOneUser(payload, {
          toastNotification,
          showToast: true,
          onSuccessMessage: "Credits purchased successfully!",
          onFailMessage: "Failed to purchase credits",
        })
      );
    }
  }, [success]);

  useEffect(() => {
    if (updateResponse) {
      switch (true) {
        case updateResponse.loading:
          setPaymentSuccess(false);
          setLoading(true);
          break;
        case updateResponse.success:
          setPaymentSuccess(true);
          setLoading(false);
          break;
        case updateResponse.error:
          setPaymentSuccess(false);
          setLoading(false);
          break;
        default:
          break;
      }
    }
  }, [updateResponse]);

  if (!token) return <Redirect to="/" />;
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AS4W8EbatwsVpFDFR1BhXPJqYL3GG-S4OPX-ltd-caOGBsbbBiZHDWWMo18NxtYXVuEu_mz8ff0IkSvI",
      }}
    >
      <div
        className="container"
        style={{
          //   backgroundColor: "#eeeeee",
          padding: "20px",
        }}
      >
        <Row
          xs={12}
          sm={12}
          md={24}
          lg={24}
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "80px",
            marginBottom: "80px",
          }}
        >
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Timeline>
              <Timeline.Item>Go to payments</Timeline.Item>
              <Timeline.Item>Select payment method</Timeline.Item>
              <Timeline.Item>Fill the required fields</Timeline.Item>
              <Timeline.Item>
                If payment successful, credits will be added to your profile
              </Timeline.Item>
              <Timeline.Item>
                Go to books and select a book to buy!
              </Timeline.Item>
              <Timeline.Item>Happy reading!</Timeline.Item>
            </Timeline>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            {loading ? (
              <div style={{ margin: "50 auto" }}>
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
                />
              </div>
            ) : success && paymentSuccess ? (
              <Result
                status="success"
                title="Successfully Purchased 20 Credits!"
                subTitle="20 Credits have been added to your account. Head to Book and select what you want to read!"
                extra={[
                  <Button type="primary" key="books">
                    Books
                  </Button>,
                  <Button
                    key="buy"
                    onClick={() => {
                      setSuccess(false);
                    }}
                  >
                    Buy Again
                  </Button>,
                ]}
              />
            ) : (
              <>
                <Card
                  style={{
                    width: "auto",
                  }}
                  cover={
                    <img
                      alt="example"
                      src="https://images.unsplash.com/photo-1452882628481-6a2da9481239?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    />
                  }
                  actions={[
                    <Button
                      style={{ border: "none" }}
                      onClick={() => setShow(true)}
                    >
                      Buy 20 credits
                    </Button>,
                  ]}
                >
                  <Meta
                    title="Get Credits"
                    description="Use the credits to buy books"
                  />
                </Card>
                {show ? (
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                  />
                ) : null}
              </>
            )}
          </Col>
        </Row>
      </div>
    </PayPalScriptProvider>
  );
}
