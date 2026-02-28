import React from "react";
import { IconBaseProps, IconType } from "react-icons";

interface AppIconProps extends IconBaseProps {
  icon: IconType;
}

const AppIcon: React.FC<AppIconProps> = ({ icon: Icon, ...props }) => {
  return <Icon {...props} />;
};

export default AppIcon;
