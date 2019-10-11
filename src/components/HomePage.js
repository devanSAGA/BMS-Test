import React from "react";
import { NavLink } from "react-router-dom";

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
      <h1 className="homepage__heading">BookMyShow Assignment</h1>
      <section className="homepage__tasklist">
        {tasklist.map((task, index) => {
          return (
            <NavLink
              key={`task-${index}`}
              to={task.url}
              className={`homepage__tasklist--task${index}`}
            >
              {task.title}
            </NavLink>
          );
        })}
      </section>
    </div>
  );
};

export default Homepage;
