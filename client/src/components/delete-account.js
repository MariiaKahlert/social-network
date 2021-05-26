import axios from "../axios";

export default function DeleteAccount({ toggleDeleteAccount }) {
    const handleDeleteAccount = async () => {
        try {
            const { data } = await axios.post("/delete-account");
            if (data.success) {
                location.replace("/welcome#/");
            }
        } catch (err) {
            console.log("Error in handleDeleteAccount in DeleteAccount: ", err);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center z-20 bg-purple-500 md:w-4/5 lg:w-2/5 h-2/5 px-6 pt-8 pb-6 shadow-lg rounded-lg">
            <h2 className="text-center text-white mb-6 text-xl">
                Are you sure?
            </h2>
            <button
                onClick={handleDeleteAccount}
                className="active:outline-none bg-purple-200 font-bold rounded-full w-3/5 mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
            >
                Yes
            </button>
            <button
                onClick={toggleDeleteAccount}
                className="mt-10 text-purple-200 hover:text-white hover:underline"
            >
                Cancel
            </button>
        </div>
    );
}
