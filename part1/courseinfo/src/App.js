import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  console.log('Part ...')
  console.log(props)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  console.log('Contents ...')
  console.log(props)
  return (
    <div>
    <Part part={props.course.parts[0]}></Part>
    <Part part={props.course.parts[1]}></Part>
    <Part part={props.course.parts[2]}></Part>
    </div>
  )
}

const Total = (props) => {
  console.log('Total ...')
  console.log(props)
  return (
    <p>Number of exercise {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises  } </p>
  )
  
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  )
}

export default App