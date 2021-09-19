import { NavLink, useHistory } from 'react-router-dom';
import logo from '../images/logo.svg';
import { Navbar, Nav  } from 'react-bootstrap';
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
//import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectProvider from "@maticnetwork/walletconnect-provider";
import Matic from "maticjs"
import Authereum from "authereum";
import { Link } from 'react-scroll';
import '../styles/nav.css';


const providerOptions = {
  portis: {
    package: Portis, // required
    options: {
      id: "fe80483c-8da3-46f6-b5a2-92be1bc0fcb9",
      network: "mainnet"
    }
  },
  
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "8c7e5f2b4151492cb90848faa879264d" // required
    }
  },
  authereum: {
    package: Authereum // required
  }
  
};
//
/* const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mainnet.maticvigil.com/v1/667df0542e7c154bb9f8da50d08feb1d9613c1a8`,
    callbacks: {
      onConnect: console.log('connected'),
      
    }
  }
) */

let provider = null;
let web3 = null;
let accounts = null;
let btnText = "Connect Wallet"

const NavBar = (props) => {

  async function showWeb3Modal() {

    if (!provider) {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        provider // required
      });
      web3 = await connect(web3Modal);
     // console.log(web3, 'now web3');
      
    }

   //showWeb3Modal();
    
    if(!accounts){
      accounts = await web3.eth.getAccounts();
      const networkId =await web3.eth.getChainId();
      props.setWeb3(web3);
      if(networkId !== 97){
        btnText= "Connect Wallet"  
      }
      else{
        btnText = "Connected"
      }
      
    }
  }

  async function connect(web3Modal) {
    provider = await web3Modal.connect();
    return new Web3(provider);
  }

  let currentpage = 'landing';
    const setPage=(page)=> {
        page = currentpage;
        props.setPage(page);

    }


 
return (
    <Navbar collapseOnSelect expand="lg">
    <Navbar.Brand href="#home" className="brand"
    onClick={setPage}>
    <img src={logo} alt="logo" className="brand-logo"/>{' '}
        QLIP
        </Navbar.Brand>
       
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto nav-links">
            <Nav.Link className="nav-link" to="landing" smooth={true} duration={1000}
             onClick={()=> {
              props.setPage('landing')
            }}
            >Explore</Nav.Link>
            <Nav.Link className="nav-link" to="tokenEcons" smooth={true} duration={1000}
            onClick={()=> {
              if(web3 == null){
                alert('unidentified address, please connect your wallet')
              }else{
                props.setPage("profile")
              }
             
            }}>My Profile</Nav.Link>
            <Link className="nav-link" to="qlip-nfts" smooth={true} duration={1000}
              >QLIP NFTs</Link>
            <Link className="nav-link" to="community" smooth={true} duration={1000} >Community</Link>
            <Nav.Link className="nav-link" to="contact" smooth={true} duration={1000}
            onClick={()=> {
              props.setPage('choose create')
            }}>Mint Store</Nav.Link>
            <Nav.Link className="nav-link launch-link" href="#" onClick={() => showWeb3Modal()}>{btnText}</Nav.Link>   
        </Nav>
        </Navbar.Collapse>
    </Navbar>

)

}

export default NavBar;

