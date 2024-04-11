import React from "react";

const DateFilterButton = ({ activeIndex, index, text, handleClick }) => {
  return (
    <div
      className={`2xl:text-normal sm:text-smallText text-verySmallText text-center font-medium sm:px-5 sm:py-3 px-4 py-2 cursor-pointer ${
        activeIndex === index ? "border-[#74CAAE] bg-[#E3F2FF] text-[#0084FF] rounded-3xl" : "text-[#64748B]"
      }`}
      onClick={() => handleClick(index)}
    >
      {text}
    </div>
  );
};

export default DateFilterButton;
