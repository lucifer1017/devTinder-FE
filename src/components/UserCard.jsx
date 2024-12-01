/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about, age, gender } = user;

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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
