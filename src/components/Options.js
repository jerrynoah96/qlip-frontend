import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import uploadIcon from '../images/upload-icon.png';
import arrow from '../images/arrow.svg';
import signIcon from '../images/sign-icon.png';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/options.css';


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: "ipfs.infura.io", port: 5001, protocol:"https"})

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('29b5df03356e2400ff68',
 'c2381374c17a87b16191150d09e541545f157b3427a68f94a1e04d488643a2fe');
class Options extends Component {

    constructor(props){
        super(props);

        this.state={
            show: false,
            loaderUrl: null,
            progressText: "Minting NFT, kindly await confirmation",
            loaderShow: false,
            currentpage:'profile',
            imgHash: null
        }
        this.uploadImgToIPFS = this.uploadImgToIPFS.bind(this);
        this.MintNft = this.MintNft.bind(this);
        this.setPage = this.setPage.bind(this);
    } 
 setPage=(page)=> {
        
        page =this.state.currentpage;
       this.props.setPage(page);

}
uploadImgToIPFS = async (e)=> {
    console.log(this.props.form_details,'from details in options')
        
   
    if(this.props.form_details.buffer){
        
        try{
            const result = await ipfs.add(this.props.form_details.buffer)
            const imgIpfsHash = result.cid.string;
            //console.log('result', result);
            
            this.setState({  
                    imgHash: "https://ipfs.infura.io/ipfs/"+imgIpfsHash
            })

            
        }
        catch(e){
            console.log('error', e)
        }
    
    } else{
        alert('choose a valid file');
    }

}

handleClose=()=> {
    this.setState({
        show: false
    })
}

MintNft=async(e)=> {
    if(this.props.web3 == null){
        toast.error("Please connect your wallet");
    }
    else{
        this.setState({
            show: true
        })
    
        e.preventDefault();
        this.setState({
            progressText: "pinning your file to IPFS",
            loaderUrl: "https://cdn.dribbble.com/users/419257/screenshots/1724076/scanningwoohoo.gif"
        })
    
        await this.uploadImgToIPFS();
    
        const owner =  this.props.contractDetails.account;
        const imgHash = this.state.imgHash;
        const tokendetails = {
                ...this.props.form_details,
                owner,
                imgHash
    
            }
    
            console.log(tokendetails, 'token details');
        
        const pinataRes = await pinata.pinJSONToIPFS(tokendetails);
          this.setState({
            progressText: "Finalizing File and details upload to IPFS"
        })
    
        const URI = "https://ipfs.infura.io/ipfs/"+pinataRes.IpfsHash;
        console.log(URI, 'url for uri')
    
    
    
    
    
    try{
            
            this.setState({
                progressText: "Minting NFT, kindly await confirmation",
                loaderUrl: "https://i.gifer.com/ZZ5H.gif"
                
                })
        
                const account = await this.props.contractDetails.account;
                const category = await this.props.form_details.category;
                
            //mint token
            const mint_reciept = await this.props.contractDetails.contractInstance.methods.mintWithIndex(account,
                    URI, category).send({
                        from: account,
                    })
    
            //get token id from reciept and set to sale
            const tokenId = await mint_reciept.events.Minted.returnValues.tokenId;
            const value =await  this.props.form_details.price;
            const price = await this.props.web3.utils.toWei(value, 'ether')
            const contractAddress = await this.props.contractDetails.contractAddress;
            console.log(contractAddress, 'contract address');
            
            console.log(tokenId, price, contractAddress, 'tokenid and price');

           if(mint_reciept.status === true){
            
            // get intial num of nft created
            const userProf = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles/'+account);
            const userProfile  = await userProf.json();
            const nfts_created = userProfile.num_of_nft_created;

            //update nfts created

            let userData = {
                address: account,
                num_of_nft_created: nfts_created + 1,
              };
        
              let userProfResponse = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles/'+account, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userData)
              });
        
               await userProfResponse.json();   




            this.setState({
                progressText: "approving your NFT to Sale",
                loaderUrl: "https://i.gifer.com/ZZ5H.gif"
                
                })
                //call approve function and approve contract
              const approveReciept=  await this.props.contractDetails.contractInstance.methods.approve(
                    contractAddress, tokenId
                ).send({
                    from: account,
                    
                })

                this.setState({
                    progressText: "Finalizing your NFT for sale",
                    loaderUrl: "https://i.gifer.com/ZZ5H.gif"
                    
                    })
                    //once set to approve runs, then call setToSale 
                if(approveReciept.status === true){
                  const setSaleReciept =  await this.props.contractDetails.contractInstance.methods.setSale(tokenId, price, contractAddress).send({
                        from: account,
                        
                       })


                       if(setSaleReciept.status === true){
                        await this.props.fetchUserTokens();
                        const { history } = this.props;
                        if(history) history.push('/profile');
                        
                       }
                }
            }
                    this.setState({
                        progressText: "Done",
                        loaderUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/480px-Flat_tick_icon.svg.png"
                     })
         
    }
    
       catch(error){
       this.setState({
                progressText: Error.error,
                loaderUrl: "https://c4.wallpaperflare.com/wallpaper/159/71/731/errors-minimalism-typography-red-wallpaper-preview.jpg"
            })
          console.log(error, 'error')
    
        } 

    }
   
    
    }



render(){
    
    
    return(
        <div className="options">
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Body>
                    <span>{this.state.progressText}</span>
                    <img src={this.state.loaderUrl} alt="loader"/>
                </Modal.Body>
            </Modal>
            <ToastContainer />
            <div className="option-header">
                <Link to="/create">
                    <img className="back-icon"
                    src={arrow} alt="loader"/>

                </Link>
                
                <div className="header-content">
                <h1>QLIP MINTSTORE</h1>
                <span>Mint token in 3 easy steps</span>

            </div>
                

            </div>
            <div className="options-main">
                <div className="option">
                    <div className = "option-icon-container">
                        <img src={uploadIcon} alt="upload"/>
                    </div> 
                    <div className="inner-text">
                        <h2>Upload Files and Mint Token</h2>
                        <span>call contract method</span>
                    </div>
                    <button className="button" onClick={this.MintNft}>Start</button>

                </div>

                <div className="option">
                    <div className = "option-icon-container">
                        <img src={signIcon} alt="upload"/>
                    </div>
                    <div className="inner-text">
                        <h2>Sign Sell Order</h2>
                        <span>Sign sell order using your wallet</span>
                    </div>
                    <button className="button">Start</button>
                </div>

                <div className="option">
                    <div className = "option-icon-container">
                        <img src={uploadIcon} alt="upload"/>
                    </div>
                    <div className="inner-text">
                        <h2>Sign Lock Order</h2>
                        <span>Sign lock order using your wallet</span>
                    </div>
                    <button className="button">Start</button>
                </div>

            </div>
        </div>
    )
    }
}

export default withRouter (Options);