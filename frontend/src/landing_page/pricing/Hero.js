import React from 'react';
import OpenAccount from '../OpenAccount'
export default function Hero(){
    return(
        <>
        <div className="container">
            <div className="row mt-5 mb-5 text-center border-bottom">
                <h1 className='mb-4'>Pricing</h1>
                <h5 className='text-muted mb-5'>Free equity investments and flat 220 traday and F&O trades</h5>
            </div>
            <div className='row p-5'>
                <div className='col text-center'>
                    <img style={{width:'80%'}}src='media/pricingEquity.svg'></img>
                    <h3 className='mt-4'>Free Equity Delivery</h3>
                    <p className='mt-4 text-muted px-5'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className='col text-center'>
                    <img style={{width:'80%'}}src='media/intradaytrades.svg'></img>
                    <h3 className='mt-4'>Intraday and F&O trades</h3>
                    <p className='mt-4 text-muted px-5'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className='col text-center'>
                    <img style={{width:'80%'}}src='media/pricingEquity.svg'></img>
                    <h3 className='mt-4'>Free direct MF</h3>
                    <p className='mt-4 text-muted px-5'>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
            <OpenAccount/>
        </div>
        </>
    );
}