import React from 'react';

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

const Header = ({ name }) => (
    <h1>{name}</h1>
);

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </>
    );
};

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p><strong>Number of exercises {total}</strong></p>
    );
};

const Part = ({ part, exercises }) => (
    <p>{part} {exercises}</p>
);


export default Course;
