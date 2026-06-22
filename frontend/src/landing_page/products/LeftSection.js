import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function LeftSection({
    imageURL,
    productName,
    productDescription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore,
}){
    return(
        <div className='container'>
            <div className='row'>
                <div className='col p-5'>
                    <img src={imageURL}></img>
                </div>
                <div className='col-1'></div>
                <div className='col p-5'>
                    <h3>{productName}</h3>
                    <p className='mt-4' style={{lineHeight:'1.8'}}>{productDescription}</p>
                    <a className='py-5' href={tryDemo} style={{textDecoration:'none'}}>Try Demo<ArrowForwardIcon/></a>
                    <a className='px-5 py-5' href={learnMore} style={{textDecoration:'none'}}>Learn More<ArrowForwardIcon/></a><br></br>
                    <a href={googlePlay}><img className='py-3'src='media/googlePlayBadge.svg'/></a>
                    <a href={appStore}><img className='px-5 py-3'src='media/appStoreBadge.svg'/></a>
                </div>
            </div>
        </div>
    );
}