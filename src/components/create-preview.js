import React, {useState} from 'react';
import TogglePreviewButton from './previewToggler';
import mapImg from '../images/map.png';
import '../styles/create-preview.css';


const Preview = (props) => {
    const [selected, setSelected] = useState(false);


    return(
        <div className="create-preview-box">
            <div className="header">
                <span>
                    Preview
                </span>
                <TogglePreviewButton
                selected={selected}
                toggleSelected={() => {
                setSelected(!selected);
                }}
            />

            </div>
            <div className="img">
                <img src={props.userImage} alt=""/>

            </div>
            <div className="image-details">
                <span className="img-name">{props.imageName}</span>
                <span className="description">{props.imagedescription}</span>
                <span className = "price">{props.imageprice && `${props.imageprice} BNB`} </span>
            </div>

        </div>
    )
}

export default Preview;

