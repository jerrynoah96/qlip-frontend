import React,{useState, useEffect} from "react";
import landingBG from '../images/home-bg.png';
import '../styles/landing.css';
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
import { connectors } from "web3modal";


const Landing =(props)=> {

    const allTokenUrls = props.allTokenUrls;
    const [tokenObjects, setTokenObjects] = useState([]);
    

    let currentpage = 'choose create';
    const setPage=(page)=> {
        page = currentpage;
        props.setPage(page);

    }
    

    const fetchTokens =()=>{ 

        const tokenObj = []
        allTokenUrls.forEach(async urlWithId => {
          const urlWithoutId = urlWithId[0];
          const id = urlWithId[1];
          
          const res = await fetch(urlWithoutId);
          const result = await res.json();
          result.token_id = id;
         
          tokenObj.push(result)
          if(tokenObj.length === allTokenUrls.length) setTokenObjects(tokenObj)
        })
        console.log(tokenObjects, 'token objects')
      }
      
  const displayTokens = tokenObjects.map((token)=> {
      
    return(
        <div key = {token.token_id} className = "nft-card">
        <div className = "nft-image-container">
            <img src = {token.imgHash} alt = "nft product" className = "nft-image" />
        </div>
        <div className = "nft-details">
            <h3 className = "nft-name">{token.item_name}</h3>
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

  const loader =  <SkeletonTheme color="#202020" highlightColor="#444">
                        <p>
                            <Skeleton count={3} height={500} width={500} />
                        </p>
                </SkeletonTheme>

      useEffect( async()=> {
        fetchTokens();
      },[])
    return(
        <div className="landing">


            <header>
            <img src={landingBG} className="landing-bg"/>
            <div className="header-content1">
                <div className="texts">
                    <h1>
                        NFT Marketplace for African Creators
                    </h1>
                    <span>
                    Create, explore and trade in the first-ever African owned  NFT Markeplace.
                    </span>
                </div>
                <div className="btn-box">
                    <button className="create-btn"
                    onClick={setPage}>
                        Create
                    </button>

                    <button className="explore-btn"
                    type="button" disabled>
                        Explore
                    </button>

                </div>

            </div>

            <div className="header-content2">
                <h2>
                    Ancient Underwater ruin of Oshun
                </h2>
                <span className="nft-detail">
                Oshun is considered one of the most powerful of all orishas, her temple is filled with treasures and water rune magic.
                </span>
                <span>
                    20,000 QLIP <span className="number-index"> 1 of 1</span>
                </span>

            </div>

            </header>
            <main>
                <div className = "sections exclusive-qlip-nfts">
                    <h1 className = "section-header qlip-nft-header">Exclusive QLIP NFTs</h1>
                    <p className = "section-tagline">African is home to a large varieties of races, some native to its lands and some hailing from other realms</p>
                    <div className = "cards-container">
                    <NFTExhibitionCard key = "1" name = "RUIN OF OSUN" imageSrc = {ruin_of_osun} price = "40,000" rightText = "1/1" leftText = "SAPPHIRE"
                    description = "Oahun is considered one of the most powerful of all orisha, her temple is filled with treasure and water rune magic." />

                    <NFTExhibitionCard key = "2" name = "BUSHLAND" imageSrc = {bushland} price = "20,000" rightText = "1/1" leftText = "EMERALD"
                    description = "Explore Bushland - the shattered remains of the once beautiful african homeworld, San." />

                    <NFTExhibitionCard key = "3" name = "OSHUN" imageSrc = {oshunNft} price = "100,000" rightText = "1/1" leftText = "RUBY"
                    description = "The Yoruba river diety who rules divinity, feminity, fertility, beauty and love." />
                    </div>
                </div>

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
                            <li><button className = "nav-link active-marketplace-nav">All items</button></li>
                            <li><button className = "nav-link">Art</button></li>
                            <li><button className = "nav-link">Meme</button></li>
                            <li><button className = "nav-link">Photography</button></li>
                            <li><button className = "nav-link">Music</button></li>
                            <li><button className = "nav-link">Video</button></li>
                            <li><button className = "nav-link">3D</button></li>
                            <li><button className = "nav-link">Virtual Reality</button></li>
                            <li><button className = "nav-link">Domain Names</button></li>
                            <li className = "nav-link">filter by: {"Most Recent"}</li>
                        </ul>
                    </nav>
                    <div className = "nft-container">
                    

                        {!!tokenObjects.length ? displayTokens : loader}
                       
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