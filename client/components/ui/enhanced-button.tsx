import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 active:scale-95",
        outline:
          "border-2 border-black bg-background text-black hover:bg-black hover:text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-black before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
        premium:
          "bg-gradient-to-r from-gray-800 via-black to-gray-800 text-white hover:from-gray-700 hover:via-gray-900 hover:to-gray-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white before:via-transparent before:to-white before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-20",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base",
        icon: "h-11 w-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={loading || props.disabled}
          {...props}
        >
          {loading && (
            <motion.div
              className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          {children}
        </Comp>
      </motion.div>
    );
  },
);
EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton, buttonVariants };
