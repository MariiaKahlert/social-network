export default function ProfilePicture({
    firstName,
    lastName,
    imgUrl,
    toggleUploader,
}) {
    return (
        <div
            className="border rounded-lg border-purple-200 cursor-pointer"
            onClick={toggleUploader}
        >
            <img src={imgUrl} alt="" className="h-8"></img>
        </div>
    );
}
