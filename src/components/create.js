import React, {Component} from 'react';
import switchLogo from '../images/switch.png';
import arrow from '../images/arrow.svg';
import closeIcon from "../images/iCon_Close.svg";
import {withRouter } from 'react-router-dom';
import autoSaveIcon from '../images/autosaving.svg';
import { ToggleButton } from "./toggleButton";
import Preview from './create-preview';
import classNames from 'classnames';
import '../styles/create.css';



class Create extends Component {


    constructor(props) {
        super(props);
        this.state={
            show: false,
            imgReadableStream: null,
            imgIpfsHash: "",
            loaderShow: false,
            loaderUrl: "https://i.pinimg.com/originals/3f/6b/90/3f6b904917f65c3aa8f8e1207323ad88.jpg",
            progressText: "processing request",
            preview_btn: false,
            nftDetails: {
                userImage: null,
                buffer: "",
                owner: null,
                imgHash:  null,
                item_name: "",
                description: "",
                price: "",
                royalty: "",
                size: "",
                property: "",
                on_sale: false,
                instant_sale_price: false,
                unlock_on_purchase: false,
                category: "1"
            }
            

        }
    
       this.handleInput = this.handleInput.bind(this);
        // this.uploadImgToIPFS = this.uploadImgToIPFS.bind(this);
     //   this.CaptureDetails = this.CaptureDetails.bind(this);
      // this.MintNft = this.MintNft.bind(this); 
      
    }

    
   
      handleInput=(e)=> {
        this.setState({
            nftDetails :{
                ...this.state.nftDetails,
                [e.target.name]: e.target.value

            }
        })
       console.log(this.state.nftDetails.category, this.state.nftDetails.royalty)
      
    
      }

