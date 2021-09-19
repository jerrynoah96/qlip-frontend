import React, {Component} from 'react';
import Web3 from "web3";
import NavBar from './components/navbar';
import Header from './components/header';
import ChooseCreate from './components/chooseCreate';
import Create from './components/create';
import QLIPNFTS from './components/qlipNFTSection';
import Options from './components/Options';
import Profile from './components/profile';
import contractABI from '../src/contractAbi.json';
import Footer from './components/footer';
import Landing from './components/landing';
import Modal from 'react-bootstrap/Modal';
import Exhibit from './components/Exhibit';
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
      contractAddress: "0x7fb9a355552EdA17927Ce5c402Ac10F93693C8fE",
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

  this.FetchAllTokens();
 
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

  console.log(token_details, 'set exhibit works')

  
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
  
  console.log(this.state.form_details, 'form details')
}



FetchUserTokens = async () => {
  const account = await this.state.account;
  console.log(account, 'account of user')
/*  
  const res = await fetch("https://api.covalenthq.com/v1/97/address/"+this.state.account+"/balances_v2/?nft=true&key=ckey_8af791fd59fb496f8c59a1dac1a",
{
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    "X-Requested-With": "XMLHttpRequest"}
  }
)
  //const userTUrl = await "https://api.covalenthq.com/v1/97/address/"+this.state.account+"/balances_v2/?nft=true&key=ckey_8af791fd59fb496f8c59a1dac1a";
  //console.log(userTUrl, 'userTUrl')
 // const res = await fetch("https://adek-cors-anywhere.herokuapp.com/"+userTUrl);
  const resJson = await res.json();
 console.log(resJson, 'on profile, after removing adek-url')
  const tokensArray = resJson.data.items; 
  console.log(tokensArray, 'in fetching user token')

  //         this.setState({
//           tokenUrls: [...this.state.tokenUrls, nft.token_url]
//         })
//        })
//      }
//    }
//  }) 


    const placeHolder = []
   // const our_contract_address = "0xD5956aB694ff28FeD0F069e5A8056f1A7c5ECFD6";
   // console.log(our_contract_address, 'ours')
    tokensArray.map(token => {
      if(token.nft_data !== null && token.contract_address == 0x5Ab8C225982282A352c842E20D5443dc8983E58D) {
       console.log(token, 'i think finally')
        token.nft_data.map(nft_data => {
          placeHolder.push(nft_data.token_url);
        })
      }
      console.log(placeHolder, 'placeholder')

        
    })

    this.setState({
      tokenUrls: placeHolder
    })
    console.log(this.state.tokenUrls, 'placeholder from state') */
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
    console.log(res, 'uri for user nfts')

    tokenData.imgUrl = res.imgHash;
    tokenData.tokenState = token_state;
    tokenData.price = nftAmount;
    tokenData.owner = tokenDetails.ownerAddress;
    tokenData.category = tokenDetails._category;
    tokenData.id = tokenDetails._id;
    tokenData.name = res.item_name;

  await tokenUrls.push(tokenData);

    console.log(tokenData, 'tokenData object')
    
  })
  this.setState({
    tokenUrls
  })
    console.log(tokenUrls, 'profile token urls from state')
}

 FetchAllTokens = async()=> {
 /* const allTUrl= await fetch("https://api.covalenthq.com/v1/97/tokens/0x5Ab8C225982282A352c842E20D5443dc8983E58D/nft_token_ids/?&key=ckey_8af791fd59fb496f8c59a1dac1a",
{
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    "X-Requested-With": "XMLHttpRequest"}
  }
)
const result = await allTUrl.json();


   //get all tokenIDs using covalent
 // const res = await fetch("https://adek-cors-anywhere.herokuapp.com/https://api.covalenthq.com/v1/97/tokens/0x5Ab8C225982282A352c842E20D5443dc8983E58D/nft_token_ids/?&key=ckey_8af791fd59fb496f8c59a1dac1a");
 // const result =await res.json();
  const allNFTS = result.data.items;
  const allIds = [];
  const allTokenUrls=[];
  await allNFTS.map(async(nft)=>{
    if(nft.contract_address == 0x5Ab8C225982282A352c842E20D5443dc8983E58D){
      allIds.push(nft.token_id);
    }
  })

  allIds.map(async(tokenId)=> {
    const res = await fetch("https://adek-cors-anywhere.herokuapp.com/https://api.covalenthq.com/v1/97/tokens/0x5Ab8C225982282A352c842E20D5443dc8983E58D/nft_metadata/"+tokenId+"/?&key=ckey_8af791fd59fb496f8c59a1dac1a");
    const result = await res.json();
    const nftUrl= result.data.items[0].nft_data[0].token_url;
    const nftUrlId = [nftUrl, tokenId]
    
    allTokenUrls.push(nftUrlId);
    
  })
  
  this.setState({
    allTokenUrls
  }) */

  const allTokens = await this.state.contractInit.methods.getAllTokens().call();
  console.log(allTokens, 'all tokens')
  let allTokensArray = [];
  allTokens.map(async (token)=> {
    let tokenInfo = {};
    console.log(token, 'each token id');
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
    console.log(tokenInfo, 'token info')

    
    
  })
  this.setState({
    allTokensArray
  })
console.log(allTokensArray, 'all tokens array from state')
  
  
 }
  

  render(){
    let currentDisplayPage;
    if(this.state.currentpage == "landing"){
        currentDisplayPage=
        <>
        <Header setPage={this.SetPage} />
        <QLIPNFTS />
        <Landing 
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
