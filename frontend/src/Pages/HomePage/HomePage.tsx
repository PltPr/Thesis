import React from 'react'
import CardList from '../../Modules/CardList/CardList.tsx'
import './HomePage.css'


interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className='container'>
    <div className="filters">Filters</div>

    <div className='card-list2'>
    <CardList></CardList>
    </div>
    </div>
  )
}

export default HomePage