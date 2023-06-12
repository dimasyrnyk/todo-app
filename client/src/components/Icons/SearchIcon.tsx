import searchIcon from "@assets/icons/searchIcon.svg";

type Props = {
  className?: string;
};

function SearchIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={searchIcon}
      alt="Search icon"
    />
  );
}

export default SearchIcon;
