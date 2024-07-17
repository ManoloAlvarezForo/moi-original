import * as React from 'react';
import Svg, {G, Rect, Text, TSpan} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 164 83"
      {...props}>
      <G data-name="Group 2060">
        <G data-name="Group 1945">
          <G data-name="Group 160">
            <G data-name="Group 155" transform="translate(-.497 4)">
              <Rect
                data-name="Rectangle 33"
                width={164}
                height={75}
                rx={5}
                transform="translate(.498)"
                fill="#fff"
              />
              <Text
                transform="translate(11.498 61)"
                fill="#6e6e6e"
                fontSize={63}
                fontFamily="HelveticaNeue-Bold, Helvetica Neue"
                fontWeight={700}>
                <TSpan x={0} y={0}>
                  {'M'}
                </TSpan>
              </Text>
            </G>
            <G data-name="Group 159">
              <G data-name="Group 162">
                <G data-name="Group 158">
                  <Rect
                    data-name="Rectangle 34"
                    width={71}
                    height={83}
                    rx={5}
                    transform="translate(72.001)"
                    fill="#37cce8"
                  />
                </G>
                <Text
                  transform="translate(83.001 60)"
                  fill="#f8f8f8"
                  fontSize={49}
                  fontFamily="HelveticaNeue-Bold, Helvetica Neue"
                  fontWeight={700}>
                  <TSpan x={0} y={0}>
                    {'Oi'}
                  </TSpan>
                </Text>
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
