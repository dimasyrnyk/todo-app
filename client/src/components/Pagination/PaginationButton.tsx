import "./Pagination.scss";

type Props = {
  title: string;
  show: boolean;
  onClick: () => void;
};

function PaginationButton({ title, show, onClick }: Props) {
  if (!show) {
    return null;
  }

  return (
    <li>
      <button
        className="paginate__button"
        onClick={onClick}
      >
        {title}
      </button>
    </li>
  );
}

export default PaginationButton;
