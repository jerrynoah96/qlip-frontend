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
state={
  web3: null,
  show: false,
  currentpage: "landing",
  contractDetails:{
    account: null,
    contractAddress: "0x26af38b47aeccc97438999a45dda88eaf5f11877",
    contractInstance: null

  }
}

SetWeb3=async(web3)=> {
  this.setState({
    web3
  })

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const networkId =await this.state.web3.eth.net.getNetworkType();
 if(networkId != "private"){
   this.setState({
     show: true
   })

 }
  //instantiate contract
  const contractInstance = new this.state.web3.eth.Contract(contractABI, this.state.contractDetails.contractAddress);

  this.setState({
    contractDetails:{
      ...this.state.contractDetails,
      account,
      contractInstance
    }
  })
console.log(this.state.contractDetails, 'contract details in state');
 

}

SetPage = (page)=> {
  this.setState({
    currentpage: page
  })
}
  

  render(){
    let currentDisplayPage;
    if(this.state.currentpage == "landing"){
        currentDisplayPage= <Landing setPage={this.SetPage}/>
    }
    if(this.state.currentpage == "choose create"){
      currentDisplayPage= <ChooseCreate 
      contractDetails={this.state.contractDetails}
      setPage={this.SetPage}/>
  }
  if(this.state.currentpage == "create"){
    currentDisplayPage= <Create/>
}
if(this.state.currentpage == "options"){
  currentDisplayPage= <Options
  setPage={this.SetPage}/>
}
    return (
      <div className="App">
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>Kindly ensure you're on the BSC test network and Reload the page</Modal.Body>
      </Modal>
        <NavBar setWeb3={this.SetWeb3}/>
        {currentDisplayPage}
      
        <Footer />
        
      
      </div>
    );

  }
 
}

export default App;
