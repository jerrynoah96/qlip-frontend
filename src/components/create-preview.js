import React, {useState} from 'react';
import TogglePreviewButton from './previewToggler';
import mapImg from '../images/map.png';
import '../styles/create-preview.css';


const Preview = () => {
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
                <img src={mapImg} alt="nft img"/>

            </div>
            <div className="image-details">
                <span className="img-name">African Mask</span>
                <span className="description">A collection of African's rich heritage</span>

            </div>

        </div>
    )
}

export default Preview;

