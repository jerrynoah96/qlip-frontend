import React, {Component} from 'react';
import Web3 from "web3";
import NavBar from './components/navbar';
import Header from './components/header';
import ChooseCreate from './components/chooseCreate';
import Create from './components/create';
import Options from './components/Options';
import Profile from './components/profile';
import contractABI from '../src/contractAbi.json';
import Footer from './components/footer';
import Landing from './components/landing';
import Modal from 'react-bootstrap/Modal';
import Exhibit from './components/Exhibit';
import SetSale from './components/setSale';
import './App.css';



class App extends Component  {
constructor(props){
  super(props);

  this.state={
    account:"",
    web3: null,
    contractInit: null,
    instantWeb3: null,
    show: false,
    modalMessage: null,
    currentpage: "landing",
    allTokensArray:[],
    tokenUrls: [],
    contractDetails:{
      account: null,
      contractAddress: "0x714e39D8F55E5C0Adc2f62eb8AFf0e38d3734232",
      contractInstance: null

    },
    form_details: {
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

    },
    token_details: {
      imgHash:null,
      price:"",
      item_name: "",
      owner: "",
      token_id: "",
      description: ""
    },
    setSaleToken: {
      name: '',
      id: ''
    }
  }
  this.SetWeb3 = this.SetWeb3.bind(this);
  this.FetchUserTokens = this.FetchUserTokens.bind(this);
  this.FetchAllTokens = this.FetchAllTokens.bind(this);
}


componentDidMount = async ()=> {
  const instantWeb3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
 await this.setState({
    instantWeb3
  })
  //instatiate contract
  const contractInit = new instantWeb3.eth.Contract(contractABI, this.state.contractDetails.contractAddress);
 await this.setState({
    contractInit
  })

await this.FetchAllTokens();

console.log("xxxxxxxxxxxx")
 
}

SetWeb3=async(web3)=> {
  this.setState({
    web3
  })

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const networkId =await this.state.web3.eth.getChainId();
  console.log(networkId, 'network id')
  
 if(networkId !== 97){
   this.setState({
    show: true,
    modalMessage: "Kindly ensure you're on the Bsc test network and Reload the page"
   })

 }
 else{
   const contractInstance = new this.state.web3.eth.Contract(contractABI, this.state.contractDetails.contractAddress);

  this.setState({
    account,
    contractDetails:{
      ...this.state.contractDetails,
      account,
      contractInstance
    }
  })
 }
  // instantiate contract
  
console.log(this.state.contractDetails,
  this.state.contractDetails.contractInstance, 'contract details in state');

  
 await this.FetchUserTokens();
 
 

}

SetPage = (page)=> {
  this.setState({
    currentpage: page
  })
}

handleClose=()=> {
  this.setState({
      show: false
  })
}

ResetSale =(nft)=> {
  const nft_name = nft.name;
  const nft_id = nft.id;

  
 this.setState({
    currentpage: "set sale",
  setSaleToken: {
      ...this.state.setSaleToken,
      name: nft_name,
      id: nft_id
    }
  })
}
SetExhibit=async (token_details)=> {
  const imgHash = token_details.imgUrl;
  const price = token_details.price;
  const item_name = token_details.name;
  const owner = token_details.owner;
  const token_id = token_details.id;
  const description = token_details.description;
 await this.setState({
    currentpage: "Exhibit",
    token_details:{
      ...this.state.token_details,
      imgHash,
      price,
      item_name,
      owner,
      token_id,
      description
    }
  })
}

FormDetails = async(form_details)=> {
  const userImage = form_details.userImage;
  const buffer = form_details.buffer;
  const owner = form_details.owner;
  const imgHash = form_details.imgHash;
  const description = form_details.description;
  const item_name = form_details.item_name;
  const price = form_details.price;
  const royalty = form_details.royalty;
  const size = form_details.size;
  const property = form_details.property;
  const on_sale = form_details.on_sale;
  const instant_sale_price = form_details.instant_sale_price;
  const unlock_on_purchase = form_details.unlock_on_purchase;
  const category = form_details.category;

  await  this.setState({
    form_details:{
      ...this.state.form_details,
      userImage,
      buffer,
      owner,
      imgHash,
      item_name,
      description,
      price,
      royalty,
      size,
      property,
      on_sale,
      instant_sale_price,
      unlock_on_purchase,
      category
    }
  })
  
  
}



FetchUserTokens = async () => {
  const account = await this.state.account;
 
    let tokenUrls = [];
  const userNFts =  await this.state.contractDetails.contractInstance.methods.getNftByAddress(account).call()
  userNFts.map(async nftid => {
    let tokenData = {};
    const tokenDetails = await this.state.contractDetails.contractInstance.methods.getAllTokenDetails(nftid).call();
    const token_state = await this.state.contractDetails.contractInstance.methods.getNFTState(nftid).call();
    const nft_amount = await this.state.contractDetails.contractInstance.methods.getSalePrice(nftid).call();
    const nftAmount = await this.state.web3.utils.fromWei(nft_amount);
    // fetch token uri details
    const result = await fetch(tokenDetails.tokenURI_);
    const res = await result.json();
    

    tokenData.imgUrl = res.imgHash;
    tokenData.tokenState = token_state;
    tokenData.price = nftAmount;
    tokenData.owner = tokenDetails.ownerAddress;
    tokenData.category = tokenDetails._category;
    tokenData.id = tokenDetails._id;
    tokenData.name = res.item_name;

  await tokenUrls.push(tokenData);

    this.setState({
      tokenUrls
    })
    
  })
  console.log(tokenUrls, 'user nfts')
 
}

