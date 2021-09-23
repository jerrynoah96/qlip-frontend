import iconCup from "../images/Icon_Cup.svg"
import verifiedIcon from "../images/icons8_verified_account.svg"
import "../styles/topSellers.css"

const TopSellers = ({profilePic, name, number, balance}) => {
    let tagBgColor = "#23262f"
    
    
   switch (number) {
    case "1":
        tagBgColor = "#4caf50";
        break;
    case "2":
        tagBgColor = "#441ebf";
        break;
    case "3":
        tagBgColor = "#3772ff";
        break;
    default:
        break;

   }
    return(
        <div className = "top-seller-card">
            <div className = "rank-tag" style = {{backgroundColor: tagBgColor}}>
                <img src = {iconCup} alt = "rank icon" className = "" /> <span>#{number} Ranked Seller</span>
            </div>
            <div className = "seller-profile">
                <div className = "profile-picture-container">
                    <img src = {profilePic} alt = "seller profile avatar" className = "profile-picture" />
                    <img src = {verifiedIcon} all = "verified user" className = "verified-icon" />
                </div>
                <h5 className = "seller-username">{name}</h5>
                <p className = "seller-balance">{balance}<span> BNB</span></p>
            </div>
        </div>
    );
}

export default TopSellers