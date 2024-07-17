/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';
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
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={384}
      y={336}
      width={80}
      height={80}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={384}
      y={256}
      width={80}
      height={80}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={384}
      y={176}
      width={80}
      height={80}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={384}
      y={96}
      width={80}
      height={80}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={48}
      y={336}
      width={80}
      height={80}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={48}
      y={256}
      width={80}
      height={80}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={48}
      y={176}
      width={80}
      height={80}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={48}
      y={96}
      width={80}
      height={80}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={128}
      y={96}
      width={256}
      height={160}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
    <Rect
      x={128}
      y={256}
      width={256}
      height={160}
      rx={28}
      ry={28}
      style={{
        fill: 'none',
        stroke: props.color,
        strokeLinejoin: 'round',
        strokeWidth: 32,
      }}
    />
  </Svg>
);

export default SvgComponent;
