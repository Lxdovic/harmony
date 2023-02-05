import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const SidebarItem = ({ popupText, children, className, style, link }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative">
      <Link
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={style}
        className={
          "active:bg-zinc-800 bg-zinc-800 transition w-12 h-12 flex cursor-pointer justify-center hover:bg-zinc-700 rounded-full " +
          className
        }
        to={link}
      >
        {children}
      </Link>

      <div
        style={{
          transform: hovering
            ? "scale(1) translateY(-50%)"
            : "scale(0) translateY(-50%)",
        }}
        className="absolute top-1/2 left-16 w-max transition duration-100 flex rounded bg-zinc-800 shadow-md h-8 self-center text-white px-2"
      >
        <span className="self-center">{popupText}</span>
      </div>
    </div>
  );
};

export default SidebarItem;
