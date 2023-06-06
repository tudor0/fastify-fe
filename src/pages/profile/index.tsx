import useUserStore from "../../../store/userStore";

const Profile = () => {
  const { email, firstName, lastName, userName } = useUserStore(
    (state) => state.user
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-md shadow-md ring-2 ring-gray-800/50">
        <h1 className="text-3xl font-semibold text-center text-red-700">
          Profile
        </h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered bg-transparent"
              value={userName}
              disabled
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="label">
              <span className="text-base label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full input input-bordered bg-transparent"
              value={firstName}
              disabled
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="label">
              <span className="text-base label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full input input-bordered bg-transparent"
              value={lastName}
              disabled
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              className="w-full input input-bordered bg-transparent"
              value={email}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
