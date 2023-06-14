import lockIcon from "@assets/icons/lockIcon.svg";

type Props = {
  className?: string;
};

function LockIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={lockIcon}
      alt="Lock icon"
    />
  );
}

export default LockIcon;
