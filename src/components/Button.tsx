import React from 'react'

const Button = (props: React.PropsWithChildren) => {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-black text-sm bg-[#00ffe5]">
            <div className="absolute inset-0">
              <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
              <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear_gradient(to_top,black,transparent)]">
              <div className="absolute inset-0  rounded-lg"></div>
              </div>
            </div>
            <span>{props.children}</span>
            </button>
  )
}

export default Button
