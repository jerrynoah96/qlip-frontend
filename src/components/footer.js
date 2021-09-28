import React from 'react';
import lock from '../images/lock.svg';
import logo from '../images/logo.svg';
import '../styles/footer.css';


const Footer = ()=> {

    return(
       <footer className="footer" id="community">
           <div className="private-key-notify-bar">
               <div className="private-key-notify">
               <img  src={lock} alt="lock"/>
               <div className="private-key-detail">
                   <span>Private Key Security</span>
                   <p>
                   We do not own your private keys and cannot access your funds without your confirmation.
                   </p>
               </div>

             </div>
           </div>

           <div className="footer-content">
               <div className="logo">
                   <img src={logo} alt="brandlogo"/>{' '} QLIP

               </div>
               <div className="footer-column column1">
                   <a href="">Mint Store</a>
                   <a href="">Marketplace</a>
                   <a href="">Roadmap</a>
                   <a href="">QLIP Token</a>
                   <a href="">Whitepaper</a>

               </div>

               <div className="footer-column column2">
                   <a href="">Twitter</a>
                   <a href="">Telegram</a>
                   <a href="">Youtube</a>
                   <a href="">Medium</a>
               </div>

           </div>

       </footer>

    )
}

export default Footer;