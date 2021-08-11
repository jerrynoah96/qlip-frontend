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
            <div className="choose-create-heading">
            <div className="choose-describe">
            <h1>Create your QLIP Collectibles</h1>
            
            Choose <p>“Single”</p>  if you want your collectible to 
            be one of a kind or <p>“Multiple”</p> if you want to sell one collectible multiple times
            </div>

            </div>

            <div className="create-options">
                <div className="create-option">
                    <img src={singleLogo} alt="single"/>

                    <h2 className="choice-title">Single</h2>
                    <span className="choice-desc"> create a one kind collectible</span>

                    <button
                    onClick={setPage}>Create Single</button>
                </div>

                <div className="create-option create-multiple">
                    <img src={multipleLogo} alt="multiple"/>

                    <h2 className="choice-title">Multiple</h2>
                    <span className="choice-desc"> sell one collectible multiple times</span>

                    <button
                    type="button" disabled>Create Multiple</button>
                </div>

            </div>

           
            
        </div>


    )
}

export default ChooseCreate;