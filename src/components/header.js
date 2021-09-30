import { Link } from 'react-scroll';
import { NavLink} from 'react-router-dom';
import '../styles/landing.css';

const Header = (props) => {
    
    
    return(
        <header>
        <div className="header-content1">
            <div className="texts">
                <h1>NFT Marketplace for African Creators</h1>
                <span> Create, explore and trade in the first-ever African owned  NFT Markeplace.</span>
            </div>
            <div className="btn-box">
                <NavLink className="create-btn header-btn" to="/chooseCreate" >Create</NavLink>

                <button className="explore-btn header-btn"type="button" >
                    <Link className="nav-link explore-btn-link" to="qlip-nfts" smooth={true} duration={1000}>Explore</Link>  
                </button>
            </div>
        </div>

        <div className="header-content2">
            <h2>Ancient Underwater ruin of Oshun</h2>
            <span className="nft-detail">
                Oshun is considered one of the most powerful of all orishas, her temple is filled with treasures and water rune magic.
            </span>
            <span>
                20,000 QLIP <span className="number-index"> 1 of 1</span>
            </span>

        </div>

        </header>
    );
}

export default Header;