import React from 'react';
import lock from '../images/lock.svg';
import logo from '../images/logo.svg';
import { Link } from 'react-scroll';
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
                    <Link
                    exact
                    to="/chooseCreate"
                    className="nav-links"
                    
                    >
                    Mint Store
                    </Link>

                   <Link className="nav-link" to="qlip-nfts" smooth={true} duration={1000}
                    >
                     Markeplace
                    </Link>
                   

               </div>

               <div className="footer-column column2">
                   <a href="https://twitter.com/Qlip_it?s=09">Twitter</a>
                   <a href="https://t.me/qlipit">Telegram</a>
                   <a href="https://youtu.be/Zj58i_j17YA">Youtube</a>
                   <a href="https://qlipit-io.medium.com/">Medium</a>
                   <a href="https://discord.gg/bJB5jBqn5n">Discord</a>
               </div>

           </div>

       </footer>

    )
}

export default Footer;