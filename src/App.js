import React, {Component} from 'react';
import Web3 from "web3";
import NavBar from './components/navbar';
import ChooseCreate from './components/chooseCreate';
import Create from './components/create';
import Options from './components/Options';
import Profile from './components/profile';
import contractABI from '../src/contractAbi.json';
import Footer from './components/footer';
import Landing from './components/landing';
import Modal from 'react-bootstrap/Modal';
import './App.css';


class App extends Component  {
constructor(props){
  super(props);

  this.state={
    account:"",
    web3: null,
    show: false,
    modalMessage: null,
    currentpage: "landing",
    allTokenUrls:[],
    tokenUrls: [],
    contractDetails:{
      account: null,
      contractAddress: "0xD5956aB694ff28FeD0F069e5A8056f1A7c5ECFD6",
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

    }
  }
  this.SetWeb3 = this.SetWeb3.bind(this);
  this.FetchUserTokens = this.FetchUserTokens.bind(this);
}


componentDidMount=()=> {
  this.FetchAllTokens();
}

SetWeb3=async(web3)=> {
  this.setState({
    web3
  })

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const networkId =await this.state.web3.eth.net.getNetworkType();
  this.setState({
    show: true
  })
 if(networkId !== "private"){
   this.setState({
    modalMessage: "Kindly ensure you're on the bsc test network and Reload the page"
   })

 }
 else{
   this.setState({
     modalMessage: `connected address: ` +account.slice(0,5).concat('...').concat(account.slice(13,18)) 
   })

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
  const res = await fetch("https://adek-cors-anywhere.herokuapp.com/https://api.covalenthq.com/v1/97/address/"+this.state.account+"/balances_v2/?nft=true&key=ckey_8af791fd59fb496f8c59a1dac1a");
  const resJson = await res.json();
 
  const tokensArray = resJson.data.items; 

//           this.setState({
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
      if(token.nft_data !== null && token.contract_address == 0xD5956aB694ff28FeD0F069e5A8056f1A7c5ECFD6) {
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
    console.log(this.state.tokenUrls, 'placeholder from state')
 }

 FetchAllTokens = async()=> {
  
   //get all tokenIDs using covalent
   const res = await fetch("https://api.covalenthq.com/v1/97/tokens/0xD5956aB694ff28FeD0F069e5A8056f1A7c5ECFD6/nft_token_ids/?&key=ckey_8af791fd59fb496f8c59a1dac1a");
  const result =await res.json();
  const allNFTS = result.data.items;
  console.log("nnnnnnnnn: ", allNFTS)
  const allIds = [];
  const  allTokenUrls = [];
 await allNFTS.map(async(nft)=>{
    if(nft.contract_address === "0xd5956ab694ff28fed0f069e5a8056f1a7c5ecfd6"){
     
      
      allIds.push(nft.token_id);
    }

    
  })

  console.log("<<<<<<<<<: ", allIds);

  allIds.forEach(async tokenId => {
    const res = await fetch("https://api.covalenthq.com/v1/97/tokens/0xD5956aB694ff28FeD0F069e5A8056f1A7c5ECFD6/nft_metadata/"+tokenId+"/?&key=ckey_8af791fd59fb496f8c59a1dac1a");
    const result = await res.json();
    const nftUrl = result.data.items[0].nft_data[0].token_url;

    
    allTokenUrls.push(nftUrl);

    if(allTokenUrls.length === allIds.length) {

      this.setState({
        allTokenUrls
      })
    }
  })


  
  
  
 }
  

  render(){
    let currentDisplayPage;
    if(this.state.currentpage == "landing"){
        currentDisplayPage= <Landing setPage={this.SetPage}
        web3={this.state.web3}
        contractDetails={this.state.contractDetails}
        allTokenUrls={this.state.allTokenUrls}
        />
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
  web3={this.state.web3}/>
}

if(this.state.currentpage == "profile"){
  currentDisplayPage= <Profile
  setPage={this.SetPage}
  tokenUrls={this.state.tokenUrls}
  contractDetails={this.state.contractDetails}/>
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
