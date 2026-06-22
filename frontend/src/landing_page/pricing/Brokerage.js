import React from "react";
export default function Brokerage() {
  return (
    <>
      <div className="container">
        <div className="row border-top">
          <div className="col-8 mt-5">
            <a href="#" style={{ textDecoration: "none" }}>
              <h5 className="text-center">Brokerage Calculator</h5>
            </a>
            <ul
              className="p-4 mb-5 text-muted"
              style={{ lineHeight: "2.8", fontSize: "14px" }}
            >
              <li>
                Call & Trade and RMS auto-squareoff: Additional charges of 250 +
                GST per order.
              </li>
              <li>Digital contract notes will be sent via e-mail.</li>
              <li>
                Physical copies of contract notes, if required, shall be charged
                220 per contract note. Courier charges apply.
              </li>
              <li>
                For NRI account (non-PIS), 0.5% or 2100 per executed order for
                equity (whichever is lower).
              </li>
              <li>
                For NRI account (PIS), 0.5% or &200 per executed order for
                equity (whichever is lower).
              </li>
              <li>
                If the account is in debit balance, any order placed will be
                charged 40 per executed order instead of 220 per executed order.
              </li>
            </ul>
          </div>
          <div className="col-4 mt-5">
            <a href="#" style={{ textDecoration: "none" }}>
              <h5>List of charges</h5>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
