import {useNavigate} from "react-router";
import Header from "~/components/header";


export default function Home() {
  const navigate = useNavigate();

  const handleMazeGeneration = () => {
      navigate("/maze");
  }
  const handleSolver = () => {
      navigate("/solver");
  }


  return (
      <>
      <Header></Header>
        <div className="flex items-center justify-center p-5 space-x-5">
            <button onClick={handleMazeGeneration} className="mt-5 bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">Maze Generation
            </button>
            <button onClick={handleSolver} className="mt-5 bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">Solving Algorithms
            </button>
        </div>
      </>
  );
}
