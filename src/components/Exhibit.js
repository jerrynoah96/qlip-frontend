import {useRef, useState, useEffect} from "react"
import profilePic from "../images/Profile_picture.png"
import verifiedIcon from "../images/icons8_verified_account.svg"
import CheckoutModal from "./CheckoutModal"
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom";

import "../styles/exhibit.css"


const Exhibit = (props) => {

    let history = useHistory();

    const { tokenId } = useParams()

    const checkoutModalRef = useRef(null)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [pageData, setPageData] = useState({})

    const toggleModal = () => {
        if(isModalOpen) {
            checkoutModalRef.current.style.display = "none"
            setIsModalOpen(false)
        } else {
            checkoutModalRef.current.style.display = "flex"
            setIsModalOpen(true)
        }
    }

    useEffect(() => {
       // if(!tokenId) return history.replace("/");

        const currentNFT = props.allTokensArray.find(token => token.id === tokenId);

        if(!currentNFT) return history.replace("/");
        
        setPageData(currentNFT)
        

    }, [])
    return(
        
        <>
            <div className = "exhibit-main-body">
                <div className = "nft-picture-container exhibitPic">
                    <img src = {pageData.imgUrl} class = "nft-picture" alt = "nft" />
                    <div className = "nft-description">
                        <p className = "left-vertical-text">RUBY</p>
                        <p className = "right-vertical-text">1/1</p>
                        <h1 className = "nft-name">{pageData.item_name}</h1>
                        <p className = "nft-decsriptive-text">{pageData.description}</p>
                        <h2 className = "nft-price">{pageData.price} BNB</h2>
                    </div>
                </div>
                <div className = "nft-info-container">
                    <div className = "first-section">
                        <h1 className = "name">{pageData.item_name}</h1>
                        <div className = "ownership_availableNumber">
                            <div className = "ownership">
                                <img src = {profilePic} alt = "profile" className = "profile-picture" />
                                <p><span>Owned by Anonymous </span><img src = {verifiedIcon} className = "verifiedIcon" alt = "verified account icon" /></p>
                            </div>
                            <p className = "availableNumber"><span>Available: </span>20 in stock</p>
                        </div>
                        <h2 className = "current-price">Current Price</h2>
                        <div className = "price-container">
                            <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBNNXA7K21yYyQZxM-iUcGilYqNJp68TcDWaCFepHcLKjA08-UWWOiB65ou1EXlPvDlP4&usqp=CAU" alt = "token logo" />
                         {' '} <p className = "price">{pageData.price} BNB <span></span></p>
                        </div>
                        <button class = "buy-btn" onClick = {toggleModal}>Buy Now</button>
                    </div>
                    <div className = "second-section">
                        <nav>
                            <ul>
                                <li className = "active-nav">Details</li>
                                <li>Price History</li>
                                <li>Offers</li>
                                <li>About Artist</li>
                            </ul>
                        </nav>
                        <div className = "selected-item-content">
                            <div className = "group-one">
                                <p className = "contractAddress-key">Contract Address</p>
                                <p className = "contractAddress-value">{props.contractDetails.contractAddress}</p>
                            </div>
                            <div className = "group-two">
                                <p className = "tokenId-key">Token ID</p>
                                <p className = "tokenId-value">{pageData.id}</p>
                            </div>
                            <div className = "group-three">
                                <p className = "creator-key">Creator</p>
                                <p className = "creator-value">{pageData.owner}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutModal ref = {checkoutModalRef} closeModal = {toggleModal} tokenDetails={pageData} 
            contractDetails = {props.contractDetails}
            web3={props.web3}/>
        </>
    );
}
export default Exhibit;