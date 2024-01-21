import ImageGrid from "./ImageGrid";


function AccountScreen({userKey}) {
    return (
        <div className="imageHistoryContainer">
            <h1>Collection History</h1>
            <ImageGrid userKey={userKey}/>
        </div>
    );
}

export default AccountScreen;