import React from 'react';
import uploadIcon from '../images/upload-icon.png';
import signIcon from '../images/sign-icon.png';
import '../styles/options.css';

const Options=(props)=> {
    let currentpage = 'create';
    const setPage=(page)=> {
        page = currentpage;
        props.setPage(page);

    }
    console.log(props.form_details, 'oh my')



    return(
        <div className="options">
            <div className="option-header">
                <div className="header-content">
                <h1>QLIP MINTSTORE</h1>
                <span>Mint token in 3 easy steps</span>

                </div>
                

            </div>
            <div className="options-main">
                <div className="option">
                    <img src={uploadIcon} alt="upload"/>
                    <div className="inner-text">
                        <h2>Upload Files and Mint Token</h2>
                        <span>call contract method</span>
                    </div>
                    <div
                    className="button"
                    onClick={setPage}>Start</div>

                </div>

                <div className="option">
                    <img src={signIcon} alt="upload"/>
                    <div className="inner-text">
                        <h2>Sign Sell Order</h2>
                        <span>Sign sell order using your wallet</span>
                    </div>
                    <div
                    className="button">Start</div>

                </div>

                <div className="option">
                    <img src={uploadIcon} alt="upload"/>
                    <div className="inner-text">
                        <h2>Sign Lock Order</h2>
                        <span>Sign lock order using your wallet</span>
                    </div>
                    <div
                    className="button">Start</div>

                </div>

            </div>
        </div>
    )

}

export default Options;