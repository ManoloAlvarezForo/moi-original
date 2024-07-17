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
      d="M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62Z"
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Path
      d="M256 56v120a32 32 0 0 0 32 32h120M176 288h160M176 368h160"
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
  </Svg>
);

export default SvgComponent;
