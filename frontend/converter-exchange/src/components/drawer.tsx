import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../app/api/services/userService";
import { useSelector } from "react-redux";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

function Drawer({ isOpen, toggleDrawer }: DrawerProps) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigatePage = (path: string) => {
    router.push(path);
    toggleDrawer();
  };

  const logout = async () => {
    try {
      await Logout(user?.email, user?.token, user?.refreshtoken).then(() => {
      localStorage.removeItem("persistroot");
      router.push("/");
      } );
    } catch (error) {
      alert("Error logging out");
    }
  };

  if (!isClient) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white bg-opacity-50 backdrop-blur-lg border border-opacity-20 shadow-lg text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out flex flex-col`}
    >
      <button
        className="absolute top-4 right-4 text-2xl text-black"
        onClick={toggleDrawer}
      >
        &times;
      </button>
      <div className="p-4 flex-grow">
        <h2 className="text-m font-bold text-black mb-4">CONVERTER EXCHANGE</h2>
        <hr className="shadow-lg font-bold"/>
        <button 
        className="w-full text-black hover:bg-sky-50  py-2 px-4 rounded"
        onClick={() => navigatePage("/home")}
        >
        Convert & Transfer
        </button>
        <hr className="shadow-lg font-bold"/>
        <button 
        className="w-full text-black hover:bg-sky-50  py-2 px-4 rounded"
        onClick={() => navigatePage("/my_transfers")}
        >
          View My Transfers
        </button>
        <hr className="shadow-lg font-bold"/>
      </div>
      <div className="p-4">
        <button 
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Drawer;
