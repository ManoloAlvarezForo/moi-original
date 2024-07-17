import * as React from 'react';
import Svg, {G, Path, Text, TSpan} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={172.72}
    height={133.688}
    viewBox="0 0 172.72 133.688"
    {...props}>
    <G data-name="Group 2298">
      <Path
        data-name="Rectangle 1717"
        d="M66.72 62.688h49a30 30 0 0 1 30 30v38h-49a30 30 0 0 1-30-30v-38Z"
        fill="#c3e313"
      />
      <Path
        data-name="Path 483"
        d="M51.065 29.36c2.025-3.126 62.322-.68 75.299 8.072l3.97 2.679c12.978 8.753 20.59 32.862 9.758 48.92s-35.998 17.978-48.976 9.224l-3.971-2.678c-12.977-8.753-38.103-63.093-36.08-66.217Z"
        fill="#ff7a52"
      />
      <Path
        data-name="Rectangle 1710"
        d="M125.72 52.688h47v26.25a43.75 43.75 0 0 1-43.75 43.75H55.72a70 70 0 0 1 70-70Z"
        fill="#646464"
      />
      <Path
        data-name="Path 461"
        d="M16.82 51.338c1.745-3.292 62.052-6.113 75.748 1.478l4.191 2.324c13.697 7.591 23.385 30.955 13.991 47.903S76.441 124.1 62.744 116.508l-4.191-2.323c-13.697-7.592-43.477-59.557-41.733-62.847Z"
        fill="#00b7cd"
      />
      <Text
        transform="translate(66.72 100.688)"
        fill="#fff"
        fontSize={55}
        fontFamily="UbuntuMonoDerivativePowerline-Regular, Ubuntu Mono derivative Powerline">
        <TSpan x={0} y={0}>
          {'Moi'}
        </TSpan>
      </Text>
    </G>
  </Svg>
);

export default SvgComponent;
