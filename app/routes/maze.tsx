import {Canvas} from "~/maze/components/canvas";
import Header from "~/components/header";
import Configurator, {SliderRange} from "~/components/configurator";
import {useState} from "react";
import {defaultConfig} from "~/maze/service/config";

const sliderInitialValue = 500;


export default function Maze() {
    const [sliderValue, setSliderValue] = useState<number>(sliderInitialValue);

    return (
        <div>
            <Header></Header>
            <div className=" flex flex-col justify-between gap-4 p-4">
                <Configurator sliderProps={{ sliderValue, setSliderValue, gap: SliderRange.MEDIUM, label: 'Size' }} ></Configurator>
                <Canvas config={{...defaultConfig, width: sliderValue, height: sliderValue }} ></Canvas>
            </div>
        </div>
    );
}