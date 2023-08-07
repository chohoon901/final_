import React, { useState } from 'react'
import './style/List.scss'
import { Nav } from 'react-bootstrap'

function List(props) {

    let [tab, setTab] = useState(0)

    return (
      <div className='row'>
        <div className='listTitle'>
            <h2>{ props.title }</h2>
        </div>
        <Nav variant="underline" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => { setTab(0) }}>
              높은 가격순
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => { setTab(1) }}>
              낮은 가격순
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab}></TabContent>
      </div>
    )
}

function TabContent({tab}) {
    return (
        <div className='content'>
            { [<div>내용1</div>, <div>내용2</div>][tab] }
        </div>
    )
}

export default List