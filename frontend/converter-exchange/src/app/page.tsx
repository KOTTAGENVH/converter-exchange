import Image from "next/image";
import LoginHeader from "../components/loginheader";

export default function Home() {
  return (
    <div className="bg-white" >
      <LoginHeader />
      <div className="flex justify-center items-center flex-row h-screen justify-between bg-darkerwhite">
      <div className="box-content h-3/5 w-7/12  border-4 bg-white rounded-2xl">

        </div>
      </div>
    </div>
  );
}
