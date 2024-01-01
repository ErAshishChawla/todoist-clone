import { forwardRef } from "react";
import useClasses from "../../hooks/useClasses";

const Button = forwardRef(function AppBarLinkButton(props, ref) {
  const { className, children, ...rest } = props;

  const classNames = useClasses(
    "flex flex-row  flex-1",
    "p-1.5 rounded-md",
    "text-black cursor-pointer",
    className
  );
  return (
    <button className={classNames} ref={ref} {...rest}>
      {children}
    </button>
  );
});

export default Button;
