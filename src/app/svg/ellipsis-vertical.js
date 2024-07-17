/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 512 512"
    {...props}>
    <Circle
      cx={256}
      cy={256}
      r={32}
      style={{
        fill: props.color,
        stroke: props.color,
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <Circle
      cx={256}
      cy={416}
      r={32}
      style={{
        fill: props.color,
        stroke: props.color,
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <Circle
      cx={256}
      cy={96}
      r={32}
      style={{
        fill: props.color,
        stroke: props.color,
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
  </Svg>
);

export default SvgComponent;
