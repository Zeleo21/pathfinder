import { Canvas } from "~/maze/components/canvas";
import {useNavigate} from "react-router";

export default function Welcome() {
    let navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  }
  return (
  <div className="h-screen w-screen flex justify-start items-center">
      <img className="h-screen w-1/2 opacity-50" src="/square.svg" alt="square"/>
      <div className="mb-25 flex flex-col items-center text-white space-y-4">
        <h3 className="text-5xl ">Generate and Solve Maze </h3>
        <p>explore the universe of generating and solving maze</p>
        <button onClick={handleClick} className="mt-5 bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded animate-pulse">Get started</button>
      </div>
  </div>
  )
}
