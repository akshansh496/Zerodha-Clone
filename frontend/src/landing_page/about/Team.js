import React from 'react';
export default function Team(){
    return(
        <div className='container'>
            <div className='row text-center p-5 '>
                <h3>
                    People
                </h3>
            </div>
            <div className='row p-3 '>
                <div className='col  p-5 text-center'style={{lineHeight:'1.8'}}>
                    <img style={{borderRadius:'50%',width:'65%'}}src='media/nithinKamath.jpg'></img>
                    <p className='mt-3 fs-5'>Nithin Kamath</p>
                    <p className='mt-3 fs-8 fw-light'>Founder,CEO</p>
                </div>
                <div className='col fw-light fs-6 p-5 ' style={{lineHeight:'1.8'}}>
                    <p>
                        Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
                    </p>
                    <p>
                    He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).                    
                    </p>
                    <p>
                    Playing basketball is his zen.                    
                    </p>
                    <p>
                    Connect on 
                    <a style={{textDecoration:'none'}} href='https://nithinkamath.me/'> Homepage </a>                  
                    <a style={{textDecoration:'none'}} href='https://tradingqna.com/u/nithin/summary'> / TradingQnA </a>                 
                    <a style={{textDecoration:'none'}} href='https://x.com/Nithin0dha'> / Twitter  </a>              
                    </p>
                </div>
            </div>
        </div>
    );
}