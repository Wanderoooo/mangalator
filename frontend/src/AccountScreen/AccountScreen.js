import ImageGrid from "./ImageGrid";


function AccountScreen({userKey}) {
    return (
        <div className="imageHistoryContainer">
            <h1>Collection History</h1>
            <ImageGrid />
        </div>
    );
}

export default AccountScreen;