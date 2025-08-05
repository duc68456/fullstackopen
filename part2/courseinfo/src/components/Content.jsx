import Part from './Part.jsx'

const Content = ({ parts }) => {
    console.log(parts)
    const exercises = parts.map(part => part.exercises)
    console.log(exercises)
    const total = exercises.reduce((s, p) => s + p)
    console.log(total)
    return (
        <>
            {parts.map(part => <Part part={part} key={part.id} />)}
            <p><b>total of {total} exercises</b></p>
        </>
    )
}

export default Content