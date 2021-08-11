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
import Modal from 'react-bootstrap/Modal';
import '../styles/create.css';



const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: "ipfs.infura.io", port: 5001, protocol:"https"})

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('583a9e7e2b1ccaea8de3',
 '2ca5978f83ed954ee26ca3f6501ba443caf7e17eff01134623ad3e2fabd9bd9f');
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
                category: ""
            }
            

        }
    
       this.handleInput = this.handleInput.bind(this);
         this.uploadImgToIPFS = this.uploadImgToIPFS.bind(this);
     //   this.CaptureDetails = this.CaptureDetails.bind(this);
       this.MintNft = this.MintNft.bind(this); 
      
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

     setPage=(page)=> {
        page = 'options';
        this.props.setPage(page);
        this.props.setFormDetails(this.state.nftDetails);


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
            console.log(this.state.buffer, 'new buffer');
           
        }
    
    }
    handleClose=()=> {
        this.setState({
            show: false
        })
    }
    

   

    uploadImgToIPFS = async (e)=> {
        
        console.log('pushing file to IPFS')
        if(this.state.buffer){
            try{
                const result = await ipfs.add(this.state.buffer)
                const imgIpfsHash = result.cid.string;
                //console.log('result', result);
                
                this.setState({
                    nftDetails :{
                        ...this.state.nftDetails,
                        imgHash: "https://ipfs.infura.io/ipfs/"+imgIpfsHash

                    }
                })

                 console.log(this.state.imgIpfsHash, 'Img ipfs hash')
                 console.log(this.state.nftDetails.imgHash, 'ipfs link json')
                
            }
            catch(e){
                console.log('error', e)
            }
        
        } else{
            alert('choose a valid file');
        }

    }

    MintNft=async(e)=> {
        this.setState({
            loaderShow: true
        })
        e.preventDefault();
        this.setState({
            progressText: "pinning your file to IPFS"
        })

        await this.uploadImgToIPFS();
        this.setState({
            nftDetails :{
                ...this.state.nftDetails,
                owner: this.props.contractDetails.account
            }
        })
        const res = this.state.nftDetails;
        
        const pinataRes = await pinata.pinJSONToIPFS(res);
          this.setState({
            loaderUrl: "https://i.pinimg.com/originals/3f/6b/90/3f6b904917f65c3aa8f8e1207323ad88.jpg"
        })

        const URI = "https://ipfs.infura.io/ipfs/"+pinataRes.IpfsHash


    try{

    
            
            this.setState({
                progressText: "Minting NFT",
                loaderUrl: "https://flevix.com/wp-content/uploads/2021/06/Neon-Loading.gif"
                })
        
            const mint_reciept = await this.props.contractDetails.contractInstance.methods.mintWithIndex(this.props.contractDetails.account,
                    URI, this.state.nftDetails.category).send({
                        from: this.props.contractDetails.account
                    })

                    this.setState({
                        progressText: "Done"
                     })
           // console.log(mint_reciept, 'mint reciept')
           console.log(mint_reciept.status, 'status')
           if(mint_reciept.status == true){
               this.props.setPage("profile");
            }

         
    }

       catch(error){
            this.setState({
                progressText: "Oops, Looks like you can't Mint an NFT yet, kindly contact Admin",
                loaderUrl: "https://c4.wallpaperflare.com/wallpaper/159/71/731/errors-minimalism-typography-red-wallpaper-preview.jpg"
            })
    
        } 
        
        }



    
   

   


render(){
    return(
        <div className="create-section">
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>Artist Collection selected</Modal.Body>
      </Modal>
            <div className="preview">
            <Preview userImage={this.state.nftDetails.userImage}
            imageName={this.state.nftDetails.item_name}
            imagedescription={this.state.nftDetails.description}/>

            </div>


            { this.state.loaderShow ? <div className="progress-loader" display={this.state.loaderShow}>

        
     

      
    
            <img src={this.state.loaderUrl} />
            <span>{this.state.progressText}</span>
            </div>: null }
            

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

                    <input type="file" id="actual-btn" hidden onChange={this.captureImg}/>
                    <label for="actual-btn">Browse Files</label>

                </div>
                <div className="item-details-input">
                    <h2>Item Details</h2>

                    <div className="input-box">
                    <label htmlFor="item-name">ITEM NAME</label>
                    <input type="text" id="item_name" placeholder="e.g.Redeemable Botcoin Card with logo"
                    name="item_name" 
                    value={this.state.nftDetails.item_name}
                    onChange={this.handleInput} />
                    </div> 


                <div className="input-box">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" id="description" placeholder="e.g. After Purchasing, you will be able to recieve the logo"
                    name="description" 
                    value={this.state.nftDetails.description}
                    onChange={this.handleInput} />

                </div>

                <div className="input-box">
                    <label htmlFor="price">PRICE</label>
                    <input type="number" id="price" placeholder="e.g. 100"
                    name="price" 
                    value={this.state.nftDetails.price}
                    onChange={this.handleInput} />

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
                        <label htmlFor="size">SIZE</label>
                        <input type="text" id="size" placeholder="e.g. Size"
                        name="size" 
                        value={this.state.nftDetails.size}
                        onChange={this.handleInput} />

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
                            <span>
                                Put on sale
                            </span>
                            <p>
                                You'll recieve bids on this item
                            </p>

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
                            <span>
                                Instant sale price
                            </span>
                            <p>
                                Enter the price for which the item will be instantly sold
                            </p>

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
                            <span> 
                                Unlock once purchased
                            </span>
                            <p>
                                Content will be unlocked after successful transaction 
                            </p>

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
                    <button onClick={this.setPage}>Create Item 
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