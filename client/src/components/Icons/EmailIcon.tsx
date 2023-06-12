import emailIcon from "@assets/icons/emailIcon.svg";

type Props = {
  className?: string;
};

function EmailIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={emailIcon}
      alt="Email icon"
    />
  );
}

export default EmailIcon;
