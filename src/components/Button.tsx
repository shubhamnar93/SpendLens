import React from "react"

type Variant = "solid" | "ghost" | "outline"

type CommonProps = {
  variant?: Variant
  label: string
  className?: string
  size?: "xs" | "md" | "xl"
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button"
  }

type AnchorProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a"
  }

type Props = ButtonProps | AnchorProps

export const Button = React.memo((props: Props) => {
  const { variant = "solid", label, className, size = "xl" } = props
  const commonClass = `p-${size == "xs" ? 2 : size == "md" ? 3 : 5} hover:scale-105 transition-transform duration-300 text-${size} rounded-md  mt-5 md:mt-0`

  const baseSolid =
    `bg-[#1A1A1A]  text-white ${commonClass}`

  const baseOutline =
    `bg-transparent border border-[#086841] ${commonClass}`

  const baseGhost =
    `bg-transparent border border-[#e2e8f0] ${commonClass}`

  const finalClass = `${variant === "solid" ? baseSolid : variant === "outline" ? baseOutline : baseGhost} ${className ?? ""}`


  if (props.as === "a") {
    const { as, variant, label, className, ...anchorProps } = props
    return (
      <a className={finalClass} tabIndex={0} {...anchorProps}>
        {label}
      </a>
    )
  }

  const { as, variant: _v, label: _l, className: _c, ...buttonProps } = props
  return (
    <button className={finalClass} tabIndex={0} {...buttonProps}>
      {label}
    </button>
  )
})
