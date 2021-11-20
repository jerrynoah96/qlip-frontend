import React,{useState, useRef, useEffect} from "react";
import ContentEditable from 'react-contenteditable';
import { useHistory } from "react-router-dom";
import headerImg from "../images/Header_Image.png";
import LineImg from "../images/Line.svg";
import penIcon from "../images/penIcon.svg";
import profilePic from "../images/Profile_picture.png"
import shareIcon from "../images/share-icon.png";
import copyIcon from "../images/copy-icon.jpg";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import warningIcon from "../images/icons_Warning_Shield.svg";
import sendIcon from "../images/send-message.png";
import 'react-toastify/dist/ReactToastify.css';
// import editIcon from "./assets/Edit_icon.svg"
import verifiedIcon from "../images/icons8_verified_account.svg"
import Modal from 'react-bootstrap/Modal';
import "../styles/profile.css";
import "../styles/NFTCard.css";
import classNames from 'classnames';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import { TwitterIcon, WhatsappIcon } from "react-share";

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: "ipfs.infura.io", port: 5001, protocol:"https"})

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('29b5df03356e2400ff68',
 'c2381374c17a87b16191150d09e541545f157b3427a68f94a1e04d488643a2fe');

const Profile = (props) => {
  console.log(props.profileDetails, 'profile details in profile')
  let history = useHistory();
  let recipient;
  
  const profileUserName = useRef(props.profileDetails.username);
  const profileDescription = useRef(props.profileDetails.userDescription);
  
 // const [tokensArray, setTokensArray] = useState([]);
const [show, setShow] = useState(false);
const contentEditable = React.createRef();
const[profileName, setProfileName] = useState("<p>My new Name</p>");
const[profileInfo, setProfileInfo] = useState("<p>Give a brief description of yourself here, can help you get more followers 😁 </p>");

 const urlList = props.tokenUrls;
 console.log(urlList.length, 'url list')
 
  
  const [tokenObjects] = useState([]);
  const [allOnsale, setOnSaleTokenDisplay]= useState([]);
  const [notforSale, setNotForSaleDisplay]= useState([]);
  const [displayPointer, setDisplayPointer] = useState('all');
  const [address] = useState(props.contractDetails.account);
  const [coverPhoto, setCoverPhoto] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [shareTokenName, setShareTokenName] = useState();
  const [shareTokenId, setShareTokenId] = useState();
  const [sharingModal, setSharingModal] = useState(false);
  const [copy, setCopy] = useState(false);
  const [sendActive, setSendActive] = useState(false);
  const [sendId, setSendId] = useState('');
  
  


  

  const sortTokens =()=>{ 
    const onSale = []
    const notOnSale=[]
   
    urlList.map(async token => {
      // get token state
      const tokenState = await props.contractDetails.contractInstance.methods.getNFTState(token.id).call();
      if(tokenState === '2'){
        await  notOnSale.push(token)
          
      }
      if(tokenState === '1'){
        await onSale.push(token)   
      }
      

     
  
   await setOnSaleTokenDisplay(onSale);
   await  setNotForSaleDisplay(notOnSale);

    })
    
  } 


  const onCopy=(e)=> {
    
    }

   const handleProfileName = (e) => {
      profileUserName.current = e.target.value;
      console.log(profileUserName.current, e.target.value, 'new name change')
      // setProfileName(text.current);
      // console.log(evt.target.value, 'on change name')
      


    };

    const handleDescription = (e) => {
      profileDescription.current = e.target.value;
      
    };

    const updateName = async()=> {
      console.log(profileUserName.current, 'the name to update')
      const newName = profileUserName.current;
      let user = {
        address: address,
        name: newName
      };

      console.log(newName, user.name, 'the name updated')
      let response = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles/'+address, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });

      const result = await response.json();
      toast('Name updated succesffuly');
    console.log(result, 'profile name updated successfully')

    }

    const handleProfileInfo = async (evt)=> {
     // setProfileInfo(evt.target.value);
      console.log(evt.target.value, profileInfo, 'what correct');
      const newDescription = profileDescription.current;

      let user = {
        address: address,
        description: newDescription
      };

      let response = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles/'+address, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });

      const result = await response.json();
      toast('description field updated');
    console.log(result, 'profile info updated successfully')
    }



  const handleCoverPhoto=async(e)=> { 
    let coverPhotoLink;
    const pic = e.target.files[0];
     const selectedPhoto = URL.createObjectURL(e.target.files[0]);
      setCoverPhoto(selectedPhoto)
      // create buffer
      const reader = new window.FileReader();

     await reader.readAsArrayBuffer(pic);
      reader.onloadend = async() => {
            
          const imgBuffer = Buffer(reader.result)
          const result = await ipfs.add(imgBuffer);
         coverPhotoLink = "https://ipfs.infura.io/ipfs/"+result.cid.string;    
         console.log(coverPhotoLink, 'cover photo link')
          
      let user = {
        address: address,
        cover_photo: coverPhotoLink
      };

      
      let response = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles/'+address, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });

      const res = await response.json();
      toast('cover photo updated');
    console.log(res, 'cover photo successfully updated')
        }   

        
       
      
    }
   const handleRecipient = async (e)=> {
     recipient = e.target.value;
     
      console.log(e.target.value, recipient,sendId, 'recipient')
    }
    const sendNFT = async(id)=> {
     const sendReciept= await props.contractDetails.contractInstance.methods.safeTransferFrom(
       address, recipient, sendId
     ).send({
        from: address
      })

      if(sendReciept.status == true){
        toast('NFT sent successfully');
        setSendActive(false)
      }else{
        toast.error("something went wrong")
        setSendActive(false)
      }

    }

   const handleClose = ()=> {
      setShow(false);
    }

    const shareNFT=async (token)=> {
      const tokenName = token.name;
      const tokenId = token.id;

    await  setShareTokenName(tokenName);
     await setShareTokenId(tokenId);

      setSharingModal(true);
      
      
      console.log(token, tokenName, tokenId, 'token to be in useState')
    }

    const handleUserAvatar=async (e)=> {
      let avatarLink; 
      const selectedAvatar = URL.createObjectURL(e.target.files[0]);
      const pic = e.target.files[0];
       setUserAvatar(selectedAvatar);

       const reader = new window.FileReader();

       await reader.readAsArrayBuffer(pic);
        reader.onloadend = async() => {
              
            const imgBuffer = Buffer(reader.result)
            const result = await ipfs.add(imgBuffer);
           avatarLink = "https://ipfs.infura.io/ipfs/"+result.cid.string;    
           console.log(avatarLink, 'cover photo link')
            
        let user = {
          address: address,
          profile_photo: avatarLink
        };
  
        
        let response = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles/'+address, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(user)
        });
  
        const res = await response.json();
        toast('profile picture updated');
      console.log(res, 'profile successfully updated')
          }   
  
       
    }

  const displayTokens = urlList.map((token)=> {
    
    console.log(token.id, 'tokens id in profile');

    return(
      <div key = {token.id} className = "nft-card profile-card">
      <div className = "nft-image-container">
          <img src = {token.imgUrl} alt = "nft product" className = "nft-image" />
      </div>
      <div className = "nft-details">
          <h3 className = "nft-name">{token.item_name}</h3>
          <div className = "detail-1">
              <h4>{token.price} BNB</h4>
              <p>1 of 1</p>
          </div>
          <div className = "detail-2">
              <p><span>Highest bid </span>0.001 BNB</p>
              <p><span>new bid &#128293;</span></p>
          </div>


          { token.tokenState === '1' ? 
          <div className = "detail-3">
          <p><span> Share</span></p>
            <img src={shareIcon} alt="share-icon"
            onClick={()=> {
              shareNFT(token)}}/>
        </div> : ''}  

        <div className = "detail-4">
          <p><span> Give away</span></p>
            <img src={sendIcon} alt="share-icon"
            onClick={()=> {
              setSendActive(true)
              setSendId(token.id)
              
            }}/>
        </div>
      </div>
     
      { token.tokenState === '2' ? <button className = "buy-btn"
       onClick={async ()=> {
         console.log(token, 'selected token')
        await props.resetSale(token)
        history.push(`/set-sale/${token.id}`)
       }}>Set To Sale</button> : ''}
  </div>
     
    
    
      // <NFTCard key = {token.imgHash} name = {token.item_name} imageSrc = {token.imgHash} price = {token.price} description = {token.description} />
    )
  })
 

  const tokensOnSale = allOnsale.map((token)=> {

    

    
    return(
      <div key = {token.id} className = "nft-card profile-card">
      <div className = "nft-image-container">
          <img src = {token.imgUrl} alt = "nft product" className = "nft-image" />
      </div>
      <div className = "nft-details">
          <h3 className = "nft-name">{token.item_name}</h3>
          <div className = "detail-1">
              <h4>{token.price} BNB</h4>
              <p>1 of 1</p>
          </div>
          <div className = "detail-2">
              <p><span>Highest bid </span>0.001 BNB</p>
              <p><span>new bid &#128293;</span></p>
          </div>

          { token.tokenState === '1' ? 
          <div className = "detail-3">
          <p><span> Share</span></p>
            <img src={shareIcon} alt="share-icon"
            onClick={()=> {
              shareNFT(token)}}/>
        </div> : ''}

      </div>

      <div className = "detail-4">
          <p><span> Give away</span></p>
            <img src={sendIcon} alt="share-icon"
            onClick={()=> {
              setSendActive(true)
              setSendId(token.id)
              
            }}/>
        </div>

      { token.tokenState === '2' ? <button className = "buy-btn"
       onClick={async()=> {
       await props.resetSale(token)
        history.push(`/set-sale/${token.id}`)
       }}>Set To Sale</button> : ''}
  </div>
      // <NFTCard key = {token.imgHash} name = {token.item_name} imageSrc = {token.imgHash} price = {token.price} description = {token.description} />
    )
  })


  
  const tokensNotOnSale = notforSale.map((token)=> {
    
    
    return(
      <div key = {token.id} className = "nft-card profile-card">
      <div className = "nft-image-container">
          <img src = {token.imgUrl} alt = "nft product" className = "nft-image" />
      </div>
      <div className = "nft-details">
          <h3 className = "nft-name">{token.item_name}</h3>
          <div className = "detail-1">
              <h4>{token.price} BNB</h4>
              <p>1 of 1</p>
          </div>
          <div className = "detail-2">
              <p><span>Highest bid </span>0.001 BNB</p>
              <p><span>new bid &#128293;</span></p>
          </div>
          
      </div>

      <div className = "detail-4">
          <p><span> Give away</span></p>
            <img src={sendIcon} alt="share-icon"
            onClick={()=> {
              setSendActive(true)
              setSendId(token.id)
            }}/>
        </div>
      { token.tokenState === '2' ? <button className = "buy-btn"
       onClick={async()=> {
       await props.resetSale(token)
        history.push(`/set-sale/${token.id}`)
       }}>Set To Sale</button> : ''}


  </div>
      // <NFTCard key = {token.imgHash} name = {token.item_name} imageSrc = {token.imgHash} price = {token.price} description = {token.description} />
    )
  })
   

  const loader =  <SkeletonTheme color="#202020" highlightColor="#444">
                        <p>
                            <Skeleton count={30} height={300} width={200} />
                        </p>
                </SkeletonTheme>
  
    useEffect( async()=> {
      const coverPic = props.profileDetails.coverPhoto;
      const profileImg = props.profileDetails.profilePhoto;

      if(coverPic == undefined){
        setCoverPhoto(headerImg)
      }else{
        setCoverPhoto(coverPic);
      }

      if(profileImg == undefined){
        setUserAvatar(profilePic);
      }else{
        setUserAvatar(profileImg);
      }

     await sortTokens();
     
  /*   const res = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles/'+address);
      const userProfile = await res.json();
      console.log(userProfile, 'let see if user profile exists')
     if(userProfile == null){
       // if user profile doesn't exist, create a new profile
       let user = {
        address: address,
        name: 'Anonymous',
        description: 'Put a description of yourself here 😁🎨'
      };
  
      let response = await fetch('https://adek-cors-anywhere.herokuapp.com/https://quiet-temple-37038.herokuapp.com/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      
  
     } else{
       profileUserName.current = userProfile.name;
       profileDescription.current = userProfile.description;
     } */

     
     
      
    },[])

    let currentDisplay;
    if(displayPointer === 'all'){
      currentDisplay = displayTokens
    }

    if(displayPointer === 'on sale'){
      currentDisplay = tokensOnSale
    }

    if(displayPointer === 'tokens not on sale'){
      currentDisplay = tokensNotOnSale
    }

    const allBtn = classNames('',{
      'active-nft-nav': currentDisplay === displayTokens
    })
   
    const onSaleBtn = classNames('',{
      'active-nft-nav': currentDisplay === tokensOnSale
    })
  
    const notOnSaleBtn = classNames('',{
      'active-nft-nav': currentDisplay === tokensNotOnSale
    })

    const socialStyle = classNames('socials', {
        'socials-on': sharingModal === true
    })

    const sendModalClass = classNames('send-modal', {
      'send-active': sendActive == true
    })


    return(
      <>
      <div className={sendModalClass}>

        <div className="sendModal-content">
          <div className="sendModal-text">
          <img src = {warningIcon} alt = "warning icon" className = "warning-icon" />
            <span>Warning:</span>
            <p>Please, do note sending implies you will not be recieving payment for this. Cancel if this is not what you intend.</p>
          </div>

          <div className="send-form">
            
            <input className="send-input" placeholder="recipient address"
            onChange={handleRecipient}/>
           
            <div className="send-btns">
              <button className="cancel"
              onClick={()=> {
                setSendActive(false)
              }}>Cancel</button>
              <button className="send"
              onClick={sendNFT}>Give away</button>
            </div>
          </div>

        </div>
          
          
        </div>   
          
          <ToastContainer 
          autoClose={1000}/>
                <div class={socialStyle}>
                  <p
                  onClick={()=> {
                    setSharingModal(false)
                  }}> + </p>
                   <div className="share-icons">
                      <WhatsappShareButton 
                      title={"Get my NFT, "+shareTokenName+" on Qlip"}
                      url={"https://app.qlipit.io/exhibit/"+shareTokenId}>
                     
                        <WhatsappIcon round={true}>

                        </WhatsappIcon>
                      </WhatsappShareButton>

                      <TwitterShareButton
                      title={"Get my Nft, "+shareTokenName+" on Qlip"}
                      url={"https://app.qlipit.io/exhibit/"+shareTokenId}>
                        <TwitterIcon round={true}>

                        </TwitterIcon>
                      </TwitterShareButton>
                </div>
                <span> or </span>

                <div className="copy-div">

                  <span className="link-copy"> {"https://app.qlipit.io/exhibit/"+shareTokenId} </span> 
                  <CopyToClipboard text= {"https://app.qlipit.io/exhibit/"+shareTokenId}
                  onCopy={onCopy}>
                    <img className="copy-icon" src={copyIcon} alt="copy"/> 
                  </CopyToClipboard>


                </div>
                
                
                </div>

             
               
        <div className = "profile-main-body">

        
        <div className = "cover-photo-container">
          <img src = {coverPhoto} alt = "header"className = "cover-photo-image" />
          <div className="cover-photo-edit">
            <input type="file" id="select-img" hidden onChange={handleCoverPhoto}/>
            <label for="select-img">Edit cover photo</label>
              
            <img src={LineImg} alt="edit-icon" className="edit-icon"/>
          </div>
        </div>
        <div className = "content-section">
          <div className = "user-profile-card">
            <div className = "user-details-section">
              <div className = "profile-picture-container">
               <img src = {userAvatar} alt = "user profile avatar" className = "profile-picture" />

                <div className="pen-icon-container">
                    <input type="file" id="avatar-input" hidden onChange={handleUserAvatar}/>
                    <label for="avatar-input"></label>

                    <img src={penIcon} alt="edit-icon" className="edit-icon"/>
                </div>
                
              </div>
              <div className = "user-details">
               {/* <h2>Anonymous <img src = {verifiedIcon} className = "verified-icon" alt = "verified icon" /> </h2> */}
                <ContentEditable
                  html={profileUserName.current} // innerHTML of the editable div
                  disabled={false}       // use true to disable editing
                  onChange={handleProfileName} // handle innerHTML change
                  tagName='article' // Use a custom HTML tag (uses a div by default)
                  onBlur={updateName}
               />
                <p className = "address">{address.slice(0,7).concat('...').concat(address.slice(11,18)) }</p>
              </div>
              
              
              <div className = "user-about-section">

              <ContentEditable
                  html={profileDescription.current} // innerHTML of the editable div
                  disabled={false}       // use true to disable editing
                  onChange={handleDescription} // handle innerHTML change
                  onBlur={handleProfileInfo}
                  tagName='p' // Use a custom HTML tag (uses a div by default)
               />

              </div>
              <div className = "user-history">
                <div className = "history-item">
                  <h3>{urlList.length}</h3>
                  <p>All NFTs</p>
                </div>
                <div className = "history-item">
                  <h3>{props.profileDetails.sold}</h3>
                  <p>NFTs Sold</p>
                </div>
                <div className = "history-item">
                  <h3>{props.profileDetails.bought}</h3>
                  <p>NFTs Bought</p>
                </div>
              </div>
            </div>
            {/* <button className = "follow-button">Follow Anonymous</button> */}
          </div>
          <div className = "nfts-section">
            <h1 className = "section-title">NFTs</h1>
            <div className = "nft-nav">
              <ul>
                <li><button className = {allBtn}
                 onClick={()=> {
                  setDisplayPointer('all')
              }}>All</button></li>

                <li><button className={onSaleBtn}
                 onClick={()=> {
                  setDisplayPointer('on sale')
              }}>On sale</button></li>

                <li><button className={notOnSaleBtn}
                 onClick={()=> {
                  setDisplayPointer('tokens not on sale')
              }}>Not on Sale</button></li>

                <li><button>Bought</button></li>
                <li><button>Following</button></li>
              </ul>
            </div>
            <div className = "nfts-container">

               {!!urlList.length ?
                   currentDisplay
                    : loader
                  } 
            </div>
          </div>
        </div>
      </div>
      
      </>
    );
}

export default Profile