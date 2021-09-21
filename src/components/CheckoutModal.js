import { forwardRef, useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import "../styles/checkoutModal.css";
import closeIcon from "../images/iCon_Close.svg"
import warningIcon from "../images/icons_Warning_Shield.svg"
import Modal from 'react-bootstrap/Modal';

const CheckoutModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [progressText, setProgressText] = useState('');
    const [userBal, setUserBal]= useState('');
    const [com, setCommission] = useState();
    
    

    const handleClose = ()=> {
        setShow(false)
    }

    const payForNFT = async()=> {
        if(props.web3 == null){
            alert('please connect your wallet to purchase an nft');
        }
        else{

        setShow(true);
        setProgressText("Processing your order");
        const valueInWei = (await props.web3.utils.toWei(props.tokenDetails.price));
        
        
        const amountToPay = await props.tokenDetails.price;
        const contractAddress = await props.contractDetails.contractAddress;
        
        const account = await props.contractDetails.account;
        const id = await props.tokenDetails.token_id;
        const amountToBePaid = await props.contractDetails.contractInstance.methods.getSalePrice(id).call();
        const commisionFee1 = 0.05 * valueInWei;
        const commisionFee = new BigNumber(commisionFee1);

        console.log(contractAddress, amountToPay, id, valueInWei, commisionFee, 'contract address on sale');
       
        
        
     const purchaseReciept = await props.contractDetails.contractInstance.methods.buyTokenOnSale(id,
            contractAddress,
            commisionFee).send({
            from: account,
            value: amountToBePaid
        });

        if(purchaseReciept.status == true){
            setProgressText("You have successfully bought this NFT");
        }

    }

    }

    const checkUserBal = async()=> {
        const bal = await props.web3.eth.getBalance(await props.contractDetails.account)
        const balance = await props.web3.utils.fromWei(bal);
        setUserBal(balance)
    }

    useEffect(() => {
      checkUserBal()  
      },[]);
    

    return(
        <div className = "checkout-modal-container" ref = {ref}>
    <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <span>{progressText}</span>
            <img src="https://cdn.dribbble.com/users/419257/screenshots/1724076/scanningwoohoo.gif"/>
        </Modal.Body>
      </Modal>
            <div className = "checkout-modal">
                <div className = "modal-head">
                    <h1>Pay For NFT</h1>
                    <div className = "cancel-icon-contaner" onClick = {props.closeModal}>
                        <img src = {closeIcon} className = "" alt = "close" />
                    </div>
                </div>
                <div className = "modal-body">
                    <p className = "about-to-buy">You are about to buy <span>{props.tokenDetails.item_name}</span> from Karla.</p>
                    <div className = "price-details-container">
                        <div className = "price-detail">
                            <p>Price</p>
                            <p>{props.tokenDetails.price} BNB</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>Your balance</span></p>
                            <p>{userBal} BNB</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>Service fee</span></p>
                            <p>{(props.tokenDetails.price * 0.05).toFixed(5)} BNB</p>
                        </div>
                        <div className = "price-detail">
                            <p><span>You will pay</span></p>
                            <p>{props.tokenDetails.price} BNB</p>
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
                        <button class = "cancel-button">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default CheckoutModal;