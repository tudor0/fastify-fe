import { FC } from "react";

type IconProps = {
  className?: string;
  onClick?: () => void;
};

const ThumbsUp: FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg
      width="24px"
      height="24px"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
      className={className}
      onClick={onClick}>
      <path
        d="M16.472 20H4.1a.6.6 0 01-.6-.6V9.6a.6.6 0 01.6-.6h2.768a2 2 0 001.715-.971l2.71-4.517a1.631 1.631 0 012.961 1.308l-1.022 3.408a.6.6 0 00.574.772h4.575a2 2 0 011.93 2.526l-1.91 7A2 2 0 0116.473 20z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"></path>
      <path
        d="M7 20V9"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"></path>
    </svg>
  );
};

export default ThumbsUp;
