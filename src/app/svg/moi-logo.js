import * as React from 'react';
import Svg, {Rect, Text, TSpan} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={152}
    height={86}
    viewBox="0 0 152 82"
    {...props}>
    <Rect
      width={152}
      height={66}
      rx={5}
      transform="translate(0 10)"
      fill="#606060"
    />
    <Rect
      width={67}
      height={86}
      rx={5}
      transform="translate(20)"
      fill="#7345ba"
    />
    <Text
      transform="translate(29 61)"
      fill="#f8f8f8"
      fontSize={53}
      fontFamily="HelveticaNeue-Bold, Helvetica Neue"
      fontWeight={700}>
      <TSpan x={0} y={0}>
        {'M'}
      </TSpan>
    </Text>
    <Text
      transform="translate(89 58)"
      fill="#fff"
      fontSize={54}
      fontFamily="HelveticaNeue-Bold, Helvetica Neue"
      fontWeight={700}>
      <TSpan x={0} y={0}>
        {'oi'}
      </TSpan>
    </Text>
  </Svg>
);

export default SvgComponent;
