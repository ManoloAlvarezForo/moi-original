import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 512 512"
      {...props}>
      <Rect
        x={96}
        y={48}
        width={320}
        height={416}
        rx={48}
        ry={48}
        fill="none"
        stroke={props.color}
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M176 128h160M176 208h160M176 288h80"
      />
    </Svg>
  );
}

export default SvgComponent;
