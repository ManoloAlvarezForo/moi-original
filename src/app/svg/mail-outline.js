/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 512 512"
    {...props}>
    <Rect
      x={48}
      y={96}
      width={416}
      height={320}
      rx={40}
      ry={40}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Path
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
      d="m112 160 144 112 144-112"
    />
  </Svg>
);

export default SvgComponent;
