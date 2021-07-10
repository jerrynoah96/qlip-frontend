import React, {Component} from 'react';

import '../styles/profile.css';




const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: "ipfs.infura.io", port: 5001, protocol:"https"})

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('583a9e7e2b1ccaea8de3',
 '2ca5978f83ed954ee26ca3f6501ba443caf7e17eff01134623ad3e2fabd9bd9f');
class Profile extends Component {


    constructor(props) {
        super(props);
        this.state={
            
            }
     /*  this.handleInput = this.handleInput.bind(this);
         this.uploadImgToIPFS = this.uploadImgToIPFS.bind(this);
      //  this.uploadToIPFS = this.uploadToIPFS.bind(this);
        this.CaptureDetails = this.CaptureDetails.bind(this);
     //  this.submitForm = this.submitForm.bind(this); */
      
    }

   


render() {
    return(
       <div>
           <header className="profile-header">
               <img src="https://images.template.net/wp-content/uploads/2014/11/Natural-Facebook-Cover-Photo.jpg" alt="cover pic" className="cover-pic"/>
               <div className="change-pic-box">
                    <input type="file" id="change-btn" hidden/>
                    <label for="change-btn">Edit cover photo</label>

                </div>
           </header>

       </div>
    )

}
    

}
export default Profile;