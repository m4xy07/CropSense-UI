import React from 'react'

const Button = (props: React.PropsWithChildren) => {
  return (
    <button className="relative py-2 px-3 button-gradient rounded-full min-w-[120px] text-neutral-50 tracking-tight border border-neutral-400/20 font-normal font-inter text-sm">
            <span className='button-txt'>{props.children}</span>
            </button>
  )
}

export default Button
