import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "secondary";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "default", size = "default", asChild, children, ...props }, ref) => {
        const baseClasses =
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const variantClasses = {
            default: "bg-blue-600 text-white hover:bg-blue-700",
            outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900",
            ghost: "hover:bg-gray-100 hover:text-gray-900",
            secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        };

        const sizeClasses = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        };

        const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, {
                ...children.props,
                className: `${classes} ${children.props.className || ""}`,
                ref,
            });
        }

        return (
            <button className={classes} ref={ref} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
