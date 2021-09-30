import React,{useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import headerImg from "../images/Header_Image.png";
import LineImg from "../images/Line.svg";
import penIcon from "../images/penIcon.svg";
import profilePic from "../images/Profile_picture.png"
import shareIcon from "../images/share-icon.png";
// import editIcon from "./assets/Edit_icon.svg"
import verifiedIcon from "../images/icons8_verified_account.svg"
import Modal from 'react-bootstrap/Modal';
import "../styles/profile.css";
import "../styles/NFTCard.css";
import classNames from 'classnames';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import { TwitterIcon, WhatsappIcon } from "react-share";

const Profile = (props) => {
  let history = useHistory();
 // const [tokensArray, setTokensArray] = useState([]);
const [show, setShow] = useState(false);
const [showForm, setShowForm] = useState(false);

 const urlList = props.tokenUrls;
 console.log(urlList, 'url list')
 
  const [tokenObjects] = useState([]);
  const [allOnsale, setOnSaleTokenDisplay]= useState([]);
  const [notforSale, setNotForSaleDisplay]= useState([]);
  const [displayPointer, setDisplayPointer] = useState('all');
  const [address] = useState(props.contractDetails.account);
  const [coverPhoto, setCoverPhoto] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [shareTokenName, setShareTokenName] = useState();
  const [shareTokenId, setShareTokenId] = useState();
  


  

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


  const handleCoverPhoto=(e)=> { 
     const selectedPhoto = URL.createObjectURL(e.target.files[0]);
      setCoverPhoto(selectedPhoto)
    }

   const handleClose = ()=> {
      setShow(false);
    }

    const shareNFT=(token)=> {
      const tokenName = token.name;
      const tokenId = token.id;

      setShow(true);
      setShareTokenName(tokenName);
      setShareTokenId(tokenId);
      
      console.log(token, 'token to be in useState')
    }

    const handleUserAvatar=(e)=> { 
      const selectedAvatar = URL.createObjectURL(e.target.files[0]);
       setUserAvatar(selectedAvatar);
       
    }

  const displayTokens = urlList.map((token)=> {
    
    console.log(token.id, 'tokens id in profile');

    return(
      <div key = {token.id} className = "nft-card">
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
          <div className="detail-3">
            <p><span>share </span></p>
            <img onClick={()=> {
              shareNFT(token)}} 
            src = {shareIcon} alt = "nft product" className = "share-btn"/>
          </div>
      </div>
      { token.tokenState === 2 ? <button className = "buy-btn"
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
      <div key = {token.id} className = "nft-card">
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
          <div className="detail-3">
            <p><span>share </span></p>
            <img src = {shareIcon} alt = "nft product" className = "share-btn"/>
          </div>
      </div>
      { token.tokenState === 2 ? <button className = "buy-btn"
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
      <div key = {token.id} className = "nft-card">
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
          <div className="detail-3">
            <p><span>share </span></p>
            <img src = {shareIcon} alt = "nft product" className = "share-btn"/>
          </div>
      </div>
      { token.tokenState === 2 ? <button className = "buy-btn"
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
     await sortTokens();
     setCoverPhoto(headerImg);
     setUserAvatar(profilePic);
      
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

    const formClass = classNames('profile-edit-form', {
      'form-class':  showForm === true
  })


    return(
      <>
        <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                   <div className="share-icons">
                      <WhatsappShareButton 
                      title={"Get "+shareTokenName+" on Qlip"}
                      url={"https://clip-frontend.vercel.app/exhibit/"+shareTokenId}>
                     
                        <WhatsappIcon round={true}>

                        </WhatsappIcon>
                      </WhatsappShareButton>

                      <TwitterShareButton>
                        <TwitterIcon round={true}>

                        </TwitterIcon>
                      </TwitterShareButton>
                   </div>
                </Modal.Body>
            </Modal>
       {/*  form display for profile edit */}
            <div className={formClass}>
              <p className="form-close"
              onClick={()=> {
                setShowForm(false)
              }}>+</p>
              <form>
                <input className="username-input" type="text"/>
                <textarea></textarea>
                <button>submit</button>
              </form>

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
                <h2>Anonymous <img src = {verifiedIcon} className = "verified-icon" alt = "verified icon" /></h2>
                <p className = "address">{address.slice(0,7).concat('...').concat(address.slice(11,18)) }</p>
              </div>

              {/* this icon here should form display for profile edit */}
              <div className="pen-icon-container edit-profile-icon"
              onClick={()=> {
                setShowForm(true)
              }}>
                    <img src={penIcon} alt="edit-icon" className="edit-icon"/>
                </div>

              <div className = "user-about-section">
                <p>A 2D hyper-realist artist with 10 years experience designing portrait for influential celebrities and goverment officials</p>
              </div>
              <div className = "user-history">
                <div className = "history-item">
                  <h3>{tokenObjects.length}</h3>
                  <p>All NFTs</p>
                </div>
                <div className = "history-item">
                  <h3>0</h3>
                  <p>NFTs Sold</p>
                </div>
                <div className = "history-item">
                  <h3>0</h3>
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