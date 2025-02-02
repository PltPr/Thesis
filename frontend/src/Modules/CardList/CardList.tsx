import React, { JSX } from 'react'
import Card from '../Card/Card.tsx'

type Props = {}

const CardList : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div>
    <Card job_tittle='Junior backend developer' job_type='full-time' salary={20} programming_language='C#'/>
    <Card job_tittle='Senior backend developer' job_type='full-time' salary={50} programming_language='C#'/>
    <Card job_tittle='Junior frontend developer' job_type='full-time' salary={20} programming_language='Java'/>
    </div>
  )
}

export default CardList