import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface IconWithLabelProps {
  icon: FontAwesomeIconProps["icon"];
  label: string | number;
  topLabel: string;
  iconColor?: string;
  labelColor?: string;
}

const IconWithLabel = ({
  icon,
  label,
  topLabel,
  iconColor,
  labelColor: color,
}: IconWithLabelProps) => {
  return (
    <div className="mx-2 w-full text-center border-b border-background md:border-b-0 last:border-b-0">
      <p className="uppercase tracking-wide text-sm text-foreground font-thin">
        {topLabel}
      </p>
      <span className="flex items-center justify-center">
        <FontAwesomeIcon icon={icon} size="sm" color={iconColor} />
        <p style={{ color }} className="ml-2">
          {label}
        </p>
      </span>
    </div>
  );
};

export default IconWithLabel;
