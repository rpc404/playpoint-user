import React from "react";
import "./styles/style.css";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { setProfile } from "../../api/Profile";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [{ userPublicAddress, username, isWalletConnected }, dispatchRPCData] =
    useRPCContext();
  const [_username, setUsername] = React.useState(username);

  const handleUpdate = async () => {
    await setProfile({ data: { username: _username, userPublicAddress } }).then(
      (res) => {
        const rpcUserData = {
          isWalletConnected: true,
          userPublicAddress: userPublicAddress,
          username: _username,
        };
        localStorage.setItem("rpcUserData", JSON.stringify(rpcUserData));
      }
    );
    dispatchRPCData({
      type: ACTIONS.UPDATE_USERNAME,
      payload: { username: _username },
    });
  };

  return (
    <div className="editprofile__container">
      <div className="editusername">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="editProfile">
        <label htmlFor="profileimage">Choose a profile Image</label>
        {selectedImage && (
          <div className="profile">
            <img src={URL.createObjectURL(selectedImage)} alt="profile_image" />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          id="profileimage"
        />
      </div>
      <div className="buttons">
        <button className="cancel">cancel</button>
        <button className="save" onClick={handleUpdate}>
          save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
