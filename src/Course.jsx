import React from 'react';
import './Course.css'

const Course = ({course, possibleGrades, handleRemove, handlePointUpdate, handleHourUpdate}) => {
    const possibleLetters = Object.keys(possibleGrades);
    return (
        <tr>
            <td><strong>{course.name}</strong></td>
            <td>
                <label htmlFor="hours">Hours:</label>
                <input type="number" name="hours" value={course.hours} 
                    onChange={e => handleHourUpdate(course.name, parseInt(e.target.value))}></input>
            </td>
                
            <td>    
                <label htmlFor="grade">Grade: </label>
                <select name="grade" 
                    onChange={e => handlePointUpdate(course.name, possibleGrades[e.target.value])}>
                    {possibleLetters.map(letter =>
                        <option value={letter}>{letter}</option>
                    )}
                </select>
            </td>

            <td>
                <button class="delete-course" onClick={e => handleRemove(course.name)}>X</button>
            </td>
        </tr>
    )
}

export default Course;