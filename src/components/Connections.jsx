import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <div>No connections found</div>;
  return (
    <div className="text-center my-10">
      <h1 className="text-white font-bold text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex p-4 rounded-lg my-4 w-4/12 mx-auto bg-base-300 items-center "
          >
            <div className="mx-2">
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="connection"
              />
            </div>
            <div className="text-center ml-6">
              <h2 className="font-bold text-xl">
                {" "}
                {firstName + " " + lastName}{" "}
              </h2>
              {age && gender && <p> {age + ", " + gender} </p>}
              <p className="italic"> {about} </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
