import Slider from "~/components/slider";

export enum SliderRange {
    MEDIUM = 50,
}

export type SliderProps = {
    label: string;
    sliderValue: number;
    setSliderValue: (value: number) => void;
    gap: SliderRange;
}

export default function Configurator(props: { sliderProps: SliderProps }) {

    return (
        <div className="flex items-center justify-center flex-col p-4">
           <Slider sliderProps={props.sliderProps}></Slider>
        </div>
    );
}
