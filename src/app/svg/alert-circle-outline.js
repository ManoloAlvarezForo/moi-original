/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 512 512"
    {...props}>
    <Path
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192Z"
      style={{
        fill: 'none',
        stroke: props.color,
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <Path
      d="M250.26 166.05 256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6Z"
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Path d="M256 367.91a20 20 0 1 1 20-20 20 20 0 0 1-20 20Z" />
  </Svg>
);

export default SvgComponent;
