import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Stats(){
    return(
        <div className='conatainer p-5'>
            <div className='row p-5'>
                <div className='col-lg-6 p-5'>
                    <h1 className='mb-5 fs-2'>Trust with confidence</h1>

                    <h2 className='mb-3 fs-4'>Customer-first always</h2>
                    <p className=' mb-5 fs-6 text-muted'>That's why 1.3+ crore customers trust Zerodha with £3.5+ lakh crores worth of equity investments.</p>
                    <h2 className='mb-3 fs-4'>No spam or gimmicks</h2>
                    <p className=' mb-5 fs-6 text-muted'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
                    <h2 className='mb-3 fs-4'>The Zerodha universe</h2>
                    <p className=' mb-5 fs-6 text-muted'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    <h2 className='mb-3 fs-4'>Do better with money</h2>
                    <p className='mb-5 fs-6 text-muted '>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with
                    your money.</p>
                </div>
                <div className='col-lg-6 p=5'>
                    <img src='media/ecosystem.png' alt='ecosystem' style={{width:'90%'}}></img>
                    <div className='ml-5 p-5'>
                        <a className='fs-6 p-5 text-decoration-none' href=''>Explore our Products <ArrowForwardIcon/></a>
                        <a className='fs-6 p-5 text-decoration-none' href=''>Try Kite</a>
                    </div>
                </div>
            </div>
        </div>
    );
}