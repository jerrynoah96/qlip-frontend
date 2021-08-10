import productImage from "../images/product_img.svg"
import "../styles/NFTCard.css"
const NFTCard = ({name, imageSrc, description, price}) => {
   // console.log(props.token_url, 'mehn right from the cards')
    return(
        <div className = "nft-card">
            <div className = "nft-image-container">
                <img src = {imageSrc} alt = "nft product" className = "nft-image" />
            </div>
            <div className = "nft-details">
                <h3 className = "nft-name">{name}</h3>
                <div className = "detail-1">
                    <h4>{price} QLIP</h4>
                    <p>1 of 1</p>
                </div>
                <div className = "detail-2">
                    <p><span>Highest bid </span>0.001ETH</p>
                    <p><span>new bid &#128293;</span></p>
                </div>
            </div>
            <button className = "buy-btn">Buy NFT</button>
        </div>
    );
}

export default NFTCard;