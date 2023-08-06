import React from 'react'
import Category from '../component/Category'
import './style/Best.scss'
import List from '../component/List'

function Best() {
  return (
    <div className='container'>
        <div className='best'>
            <Category></Category>
            <List title='베스트'></List>
        </div>
    </div>
  )
}

export default Best