import { ComponentProps } from 'react'

export const CheckMarkIcon = (props: ComponentProps<'svg'>) => (
  <svg
    fill="none"
    height="12"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.375 7.547 4.5 10.125l6.125-8.25"
      stroke="#FF6C15"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
)
