import React from "react";

const useHover = () => {
  const [hovered, setHovered] = React.useState(false);

  const ref = React.useRef(null);
  const enter = () => setHovered(true);
  const leave = () => setHovered(false);

  React.useEffect(() => {
    if (ref.current === null) return;
    ref.current.addEventListener("mouseenter", enter);
    ref.current.addEventListener("mouseleave", leave);
    return () => {
      ref.current.removeEventListener("mouseenter", enter);
      ref.current.removeEventListener("mouseleave", leave);
    };
  }, []);

  return [hovered, ref];
};

export default useHover;
