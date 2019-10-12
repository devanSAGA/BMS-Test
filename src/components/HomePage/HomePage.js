import React from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.css";

const tasklist = [
  {
    title: "Task 1 - Check Duplicates",
    url: "/assignment1"
  },
  {
    title: "Task 2 - Recreate Trailers Page",
    url: "/assignment2"
  }
];

const Homepage = () => {
  return (
    <div className="homepage">
      <h1 className="heading">BookMyShow Assignment</h1>
      <section className="tasklist">
        {tasklist.map((task, index) => {
          return (
            <NavLink
              key={`task-${index}`}
              to={task.url}
              className={`tasklist__task`}
            >
              <span className="tasklist__task--title">{task.title}</span>
            </NavLink>
          );
        })}
      </section>
    </div>
  );
};

export default Homepage;
