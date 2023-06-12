import hidePasswordIcon from "@assets/icons/hidePasswordIcon.svg";

type Props = {
  className?: string;
  onClick?: () => void;
};

function HidePasswordIcon({ className, onClick }: Props) {
  return (
    <img
      className={className}
      src={hidePasswordIcon}
      alt="Hide password icon"
      onClick={onClick}
    />
  );
}

export default HidePasswordIcon;
