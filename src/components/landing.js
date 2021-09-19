import React,{useState, useEffect} from "react";

import NavBar from './navbar';
import '../styles/landing.css';
import QLIPNFTS from './qlipNFTSection';
import bushland from "../images/BUSHLAND.png";
import ruin_of_osun from "../images/RUIN_OF_OSHUN.png"
import oshunNft from "../images/OSHUN_NFT.png"
import NFTExhibitionCard from "./NFTExhibitionCard";
import NFTCard from "./nftcard";
import productImage from "../images/product_img.svg"
import sellerPic from "../images/Ranked_Seller.png"
import TopSellers from "./TopSellers"
import Exhibit from "./Exhibit";
import Modal from 'react-bootstrap/Modal';
import "../styles/NFTCard.css"
import "../styles/exhibit.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import classNames from 'classnames';
import { connectors } from "web3modal";


const Landing =(props)=> {

    const allTokensArray = props.allTokensArray;
    const [tokenObjects, setTokenObjects] = useState([]);
    const [displayPointer, setDisplayPointer] = useState('all');
    const [photography, setPhotoGraphy] = useState([]);
    const [meme, setMeme] = useState([]);
    const [art, setArt] = useState([]);
    

  
    

    const sortTokens =()=>{ 
        const tokenObj = []
        const photoObj=[]
        const memeObj = []
        const artObj = []
        allTokensArray.map(async token => {

          if(token.category == 1){
            await  photoObj.push(token)
              
          }
          if(token.category == 2){
            await artObj.push(token)
              
          }
          if(token.category == 3){
           await memeObj.push(token)
         }

         
      await tokenObj.push(token)
       await setPhotoGraphy(photoObj);
       await  setMeme(memeObj);
        await setArt(artObj);
          
          console.log(artObj, 'art category')
          if(tokenObj.length === allTokensArray.length) setTokenObjects(tokenObj)
        })
        console.log(tokenObjects, 'token objects')
      } 
      
  const allTokens = allTokensArray.map((token)=> {   
    return(
        <div key = {token.id} className = "nft-card">
        <div className = "nft-image-container">
            <img src = {token.imgUrl} alt = "nft product" className = "nft-image" />
        </div>
        <div className = "nft-details">
            <h3 className = "nft-name">{token.name}</h3>
            <div className = "detail-1">
                <h4>{token.price} BNB</h4>
                <p>1 of 1</p>
            </div>
            <div className = "detail-2">
                <p><span>Highest bid </span></p>
                <p><span>new bid &#128293;</span></p>
            </div>
        </div>
        <button className = "buy-btn"
        onClick={()=> {
            props.setExhibit(token)
        }}>Buy NFT</button>
    </div>
      
    )
  })


  const artTokens = art.map((token)=> {
      
    return(
        <div key = {token.id} className = "nft-card">
        <div className = "nft-image-container">
            <img src = {token.imgUrl} alt = "nft product" className = "nft-image" />
        </div>
        <div className = "nft-details">
            <h3 className = "nft-name">{token.name}</h3>
            <div className = "detail-1">
                <h4>{token.price} BNB</h4>
                <p>1 of 1</p>
            </div>
            <div className = "detail-2">
                <p><span>Highest bid </span></p>
                <p><span>new bid &#128293;</span></p>
            </div>
        </div>
        <button className = "buy-btn"
        onClick={()=> {
            props.setExhibit(token)
        }}>Buy NFT</button>
    </div>
      
    )
  })

  const photographyTokens = photography.map((token)=> {
      
    return(
        <div key = {token.id} className = "nft-card">
        <div className = "nft-image-container">
            <img src = {token.imgUrl} alt = "nft product" className = "nft-image" />
        </div>
        <div className = "nft-details">
            <h3 className = "nft-name">{token.name}</h3>
            <div className = "detail-1">
                <h4>{token.price} BNB</h4>
                <p>1 of 1</p>
            </div>
            <div className = "detail-2">
                <p><span>Highest bid </span></p>
                <p><span>new bid &#128293;</span></p>
            </div>
        </div>
        <button className = "buy-btn"
        onClick={()=> {
            props.setExhibit(token)
        }}>Buy NFT</button>
    </div>
      
    )
  })
  const memeTokens = meme.map((token)=> {
      
    return(
        <div key = {token.id} className = "nft-card">
        <div className = "nft-image-container">
            <img src = {token.imgUrl} alt = "nft product" className = "nft-image" />
        </div>
        <div className = "nft-details">
            <h3 className = "nft-name">{token.name}</h3>
            <div className = "detail-1">
                <h4>{token.price} BNB</h4>
                <p>1 of 1</p>
            </div>
            <div className = "detail-2">
                <p><span>Highest bid </span></p>
                <p><span>new bid &#128293;</span></p>
            </div>
        </div>
        <button className = "buy-btn"
        onClick={()=> {
            props.setExhibit(token)
        }}>Buy NFT</button>
    </div>
      
    )
  })

  let currentDisplay;
  if(displayPointer == 'all'){
      currentDisplay = allTokens
  }
  if(displayPointer == 'art'){
      currentDisplay = artTokens
  }
  if(displayPointer == 'photography'){
    currentDisplay = photographyTokens
}
if(displayPointer == 'meme'){
    currentDisplay = memeTokens
}

const allBtn = classNames('nav-link',{
    'active-marketplace-nav': currentDisplay == allTokens
  })
  const artBtn = classNames('nav-link',{
    'active-marketplace-nav': currentDisplay == artTokens
  })

  const memeBtn = classNames('nav-link',{
    'active-marketplace-nav': currentDisplay == memeTokens
  })

  const photoBtn = classNames('nav-link',{
    'active-marketplace-nav': currentDisplay == photographyTokens
  })

  const loader =  <SkeletonTheme color="#202020" highlightColor="#444">
                        <p>
                            <Skeleton count={3} height={500} width={400} />
                        </p>
                </SkeletonTheme>

      useEffect( async()=> {
        await sortTokens();
      },[])
    return(
        <div className="landing" id="landing">
           
            <main>
                

                <div className = "sections top-sellers">
                    <h1 className = "section-header">Top Sellers</h1>
                    <div className = "top-seller-container">
                        <TopSellers key = "1" name = "Karla Gyan" profilePic = {sellerPic} number = "1" balance = "700" />
                        <TopSellers key = "2" name = "Karla Gyan" profilePic = {sellerPic} number = "2" balance = "500" />
                        <TopSellers key = "3" name = "Karla Gyan" profilePic = {sellerPic} number = "3" balance = "200" />
                        <TopSellers key = "4" name = "Karla Gyan" profilePic = {sellerPic} number = "4" balance = "100" />
                        <TopSellers key = "5" name = "Karla Gyan" profilePic = {sellerPic} number = "5" balance = "100" />
                    </div>

                    {/* 2. 3772ff 3. 0ead6f ... 23262f */}
                    
                </div>

                <div className = "sections market-place">
                    <h1 className = "section-header">Marketplace</h1>
                    <nav className = "marketplace-nav">
                        <ul>
                            <li><button className = {allBtn}
                            onClick={()=> {
                                setDisplayPointer('all')
                            }}>All items</button></li>

                            <li><button className = {artBtn}
                            onClick={()=> {
                                setDisplayPointer('art')
                            }}>Art</button></li>

                            <li><button className = {memeBtn}
                            onClick={()=> {
                                setDisplayPointer('meme')
                            }}>Meme</button></li>

                            <li><button className = {photoBtn}
                            onClick={()=> {
                                setDisplayPointer('photography')
                            }}>Photography</button></li>
                            <li><button className = "nav-link">Music</button></li>
                            <li><button className = "nav-link">Video</button></li>
                            <li><button className = "nav-link">3D</button></li>
                            <li><button className = "nav-link">Virtual Reality</button></li>
                            <li><button className = "nav-link">Domain Names</button></li>
                            <li className = "nav-link">filter by: {"Most Recent"}</li>
                        </ul>
                    </nav>
                    <div className = "nft-container">
                    

                        {!!allTokensArray.length ? currentDisplay : loader}
                       
                    </div>
                    <div className = "load-more-btn-container">
                        <button className = "load-more">Load More</button>
                    </div>
                    
                </div>
            </main>
        </div>
        
    )

}

export default Landing;