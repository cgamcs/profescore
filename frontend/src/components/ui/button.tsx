import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-0 transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-red-500 text-white border border-red-500 hover:bg-red-700 hover:border-red-700",
        outline:
          "border border-gray-300 dark:border-[#383939] bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "outline-none ring-0 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-[#464747]",
        link: "text-primary underline-offset-4 hover:underline",
        cancel: 'px-4 py-2 border border-gray-300 dark:border-[#202024] bg-white dark:bg-[#383939] rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-[#ffffff0d] disabled:opacity-50',
        save: "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md hover:cursor-pointer text-sm font-medium disabled:opacity-50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }