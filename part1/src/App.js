const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content p1 = {part1} p2 = {part2} p3 = {part3} 
      ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
      <Total ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      {props.course}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name = {props.p1} ex = {props.ex1} />
      <Part name = {props.p2} ex = {props.ex2} />
      <Part name = {props.p3} ex = {props.ex3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.ex1 + props.ex2 + props.ex3}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.ex}
      </p>
    </div>
  )
}

export default App