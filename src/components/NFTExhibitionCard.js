import "../styles/nftExhibitionCard.css"
const NFTExhibitionCard = ({imgSrc, name, description, price, rightText, leftText}) => {
    return(
        <div className = "nft-container">
            <div className = "nft-picture-container-card">
                <img src = {imgSrc} className = "nft-image" alt = "nft" />
            </div>
            <div className = "nft-descriptn">
                <h1 className = "nft-name">{name}</h1>
                <div className = "details-container"> 
                    <p className = "decsriptive-text">{description}</p>
                    <span className="left-text">{leftText}</span>
                    <span className = "right-text">{rightText}</span>
                </div>
            </div>
            <h2 className = "nft-price">{price}</h2>
        </div>
    );

}

export default NFTExhibitionCard;