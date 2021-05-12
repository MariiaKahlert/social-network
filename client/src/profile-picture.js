export default function ProfilePicture({
    firstName,
    lastName,
    imgUrl,
    toggleUploader,
    border,
}) {
    return (
        <>
            <img
                src={imgUrl}
                alt={`${firstName} ${lastName}`}
                onClick={toggleUploader}
                className={
                    "h-14 rounded-lg cursor-pointer " +
                    (border ? "border-2 border-purple-200 p-2" : "")
                }
            ></img>
            <div className="ml-4">
                <p className="text-lg text-white">{firstName}</p>
                <p className="text-lg text-white">{lastName}</p>
            </div>
        </>
    );
}
