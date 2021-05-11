export default function ProfilePicture({
    firstName,
    lastName,
    picUrl,
    toggleUploader,
}) {
    return (
        <div
            className="border rounded-lg border-purple-200 cursor-pointer"
            onClick={toggleUploader}
        >
            <img src={picUrl} alt="" className="h-8"></img>
        </div>
    );
}
