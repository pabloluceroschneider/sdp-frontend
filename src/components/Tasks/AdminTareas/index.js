import React from 'react'

import Table from './Table'

const Gestor = props => {
  return (
    <div>
      <Table username={props.username} />
    </div>
  )
}

export default Gestor
