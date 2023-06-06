import Link from "next/link";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../../store/userStore";
import { getCookie, setCookie } from "../../../utils/cookies";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [toastData, setToastData] = useState({
    show: false,
    message: "",
    type: "success"
  });

  useEffect(() => {
    if (toastData.show) {
      setTimeout(() => {
        setToastData({
          ...toastData,
          show: false
        });
      }, 3000);
    }
  }, [toastData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>();

  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (data: FormValues) => {
    console.log(data);
    const resp = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await resp.json().then((data) => data);
    if (!json.data.token) {
      console.log(json);
      setToastData({
        show: true,
        message: json.data.message,
        type: "error"
      });
    } else {
      setToastData({
        show: true,
        message: "Login successful",
        type: "success"
      });
      console.log(json.data.user)
      setUser(json.data.user);
      setCookie("jw-token", json.data.token);
      router.push("/");
    }
  };

  // useEffect(() => {
  //   const token = !!getCookie("jw-token");
  //   if (token) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      {toastData.show && (
        <div className="toast toast-top toast-center">
          <div
            className={`alert ${
              toastData.type === "success" ? "alert-success" : "alert-error"
            }`}>
            <span>{toastData.message}</span>
          </div>
        </div>
      )}
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-red-700">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered bg-transparent text-black"
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
              })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                Please enter a valid email address
              </span>
            )}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered bg-transparent text-black"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 20
              })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                Please enter a valid password
              </span>
            )}
          </div>
          <Link
            href="/register"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600">
            Register
          </Link>
          <div>
            <button
              className="btn btn-block"
              type="submit"
              disabled={isSubmitting}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
