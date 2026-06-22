import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function RightSection({
    imageURL,
    productName,
    productDescription,
    learnMore,
}){
    return(
        <div className='container'>
            <div className='row'>
                <div className='col p-5 mt-5'>
                    <h3>{productName}</h3>
                    <p className='mt-4' style={{lineHeight:'1.8'}}>{productDescription}</p>
                    <a className= 'py-5' href={learnMore} style={{textDecoration:'none'}}>Learn More<ArrowForwardIcon/></a><br></br>
                </div>
                <div className='col px-5'>
                    <img style={{width:'100%'}}src={imageURL}></img>
                </div>
            </div>
        </div>
    );
}