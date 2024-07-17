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
      d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64Z"
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
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
      d="M256 128v144h96"
    />
  </Svg>
);

export default SvgComponent;
