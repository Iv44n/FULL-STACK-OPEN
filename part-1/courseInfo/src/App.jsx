const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Content = (props) => {
  const part1 = props.part1
  const part2 = props.part2
  const part3 = props.part3

  return (
    <>
      <Part name={part1.name} exercises={part1.exercises} />
      <Part name={part2.name} exercises={part2.exercises} />
      <Part name={part3.name} exercises={part3.exercises} />
    </>
  )
}

const Total = (props) => <p>Number of exercises {props.total}</p>

function App() {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </>
  )
}

export default App
