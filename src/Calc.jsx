import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Calc.css'

import Course from './Course'

function Calc() {
    const [hours, setHours] = useState(0);
    const [gpa, setGpa] = useState(0);
    const [newCourse, setNewCourse] = useState("");
    const [catPic, setCatPic] = useState("https://cdn2.thecatapi.com/images/MTU1NzE4MQ.jpg");

    const [courses, setCourses] = useState([
        {
            name: "CS 125",
            hours: 4,
            qualityPoints: 4,
        },
        {
            name: "Calc 2",
            hours: 3,
            qualityPoints: 4
        },
        {
            name: "Calc 3",
            hours: 3,
            qualityPoints: 4
        }
    ]);

    const uiucGrades = {
        'A+': 4.0,
        'A':  4.0,
        'A-': 3.67,
        'B+': 3.33,
        'B':  3.00,
        'B-': 2.67,
        'C+': 2.33,
        'C':  2.00,
        'C-': 1.67,
        'D+': 1.33,
        'D':  1.00,
        'D-': 0.67, 
        'F': 0.00
    }

    const calculateGpa = (hours, gpa) => {
        let totalHours = hours;
        let totalPoints = hours * gpa;
        for (let i = 0; i < courses.length; i++) {
            totalHours += courses[i].hours;
            totalPoints += courses[i].hours * courses[i].qualityPoints;
        }
        const newGpa = (totalPoints / totalHours).toPrecision(3);
        return newGpa;
    };

    const updatePoints = (courseName, newPoints) => {
        const newCourses = courses.map(course => 
            course.name === courseName ? {...course, qualityPoints: newPoints} : course
        );
        setCourses(newCourses);
    };

    const updateHours = (courseName, newHours) => {
        const newCourses = courses.map(course => 
            course.name === courseName ? {...course, hours: newHours} : course
        );
        setCourses(newCourses);
    };

    const addCourse = (courseName) => {
        setCourses([...courses, {name: courseName, hours: 3, qualityPoints: 4}]);
    };

    const removeCourse = (courseName) => {
        const newCourses = courses.filter(course => course.name !== courseName)
        setCourses(newCourses);
    };

    const updateCatPic = () => {
        axios.get("https://api.thecatapi.com/v1/images/search")
            .then(response => {
                setCatPic(response.data[0].url)
            })
    }

    const handleAddForm = (e) => {
        e.preventDefault();
        addCourse(newCourse);
        setNewCourse("");
        updateCatPic();
    }

    useEffect(() => {
        document.title = `Current GPA: ${calculateGpa(hours, gpa, courses)}`
    }, [hours, gpa, courses]);

    return (
        <div>
            <h1>Get your GPA</h1>

            <label htmlFor="gpa">Enter your GPA so far:</label>
            <input type="number" id="gpa" onChange={e => setGpa(parseInt(e.target.value))}></input>
            <br />

            <label htmlFor="hours">Enter your credit hours so far:</label>
            <input type="number" id="hours" onChange={e => setHours(parseInt(e.target.value))}></input>
            <br />

            <table>
                {courses.map(course => 
                    <Course course={course} 
                    possibleGrades={uiucGrades} 
                    handleRemove={removeCourse}
                    handleHourUpdate={updateHours} 
                    handlePointUpdate={updatePoints}
                    />
                )}
            </table>

            <form onSubmit={handleAddForm}>
                <label htmlFor="courseName">New Course:</label>
                <input type="text" id="courseName" value={newCourse} onChange={e => setNewCourse(e.target.value)}></input>
            </form>

            <h2 id="gpa-display">Your new GPA is {calculateGpa(hours, gpa)}</h2>

            <img src={catPic} alt="cute kitty" height="200"></img>
        </div>
    );
}

export default Calc;