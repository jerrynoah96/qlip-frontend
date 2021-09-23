import React from 'react';
import singleLogo from '../images/single.svg';
import multipleLogo from '../images/multiple.svg';
import '../styles/chooseCreate.css';


const ChooseCreate = (props)=> {
    let currentpage = 'create';
    const setPage=(page)=> {
        page = currentpage;
        props.setPage(page);

    }


    return(
        <div className="choose-create">
            <div className = "choose-create-container">
                <div className="choose-create-heading">
                    <h1>Create your QLIP Collectibles</h1>
                    <p>Choose <span>“Single”</span>  if you want your collectible to be one of a kind or <span>“Multiple”</span> if you want to sell one collectible multiple times</p>
                </div>

                <div className="create-options">
                    <div className="create-option">
                        <div className = "image-container">
                            <img src={singleLogo} alt="single"/>
                        </div>
                        <div className = "option-text">
                            <h2 className="choice-title">Single</h2>
                            <span className="choice-desc"> create a one kind collectible</span>
                        </div>
                        <button onClick={setPage}>Create Single</button>
                    </div>

                    <div className="create-option create-multiple">
                        <div className = "image-container">
                            <img src={multipleLogo} alt="multiple"/>
                        </div>
                        <div className = "option-text">
                            <h2 className="choice-title">Multiple</h2>
                            <span className="choice-desc"> sell one collectible multiple times</span>
                        </div>
                        <button type="button" disabled>Create Multiple</button>
                    </div>

                </div>
            </div>     
            
        </div>


    )
}

export default ChooseCreate;