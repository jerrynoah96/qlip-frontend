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
      contractAddress: "0x26af38b47aeccc97438999a45dda88eaf5f11877",
      contractInstance: null

    }
  }
  this.SetWeb3 = this.SetWeb3.bind(this);
  this.FetchTokens = this.FetchTokens.bind(this);
}


componentWillMount() {
  this.FetchTokens();
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
    modalMessage: "Kindly ensure you're on the binance test network and Reload the page"
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
  //instantiate contract
  
console.log(this.state.contractDetails,
  this.state.contractDetails.contractInstance, 'contract details in state');

//  await this.FetchTokens();
 

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

FetchTokens = async () => {
  const res = await fetch("https://api.covalenthq.com/v1/97/address/0x9dc821bc9B379a002E5bD4A1Edf200c19Bc5F9CA/balances_v2/?nft=true&key=ckey_a452d9486064473fa3ca4c02075");
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
        currentDisplayPage= <Landing setPage={this.SetPage}/>
    }
    if(this.state.currentpage == "choose create"){
      currentDisplayPage= <ChooseCreate 
      
      setPage={this.SetPage}/>
  }
  if(this.state.currentpage == "create"){
    currentDisplayPage= <Create
    contractDetails={this.state.contractDetails}
    setPage={this.SetPage}/>
}
if(this.state.currentpage == "options"){
  currentDisplayPage= <Options
  setPage={this.SetPage}/>
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
