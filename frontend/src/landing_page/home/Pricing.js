import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Pricing(){
    return(
        <div className='container p-5 mb-5'>
            <div className='row'>
                <div className='col-4 '>
                    <h1 className='fs-3 mb-3'>Unbeatable Pricing</h1>
                    <p className='fs-6 text-muted'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a className='text-decoration-none fs-5' href=''>See Pricing <ArrowForwardIcon></ArrowForwardIcon></a>
                </div>
                <div className='col-2'></div>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col border text-center p-4'>
                            <h1 className='mb-4'>₹0</h1>
                            <p className='fs-6 text-muted'>Free equity delivery and<br></br> direct mutual funds</p>
                        </div>
                        <div className='col border text-center p-4'>
                            <h1 className='mb-4'>₹20</h1>
                            <p className='fs-6 text-muted'>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}