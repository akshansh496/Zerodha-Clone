import React from 'react';
export default function Awards(){
    return(
        <div className='container mt-5 '>
            <div className='row'>
                <div className='col-lg-6 col-sm-12 p-5'>
                    <img src='/media/largestBroker.svg' alt='award'></img>
                </div>
                <div className='col-lg-6 col-sm-12 p-5'>
                    <h1>Largest stock broker in India</h1>
                    <p className='fs-6 mt-3 mb-5 fw-light'>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                    <div className='row'>
                        <div className='col-6'>
                            <ul >
                                <li className='fs-6 fw-light'>Futures and Options</li>
                                <li className='fs-6 fw-light'>Commodity derivatives</li>
                                <li className='fs-6 fw-light'>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className='col-6 mb-5n'>
                            <ul >
                                <li className='fs-6 fw-light'>Stocks & IPOs</li>
                                <li className='fs-6 fw-light'>Direct mutual funds</li>
                                <li className='fs-6 fw-light'>Bonds & Govt. Securities</li>
                            </ul>
                        </div>
                        <img className='mt-5 ' src='/media/pressLogos.png' alt='logos' style={{width:'90%  '}}></img>
                    </div>
                </div>
            </div>
        </div>
    );
}