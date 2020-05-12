import React, { useState } from "react";
import CourseDetails from "./CourseDetails";
import parseString from "./utils";
import "./App.css";

function App() {
  let [search, setSearch] = useState("");
  let [error, setError] = useState(false);
  let [showDetails, setShowDetails] = useState(false);
  let [department, setDepartment] = useState("");
  let [course, setCourse] = useState("");
  let [year, setYear] = useState("");
  let [semester, setSemester] = useState("");

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log("m in submit", e);
    const resp = parseString(search);
    if (resp.error) {
      setError(true);
      setShowDetails(false);
    } else if (resp.parsedObj) {
      let data = resp.parsedObj;
      setDepartment(data["dept"]);
      setCourse(data["course"]);
      setYear(data["year"]);
      setSemester(data["sem"]);
      setShowDetails(true);
      setError(false);
    }
  };

  const handleInputChange = value => {
    if (!value || !value.length) {
      setSearch("");
      setError(false);
      setShowDetails(false);
    } else {
      setSearch(value);
    }
  };

  // useEffect( ()=> {
  //   const resp = parseString(search);
  //   if (resp.error) {
  //     setError(resp.error);
  //   }

  //   else if (resp.parsedObj) {
  //     let data = resp.parsedObj
  //     setDepartment(data["dept"]);
  //     setCourse(data["course"]);
  //     setYear(data["year"]);
  //     setSemester(data["sem"]);

  //   }
  // }, [search])

  return (
    <div className="course-container">
      <div className="header">
        <h3>Course Finder</h3>
      </div>
      <div className="field-label">Course</div>
      <form className="course-finder-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoComplete="off"
          className={error ? "error" : "success"}
          placeholder="Enter course"
          id="search"
          name="search"
          onChange={e => handleInputChange(e.target.value)}
        />
        <button
          type="submit"
          className={!search && "disabled"}
          disabled={!search}
        >
          Submit
        </button>
        {error && <p className="error">Please make a valid entry</p>}
      </form>
      {showDetails && (
        <CourseDetails
          department={department}
          course={course}
          year={year}
          semester={semester}
        ></CourseDetails>
      )}
    </div>
  );
}

export default App;
