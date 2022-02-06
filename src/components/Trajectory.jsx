import { CubicBezierLine } from "@react-three/drei";
import { norm } from "../utils";

export default function Trajectory(props) {
  //https://www.desmos.com/calculator/ebdtbxgbq0

  let y = 10
  let x = 10
  const semiMajor = [x, y, 10]; // actual semi major less
  const semiMinor = [-10, 0, 20];

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
