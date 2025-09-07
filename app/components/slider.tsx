import React from "react";
import type {SliderProps} from "~/components/configurator";
import {mazeMaxSize, mazeMinSize} from "~/maze/service/config";

export default function Slider(props: { sliderProps: SliderProps} ) {

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.sliderProps.setSliderValue(parseFloat(event.target.value));
    }
    return (
        <>
            <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.sliderProps.label}</label>
            <div className="relative mb-6 w-1/4">
                <input id="steps-range" onChange={handleSliderChange} type="range" min={mazeMinSize} max={mazeMaxSize}
                       value={props.sliderProps.sliderValue} step={props.sliderProps.gap}
                       className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-orange-600"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">10x10</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">50x50</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">100x100</span>
            </div>
        </>
    );
}