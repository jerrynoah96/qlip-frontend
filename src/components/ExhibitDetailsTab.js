const ExhibitDetailsTab = ({name, description, category, contractAdd, tokenId}) => {
    return(
        <div className = "">
            <div className = "group-one">
                <p className = "creator-key">Name</p>
                <p className = "creator-value">{name}</p>
            </div>

            <div className = "group-one">
                <p className = "creator-key">Description</p>
                <p className = "creator-value">{description}</p>
            </div>

            <div className = "group-one">
                <p className = "creator-key">Category</p>
                <p className = "creator-value">{category === '1' ? 'Photography' : category ==='2' ? 'Art' : category === '3' ? 'Meme': ''}</p>
            </div>
            

            <div className = "group-two">
                <p className = "contractAddress-key">Contract Address</p>
                <p className = "contractAddress-value">{contractAdd}</p>
            </div>
            <div className = "group-three">
                <p className = "tokenId-key">Token ID</p>
                <p className = "tokenId-value">{tokenId}</p>
            </div>
        </div>
    );
}

export default ExhibitDetailsTab;