import * as React from 'react';
import Svg, {G, Ellipse, Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 512 512"
    {...props}>
    <G data-name="Group 2277" transform="translate(-3671 -4977)">
      <G
        data-name="Ellipse 50"
        transform="translate(3671 4977)"
        fill="none"
        stroke={props.color}
        strokeWidth={20}>
        <Ellipse cx={235.5} cy={237} rx={235.5} ry={237} stroke="none" />
        <Ellipse cx={235.5} cy={237} rx={225.5} ry={227} />
      </G>
      <Ellipse
        data-name="Ellipse 52"
        cx={17}
        cy={46}
        rx={17}
        ry={46}
        transform="translate(3958 5103)"
        fill={props.color}
      />
      <Ellipse
        data-name="Ellipse 53"
        cx={17}
        cy={46}
        rx={17}
        ry={46}
        transform="translate(3839 5103)"
        fill={props.color}
      />
      <Path
        data-name="Path 414"
        d="M3839 5297.056c85.752-84.262 160.142-14.385 160.142-14.385"
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeWidth={20}
      />
    </G>
  </Svg>
);

export default SvgComponent;
