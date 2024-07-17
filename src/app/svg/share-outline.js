/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 512 512"
    {...props}>
    <Circle
      cx={128}
      cy={256}
      r={48}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Circle
      cx={384}
      cy={112}
      r={48}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Circle
      cx={384}
      cy={400}
      r={48}
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
      d="m169.83 279.53 172.34 96.94M342.17 135.53l-172.34 96.94"
    />
  </Svg>
);

export default SvgComponent;
