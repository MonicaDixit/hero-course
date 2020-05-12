import React from "react";

const CourseDetails = props => {
  return (
    <div className="details">
      <h3 className="details-header">
        {props.department} {props.course}
      </h3>
      <div className="prop">
        <p className="label">Department</p>
        <p className="value">{props.department}</p>
      </div>
      <div className="prop">
        <p className="label">Course</p>
        <p className="value">{props.course}</p>
      </div>
      <div className="prop">
        <p className="label">Year</p>
        <p className="value">{props.year}</p>
      </div>
      <div className="prop">
        <p className="label">Semester</p>
        <p className="value">{props.semester}</p>
      </div>
    </div>
  );
};

export default CourseDetails;
