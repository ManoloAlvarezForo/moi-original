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
        fill: props.backgroundColor,
        stroke: props.color,
        strokeMiterlimit: 10,
        strokeWidth: props.size,
      }}
    />
    <Path
      style={{
        fill: props.backgroundColor,
        stroke: props.color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: props.size,
      }}
      d="M352 176 217.6 336 160 272"
    />
  </Svg>
);

export default SvgComponent;
