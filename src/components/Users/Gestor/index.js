import React from 'react'

import BasicFields from './BasicFields'
import Table from './Table'


const Gestor = props => {
  return (
    <div>
      <BasicFields {...props} />
      <Table username={props.username} />
    </div>
  )
}

export default Gestor
