import "../styles/nftExhibitionCard.css"
const NFTExhibitionCard = ({imgSrc, name, description, price, rightText, leftText}) => {
    return(
        <div className = "nft-container">
            <div className = "nft-picture-container">
                <img src = {imgSrc} class = "nft-picture" alt = "nft" />
            </div>
            <div className = "nft-description">
                <h1 className = "nft-name">{name}</h1>
                <div className = "info-container">
                   
                    <p className = "nft-decsriptive-text">{description}</p>
                    <span className="left-vertical-text">{leftText}</span>
                    <span className = "right-vertical-text">{rightText}</span>
                    
                </div>
            </div>
            <h2 className = "nft-price">{price}</h2>
        </div>
    );

}

export default NFTExhibitionCard;