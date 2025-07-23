import { getGroupedApplications } from 'Api/ApplicationService'
import { GroupedApplications } from 'Models/Application'
import React, { useEffect, useState } from 'react'

type Props = {}

const ApplicationPage = (props: Props) => {
  const[grApp,setGrApp]=useState<GroupedApplications[]>([])
  useEffect(()=>{
    const getData = async ()=>{
      const data = await getGroupedApplications()
      if(data) setGrApp(data);
    }
    getData() 
  },[])
  console.log(grApp);
  return (
    <div>ApplicationPage</div>
  )
}

export default ApplicationPage