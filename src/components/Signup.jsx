import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const { signUp, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      setError("");
      await signUp(data.email, data.password, data.firstName, data.lastName);
      Swal.fire({
        position: "top-end",
        color: "white",
        background: "#09090b",
        icon: "success",
        title: "User logged in successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      setError("Failed to create an account. " + error.message);
      Swal.fire({
        color: "white",
        background: "#09090b",
        icon: "error",
        title: "Oops...",
        text: "Failed to create an account.",
      });
      console.error("Signup error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await loginWithGoogle();
      Swal.fire({
        position: "top-end",
        color: "white",
        background: "#09090b",
        icon: "success",
        title: "User logged in successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      setError("Failed to sign in with Google.");
      Swal.fire({
        color: "white",
        background: "#09090b",
        icon: "error",
        title: "Oops...",
        text: "Failed to sign in with Google.",
      });
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setError("");
      await loginWithFacebook();
      Swal.fire({
        position: "top-end",
        color: "white",
        background: "#09090b",
        icon: "success",
        title: "User logged in successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to sign in with Facebook.");
      Swal.fire({
        color: "white",
        background: "#09090b",
        icon: "error",
        title: "Oops...",
        text: "Failed to sign in with Facebook.",
      });
      console.error("Facebook sign-in error:", error.message);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const isButtonDisabled = !isChecked || isSubmitting;
  return (
    <>
      <section className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow w-full max-w-md">
          <div className="flex flex-col p-6 space-y-1">
            <h3 className="tracking-tight text-2xl font-bold text-center">
              Create an account
            </h3>
            <p className="text-sm text-gray-400 text-center">
              Enter your details to create your RecipeShare account
            </p>
          </div>

          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="first-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    First name
                  </label>
                  <input
                    {...register("firstName", {
                      required: {
                        value: true,
                        message: "This Field is Required",
                      },
                      minLength: {
                        value: 3,
                        message: "The Min. Length should be 3",
                      },
                    })}
                    id="first-name"
                    className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <div className=" text-xs text-pink-500">
                      {errors.firstName.message}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="last-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Last name
                  </label>
                  <input
                    {...register("lastName", {
                      required: {
                        value: true,
                        message: "This Field is Required",
                      },
                      minLength: {
                        value: 3,
                        message: "The Min. Length should be 3",
                      },
                    })}
                    id="last-name"
                    className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <div className=" text-xs text-pink-500">
                      {errors.lastName.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>

                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This Field is Required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <div className=" text-xs text-pink-500">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>

                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This Field is Required",
                    },
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                      message:
                        "Password must be at least 8 characters long and include a number and a special character",
                    },
                  })}
                  type="password"
                  id="password"
                  className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.password && (
                  <div className=" text-xs text-pink-500">
                    {errors.password.message}
                  </div>
                )}
                <p className="text-xs text-gray-400">
                  Password must be at least 8 characters long and include a
                  number and a special character.
                </p>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirm Password
                </label>

                <input
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm your Password",
                    },
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type="password"
                  id="confirm-password"
                  className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.confirmPassword && (
                  <div className=" text-xs text-pink-500">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <label className="checkbox1">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    id="terms"
                  />
                  <span></span>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    style={{
                      transform: "translateX(-100%)",
                      position: "absolute",
                      pointerEvents: "none",
                      opacity: "0",
                      margin: "0",
                      width: "16px",
                      height: "16px",
                      zIndex: "-1",
                    }}
                  />
                </label>
                <label
                  htmlFor="terms"
                  className="ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-normal"
                >
                  I agree to the{" "}
                  <Link
                    to={"/service"}
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </Link>
                  &nbsp;and&nbsp;
                  <Link to={"/policy"} className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                disabled={isButtonDisabled}
                type="submit"
                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-black shadow hover:bg-white/90 h-9 px-4 py-2 w-full"
              >
                Create Account
              </button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="shrink-0 bg-slate-700 h-[1px] w-full"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[hsl(var(--background))] px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignIn}
                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white border border-slate-700 bg-[hsl(var(--background))] shadow-sm hover:bg-[hsl(var(--muted))] hover:text-accent-foreground h-9 px-4 py-2 w-full"
              >
                <i className="fa-brands fa-google mr-2 text-lg"></i> Google
              </button>
              <button
                onClick={handleFacebookSignIn}
                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white border border-slate-700 bg-[hsl(var(--background))] shadow-sm hover:bg-[hsl(var(--muted))] hover:text-accent-foreground h-9 px-4 py-2 w-full"
              >
                <i className="fa-brands fa-facebook mr-2 text-lg"></i> Facebook
              </button>
            </div>
          </div>

          <div className="items-center p-6 pt-0 flex flex-col space-y-2">
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