 FetchAllTokens = async()=> {
  const allTokens = await this.state.contractInit.methods.getAllTokens().call();
  console.log("all token: ", allTokens);
  
  let allTokensArray = [];
  allTokens.map(async (token)=> {
    let tokenInfo = {};
    
    // fetch name, description and imgHash from the token URI
    const result = await fetch(token.tokenURI_);
    const res = await result.json();
    
    // get token state from  nfts
    const tokenState = await this.state.contractInit.methods.getNFTState(token._id).call();
    const nft_amount = await this.state.contractInit.methods.getSalePrice(token._id).call();
    const nftAmount = await this.state.instantWeb3.utils.fromWei(nft_amount);
    tokenInfo.owner = token.ownerAddress;
    tokenInfo.tokenURI = token.tokenURI_;
    tokenInfo.category = token._category;
    tokenInfo.id = token._id;
    tokenInfo.tokenState = tokenState;
    tokenInfo.price = nftAmount;
    tokenInfo.imgUrl = res.imgHash;
    tokenInfo.name = res.item_name;
    tokenInfo.description = res.description;

    if(tokenInfo.tokenState == 1){
     allTokensArray.push(tokenInfo)
    }
    
    this.setState({
      allTokensArray
    })
    
    
  })

 }
  

  render(){
    let currentDisplayPage;
    if(this.state.currentpage == "landing"){
        currentDisplayPage=
        <>
        <Landing 
        setPage={this.SetPage}
        web3={this.state.web3}
        contractDetails={this.state.contractDetails}
        allTokensArray={this.state.allTokensArray}
        setExhibit={this.SetExhibit}
        fetchAllTokens={this.FetchAllTokens}/>
    
        </>
    }
    if(this.state.currentpage == "choose create"){
      currentDisplayPage= <ChooseCreate 
      
      setPage={this.SetPage}/>
  }
  if(this.state.currentpage == "create"){
    currentDisplayPage= <Create
    contractDetails={this.state.contractDetails}
    setPage={this.SetPage}
    setFormDetails={this.FormDetails}/>
}
if(this.state.currentpage == "options"){
  currentDisplayPage= <Options
  setPage={this.SetPage}
  form_details={this.state.form_details}
  contractDetails={this.state.contractDetails}
  web3={this.state.web3}
  fetchUserTokens={this.FetchUserTokens}/>
}

if(this.state.currentpage == "profile"){
  currentDisplayPage= <Profile
  setPage={this.SetPage}
  web3 = {this.state.web3}
  setSalePage = {this.ResetSale}
  tokenUrls={this.state.tokenUrls}
  contractDetails={this.state.contractDetails}
  fetchUserTokens={this.FetchUserTokens}/>
}

if(this.state.currentpage == "Exhibit"){
  currentDisplayPage= <Exhibit
  setPage={this.SetPage}
  tokenDetails={this.state.token_details}
  contractDetails={this.state.contractDetails}
  web3={this.state.web3}/>
}
if(this.state.currentpage == "set sale"){
  currentDisplayPage= <SetSale
  setPage={this.SetPage}
  fetchUserTokens={this.FetchUserTokens}
  contractDetails={this.state.contractDetails}
  tokenInfo={this.state.setSaleToken}
  web3={this.state.web3}/>
} 

    return (
      <div className="App">
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>{this.state.modalMessage}</Modal.Body>
        </Modal>

      
        <NavBar setWeb3={this.SetWeb3} setPage={this.SetPage}
        /> 
        {currentDisplayPage}
      
        <Footer />
        
      
      </div>
    );

  }
 
}

export default App;
