import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Education(){
    return(
        <div className='container p-5 mt-5'>
            <div className='row'>
                <div className='col'>
                  <img className='px-5'src='/media/education.svg' alt='education'  style={{width:'90%'}}></img>
                </div>
                <div className='col p-5'>

                <h1 className='fs-4 mb-3'>Free and open market education</h1>
                <p className='fs-6 text-muted mb-0'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                <a className='text-decoration-none fs-6' href=''>Varsity <ArrowForwardIcon></ArrowForwardIcon></a>
                
                <p className='fs-6 text-muted mt-4 mb-0'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                <a className='text-decoration-none fs-6' href=''>TradingQ&A<ArrowForwardIcon></ArrowForwardIcon></a>

                </div>
            </div>
        </div>
    );
}