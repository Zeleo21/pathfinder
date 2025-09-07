
export const mazeMinSize = 100;
export const mazeMaxSize = 1000;


//TODO : implement and add more algorithms
export enum Algorithm {
    ITERATIVE = 'iterative',
}

export interface MazeConfig {
    width: number;
    height: number;
    algorithm: Algorithm;
    speed: number;
    // must be a divisor of both width and height
    wallSize: number;
    strokeSize: number;
    start: { x: number; y: number };
}

export const defaultConfig: MazeConfig = {
    width: 500,
    height: 500,
    algorithm: Algorithm.ITERATIVE,
    speed: 50,
    wallSize: 20,
    strokeSize: 2,
    start: { x: 0, y: 0 },
};