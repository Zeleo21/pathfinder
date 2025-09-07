import {Layer, Stage} from 'react-konva';
import React, {useEffect, useRef, useState} from 'react';
import type {Cell, Maze} from '../service/cell';
import {MazeGenerator} from '../service/maze';
import {DrawStructure} from './drawStructure';
import {Algorithm, defaultConfig, type MazeConfig} from "~/maze/service/config";

export const canvasWidth = 500;
export const canvasHeight = 500;

/*
config:
- maze size
- algorithm
- speed
- start
- reset
*/


export function Canvas(props: { config?: MazeConfig }) {

  const [maze, setMaze] = useState<Maze>(MazeGenerator.generateMazeStructure(props.config ?? defaultConfig));
  const [currentCell, setCurrentCell] = useState<Cell>(maze[MazeGenerator.getCellIndex(maze,  props.config?.start ?? { x:0,y:0 })]);
  const [currentGenerationAlgorithm, setCurrentGenerationAlgorithm] =
  useState(() => MazeGenerator.getAlgorithm(props.config?.algorithm ?? defaultConfig.algorithm));
  const [isAlgoRunning, setIsAlgoRunning] = useState(false);
  const stopSignalRef = useRef({ shouldStop: false });

  const handleStart = () => {
    stopSignalRef.current.shouldStop = false;
    setIsAlgoRunning(true);
  }
  const handleReset = () => {
        stopSignalRef.current.shouldStop = true;
        setIsAlgoRunning(false);
        const newMaze = MazeGenerator.generateMazeStructure(props.config ?? defaultConfig);
        setMaze(newMaze);
        setCurrentCell(newMaze[MazeGenerator.getCellIndex(newMaze, props.config?.start ?? { x: 0, y: 0 })]);
    };

  useEffect(() => {
    if(isAlgoRunning) {
      currentGenerationAlgorithm(maze, setMaze, setCurrentCell, stopSignalRef.current);
    }
  },[isAlgoRunning]);

    useEffect(() => {
        setMaze(MazeGenerator.generateMazeStructure(props.config ?? defaultConfig));
        setCurrentCell(maze[MazeGenerator.getCellIndex(maze, props.config?.start ?? { x:0,y:0 })]);
    }, [props.config]);

  return (
     <div>
      <div className="flex justify-center m-10">
          <div className="flex space-x-5">
              <button onClick={handleStart}
                      className="bg-orange-700 hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded"> Start
              </button>
              <button onClick={handleReset}
                      className="bg-white hover:bg-orange-700 text-black hover:text-white font-bold py-2 px-4 rounded"> Reset
              </button>
          </div>
      </div>
         <div className="flex justify-center m-10">
             <Stage width={props.config?.width ?? defaultConfig.width} height={props.config?.height ?? defaultConfig.height} style={{ backgroundColor: 'black' }}>
        <Layer>
          <DrawStructure maze={maze} currentCell={currentCell} config={props.config ?? defaultConfig}/>
        </Layer>
      </Stage>
      </div>
    </div>
  );
}
