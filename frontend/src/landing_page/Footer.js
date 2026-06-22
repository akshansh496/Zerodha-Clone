import React from 'react';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#F8F8F8' }}>
        <div className='container border-top p-5' >
            <div className='row'>
                <div className='col mt-3'>
                    <img style={{ width: "50%" }} src="/media/logo.svg" alt="logo" />
                    <p className='col fs-6 text-muted mt-2'>
                        © 2010 - 2025, Zerodha Broking Ltd.<br />All rights reserved.
                    </p>
                </div>

                <div className='col'>
                    <div className='row fs-6 my-3 px-2'>Company</div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>About</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Products</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Pricing</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Referral programme</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Careers</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Zerodha.tech</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Press & media</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Zerodha cares (CSR)</a></div>
                </div>

                <div className='col'>
                    <div className='row fs-6 my-3 px-2'>Support</div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Contact</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Support portal</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Z-Connect blog</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>List of charges</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Downloads and resources</a></div>
                </div>

                <div className='col'>
                    <div className='row fs-6 my-3 px-2'>Account</div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Open an account</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>Fund transfer</a></div>
                    <div className='row fs-6 fw-light py-2'><a href="#" style={{ textDecoration: 'none',color:'gray'}}>60 day challenge</a></div>
                </div>
            </div>
            <div className='row mt-5'>
                <p className='fw-light' style={{fontSize:'12px'}}>
                    Zerodha Broking Ltd.: Member of NSE, BSE & MCX -SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. - SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF <br></br>
                    Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances<br></br>
                    Smart Online Dispute Resolution | Grievances Redressal Mechanism<br></br>
                    Investments in securities market are subject to market risks; read all the related documents carefully before investing.<br></br>
                    Attention investors: 1 )  Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.<br></br>
                    India's largest broker based on networth as per NSE. NSE broker factsheet<br></br>
                    "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.
                </p>
            </div>
            <div className='fw-light py-2 mx-5 p-5' style={{fontSize:'13px'}}>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>NSE</a>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>BSE</a>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>MCX</a>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>Terms & conditions</a>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>Policies & procedures</a>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>Privacy policy</a>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>Disclosure</a>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>For investor's attention</a>
                <a className='px-3'href='#'style={{ textDecoration: 'none',color:'gray'}}>Investor charter</a>
            </div>
        </div>
        </footer>
    );
}
