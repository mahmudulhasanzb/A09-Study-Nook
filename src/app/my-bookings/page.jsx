import MyBookingsTable from '@/components/MyBookingsTable'
import React from 'react'

export const metadata = {
  title: "StudyNook | My Bookings",
  description: "View and manage study rooms you have booked on StudyNook.",
};

const MyBookingsPage = () => {
  return (
    <div className="w-full pb-16 pt-4 space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-[#1e1108] dark:text-white">My Bookings</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
          Rooms you currently have booked on StudyNook.
        </p>
      </div>
      
      <MyBookingsTable />
    </div>
  )
}

export default MyBookingsPage
