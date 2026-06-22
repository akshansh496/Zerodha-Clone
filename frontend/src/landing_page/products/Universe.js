import React from "react";
export default function Universe() {
  return (
    <div className="container">
      <div className="row my-5 text-center fs-4">
        <p>
          Want to know more about our technology stack? Check out the
          Zerodha.tech blog.
        </p>
      </div>
      <div className="row text-center">
        <h3 className="fw-light mt-5">
          <b>The Zerodha Universe</b>
        </h3>
        <p className="fw-light fs-7 mt-3" style={{ fontSize: "12px" }}>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>
      <div className="row mt-5 mx-5">
        <div className="col text-center">
          <img
            className="mx-5 "
            style={{ width: "60%" }}
            src="media/zerodhaFundhouse.png"
          ></img>
        </div>
        <div className="col text-center">
          <img
            className="mx-5"
            style={{ width: "70%" }}
            src="media/sensibullLogo.svg"
          ></img>
        </div>
        <div className="col text-center">
          <img
            className="mx-5"
            style={{ width: "60%" }}
            src="media/goldenpiLogo.png"
          ></img>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p
            className="text-center text-muted mt-3"
            style={{ fontSize: "12px" }}
          >
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col">
          <p
            className="text-center text-muted mt-3"
            style={{ fontSize: "12px" }}
          >
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col">
          <p
            className="text-center text-muted  mt-3"
            style={{ fontSize: "12px" }}
          >
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
      </div>
      <div className="row mt-5 mx-5">
        <div className="col text-center">
        <img
            className="mx-5"
            style={{ width: "60%" }}
            src="media/streakLogo.png"
          ></img>
        </div>
        <div className="col text-center">
        <img
            className="mx-5"
            style={{ width: "60%" }}
            src="media/smallcaseLogo.png"
          ></img>
        </div>
        <div className="col text-center">
        <img
            className="ms-5"
            style={{ width: "50%" }}
            src="media/dittoLogo.png"
          ></img>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <p
            className="text-center text-muted  mt-3"
            style={{ fontSize: "12px" }}
          >
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col">
        <p
            className="text-center text-muted mt-3"
            style={{ fontSize: "12px" }}
          >
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col">
        <p
            className="text-center text-muted mt-3"
            style={{ fontSize: "12px" }}
          >
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
      </div>
      <div className="text-center mb-5 mt-5">
      <button className="p-2 btn btn-primary fs-5 mt-5 mb-5"style={{width:'20%',margin: '0 auto'}}>Signup for free</button>
      </div>
    </div>
  );
}
