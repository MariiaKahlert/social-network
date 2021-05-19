export default function ProfilePicture({
    firstName,
    lastName,
    imgUrl,
    toggleUploader,
    defaultImg,
    inProfile,
}) {
    return (
        <>
            {!inProfile ? (
                <>
                    <img
                        src={imgUrl}
                        alt={`${firstName} ${lastName}`}
                        onClick={toggleUploader}
                        className={
                            "h-14 rounded-lg cursor-pointer " +
                            (defaultImg ? "border-2 border-purple-200 p-2" : "")
                        }
                    ></img>
                    <div className="ml-4">
                        <p className="text-lg text-white font-bold">
                            {firstName}
                        </p>
                        <p className="text-lg text-white font-bold">
                            {lastName}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-center">
                        <img
                            src={imgUrl}
                            alt={`${firstName} ${lastName}`}
                            className={
                                "h-28 rounded-lg shadow-lg bg-white " +
                                (defaultImg ? "p-2" : "")
                            }
                        ></img>
                    </div>

                    <div className="mt-8">
                        <p className="text-2xl text-black font-bold">
                            {firstName} {lastName}
                        </p>
                    </div>
                </>
            )}
        </>
    );
}
