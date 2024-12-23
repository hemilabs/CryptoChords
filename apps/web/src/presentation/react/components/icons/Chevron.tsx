import React from "react"

const ChevronBase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.22 14.78a.75.75 0 0 1 0-1.06L11.94 10 8.22 6.28a.75.75 0 1 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.2}
    />
  </svg>
)

type Props = { className?: string }

const Left = ({ className = '' }: Props) => (
  <ChevronBase className={`rotate-180 ${className}`} />
)

const Bottom = ({ className = '' }: Props) => (
  <ChevronBase className={`rotate-90 ${className}`} />
)

const Up = ({ className = '' }: Props) => (
  <ChevronBase className={`-rotate-90 ${className}`} />
)

export const Chevron = {
  Left,
  Right: ChevronBase,
  Bottom,
  Up,
}
