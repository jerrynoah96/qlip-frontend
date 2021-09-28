import "../styles/NFTCard.css"
import { useHistory } from "react-router-dom";
const NFTCard = ({name, imageSrc, price, uniqueId}, props) => {

    let history = useHistory();

    const buy=async()=> {
        props.sell();
        history.push(`/set-sale/${uniqueId}`)
    }
    
    return(
        <div className = "nft-card">
            <div className = "nft-image-container">
                <img src = {imageSrc} alt = "nft product" className = "nft-image" />
            </div>
            <div className = "nft-details">
                <h3 className = "nft-name">{name}</h3>
                <div className = "detail-1">
                    <h4>{price} BNB</h4>
                    <p>1 of 1</p>
                </div>
                <div className = "detail-2">
                    <p><span>Highest bid </span>----</p>
                    <p><span>new bid &#128293;</span></p>
                </div>
            </div>
            <button className = "buy-btn" onClick = {buy}>Set To Sale</button>
        </div>
    );
}

export default NFTCard;