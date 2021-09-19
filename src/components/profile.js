import React,{useRef, useState, useEffect} from "react";
import headerImg from "../images/Header_Image.png"
import productImage from "../images/product_img.svg"
// import imagePlaceholderIcon from "./assets/Icon_Image.svg"
import profilePic from "../images/Profile_picture.png"
// import editIcon from "./assets/Edit_icon.svg"
import verifiedIcon from "../images/icons8_verified_account.svg"
import NFTCard from "./nftcard";
import Modal from 'react-bootstrap/Modal';
import SetSale from "./setSale";
import axios from "axios";
import "../styles/profile.css";
import "../styles/NFTCard.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Profile = (props) => {
 // const [tokensArray, setTokensArray] = useState([]);
const setSaleRef = useRef(null);
const [isModalOpen, setIsModalOpen] = useState(false);

 const urlList = props.tokenUrls;
 console.log(urlList, 'url list')
 
  const [tokenDetails, setTokenDetails]= useState([]);
  const [tokenObjects, setTokenObjects] = useState([]);
  const [tokenInfo, setTokenInfo] = useState();

  const toggleModal = async (info) => {
    if(isModalOpen) {
      setSaleRef.current.style.display = "none"
        setIsModalOpen(false)
    } else {
      setSaleRef.current.style.display = "flex"
       await setTokenInfo(info);
        setIsModalOpen(true)
    }
}



  // let tokenObjects = [];
/*const fetchTokens =()=>{ 

    //   urlList.map(async(url)=>{
    //   const res = await fetch(url);
    //   const result = await res.json();
    //   tokenObjects.push(result);
    // } )
    
    const tokenObjectsPlaceholder = [];
    const tokenObj = []
    
     urlList.map(async url => {
      const res = await fetch(url);
      const result = await res.json();
      tokenObj.push(result)
      if(tokenObj.length === urlList.length) setTokenObjects(tokenObj)
    })
    
   
  } */

  const displayTokens = urlList.map((token)=> {
    
    console.log(token, 'my tokens')
    return(
      <div key = {token.id} className = "nft-card">
      <div className = "nft-image-container">
          <img src = {token.imgUrl} alt = "nft product" className = "nft-image" />
      </div>
      <div className = "nft-details">
          <h3 className = "nft-name">{token.item_name}</h3>
          <div className = "detail-1">
              <h4>{token.price} BNB</h4>
              <p>1 of 1</p>
          </div>
          <div className = "detail-2">
              <p><span>Highest bid </span>0.001 BNB</p>
              <p><span>new bid &#128293;</span></p>
          </div>
      </div>
      { token.tokenState == 1 ? <button className = "buy-btn"
       onClick={()=> {
        toggleModal(token)
       }}>Set To Sale</button> : ''}
  </div>
      // <NFTCard key = {token.imgHash} name = {token.item_name} imageSrc = {token.imgHash} price = {token.price} description = {token.description} />
    )
  })
  console.log(displayTokens, 'tokens display')

  
   

    
    
 /*   const fetchTokenDetails =()=>{
      const tokenArray =  [];

    tokenUrls.map((tokenUrl)=> {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(tokenUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
         
          tokenArray.push(result);
        })
        .catch(error => console.log('error', error));
     // const res = await fetch(tokenUrl);
     // const resJson = res.json();
     // console.log(resJson, 'json for each')
    })

    setTokenDetails(tokenArray);
   
   
  } */

/*
 const  finalTokenOutput = tokenDetails.map((token)=> {
     console.log(token, 'token')
    return(
      <div className = "nft-card">
      <div className = "nft-image-container">
          <img src = {token.imgHash} alt = "nft product" className = "nft-image" />
      </div>
      <div className = "nft-details">
          <h3 className = "nft-name">{token.token_name}</h3>
          <div className = "detail-1">
              <h4>{token.price} QLIP</h4>
              <p>1 of 1</p>
          </div>
          <div className = "detail-2">
              <p><span>Highest bid </span>0.001ETH</p>
              <p><span>new bid &#128293;</span></p>
          </div>
      </div>
      <button className = "buy-btn">Buy NFT</button>
  </div>

    )
  }) */

  const loader =  <SkeletonTheme color="#202020" highlightColor="#444">
                        <p>
                            <Skeleton count={3} height={300} width={200} />
                        </p>
                </SkeletonTheme>
  
    useEffect( ()=> {
     // fetchTokens();
      
    },[])



    return(
      <>
        <div className = "profile-main-body">
        <div className = "cover-photo-container">
          <img src = {headerImg} alt = "header"className = "cover-photo-image" />
        </div>
        <div className = "content-section">
          <div className = "user-profile-card">
            <div className = "user-details-section">
              <div className = "profile-picture-container">
                <img src = {profilePic} alt = "user profile avatar"className = "profile-picture" />
              </div>
              <div className = "user-details">
                <h2>Anonymous <img src = {verifiedIcon} className = "verified-icon" alt = "verified icon" /></h2>
                <p>0x495f947245...cb7b5eby</p>
              </div>
              <div className = "user-about-section">
                <p>A 2D hyper-realist artist with 10 years experience designing portrait for influential celebrities and goverment officials</p>
              </div>
              <div className = "user-history">
                <div className = "history-item">
                  <h3>{tokenObjects.length}</h3>
                  <p>All NFTs</p>
                </div>
                <div className = "history-item">
                  <h3>0</h3>
                  <p>NFTs Sold</p>
                </div>
                <div className = "history-item">
                  <h3>0</h3>
                  <p>NFTs Bought</p>
                </div>
              </div>
            </div>
            {/*<button className = "follow-button">Follow Anonymous</button>*/}
          </div>
          <div className = "nfts-section">
            <h1 className = "section-title">NFTs</h1>
            <div className = "nft-nav">
              <ul>
                <li><button className = "active-nft-nav">All</button></li>
                <li><button>On sale</button></li>
                <li><button>Created</button></li>
                <li><button>Bought</button></li>
                <li><button>Following</button></li>
              </ul>
            </div>
            <div className = "nfts-container">

              {/* {!!tokenObjects.length && 
              tokenObjects.map(token => {
                return(
                    <NFTCard key = {token.imgHash} name = {token.item_name} imageSrc = {token.imgHash} price = {token.price} description = {token.description} />
                  )
                })}

                  {!tokenObjects.length && <Loader />} */}

                  {!!urlList.length ?
                   displayTokens
                    : loader
                  }
              
             
            </div>
          </div>
        </div>
      </div>
      <SetSale ref = {setSaleRef} closeModal = {toggleModal} tokenInfo={tokenInfo} 
            contractDetails = {props.contractDetails}
            web3={props.web3}/>
      </>
    );
}

export default Profile