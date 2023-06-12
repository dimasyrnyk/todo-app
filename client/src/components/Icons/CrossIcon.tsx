import crossIcon from "@assets/icons/crossIcon.svg";

type Props = {
  className?: string;
};

function CrossIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={crossIcon}
      alt="Cross icon"
    />
  );
}

export default CrossIcon;
