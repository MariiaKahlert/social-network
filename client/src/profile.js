import ProfilePicture from "./profile-picture";
import BioEditor from "./bio-editor";
export default function Profile({ firstName, lastName, imgUrl }) {
    return (
        <div>
            <ProfilePicture
                imgUrl={imgUrl}
                firstName={firstName}
                lastName={lastName}
            />
            <BioEditor />
        </div>
    );
}
