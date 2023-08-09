import Part from "./Part"

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part =>
            <div key ={part.id}>
                <Part content = {part.name} exercise = {part.exercises} />
            </div>
            )}
        </div>
    )
}

export default Content
