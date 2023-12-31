import Header from "./Header"
import React from 'react'
import Content from "./Content"
import Total from "./Total"

const Course = ({course}) => {
    return (
      <div>
        <Header text = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts} />
      </div>
    )
  }

export default Course