
import landingBG from '../images/landingBackground.jpg';
import '../styles/landing.css';

const Header = (props) => {
    let currentpage = 'choose create';
    const setPage=(page)=> {
        page = currentpage;
        props.setPage(page);

    }
    return(
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
    );
}

export default Header;