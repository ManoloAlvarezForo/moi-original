import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 512 512"
      {...props}>
      <Rect
        x={48}
        y={48}
        width={176}
        height={176}
        rx={20}
        ry={20}
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
      <Rect
        x={288}
        y={48}
        width={176}
        height={176}
        rx={20}
        ry={20}
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
      <Rect
        x={48}
        y={288}
        width={176}
        height={176}
        rx={20}
        ry={20}
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
      <Rect
        x={288}
        y={288}
        width={176}
        height={176}
        rx={20}
        ry={20}
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
    </Svg>
  );
}

export default SvgComponent;
