import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { _id, photoUrl, firstName, lastName, about, age, gender } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, toUserId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(toUserId));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-xl ">
        <figure>
          <img src={photoUrl} alt="user photo" />
        </figure>
        <div className="card-body">
          <h1 className="card-title justify-center">
            {firstName + " " + lastName}
          </h1>
          <p>{about}</p>
          {age && gender && (
            <p>
              {age}, {gender.toUpperCase()}
            </p>
          )}
          <div className="card-actions justify-between my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
