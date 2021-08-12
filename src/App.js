import React, {Component} from 'react';
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
    web3: null,
    show: false,
    modalMessage: null,
    currentpage: "landing",
    tokenUrls: [],
    contractDetails:{
      account: null,
      contractAddress: "0x872b6148615a482fedf4899F2035f933A27050c0",
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
  this.FetchTokens = this.FetchTokens.bind(this);
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
 if(networkId !== "kovan"){
   this.setState({
    modalMessage: "Kindly ensure you're on the kovan test network and Reload the page"
   })

 }
 else{
   this.setState({
     modalMessage: `connected address: ` +account.slice(0,5).concat('...').concat(account.slice(13,18)) 
   })

   const contractInstance = new this.state.web3.eth.Contract(contractABI, this.state.contractDetails.contractAddress);

  this.setState({
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

 await this.FetchTokens();
 

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

FetchTokens = async () => {
  const res = await fetch("https://api.covalenthq.com/v1/42/address/0x9dc821bc9B379a002E5bD4A1Edf200c19Bc5F9CA/balances_v2/?nft=true&key=ckey_8af791fd59fb496f8c59a1dac1a");
  const resJson = await res.json();
 
  const tokensArray = resJson.data.items; 
  
  
//   tokensArray.map((token)=> {

    
    
//    if(token.nft_data !== null){
//     //  console.log(token, 'with nft data before contract address')
//    if(token.contract_address === this.state.contractDetails.contractAddress){
     
//        (token.nft_data).map((nft)=> {
//         this.setState({
//           tokenUrls: [...this.state.tokenUrls, nft.token_url]
//         })
//        })
//      }
//    }
//  }) 


    const placeHolder = []
    tokensArray.forEach(token => {
      if(token.nft_data !== null && token.contract_address === this.state.contractDetails.contractAddress) {
        token.nft_data.forEach(nft_data => {
          placeHolder.push(nft_data.token_url);
        })
      }

        
    })

    this.setState({
      tokenUrls: placeHolder
    })
 }
  

  render(){
    let currentDisplayPage;
    if(this.state.currentpage == "landing"){
        currentDisplayPage= <Landing setPage={this.SetPage}
        web3={this.state.web3}
        contractDetails={this.state.contractDetails}/>
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
