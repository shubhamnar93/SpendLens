import React from "react"

type Variant = "solid" | "ghost"

type CommonProps = {
  variant?: Variant
  label: string
  className?: string
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
  const { variant = "solid", label, className } = props

  const baseSolid =
    "bg-[#1A1A1A] p-5 hover:scale-105 transition-transform duration-300 text-white rounded-md text-xl mt-5 md:mt-0"

  const baseGhost =
    "bg-transparent border border-[#086841] p-5 hover:scale-105 transition-transform duration-300 rounded-md text-xl block mt-5 md:mt-0"

  const finalClass = `${variant === "solid" ? baseSolid : baseGhost} ${className ?? ""}`


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
