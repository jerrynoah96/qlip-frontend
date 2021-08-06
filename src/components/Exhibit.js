import "../styles/exhibit.css"
import NFT from "../images/OSHUN_NFT.png"
import profilePic from "../images/Profile_picture.png"
import qlipLogo from "../images/Qlip-Logo.svg"
import verifiedIcon from "../images/icons8_verified_account.svg"
import CheckoutModal from "./CheckoutModal"
import {useRef, useState} from "react"

const Exhibit = () => {
    const checkoutModalRef = useRef(null)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        if(isModalOpen) {
            checkoutModalRef.current.style.display = "none"
            setIsModalOpen(false)
        } else {
            checkoutModalRef.current.style.display = "flex"
            setIsModalOpen(true)
        }
    }
    return(
        <>
            <div className = "exhibit-main-body">
                <div className = "nft-picture-container">
                    <img src = {NFT} class = "nft-picture" alt = "nft" />
                    <div className = "nft-description">
                        <p className = "left-vertical-text">RUBY</p>
                        <p className = "right-vertical-text">1/1</p>
                        <h1 className = "nft-name">OSHUN</h1>
                        <p className = "nft-decsriptive-text">The Yoruba river diety who rules divinity, feminity, fertility, beauty and love.</p>
                        <h2 className = "nft-price">100,000 QLIP</h2>
                    </div>
                </div>
                <div className = "nft-info-container">
                    <div className = "first-section">
                        <h1 className = "name">OSHUN</h1>
                        <div className = "ownership_availableNumber">
                            <div className = "ownership">
                                <img src = {profilePic} alt = "profile" className = "profile-picture" />
                                <p><span>Owned by Karla </span><img src = {verifiedIcon} className = "verifiedIcon" alt = "verified account icon" /></p>
                            </div>
                            <p className = "availableNumber"><span>Available: </span>20 in stock</p>
                        </div>
                        <h2 className = "current-price">Current Price</h2>
                        <div className = "price-container">
                            <img src = {qlipLogo} alt = "qlip" />
                            <p className = "price">100,000 <span>($27,929)</span></p>
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
                                <p className = "contractAddress-value">0x495f947276749ce646f68ac8c248420045cb7b5e</p>
                            </div>
                            <div className = "group-two">
                                <p className = "tokenId-key">Token ID</p>
                                <p className = "tokenId-value">282222222222222</p>
                            </div>
                            <div className = "group-three">
                                <p className = "creator-key">Creator</p>
                                <p className = "creator-value">Chijamz</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutModal ref = {checkoutModalRef} closeModal = {toggleModal} />
        </>
    );
}
export default Exhibit;