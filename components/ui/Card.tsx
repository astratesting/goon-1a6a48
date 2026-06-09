import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = true, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-ink-2 border border-ink-3 rounded-xl ${
          hover
            ? "transition-all duration-150 ease-bounce-out hover:border-teal/30 hover:shadow-card-hover"
            : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
