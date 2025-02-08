import React from 'react'
import CardList from '../../Modules/CardList/CardList.tsx'

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div>
    <CardList></CardList>

    <nav>
    <div style={{ backgroundColor: "white", padding: "10px" }}>
  <img src="itrack-logo.svg" alt="logo" />
</div>
    </nav>
    </div>
  )
}

export default HomePage