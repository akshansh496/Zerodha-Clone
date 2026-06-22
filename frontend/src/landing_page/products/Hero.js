import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Hero(){
    return(
        <div className='container mt-5 mb-5 p-5 border-bottom'>
            <div className='row text-center'>
                <h2>Technology</h2>
                <h3 className='text-muted fs-5 mt-1'>Sleek, modern and intuitive trading platforms</h3>
                <p className='mt-3 mb-5'>Check out our <a href='#' style={{textDecoration:"none"}}>investment offerings <ArrowForwardIcon/></a></p>
            </div>
        </div>
    );
}