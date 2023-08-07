import React from 'react'
import Category from '../component/Category'
import './style/Best.scss'
import List from '../component/List'

function Special() {
  return (
    <div className='container'>
        <div className='best'>
            <Category></Category>
            <List title='특가'></List>
        </div>
    </div>
  )
}

export default Special