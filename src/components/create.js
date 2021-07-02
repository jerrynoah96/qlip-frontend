import React, {Component} from 'react';
import switchLogo from '../images/switch.png';
import audioLogo from '../images/music-collection-logo.svg';
import reelLogo from '../images/reel-collection-logo.svg';
import artLogo from '../images/art-collection-logo.svg';
import addIcon from '../images/add-icon.svg';
import arrow from '../images/arrow.svg';
import autoSaveIcon from '../images/autosaving.svg';
import { ToggleButton } from "./toggleButton";
import Preview from './create-preview';

import '../styles/create.css';

class Create extends Component {


    constructor(props) {
        super(props);
        this.state={
            selected: false,
            selected1: false,
            selected2: false
            
    
        }
    
       {/* this.handleInput = this.handleInput.bind(this);
        this.uploadImgToIPFS = this.uploadImgToIPFS.bind(this);
        this.uploadToIPFS = this.uploadToIPFS.bind(this);
       this.submitForm = this.submitForm.bind(this); */}
    }

   
      handleInput=(e)=> {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

render(){
    return(
        <div className="create-section">
            <div className="preview">
            <Preview />

            </div>

            
            

            <div className="create-section-form">
                
                <form className="create-form" onSubmit={this.submitForm}>
                    <div className="form-heading">
                        <h3>Create Single Collectible</h3>
                        <span>Switch to Multiple Collectible 
                            <img src={switchLogo} alt="switchlogo"/>
                        </span>

                    </div>
                <div className="upload-file-box">
                    <h2>Upload File in Any Format</h2>
                    <span>PNG, GIF, JPG, WMV, MP4, MP3, OBJ, 3DS</span>

                    <input type="file" id="actual-btn" hidden/>
                    <label for="actual-btn">Browse Files</label>

                </div>
                <div className="item-details-input">
                    <h2>Item Details</h2>

                    <div className="input-box">
                    <label htmlFor="item-name">ITEM NAME</label>
                    <input type="text" id="item-name" placeholder="e.g.Redeemable Botcoin Card with logo"
                    name="item-name" 
                    onChange={this.handleInput} />
                    </div> 


                <div className="input-box">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" id="description" placeholder="e.g. After Purchasing, you will be able to recieve the logo"
                    name="description" 
                    onChange={this.handleInput} />

                </div>

                <div className="input-box">
                    <label htmlFor="price">PRICE</label>
                    <input type="number" id="price" placeholder="e.g. 100"
                    name="price" 
                    onChange={this.handleInput} />

                </div>
                <div className="small-inputs">
                    <div className="input-box">
                        <label htmlFor="royalty">ROYALTIES</label>
                        <input type="text" id="royalty" placeholder="e.g. 10%"
                        name="royalty" 
                        onChange={this.handleInput} />

                    </div>

                    <div className="input-box">
                        <label htmlFor="size">SIZE</label>
                        <input type="text" id="size" placeholder="e.g. Size"
                        name="size" 
                        onChange={this.handleInput} />

                    </div>

                    <div className="input-box">
                        <label htmlFor="properties">PROPERTIES</label>
                        <input type="text" id="properties" placeholder="e.g. Height, Width"
                        name="properties" 
                        onChange={this.handleInput} />

                    </div>


                </div>
                <div className="toggle-options">
                    <div className="toggle-option">
                        <div className="texts">
                            <span>
                                Put on sale
                            </span>
                            <p>
                                You'll recieve bids on this item
                            </p>

                        </div>

                        <div className="green-toggle">
                        <ToggleButton
                            selected={this.state.selected}
                            toggleSelected= {()=> {
                                this.setState({
                                    selected: !this.state.selected
                      
                                })

                            }}
                        />

                        </div>

                    </div>

                    <div className="toggle-option">
                        <div className="texts">
                            <span>
                                Instant sale price
                            </span>
                            <p>
                                Enter the price for which the item will be instantly sold
                            </p>

                        </div>

                        <div className="green-toggle">
                        <ToggleButton
                            selected={this.state.selected1}
                            toggleSelected={()=> {
                                this.setState({
                                    selected1: !this.state.selected1
                      
                                })

                            }}
                        />

                        </div>

                    </div>

                    <div className="toggle-option">
                        <div className="texts">
                            <span> 
                                Unlock once purchased
                            </span>
                            <p>
                                Content will be unlocked after successful transaction 
                            </p>

                        </div>

                        <div className="green-toggle">
                        <ToggleButton
                            selected={this.state.selected2}
                            toggleSelected={()=> {
                                this.setState({
                                    selected2: !this.state.selected2
                      
                                })

                            }}
                        />

                        </div>

                    </div>

                </div>
                
                <div className="collection-choice">
                    <span>
                        Choose collection
                    </span>
                    <p>
                    Choose an exiting collection or create a new one
                    </p>
                    <div className="boxes">
                        <div className="box">
                            <img src={addIcon}/>
                            <span>Create Collection</span>

                        </div>

                        <div className="box">
                            <img src={artLogo}/>
                            <span>Artist Collection</span>

                        </div>

                        <div className="box">
                            <img src={audioLogo}/>
                            <span>Music Collection</span>

                        </div>

                        <div className="box">
                            <img src={reelLogo}/>
                            <span>Reel Collection</span>

                        </div>

                    </div>

                </div>

                
                    
            
               

                </div> 
                <div className="submit-btn-box">
                    <button>Create Item 
                        <img src={arrow} alt="arrow-icon"/>
                    </button>

                    <div className="auto-save">
                        <span>
                        Auto Saving
                            </span>
                        <img src={autoSaveIcon} alt="auto-save"/>
                    </div>

                </div>
            

            </form>

            </div>

        </div>
    )

}
    

}
export default Create;