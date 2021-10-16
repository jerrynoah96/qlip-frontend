import { forwardRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/checkoutModal.css";
import closeIcon from "../images/iCon_Close.svg"
import warningIcon from "../images/icons_Warning_Shield.svg"
import Modal from 'react-bootstrap/Modal';

const CheckoutModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [progressText, setProgressText] = useState('');
    const [userBal, setUserBal]= useState('');

    const account = props.account;
    

    let history = useHistory();
    
    

    const handleClose = ()=> {
        setShow(false)
    }

    const payForNFT = async()=> {
        if(props.account == null){
            alert('please connect your wallet to purchase an nft');
        }
        else{

        setShow(true);
        setProgressText("Processing your order");
      //  const valueInWei = (await props.web3.utils.toWei(props.tokenDetails.price));
        
        
    //    const amountToPay = await props.tokenDetails.price;
        const contractAddress = await props.contractAddress;
        
        
        const id = await props.id;
        
        const amountToBePaid = await props.contract.methods.getSalePrice(id).call();
        
       console.log(account,id, amountToBePaid, 'right?' )
      
        
     const purchaseReciept = await props.contract.methods.buyTokenOnSale(id,
            contractAddress).send({
            from: account,
            value: amountToBePaid
        });

        if(purchaseReciept.status === true){
           await setProgressText("You have successfully bought this NFT");
            if(history) history.push('/profile');
        }

    }

    }

    const checkUserBal = async()=> {
        console.log(account, 'account in user bal')
        const bal = await props.web3.eth.getBalance(account);
        
        const balance = await props.web3.utils.fromWei(bal);
        console.log(balance, 'user balance')
       await setUserBal(balance)
    }

    useEffect(async () => {
    
     await checkUserBal()  
      
      
      },[]);
    

    return(
        <div className = "checkout-modal-container" ref = {ref}>
    <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <span>{progressText}</span>
            <img src="https://cdn.dribbble.com/users/419257/screenshots/1724076/scanningwoohoo.gif"
            alt="loader"/>
        </Modal.Body>
      </Modal>
            <div className = "checkout-modal">
                <div className = "modal-header">
                    <h1>Pay For NFT</h1>
                    <div className = "cancel-icon-contaner" onClick = {props.closeModal}>
                        <img src = {closeIcon} className = "" alt = "close" />
                    </div>
                </div>
                <div className = "modal-details">
                    <p className = "about-to-buy">You are about to buy <span>{props.tokenName}</span> from Anonymous.</p>
                    <div className = "price-details-container">
                        <div className = "price-detail">
                            <p>Price</p>
                            <p>{props.price} BNB</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>Your balance</span></p>
                            <p>{userBal} BNB</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>Service fee</span></p>
                            <p>{(props.price * 0.05).toFixed(5)} BNB</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>You will pay</span></p>
                            <p>{props.price} BNB</p>
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
                        <button class = "pay-button"
                        onClick={payForNFT}>Pay for NFT now</button>
                        <button className= "cancel-button"
                        onClick = {props.closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default CheckoutModal;