import ProfilePicture from "./profile-picture";
import BioEditor from "./bio-editor";
export default function Profile({ firstName, lastName, imgUrl, bio, setBio }) {
    return (
        <div className="h-1/2 w-full flex flex-col justify-center items-center">
            <ProfilePicture
                imgUrl={imgUrl}
                firstName={firstName}
                lastName={lastName}
            />
            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}
