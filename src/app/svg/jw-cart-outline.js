import * as React from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="-110 0 512 512"
    {...props}>
    <G data-name="Group 2287">
      <G data-name="Group 2286">
        <G data-name="Group 2283">
          <G data-name="Group 2282">
            <G
              data-name="Rectangle 1673"
              fill="none"
              stroke={props.color}
              strokeLinejoin="round"
              strokeWidth={22}>
              <Path stroke="none" d="M90.783 124.155h107v68.432h-107z" />
              <Path d="M101.783 135.155h85v46.432h-85z" />
            </G>
          </G>
          <G
            data-name="Rectangle 1683"
            fill="none"
            stroke={props.color}
            strokeLinejoin="round"
            strokeWidth={23}>
            <Path stroke="none" d="M95.727 0h94v54h-94z" />
            <Path d="M107.227 11.5h71v31h-71z" />
          </G>
          <G
            data-name="Rectangle 1686"
            transform="translate(37.727 160.857)"
            fill="none"
            stroke={props.color}
            strokeLinejoin="round"
            strokeWidth={30}>
            <Rect width={212} height={33} rx={16.5} stroke="none" />
            <Rect x={15} y={15} width={182} height={3} rx={1.5} />
          </G>
          <G
            data-name="Rectangle 1687"
            transform="translate(29.727 316.003)"
            fill="none"
            stroke={props.color}
            strokeLinejoin="round"
            strokeWidth={30}>
            <Rect width={234} height={33} rx={16.5} stroke="none" />
            <Rect x={15} y={15} width={204} height={3} rx={1.5} />
          </G>
          <G data-name="Path 419" fill="none">
            <Path d="M58.727 35.296h169.1c18.455 0 32.063 8.344 32.063 25.724l34.537 387.46c0 17.38-10.182 26.332-28.637 26.332H29.691C11.236 474.812 0 465.86 0 448.48L25.315 66.765c0-17.38 14.96-31.469 33.412-31.469Z" />
            <Path
              d="M59.221 69.296 34.583 440.811h225.023l-33.11-371.515H59.222m-.49-34h169.1c18.455 0 32.063 8.344 32.063 25.724l34.53 387.46c0 17.38-10.182 26.331-28.637 26.331H29.691C11.236 474.811 0 465.86 0 448.48L25.315 66.765c0-17.38 14.96-31.469 33.415-31.469Z"
              fill={props.color}
            />
          </G>
          <G data-name="Group 2284">
            <G
              data-name="Rectangle 1673"
              fill="none"
              stroke={props.color}
              strokeLinejoin="round"
              strokeWidth={22}>
              <Path stroke="none" d="M90.783 280.108h107v68.432h-107z" />
              <Path d="M101.783 291.108h85v46.432h-85z" />
            </G>
          </G>
          <Rect
            data-name="Rectangle 1692"
            width={82}
            height={67}
            rx={10}
            transform="translate(29.727 443.811)"
            fill={props.color}
          />
          <Rect
            data-name="Rectangle 1693"
            width={82}
            height={67}
            rx={10}
            transform="translate(181.727 443.811)"
            fill={props.color}
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
