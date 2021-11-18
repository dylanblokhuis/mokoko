/* eslint-disable react/button-has-type */
import React, { forwardRef, RefObject } from 'react'
import { useButton } from '@react-aria/button'
import type { AriaButtonProps } from '@react-types/button'

interface ButtonProps extends AriaButtonProps<'button'> {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type, children, className, ...rest }, ref) => {
  const { buttonProps } = useButton(rest, ref as RefObject<HTMLElement>)

  return (
    <button type={type} className={className} {...buttonProps} ref={ref}>
      {children}
    </button>
  )
})

Button.defaultProps = {
  type: 'button',
  className: undefined,
  children: undefined
}

export default Button
