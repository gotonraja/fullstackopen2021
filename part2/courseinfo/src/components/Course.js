import React from 'react'

const Course = ({ courses }) => {
  return (
    <div>
      { courses.map(course => 
        <div>
          <Header key={course.id} course={course} />
          <Content key={course.id} course={course} />
          <Total key={course.id} course={course} />
        </div>
      ) }
    </div>
  )
}
  
const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <h3>Total of {total} exercises </h3>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map( part => 
        <Part key={course.parts.id} part={part} />
      ) }
    </div>
  )
}

export default Course
