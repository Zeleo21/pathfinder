import type { Cell, Maze } from '../service/cell';
import { delay } from '../service/maze';
import type { WallPlacement } from '../service/wall';





export const iterativeDFS = async(maze: Maze, setMaze: (maze: Maze) => void,
                                  setCurrentCell: (cell: Cell) => void, signal: { shouldStop: boolean}) => {
  const startNode = maze[0];
  const stack: Cell[] = [];
  const currentMaze = [...maze];
  const startIndex = currentMaze.findIndex(c => c.x === startNode.x && c.y === startNode.y);
  if (startIndex !== -1) {
    currentMaze[startIndex].visited = true;
    stack.push(currentMaze[startIndex]);
  }

  setMaze(currentMaze);
  await delay(50);

  while(stack.length > 0) {
    if(signal.shouldStop) {
      return;
    }
    const currentNode: Cell = stack.pop();
    setCurrentCell(currentNode);
    const neighbors = currentNode.getNeighbors(currentMaze); 

    if(neighbors.length > 0) {
  
      stack.push(currentNode);
      const randomUnvisitedNeighbor: Cell = neighbors[Math.floor(Math.random() * neighbors.length)];
      const chosenCellIndex = currentMaze.findIndex(c => c.x === randomUnvisitedNeighbor.x && c.y === randomUnvisitedNeighbor.y);
      if(chosenCellIndex !== -1) {
        //We get the current and the opposite wall to remove them from both cells
        const currentNodeCommonWall: WallPlacement = currentNode.getCommonWall(currentMaze[chosenCellIndex])
        const chosenNodeCommonWall: WallPlacement = currentNode.getOppositeWall(currentNodeCommonWall);

        currentNode.removeWall(currentNodeCommonWall);
        currentMaze[chosenCellIndex].removeWall(chosenNodeCommonWall);
        


        const currentCellIndex = currentMaze.findIndex(c => c.x === currentNode.x && c.y === currentNode.y);
        
        if(currentCellIndex !== -1) {
          currentMaze[currentCellIndex].visited = true;
          currentMaze[chosenCellIndex].visited = true;

          stack.push(currentMaze[chosenCellIndex]);
        }


      }
      setMaze([...currentMaze]);
      await delay(5);

    }

  }

};

