import React from 'react'
import FarmEventsTable from '../table'

export function UpcomingEventsComponent() {
  return (
    <div className=" border border-zinc-50/10 rounded-xl equipment-card-inner w-1/2">
      <div className="flex w-full border-b border-zinc-50/10 px-5 py-4">
        <h2 className="text-[18px] font-normal mt-1">Upcoming Events</h2>
      </div>
      <div className='px-5 py-4'>
        <FarmEventsTable />
    </div>
      
    </div>
  )
}

