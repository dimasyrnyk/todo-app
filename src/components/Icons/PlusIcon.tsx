import plusIcon from "@assets/icons/plusIcon.svg";

type Props = {
  className?: string;
};

function PlusIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={plusIcon}
      alt="Plus icon"
    />
  );
}

export default PlusIcon;
