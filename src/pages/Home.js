import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../utils/AuthContext";

export default function Home() {
const { user } = useContext(AuthContext); 

  console.log(user)
  return <div className="flex h-screen">
  <Sidebar />
  <div className="flex-1">
    Home
  </div>
</div>
}
