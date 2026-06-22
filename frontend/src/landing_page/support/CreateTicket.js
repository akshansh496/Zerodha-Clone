import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Person2Icon from '@mui/icons-material/Person2';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
export default function CreateTicket(){
    return(
        <>
        <div className='container'>
            <div className='row mb-5'>
                <h3>To create a ticket, select a relevant topic </h3>
            </div>
            <div className='row'>
                <div className='col'>
                    <h6 className='text-muted py-2'><AddCircleIcon/> Account Opening</h6>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Online Account Opening</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Offline Account Opening</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Company, Partnership and HUF Account
                        Opening</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>NRI Account Opening</a>

                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Charges at Zerodha</a>

                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Zerodha IDFC FIRST Bank 3-in-1 Account</a>

                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Getting Started</a>

                    
                </div>
                <div className='col'>
                <h6 className='text-muted py-2'><Person2Icon/> Your Zerodha Account</h6>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Login Credentials</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Account Modification and Segment Addition</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>DP ID and bank details</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Your Profile</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Transfer and conversion of shares</a>

                </div>
                <div className='col'>
                    <h6 className='text-muted py-2'><LeaderboardIcon /> Your Zerodha Account</h6>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Margin/leverage, Product and Order types</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Kite Web and Mobile</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Trading FAQS</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Corporate Actions</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Sentinell</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Kite API</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Pi and other platforms</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Pi and other platforms</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>Stockreports+</a>
                        <a href="#" className='row py-2'style={{ textDecoration: "none" }}>GTT</a>
                </div>
            </div>
        </div>
        </>
    );
}