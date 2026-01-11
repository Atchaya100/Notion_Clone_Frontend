import React, { useState } from "react";
import { LoginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

export const Login = () => {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const { setUser } = useContext(AuthContext); 
const navigate = useNavigate();
const loginUser = async()=>{
  try{
    const res = await LoginApi(email,password);
    if(res.status===200){
      let accessToken = res.data.token.access;
      localStorage.setItem("accessToken",accessToken);
      res.data.token.active='Home'
      setUser({ ...res.data.token,accessToken});
      localStorage.setItem("user",JSON.stringify(res.data.token))
      document.querySelector("span").innerText="";
      navigate("/home");
    }
    else{
      document.querySelector("span").innerText="Invalid Credentials";
    }
  }
  catch(err){
    console.log(err)
      document.querySelector("span").innerText="Invalid Credentials";

  }
}


const redirectToRegister = () => {
  navigate("/register");
}
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-neutral-900 p-8 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Login
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}
              className="p-2 rounded-lg bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}
              className="p-2 rounded-lg bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <span className="text-red"></span>

          <button className="mt-4 w-full bg-white text-black p-2 rounded-lg font-semibold hover:bg-neutral-300 transition" onClick={()=>{loginUser()}}>
            Login
          </button>

          <a className="text-white" onClick={redirectToRegister}>Does not have an account? Create Here</a>
        </div>
      </div>
    </div>
  );
};
