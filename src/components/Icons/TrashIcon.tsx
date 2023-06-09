import trashIcon from "@assets/icons/trashIcon.svg";

type Props = {
  className?: string;
};

function TrashIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={trashIcon}
      alt="Trash icon"
    />
  );
}

export default TrashIcon;
