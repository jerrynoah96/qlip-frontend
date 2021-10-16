import {useRef, useState, useEffect} from "react"
import contractABI from '../contractAbi.json';
import Web3 from "web3";
import profilePic from "../images/Profile_picture.png"
import verifiedIcon from "../images/icons8_verified_account.svg"
import CheckoutModal from "./CheckoutModal"
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";

import "../styles/exhibit.css"


const Exhibit = (props) => {

    let history = useHistory();
    let categry;
    

    const { tokenId } = useParams()

    const checkoutModalRef = useRef(null)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [contractAdd, setContractAdd] = useState();
    const [token_id, setToken_id] = useState();
    const [category, setCategory] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [imgHash, setImgHash] = useState();
    const [contract, setContract] = useState();
    
    

    const [pageData, setPageData] = useState({})
    const [tokenURI, setTokenURI] = useState();
    const [web3Instance, setWeb3Instance] = useState();

    const toggleModal = () => {
        if(isModalOpen) {
            checkoutModalRef.current.style.display = "none"
            setIsModalOpen(false)
        } else {
            if(props.contractDetails.account == null){
                toast.error('please connect your wallet to buy')
            }
            else{
                checkoutModalRef.current.style.display = "flex"
            setIsModalOpen(true)

            }
            
        }
    }


    useEffect(async () => {
      
        //  if(!tokenId) return history.replace("/");
       
        //fetch token detail
        const currentNFT = props.allTokensArray.find(token => token.id === tokenId);

    //    if(!currentNFT) return history.replace("/");
        
        setPageData(currentNFT)
        
        const instantWeb3 = new Web3('https://bsc-dataseed.binance.org/');
        const contractAddr = "0xFd24d63126404aDC38983fcF34ECebF9C882fA59";
        const contractInit = new instantWeb3.eth.Contract(contractABI, contractAddr);
        await setContractAdd(contractAddr);
        await setContract(contractInit);
        await setWeb3Instance(instantWeb3);

        const nft_amount = await contractInit.methods.getSalePrice(tokenId).call();
        const price = await instantWeb3.utils.fromWei(nft_amount);
        const Tdetails = await contractInit.methods.__getAllTokenDetails(tokenId).call();
        
        console.log(contractAdd, 'contract add in exhibit')
        setCategory(Tdetails._category);
       
        
        console.log(category, Tdetails._category, 'category in exhibit')
        setPrice(price);
        

        const res = await fetch(Tdetails.tokenURI_)
        const jsonRes = await res.json();
        const pictureUrl = jsonRes.imgHash;
       await setImgHash(pictureUrl);
        setDescription(jsonRes.description);
        setName(jsonRes.item_name);
        
        
        
        
        

    }, [])

    console.log(categry, 'categry')
    console.log(props.contractDetails.account, 'current account')
    console.log(props.contractDetails.contractInstance, 'when conected')

    


    return(
        
        <>

        <ToastContainer />
          <Helmet>
          <meta property="og:title" content={name}/>
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imgHash} />
            <meta property="og:url" content={"https://app.qlipit.io/exhibit/"+tokenId} />
            
        </Helmet>


            <div className = "exhibit-main-body">
                <div className = "nft-picture-container exhibitPic">
                    <img src = {imgHash} class = "nft-picture" alt = "nft" />
                    <div className = "nft-description">
                        <p className = "left-vertical-text">RUBY</p>
                        <p className = "right-vertical-text">1/1</p>
                        <h1 className = "nft-name">{name}</h1>
                        <p className = "nft-decsriptive-text">{description}</p>
                        <h2 className = "nft-price-exhibit">{price} BNB</h2>
                    </div>
                </div>
                <div className = "nft-info-container">
                    <div className = "first-section">
                        <h1 className = "name">{name}</h1>
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
                         {' '} <p className = "price">{price} BNB <span></span></p>
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
                                <p className = "creator-key">Name</p>
                                <p className = "creator-value">{name}</p>
                            </div>

                            <div className = "group-one">
                                <p className = "creator-key">Description</p>
                                <p className = "creator-value">{description}</p>
                            </div>

                            <div className = "group-one">
                                <p className = "creator-key">Category</p>
                                <p className = "creator-value">{category === '1' ? 'Photography' : category ==='2' ? 'Art' : category === '3' ? 'Meme': ''}</p>
                            </div>
                            

                            <div className = "group-two">
                                <p className = "contractAddress-key">Contract Address</p>
                                <p className = "contractAddress-value">{contractAdd}</p>
                            </div>
                            <div className = "group-three">
                                <p className = "tokenId-key">Token ID</p>
                                <p className = "tokenId-value">{tokenId}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutModal ref = {checkoutModalRef} closeModal = {toggleModal}  
            contract= {props.contractDetails.contractInstance} 
    web3={web3Instance} tokenName={name} price={price}
    contractAddress={contractAdd} id={tokenId} account = {props.contractDetails.account}/>
        </>
    );
}
export default Exhibit;