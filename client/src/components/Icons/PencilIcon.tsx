import pencilIcon from "@assets/icons/pencilIcon.svg";

type Props = {
  className?: string;
};

function PencilIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={pencilIcon}
      alt="Pencil icon"
    />
  );
}

export default PencilIcon;
