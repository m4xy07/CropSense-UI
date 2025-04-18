import React from 'react'

const Button = (props: React.PropsWithChildren) => {
  return (
    <button className="relative py-2 px-2 rent-now-btn rounded-full w-fit text-neutral-50 tracking-tight border border-neutral-400/20 font-normal font-inter text-sm">
            <span className='button-txt'>{props.children}</span>
            </button>
  )
}
// use gradient-button class to have blue white btn
export default Button
