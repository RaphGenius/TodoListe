import React from "react";

function ToolTip({ title, child }) {
  return (
    <div className="group flex relative">
      {child}
      <span
        className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2   
    -translate-x-1/2 translate-y-full   m-4 mx-auto "
      >
        {title}{" "}
      </span>
    </div>
  );
}

export default ToolTip;
