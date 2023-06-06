import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReCaptcha, { ReCAPTCHA } from "react-google-recaptcha";
import { getCookie, setCookie } from "../../../utils/cookies";

type FormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Register = () => {
  const [toastData, setToastData] = useState({
    show: false,
    message: "",
    type: "success"
  });
  // const [captchaToken, setCaptchaToken] = useState<string | null>("");

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

  const handleRegister = async (data: FormValues) => {
    console.log(data);
    // if (!captchaToken) {
    //   setToastData({
    //     show: true,
    //     message: "Please verify you are not a robot",
    //     type: "error"
    //   });
    //   return;
    // }

    const resp = await fetch(`/api/register`, {
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
        message: "Registration successful",
        type: "success"
      });
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
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered bg-transparent text-black"
              {...register("userName", { required: true })}
            />
            {errors.userName && (
              <span className="text-xs text-red-500">
                Please enter a username
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="label">
                <span className="text-base label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full input input-bordered bg-transparent text-black"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="text-xs text-red-500">
                  Please enter your first name
                </span>
              )}
            </div>
            <div className="w-1/2">
              <label className="label">
                <span className="text-base label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full input input-bordered bg-transparent text-black"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="text-xs text-red-500">
                  Please enter your last name
                </span>
              )}
            </div>
          </div>
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
          {/* <div>
            <ReCAPTCHA
              onChange={(token) => setCaptchaToken(token)}
              sitekey="6LcB_HAmAAAAALe13J8Goq7U-bU9Kq6pHNKpf4rp"
            />
          </div> */}
          <Link
            href="/login"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600">
            Login
          </Link>
          <div>
            <button
              className="btn btn-block"
              type="submit"
              disabled={isSubmitting}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
