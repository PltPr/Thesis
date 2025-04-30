import React from 'react'
import CardList from '../../Modules/CardList/CardList.tsx'



interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="flex gap-[20px] justify-around items-[space-evenly]">
      <div className="bg-white shadow-[0_0_30px_-7px_#525d6b] mt-[20px] p-[25px] h-[700px] w-[22%]">
        Filters
      </div>

      <div className="bg-white shadow-[0_0_30px_-7px_#525d6b] mt-[20px] w-[78%]">
        <CardList />
      </div>
    </div>
  )
}

export default HomePage