import React from "react";

interface NextIconProps {
  // Tutaj możesz dodać typy dla propsów, jeśli są jakieś
}

const NextIcon: React.FC<NextIconProps> = () => {
  return (
    <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m2 1 8 8-8 8"
        stroke="#1D2026"
        strokeWidth="3"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default NextIcon;
