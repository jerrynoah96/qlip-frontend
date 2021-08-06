import React,{useState, useEffect} from "react";
import headerImg from "../images/Header_Image.png"
import productImage from "../images/product_img.svg"
// import imagePlaceholderIcon from "./assets/Icon_Image.svg"
import profilePic from "../images/Profile_picture.png"
// import editIcon from "./assets/Edit_icon.svg"
import verifiedIcon from "../images/icons8_verified_account.svg"
import NFTCard from "./nftcard";
import axios from "axios";
import "../styles/profile.css";
import "../styles/NFTCard.css"

const Profile = (props) => {
 // const [tokensArray, setTokensArray] = useState([]);
  const [tokenUrls, setTokenUrls]= useState([]);
console.log("with new api")
    const fetchTokens =async ()=> {
     const res = await fetch("https://api.covalenthq.com/v1/97/address/0x9dc821bc9B379a002E5bD4A1Edf200c19Bc5F9CA/balances_v2/?nft=true&key=ckey_a452d9486064473fa3ca4c02075");
     const resJson = await res.json();
    
    console.log(resJson, 'resJson')
   const tokensArray = resJson.data.items; 
     
     tokensArray.map((token)=> {
      if(token.nft_data !== null){
        if(token.nft_data.contract_address === props.contractAddress){
          (token.nft_data).map((nft)=> {
            console.log(nft, 'nfts in address')   
          })
        }
      }
    }) 

   
    
  
    }
    

 

  

    useEffect(()=> {
      fetchTokens();
    },[fetchTokens])
    return(
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
                <h2>Karla Gyan <img src = {verifiedIcon} className = "verified-icon" alt = "verified icon" /></h2>
                <p>0x495f947245...cb7b5eby</p>
              </div>
              <div className = "user-about-section">
                <p>A 2D hyper-realist artist with 10 years experience designing portrait for influential celebrities and goverment officials</p>
              </div>
              <div className = "user-history">
                <div className = "history-item">
                  <h3>2,000</h3>
                  <p>NFTs Created</p>
                </div>
                <div className = "history-item">
                  <h3>45</h3>
                  <p>NFTs Sold</p>
                </div>
                <div className = "history-item">
                  <h3>24</h3>
                  <p>NFTs Bought</p>
                </div>
              </div>
            </div>
            <button className = "follow-button">Follow Karla</button>
          </div>
          <div className = "nfts-section">
            <h1 className = "section-title">NFTs</h1>
            <div className = "nft-nav">
              <ul>
                <li><button className = "active-nft-nav">On Sale</button></li>
                <li><button>Created</button></li>
                <li><button>Collections</button></li>
                <li><button>Bought</button></li>
                <li><button>Following</button></li>
              </ul>
            </div>
            <div className = "nfts-container">
              
             
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profile