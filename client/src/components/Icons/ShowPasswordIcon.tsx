import showPasswordIcon from "@assets/icons/showPasswordIcon.svg";

type Props = {
  className?: string;
  onClick?: () => void;
};

function ShowPasswordIcon({ className, onClick }: Props) {
  return (
    <img
      className={className}
      src={showPasswordIcon}
      alt="Show password icon"
      onClick={onClick}
    />
  );
}

export default ShowPasswordIcon;
