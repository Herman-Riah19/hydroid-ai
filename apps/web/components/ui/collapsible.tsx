"use client"

import * as React from "react"

interface CollapsibleContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CollapsibleContext = React.createContext<CollapsibleContextType | null>(null)

export function Collapsible({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
  ...props
}: {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const [openState, setOpenState] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : openState

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof value === "function" ? (value as Function)(open) : value
      if (!isControlled) {
        setOpenState(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, open, onOpenChange]
  )

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div
        data-state={open ? "open" : "closed"}
        className={className}
        {...props}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

export function CollapsibleTrigger({
  children,
  asChild,
  className,
  ...props
}: {
  children: React.ReactNode
  asChild?: boolean
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(CollapsibleContext)
  if (!context) throw new Error("CollapsibleTrigger must be used within Collapsible")

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    context.setOpen((prev) => !prev)
    props.onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick,
      "data-state": context.open ? "open" : "closed",
      className: `${children.props.className || ""} ${className || ""}`,
      ...props,
    })
  }

  return (
    <button
      type="button"
      data-state={context.open ? "open" : "closed"}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}

export function CollapsibleContent({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(CollapsibleContext)
  if (!context) throw new Error("CollapsibleContent must be used within Collapsible")

  if (!context.open) return null

  return (
    <div
      data-state={context.open ? "open" : "closed"}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}
