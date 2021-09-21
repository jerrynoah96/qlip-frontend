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
import classNames from 'classnames';
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
  const [allOnsale, setOnSaleTokenDisplay]= useState([]);
  const [notforSale, setNotForSaleDisplay]= useState([]);
  const [displayPointer, setDisplayPointer] = useState('all');
  const [address, setAddress] = useState(props.contractDetails.account);


  const sortTokens =()=>{ 
    const onSale = []
    const notOnSale=[]
   
    urlList.map(async token => {
      // get token state
      const tokenState = await props.contractDetails.contractInstance.methods.getNFTState(token.id).call();
      if(tokenState == 2){
        await  notOnSale.push(token)
          
      }
      if(tokenState == 1){
        await onSale.push(token)   
      }
      

     
  
   await setOnSaleTokenDisplay(onSale);
   await  setNotForSaleDisplay(notOnSale);

    })
    console.log(tokenObjects, 'token objects')
  } 



  const displayTokens = urlList.map((token)=> {
    
    console.log(token.id, 'tokens id in profile');
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
      { token.tokenState == 2 ? <button className = "buy-btn"
       onClick={()=> {
        props.setSale(token)
       }}>Set To Sale</button> : ''}
  </div>
      // <NFTCard key = {token.imgHash} name = {token.item_name} imageSrc = {token.imgHash} price = {token.price} description = {token.description} />
    )
  })
 

  const tokensOnSale = allOnsale.map((token)=> {
    
    
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
      { token.tokenState == 2 ? <button className = "buy-btn"
       onClick={()=> {
        props.setSale(token)
       }}>Set To Sale</button> : ''}
  </div>
      // <NFTCard key = {token.imgHash} name = {token.item_name} imageSrc = {token.imgHash} price = {token.price} description = {token.description} />
    )
  })


  
  const tokensNotOnSale = notforSale.map((token)=> {
    
    
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
      { token.tokenState == 2 ? <button className = "buy-btn"
       onClick={()=> {
        props.setSale(token)
       }}>Set To Sale</button> : ''}
  </div>
      // <NFTCard key = {token.imgHash} name = {token.item_name} imageSrc = {token.imgHash} price = {token.price} description = {token.description} />
    )
  })
   

  const loader =  <SkeletonTheme color="#202020" highlightColor="#444">
                        <p>
                            <Skeleton count={3} height={300} width={200} />
                        </p>
                </SkeletonTheme>
  
    useEffect( async()=> {
     await sortTokens();
      
    },[])

    let currentDisplay;
    if(displayPointer == 'all'){
      currentDisplay = displayTokens
    }

    if(displayPointer == 'on sale'){
      currentDisplay = tokensOnSale
    }

    if(displayPointer == 'tokens not on sale'){
      currentDisplay = tokensNotOnSale
    }

    const allBtn = classNames('',{
      'active-nft-nav': currentDisplay == displayTokens
    })
   
    const onSaleBtn = classNames('',{
      'active-nft-nav': currentDisplay == tokensOnSale
    })
  
    const notOnSaleBtn = classNames('',{
      'active-nft-nav': currentDisplay == tokensNotOnSale
    })


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
                <p className = "address">{address.slice(0,7).concat('...').concat(address.slice(11,18)) }</p>
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
                <li><button className = {allBtn}
                 onClick={()=> {
                  setDisplayPointer('all')
              }}>All</button></li>

                <li><button className={onSaleBtn}
                 onClick={()=> {
                  setDisplayPointer('on sale')
              }}>On sale</button></li>

                <li><button className={notOnSaleBtn}
                 onClick={()=> {
                  setDisplayPointer('tokens not on sale')
              }}>Not on Sale</button></li>

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
                   currentDisplay
                    : loader
                  }
              
             
            </div>
          </div>
        </div>
      </div>
      
      </>
    );
}

export default Profile