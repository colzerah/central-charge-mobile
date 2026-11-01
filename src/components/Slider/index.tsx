import RangeSlider from "../shared/ui/molecules/range-slider";
import { SliderProps } from "./SliderDTO";

//finalizer se for usar nao ficou bom para o filtros
const Slider = ({}: SliderProps) => {
  return <RangeSlider defaultValue={4} min={1} max={10} step={3} />;
};

export default Slider;
