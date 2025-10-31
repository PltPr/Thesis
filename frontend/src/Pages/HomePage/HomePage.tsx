import React from 'react'
import CardList from '../../Modules/CardList/CardList'



interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="flex min-h-screen  bg-blue-700">
      <div className="w-64 bg-white flex flex-col px-6 py-4  mt-2 sticky top-0">
        Filters
      </div>

      <div className="flex-1 bg-white  m-2 ">
        <CardList />
      </div>
    </div>
  )
}

export default HomePage