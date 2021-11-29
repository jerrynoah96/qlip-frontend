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
import ExhibitDetailsTab from "./ExhibitDetailsTab";
import ExhibitAboutArtistTab from './ExhibitAboutArtistTab'
import ExhibitOffersTab from './ExhibitOffersTab'
import ExhibitPriceHistoryTab from './ExhibitPriceHistoryTab'
import ExhibitPropertiesTab from './ExhibitPropertiesTab'



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
    const [ownerName, setOwnerName] = useState();
    const [ownerDp, setOwnerDp] = useState();
    
    

    const [pageData, setPageData] = useState({})
    const [tokenURI, setTokenURI] = useState();
    const [web3Instance, setWeb3Instance] = useState();
    const [selectedTab, setSelectedTab] = useState('details')

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
       
        
        console.log(Tdetails.ownerAddress, 'token details in exhibit-owner')
        setPrice(price);


        
        //load nft details from contracts
        const res = await fetch(Tdetails.tokenURI_)
        const jsonRes = await res.json();
        const pictureUrl = jsonRes.imgHash;
       await setImgHash(pictureUrl);
        setDescription(jsonRes.description);
        setName(jsonRes.item_name);
        
        //get nft owner's name from DB
        const nftOwnerName = Tdetails.ownerAddress;

        const dbRes = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles/'+nftOwnerName);
        const userProfile = await dbRes.json();
        console.log(userProfile, 'user profile from db')
        setOwnerName(userProfile.name);
        setOwnerDp(userProfile.profile_photo);
        
        
        
        

    }, [])

    console.log(categry, 'categry')
    console.log(props.contractDetails.account, 'current account')
    console.log(props.contractDetails.contractInstance, 'when conected')


    const setActiveTab = (e) => {
        document.getElementById(selectedTab).classList.remove("active-tab");
        setSelectedTab(e.target.id)
    }

    useEffect(() => {
        document.getElementById(selectedTab).classList.add("active-tab");
    }, [selectedTab])

    


    return(
        
        <>

        <ToastContainer 
        autoClose={2000}/>
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
                        {/*<p className = "nft-decsriptive-text">{description}</p> */}
                        <h2 className = "nft-price-exhibit">{price} BNB</h2>
                    </div>
                </div>
                <div className = "nft-info-container">
                    <div className = "first-section">
                        <h1 className = "name">{name}</h1>
                        <div className = "ownership_availableNumber">
                            <div className = "ownership">
                                <img src = {ownerDp} alt = "profile" className = "profile-picture" />
                                <p><span>Owned by {ownerName}</span>{/*<img src = {verifiedIcon} className = "verifiedIcon" alt = "verified account icon" />*/}</p>
                            </div>
                            <p className = "availableNumber"><span>Available: </span>1 in stock</p>
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
                                <li onClick = {setActiveTab} id = "details" className = "tab">Details</li>
                                <li onClick = {setActiveTab} id = "price-history" className = "tab">Price History</li>
                                <li onClick = {setActiveTab} id = "offers" className = "tab">Offers</li>
                                <li onClick = {setActiveTab} id = "about-artist" className = "tab">About Artist</li>
                                <li onClick = {setActiveTab} id = "properties" className = "tab">Properties</li>
                            </ul>
                        </nav>
                        <div className = "selected-item-content">
                            {selectedTab === "details" && <ExhibitDetailsTab name = {name} 
                                description = {description} 
                                category = {category} 
                                contractAdd = {contractAdd} 
                                tokenId = {tokenId} 
                            />}
                            {selectedTab === "price-history" && <ExhibitPriceHistoryTab /> }

                            {selectedTab === "offers" && <ExhibitOffersTab />}

                            {selectedTab === "about-artist" && <ExhibitAboutArtistTab />}

                            {selectedTab === "properties" && <ExhibitPropertiesTab />}
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