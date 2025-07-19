import React from 'react'
import CardList from '../../Modules/CardList/CardList'



interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="flex min-h-screen  bg-blue-700">
      <div className="w-64 bg-white shadow-xl h-screen flex flex-col px-6 py-4  mt-3 border border-black">
        Filters
      </div>

      <div className="flex-1 bg-white shadow-[0_0_30px_-7px_#525d6b] m-3 ">
        <CardList />
      </div>
    </div>
  )
}

export default HomePage