import { CubicBezierLine } from "@react-three/drei";
import { DateTime } from "luxon";
import { norm } from "../utils";

export default function Trajectory(props) {
  //https://www.desmos.com/calculator/ebdtbxgbq0
  // graphicUnitToActualMeter =

  const semiMajor = [10, 10, 10]; // actual semi major less
  const semiMinor = [-10, 0, 20];

  // if (!localStorage.getItem("backend")) {
  let metersToUnits = 234488; // (proportion of earth from top of screen to bottom) ^ -1  / y where y = tan(fov/2) * 2 * focal_length. get focal length and fov from three js camera
  let velocity = 7200; // m/s
  let backendInfo = {
    semiMajor: semiMajor,
    semiMinor: semiMinor,
    velocity: velocity,
    metersToUnits: metersToUnits,
    sunPeriod:
      (metersToUnits *
        2 *
        Math.PI *
        Math.sqrt(math.norm(semiMajor) + math.norm(semiMinor) / 2)) /
      velocity,
    flubbedPeriod: 26 * 60 * 60, // since earth orbits are typically like 90 min
    familyTimeZone: "America/Los_Angeles",
    meetings: [
      {
        time: 4 * 60 * 60, // this is in delta from now for the purposes of demo, should be unix time FROM UCT/GMT
        person: "Holly",
        link: "https://lol",
        description: "Daily time with my wife",
      },
      {
        time: 20 * 60 * 60, // this is in delta from now for the purposes of demo, should be unix time FROM UCT/GMT
        person: "David",
        link: "https://lol",
        description: "Catching up with an old friend",
      },
    ],
  };
  localStorage.setItem("backendInfo", JSON.stringify(backendInfo));
  // }

  const negSemiMajor = math.subtract([0, 0, 0], semiMajor);
  const negSemiMinor = math.subtract([0, 0, 0], semiMinor);

  console.log(math.add(semiMinor, negSemiMajor));
  return (
    <>
      <CubicBezierLine
        start={semiMajor} // Starting point
        end={negSemiMajor} // Ending point
        midA={math.add(semiMinor, semiMajor)} // First control point
        midB={math.add(semiMinor, negSemiMajor)} // Second control point
        color="white" // Default
        lineWidth={1} // In pixels (default)
        dashed={true} // Default
      />
      <CubicBezierLine
        start={semiMajor} // Starting point
        end={negSemiMajor} // Ending point
        midA={math.add(negSemiMinor, semiMajor)} // First control point
        midB={math.add(negSemiMinor, negSemiMajor)} // Second control point
        color="white" // Default
        lineWidth={1} // In pixels (default)
        dashed={true} // Default
      />
    </>
  );
}
