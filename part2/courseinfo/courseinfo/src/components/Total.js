import React from 'react'

const Total = ({parts}) => {
    const total = parts.reduce(function(sum, part) {
        return sum + part.exercises
    }, 0)
    return (
        <p>Total of {total} exercises</p>
    )
}

export default Total