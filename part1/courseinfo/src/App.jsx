const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part name={props.part1} exercises={props.exercises1} />
      <Part name={props.part2} exercises={props.exercises2} />
      <Part name={props.part3} exercises={props.exercises3} />
    </>
  )
}

const Total = (props) => {
  console.log(props)
  return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
}

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <>
//       <Header course={course} />
//       <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
//       <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
//     </>
//   )
// }


// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = {
//     name: 'Fundamentals of React',
//     exercises: 10
//   }
//   const part2 = {
//     name: 'Using props to pass data',
//     exercises: 7
//   }
//   const part3 = {
//     name: 'State of a component',
//     exercises: 14
//   }

//   return (
//     <div>
//       <Header course = {course} />
//       <Content part1 = {part1['name']} exercises1 = {part1['exercises']}
//                part2 = {part2['name']} exercises2 = {part1['exercises']}
//                part3 = {part3['name']} exercises3 = {part3['exercises']} />
//       <Total exercises1 = {part1['exercises']} exercises2 = {part2['exercises']} exercises3 = {part3['exercises']}/>
//     </div>
//   )
// }


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
      <Header course = {course['name']} />
      <Content part1 = {course['parts'][0]['name']} exercises1 = {course['parts'][0]['exercises']}
               part2 = {course['parts'][1]['name']} exercises2 = {course['parts'][1]['exercises']}
               part3 = {course['parts'][2]['name']} exercises3 = {course['parts'][2]['exercises']}   />
      <Total exercises1 = {course['parts'][0]['exercises']} exercises2 = {course['parts'][1]['exercises']} exercises3 = {course['parts'][2]['exercises']} />
    </div>
  )
}

export default App