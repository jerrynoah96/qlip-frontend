import "../styles/checkoutModal.css";
import closeIcon from "../images/iCon_Close.svg"
import warningIcon from "../images/icons_Warning_Shield.svg"
import { forwardRef } from "react";

const CheckoutModal = forwardRef((props, ref) => {

    
    return(
        <div className = "checkout-modal-container" ref = {ref}>
            <div className = "checkout-modal">
                <div className = "modal-head">
                    <h1>Pay For NFT</h1>
                    <div className = "cancel-icon-contaner" onClick = {props.closeModal}>
                        <img src = {closeIcon} className = "" alt = "close" />
                    </div>
                </div>
                <div className = "modal-body">
                    <p className = "about-to-buy">You are about to buy <span>OSHUN</span> from Karla.</p>
                    <div className = "price-details-container">
                        <div className = "price-detail">
                            <p>Price</p>
                            <p>100,000 QLIP</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>Your balance</span></p>
                            <p>100,000 QLIP</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>Service fee</span></p>
                            <p>10 QLIP</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>You will pay</span></p>
                            <p>100,000 QLIP</p>
                        </div>
                    </div>
                    <div className = "warning-alert">
                        <img src = {warningIcon} alt = "warning icon" className = "warning-icon" />
                        <div className = "alert-text">
                            <h2>This creator is not verified</h2>
                            <p>You will be purchasing at your own risk</p>
                        </div>
                    </div>
                    <div className = "button-group">
                        <button class = "pay-button">Pay for NFT now</button>
                        <button class = "cancel-button">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default CheckoutModal;