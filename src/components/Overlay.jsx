import React from "react";
import { myeventemitter } from "../utils";
import { useNavigate } from "react-router";

const withRouter = (Component) => {
  const Wrapper = React.forwardRef((props, ref) => {
    const navigate = useNavigate();
    return <Component navigate={navigate} forwardRef={ref} {...props} />;
  });
  return Wrapper;
};

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meeting: null };

    myeventemitter.on("newMeeting", (meeting) => {
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
            <div onClick={() => this.props.navigate("/video")} className="join">
              Join Meeting
            </div>
          </div>
        )}
        {/* <Slider className="slider"/> */}
      </div>
    );
  }
}
export default withRouter(Overlay);
