import {useRef, useState} from "react"
import bushland from "../images/BUSHLAND.png";
import ruin_of_osun from "../images/RUIN_OF_OSHUN.png"
import oshunNft from "../images/OSHUN_NFT.png"
import NFTExhibitionCard from "./NFTExhibitionCard";
import "../styles/NFTCard.css"
import "../styles/exhibit.css"


const QlipNFTS = (props) => {
    
    return(
        <main id="qlip-nfts">
             <div className = "sections exclusive-qlip-nfts" >
                    <h1 className = "section-header qlip-nft-header">Exclusive QLIP NFTs</h1>
                    <p className = "section-tagline">African is home to a large varieties of races, some native to its lands and some hailing from other realms</p>
                    <div className = "cards-container">
                    <NFTExhibitionCard key = "1" name = "RUIN OF OSUN" imageSrc = {ruin_of_osun} price = "20" rightText = "1/1" leftText = "SAPPHIRE"
                    description = "Oahun is considered one of the most powerful of all orisha, her temple is filled with treasure and water rune magic." />

                    <NFTExhibitionCard key = "2" name = "BUSHLAND" imageSrc = {bushland} price = "50" rightText = "1/1" leftText = "EMERALD"
                    description = "Explore Bushland - the shattered remains of the once beautiful african homeworld, San." />

                    <NFTExhibitionCard key = "3" name = "OSHUN" imageSrc = {oshunNft} price = "60" rightText = "1/1" leftText = "RUBY"
                    description = "The Yoruba river diety who rules divinity, feminity, fertility, beauty and love." />
                    </div>
                </div>
        </main>
    );
}
export default QlipNFTS;