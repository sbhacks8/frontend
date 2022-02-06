import React, { forwardRef } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import mitt from "mitt";
import { eventEmitter } from "../utils";

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meeting: null };

    eventEmitter.on("newMeeting", (meeting) => {
      this.setState({ meeting: meeting });
    });
  }
  render() {
    return (
      <div className="overlay">
        <div className="time">
          <div className="hour">10:06</div>
          <div className="date">Jan. 06 2043</div>
        </div>

        {this.state.meeting && (
          <div className="card">
            <h1>{this.state.meeting.person}</h1>
            <h2>{this.state.meeting.time}</h2>
            <div>{this.state.meeting.description}</div>
            <div className="join">Join Meeting</div>
          </div>
        )}
        {/* <Slider className="slider"/> */}
      </div>
    );
  }
}
export default Overlay;
