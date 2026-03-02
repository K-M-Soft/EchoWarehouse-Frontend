import React, { memo } from "react";
import logo from "../../assets/logo/logo.svg";

interface AppLogoProps {
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const AppLogo: React.FC<AppLogoProps> = ({
  alt = "EchoWarehouse Logo",
  className = "",
  width = 80,
  height = 80,
}) => {
  return (
    <img
      src={logo}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
};

export default memo(AppLogo);