      //the function that is called upon form submission
    FormDetails=(e)=> {
         e.preventDefault();
         const { history } = this.props;
         if(history) history.push('/Options');
        this.props.formDetails(this.state.nftDetails);


    }

      
      captureImg = (e)=>{
        e.preventDefault();
        console.log('file catured')
        //process file for ipfs
        //first fetch file from event
        const userFile = e.target.files[0];
        this.setState({
            nftDetails:{
                ...this.state.nftDetails,
                userImage: URL.createObjectURL(userFile)
            }
            
        })
        console.log(this.state.nftDetails.userImage, userFile,'images');
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(userFile);
        reader.onloadend = () => {
            this.setState({
                nftDetails:{
                    ...this.state.nftDetails,
                    buffer: Buffer(reader.result)
                }
                
            })
            
           
        }
    
    }
    handleClose=()=> {
        this.setState({
            show: false
        })
    }
    

   

   

   


    
   

   


render(){
    
    const previewClass = classNames('preview', {
        'preview-mobile': this.state.preview_btn === true
    })

    return(

        <div className="create-section">
        
            <div className={previewClass}>
                
                <div className = "cancel-icon-contaner"
                onClick={(e)=> {
                    e.preventDefault();
                    this.setState({
                        
                        preview_btn: false
                    })
                }} >
                    <img src = {closeIcon} className = "" alt = "close" />
                </div>
                <Preview userImage={this.state.nftDetails.userImage}
                imageName={this.state.nftDetails.item_name}
                imagedescription={this.state.nftDetails.description}
                imageprice={this.state.nftDetails.price}/>
            </div>


            { this.state.loaderShow ? <div className="progress-loader" display={this.state.loaderShow}>
                <img src={this.state.loaderUrl} alt="loader" />
                <span>{this.state.progressText}</span>
                </div>: null 
            }
            

            <div className="create-section-form">

                <form className="create-form" >

                    <div className="form-heading">
                        <h3>Create Single Collectible</h3>
                        <span>
                            Switch to Multiple Collectible 
                            <img src={switchLogo} alt="switchlogo"/>
                        </span>
                    </div>

                    <div className="upload-file-box">
                        <h2>Upload File in Any Format</h2>
                        <span>PNG, GIF, JPG, WMV, MP4, MP3, OBJ, 3DS</span>

                        <input type="file" id="actual-btn" hidden onChange={this.captureImg}/>
                        <label for="actual-btn">Browse Files</label>
                    </div>
                    
                    <div className="item-details-input">
                        <h2>Item Details</h2>

                        <div className="input-box">
                            <label htmlFor="item-name">Item Name</label>
                            <input type="text" id="item_name" placeholder="e.g.Redeemable Bitcoin Card with logo"
                                name="item_name" 
                                value={this.state.nftDetails.item_name}
                                onChange={this.handleInput}
                                required
                            />
                        </div> 


                        <div className="input-box">
                            <label htmlFor="description">DESCRIPTION</label>
                            <input type="text" id="description" placeholder="e.g. After Purchasing, you will be able to recieve the logo"
                                name="description" 
                                value={this.state.nftDetails.description}
                                onChange={this.handleInput} 
                                required
                            />

                        </div>

                        <div className="input-box">
                            <label htmlFor="price">PRICE</label>
                            <div className="price-input">
                                <input type="number" id="price" placeholder="e.g. 100"
                                    name="price" 
                                    value={this.state.nftDetails.price}
                                    onChange={this.handleInput} 
                                    required
                                />
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBNNXA7K21yYyQZxM-iUcGilYqNJp68TcDWaCFepHcLKjA08-UWWOiB65ou1EXlPvDlP4&usqp=CAU" alt="token logo"/>
                            </div>
                        </div>

                        <div className="input-box categories">
                                        {/*
                                            <label htmlFor="royalty">ROYALTIES</label>
                                            <input type="text" id="royalty" placeholder="e.g. 10%"
                                            name="royalty" 
                                            value={this.state.nftDetails.royalty}
                                            onChange={this.handleInput} />
                                            */}
                            <label htmlFor="category">
                                CATEGORIES
                            <select defaultValue={this.state.nftDetails.category} id="category" name="category" onChange={this.handleInput} className="input-box royalties">            
                                <option value="1">Photography</option>
                                <option value="2">Art</option>
                                <option value="3">Meme</option>
                            </select>
                            
                            </label>
                            
                        </div>

                        <div className="input-box royalties">
                                        {/*
                                            <label htmlFor="royalty">ROYALTIES</label>
                                            <input type="text" id="royalty" placeholder="e.g. 10%"
                                            name="royalty" 
                                            value={this.state.nftDetails.royalty}
                                            onChange={this.handleInput} />
                                            */}

                            <label htmlFor="royalty">
                                ROYALTIES
                            <select defaultValue={this.state.nftDetails.royalty} id="royalty" name="royalty" onChange={this.handleInput} className="input-box royalties">            
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                            </select>
                            <span>Suggested: 0%, 10%, 20%, 30%. Maximum is 50%</span>
                            </label>
                            
                        </div>
                        <div className="small-inputs">
            
                            <div className="input-box">
                                <label htmlFor="size">SIZE (Optional)</label>
                                <input type="text" id="size" placeholder="e.g. Size"
                                name="size" 
                                value={this.state.nftDetails.size}
                                onChange={this.handleInput}/>

                            </div>

                            <div className="input-box">
                                <label htmlFor="properties">PROPERTIES(Optional)</label>
                                <input type="text" id="property" placeholder="e.g. Height, Width"
                                name="property" 
                                value={this.state.nftDetails.property}
                                onChange={this.handleInput} />
                            </div>
                        </div>
                        <div className="toggle-options">
                            <div className="toggle-option">
                                <div className="texts">
                                    <span>Put on sale</span>
                                    <p>You'll recieve bids on this item</p>
                                </div>

                                <div className="green-toggle">
                                    <ToggleButton
                                        selected={this.state.nftDetails.on_sale}
                                        toggleSelected= {()=> {
                                            this.setState({
                                                nftDetails :{
                                                    ...this.state.nftDetails,
                                                    on_sale: !this.state.nftDetails.on_sale
                            
                                                }
                                            })

                                        }}
                                    />
                                </div>
                            </div>

                            <div className="toggle-option">
                                <div className="texts">
                                    <span>Instant sale price</span>
                                    <p>Enter the price for which the item will be instantly sold</p>
                                </div>

                                <div className="green-toggle">
                                    <ToggleButton
                                        selected={this.state.nftDetails.instant_sale_price}
                                        toggleSelected={()=> {
                                            this.setState({
                                                nftDetails :{
                                                    ...this.state.nftDetails,
                                                    instant_sale_price: !this.state.nftDetails.instant_sale_price
                            
                                                }
                                            })

                                        }}
                                    />
                                </div>
                            </div>

                            <div className="toggle-option">
                                <div className="texts">
                                    <span>Unlock once purchased</span>
                                    <p>Content will be unlocked after successful transaction</p>
                                </div>

                                <div className="green-toggle">
                                    <ToggleButton
                                        selected={this.state.nftDetails.unlock_on_purchase}
                                        toggleSelected={()=> {
                                            this.setState({
                                                nftDetails :{
                                                    ...this.state.nftDetails,
                                                    unlock_on_purchase: !this.state.nftDetails.unlock_on_purchase
                            
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
              {
              /*  
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

                        <div className="box art-collection"
                        onClick={()=> {
                            this.setState({
                                show: true,
                                nftDetails :{
                                    ...this.state.nftDetails,
                                    category: 1
            
                                }
                            })

                            
                        }}>
                            <img src={artLogo}/>
                            <span>Artist Collection</span>

                        </div>

                        <div className="box music-collection"
                         onClick={()=> {
                            this.setState({
                                nftDetails :{
                                    ...this.state.nftDetails,
                                    category: 2
            
                                }
                            })
                        }}
                         >
                            <img src={audioLogo}/>
                            <span>Music Collection</span>

                        </div>

                        <div className="box video-collection"
                         onClick={()=> {
                            this.setState({
                                nftDetails :{
                                    ...this.state.nftDetails,
                                    category: 3
            
                                }
                            })
                        }}>
                            <img src={reelLogo}/>
                            <span>Reel Collection</span>

                        </div>

                    </div>

                </div>
                */
                    }

                    </div>

                    <div className="submit-btn-box">
                        <button onClick={this.FormDetails} type="submit">
                            <span className="create-form-btn" >Create Item 
                                <img src={arrow} alt="arrow-icon"/>
                            </span>

                        </button>

                        <button className="preview-btn"
                        onClick={(e)=> {
                            e.preventDefault();
                            this.setState({
                                preview_btn: true
                            })
                        }}  >
                            Preview 
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
export default withRouter (Create);