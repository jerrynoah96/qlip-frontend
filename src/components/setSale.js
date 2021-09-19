import { forwardRef, useState, useEffect } from "react";
import "../styles/checkoutModal.css";
import closeIcon from "../images/iCon_Close.svg"
import warningIcon from "../images/icons_Warning_Shield.svg"
import Modal from 'react-bootstrap/Modal';

const SetSale = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [progressText, setProgressText] = useState('');
    const [newAmount, setUserAmount]= useState();
    
    
    const selectedToken = props.tokenInfo;
    console.log(props.tokenInfo, 'token to be sold in setsale')
    const tokenName = selectedToken.name;

    const handleClose = ()=> {
        setShow(false)
    }

    const handleInput=async (e)=> {
        setUserAmount((await props.web3.utils.toWei(e.target.value, 'ether')));
        console.log(newAmount, 'newAmount');
    }

    const setToSale = async(e)=> {
        e.preventDefault();
        setShow(true);
        setProgressText('approving your nft to be put up for sale');
        //call approve function and approve contract
     const approveReciept=  await props.contractDetails.contractInstance.methods.approve(
         props.contractDetails.contractAddress, selectedToken.id
      ).send({
          from: props.contractDetails.account,
      })

      setProgressText('finalizing new Price value');
      if(approveReciept.status == true){
        const setSaleReciept=  await props.contractDetails.contractInstance.methods.setSale(selectedToken.id, newAmount, props.contractDetails.contractAddress).send({
           from: props.contractDetails.account   
       })

       if(setSaleReciept.status == true){
         alert('You have set '+{tokenName}+' for sale, You can go to the markeplace to see the new exhibit');
       }
      } 

      


  }

    
    useEffect(() => {
      
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
                    <h1>Set NFT To Sale</h1>
                    <div className = "cancel-icon-contaner" onClick = {props.closeModal}>
                        <img src = {closeIcon} className = "" alt = "close" />
                    </div>
                </div>
                <form className = "modal-body" onSubmit={setToSale}>
                    <p className = "about-to-buy">You are about to Put up <span>{selectedToken.name}</span> for Sale.</p>
                    <div className = "price-details-container">
                    <div className="input-box">
                    <label htmlFor="price">PRICE</label>
                    <div className="price-input">
                    <input type="text" id="price" placeholder="e.g. 100"
                    onChange={handleInput} />

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBNNXA7K21yYyQZxM-iUcGilYqNJp68TcDWaCFepHcLKjA08-UWWOiB65ou1EXlPvDlP4&usqp=CAU" alt="token logo"/>

                    </div>
                </div>
                       
                        
                    </div>
                    <div className = "warning-alert">
                        <img src = {warningIcon} alt = "warning icon" className = "warning-icon" />
                        <div className = "alert-text">
                            <h2>Your Profile is not verified</h2>
                            <p>Profile Verification coming soon</p>
                        </div>
                    </div>
                    <div className = "button-group">
                        <button class = "pay-button"
                        onClick=''>Set NFT To Sale</button>
                        <button class = "cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
})

export default SetSale;