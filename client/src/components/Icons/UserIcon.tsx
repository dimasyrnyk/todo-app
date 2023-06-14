import userIcon from "@assets/icons/userIcon.svg";

type Props = {
  className?: string;
};

function UserIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={userIcon}
      alt="User icon"
    />
  );
}

export default UserIcon;
