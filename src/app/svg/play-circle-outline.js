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
      style={{
        fill: 'none',
        stroke: props.color,
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
      d="m216.32 334.44 114.45-69.14a10.89 10.89 0 0 0 0-18.6l-114.45-69.14a10.78 10.78 0 0 0-16.32 9.31v138.26a10.78 10.78 0 0 0 16.32 9.31Z"
    />
  </Svg>
);

export default SvgComponent;
