import Image from "next/image";
import LoginHeader from "../components/loginheader";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-between">
    <LoginHeader />
  </div>
  );
}
