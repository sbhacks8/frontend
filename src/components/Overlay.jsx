import { forwardRef } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
const Overlay = forwardRef((props, ref) => {
  return (
    <div className="overlay">
      <div className="time">
        <div className="hour">10:06</div>
        <div className="date">Jan. 06 2043</div>
      </div>

      {/* <Slider className="slider"/> */}
    </div>
  );
});

export default Overlay;
