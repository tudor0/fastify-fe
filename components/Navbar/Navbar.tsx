import { useRouter } from "next/router";
import { handleLogout } from "../../utils/auth/logout";
import Link from "next/link";
import useUserStore from "../../store/userStore";
import { getCookie } from "../../utils/cookies";

const Navbar = () => {
  const router = useRouter();
  const { clearUser, firstName } = useUserStore((state) => {
    return { clearUser: state.clearUser, firstName: state.user.firstName };
  });
  const isAuthenticated = !!getCookie("jw-token");

  return (
    <div className="navbar bg-base-100 border-b border-white">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href={"/"}>
          Light
        </Link>
      </div>
      <div className="flex-none">
        {isAuthenticated && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <p className="text-2xl font-semibold text-center h-full text-white flex items-center justify-center">
                  {firstName[0]}
                </p>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link className="justify-between" href={"/profile"}>
                  Profile
                  <p className="badge">New</p>
                </Link>
              </li>
              <li>
                <Link className="justify-between" href={"/my-posts"}>
                  My Posts
                  <p className="badge">New</p>
                </Link>
              </li>
              <li>
                <p>Settings</p>
              </li>
              <li>
                <p
                  onClick={() => {
                    handleLogout(clearUser, router);
                  }}>
                  Logout
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
