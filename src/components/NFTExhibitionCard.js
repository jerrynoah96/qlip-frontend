import "../styles/nftExhibitionCard.css"
const NFTExhibitionCard = ({imageSrc, name, description, price, rightText, leftText}) => {
    return(
        <div className = "nft-picture-container">
            <img src = {imageSrc} class = "nft-picture" alt = "nft" />
            <div className = "nft-description">
                <h1 className = "nft-name">{name}</h1>
                <div className = "info-container">
                    <p className = "left-vertical-text">{leftText}</p>
                    <p className = "nft-decsriptive-text">{description}</p>
                    <p className = "right-vertical-text">{rightText}</p>
                </div>
                
                <h2 className = "nft-price">{price} QLIP</h2>
            </div>
        </div>
    );

}

export default NFTExhibitionCard;