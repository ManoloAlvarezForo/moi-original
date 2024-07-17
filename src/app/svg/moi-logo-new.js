import * as React from 'react';
import Svg, {G, Path, Text, TSpan} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={138}
    height={99}
    viewBox="0 0 138 99"
    {...props}>
    <G data-name="Group 2297">
      <Path
        data-name="Rectangle 1713"
        d="M36 31h49a30 30 0 0 1 30 30v38H66a30 30 0 0 1-30-30V31Z"
        fill="#c3e313"
      />
      <Path
        data-name="Rectangle 1714"
        d="M21 0h49a30 30 0 0 1 30 30v38H51a30 30 0 0 1-30-30V0Z"
        fill="#ff7a52"
      />
      <Path
        data-name="Rectangle 1715"
        d="M51 21h87v40a30 30 0 0 1-30 30H21V51a30 30 0 0 1 30-30Z"
        fill="#646464"
      />
      <Path
        data-name="Rectangle 1716"
        d="M0 11h49a30 30 0 0 1 30 30v38H30A30 30 0 0 1 0 49V11Z"
        fill="#00b7cd"
      />
      <Text transform="translate(32 67)" fill="#fff" fontSize={51}>
        <TSpan x={0} y={0}>
          {'Moi'}
        </TSpan>
      </Text>
    </G>
  </Svg>
);

export default SvgComponent;
