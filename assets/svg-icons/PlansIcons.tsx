import { memo } from "react";
import Svg, {
  Path,
  Circle,
  LinearGradient,
  Defs,
  Stop,
} from "react-native-svg";

function Premium() {
  return (
    <Svg width="31" height="31" viewBox="0 0 31 31" fill="none">
      <Circle cx="15.5" cy="15.5" r="15.5" fill="#DE8E0E" />
      <Path
        d="M20.3028 22.7656H10.2613C9.62749 22.7656 9.06294 22.3651 8.85357 21.7669L6.78771 15.8644C6.3836 14.7098 7.46481 13.5865 8.634 13.9463L10.7167 14.5871C11.491 14.8254 12.314 14.4019 12.5702 13.6333L14.0851 9.0884C14.5384 7.72868 16.4616 7.72868 16.9149 9.0884L18.4298 13.6333C18.686 14.4019 19.509 14.8254 20.2833 14.5871L22.2054 13.9957C23.4035 13.6271 24.4943 14.8112 24.0287 15.9751L21.6875 21.8281C21.461 22.3943 20.9126 22.7656 20.3028 22.7656Z"
        fill="white"
      />
    </Svg>
  );
}

function Elite() {
  return (
    <Svg width="31" height="31" viewBox="0 0 31 31" fill="none">
      <Circle
        cx="15.5"
        cy="15.5"
        r="15.5"
        fill="url(#paint0_linear_3691_4118)"
      />
      <Path
        d="M20.3028 22.7656H10.2613C9.62749 22.7656 9.06294 22.3651 8.85357 21.7669L6.78771 15.8644C6.3836 14.7098 7.46481 13.5865 8.634 13.9463L10.7167 14.5871C11.491 14.8254 12.314 14.4019 12.5702 13.6333L14.0851 9.0884C14.5384 7.72868 16.4616 7.72868 16.9149 9.0884L18.4298 13.6333C18.686 14.4019 19.509 14.8254 20.2833 14.5871L22.2054 13.9957C23.4035 13.6271 24.4943 14.8112 24.0287 15.9751L21.6875 21.8281C21.461 22.3943 20.9126 22.7656 20.3028 22.7656Z"
        fill="white"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3691_4118"
          x1="31"
          y1="10"
          x2="9.23872e-07"
          y2="31"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#DE8E0E" />
          <Stop offset="0.425794" stop-color="#56411E" />
          <Stop offset="1" stop-color="#FFEAC8" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
const EliteIcon = memo(Elite);
const PremiumIcon = memo(Premium);

export { EliteIcon, PremiumIcon };
