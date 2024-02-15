import React from "react";
// mutate data since we arecreating a new user. mutate because we are using react query
import { useMutation } from "@tanstack/react-query";
import mutation from "./mutation";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: mutation,
    onSuccess: (data) => {
      console.log("guest_session_id:", data?.guest_session_id);

      if (data && data.guest_session_id) {
        localStorage.setItem("guest_session_id", data.guest_session_id);
      } else {
        console.error("Data or guest_session_id is undefined:", data);
      }
    },
  });

  const handleLogin = () => {
    mutate();
    navigate("/");
  };

  return (
    <div className="bg-blue-300 h-screen w-full ">
      <div className="flex flex-col items-center justify-center  h-screen">
        <button onClick={handleLogin} className="bg-yellow-500 rounded-xl p-4">
          Login
        </button>
        <h1 className=" mt-4">Sign In As a Guest</h1>
      </div>
    </div>
  );
};

export default Auth;
