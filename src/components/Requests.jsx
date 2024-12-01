import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.connectionRequests));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };
  const reviewRequests = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="flex justify-center font-bold text-2xl my-10">
        No requests found.
      </div>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-white font-bold text-3xl">Pending Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex p-4 rounded-lg my-4 w-5/12 mx-auto bg-base-300 items-center justify-between"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="connection"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {" "}
                {firstName + " " + lastName}{" "}
              </h2>
              {age && gender && <p> {age + ", " + gender} </p>}
              <p className="italic"> {about} </p>
            </div>
            <div>
              <button
                className="btn mx-2 btn-primary"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn mx-2 btn-secondary"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
