import ProfilePicture from "./profile-picture";
import BioEditor from "./bio-editor";
export default function Profile({
    firstName,
    lastName,
    imgUrl,
    bio,
    setBio,
    defaultImg,
}) {
    return (
        <div className="mt-16 w-2/3 flex flex-col items-center bg-white shadow-lg rounded-lg">
            <div className="flex flex-col justify-center -mt-12">
                <ProfilePicture
                    imgUrl={imgUrl}
                    firstName={firstName}
                    lastName={lastName}
                    inProfile={true}
                    defaultImg={defaultImg}
                />
            </div>

            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}
