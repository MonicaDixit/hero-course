function parseString(str) {
  let parseObj = getParsedString(str);

  for (let key in parseObj) {
    if (!parseObj[key]) {
      return { error: "Please make a valid entry" };
    }
  }

  return {
    parsedObj: parseObj
  };
}

function getParsedString(str) {
  let arr = str.split(" ");

  if (arr.length === 1) {
    return {
      dept: undefined,
      course: undefined,
      year: undefined,
      sem: undefined
    };
  }
  if (arr.length > 4) {
    arr.splice(4);
  }
  if (arr.length === 4) {
    let { dept, course, year, sem } = handleFourChunks(arr);
    return {
      dept,
      course,
      year,
      sem
    };
    //console.log('dept,  course, year, sem', dept,  course, year, sem);
  }

  if (arr.length === 3) {
    let { dept, course, year, sem } = handleThreeChunks(arr);
    return {
      dept,
      course,
      year,
      sem
    };
    //console.log('dept,  course, year, sem', dept,  course, year, sem);
  }

  if (arr.length === 2) {
    let { dept, course, year, sem } = handleTwoChunks(arr);
    return {
      dept,
      course,
      year,
      sem
    };
    //console.log('dept,  course, year, sem', dept,  course, year, sem);
  }
}

// function isValidString() {
//     for (let key in parsedObj) {
//         if (!parsedObj[key]) {
//             return false;
//         }
//     }
//     return true;
// }

function separateSemYearCombo(comboString) {
  // we need to manually separate

  //check whetherthe combo starts with a num

  //Fall2019
  if (isNaN(comboString[0])) {
    let start = 0;
    while (start < comboString.length && isNaN(comboString[start])) {
      start++;
    }

    return [comboString.substring(0, start), comboString.substring(start)];
    // then it is
    // find the index of first num
  }
  // 2019Fall
  else if (isNaN(comboString[comboString.length - 1])) {
    let end = comboString.length - 1;
    while (end >= 0 && isNaN(comboString[end])) {
      end--;
    }

    return [comboString.substring(end + 1), comboString.substring(0, end + 1)];
  }

  return [undefined, undefined];
}

function separateDeptCourseCombo(comboString) {
  // we need to manually separate

  //check whetherthe combo starts with a num

  //Fall2019

  if (!isNaN(comboString[0])) {
    return [undefined, undefined];
  }
  let delimitedValueArr;
  if (comboString.includes(":")) {
    delimitedValueArr = comboString.split(":");
  }

  if (comboString.includes("-")) {
    delimitedValueArr = comboString.split("-");
  }
  if (delimitedValueArr && delimitedValueArr.length === 2) {
    return delimitedValueArr;
  }

  let start = 0;
  while (start < comboString.length && isNaN(comboString[start])) {
    start++;
  }

  return [comboString.substring(0, start), comboString.substring(start)];
  // then it is
  // find the index of first num

  // 2019Fall
}

function getSemesterName(sem) {
  for (let semester of semesters) {
    if (semester.includes(sem)) {
      let name = {
        name: semester[0]
      };
      return name;
    }
  }

  return {
    name: undefined
  };
}

function getFullYear(year) {
  if (!year) return year;
  return year.length === 4 ? year : `20${year}`;
}

function handleYearSemSwap(mayBeYear, mayBeSem) {
  if (isNaN(mayBeYear) && isNaN(mayBeSem)) {
    return {
      year: undefined,
      sem: undefined
    };
  }
  if (isNaN(mayBeYear)) {
    let temp = mayBeYear;
    mayBeYear = mayBeSem;
    mayBeSem = temp;
  }

  return {
    year: mayBeYear,
    sem: mayBeSem
  };
}

function handleFourChunks(arr) {
  let [dept, course, year, sem] = arr;

  let temp = year;
  year = handleYearSemSwap(year, sem).year;
  sem = handleYearSemSwap(temp, sem).sem;
  let validSemester = getSemesterName(sem);
  let fullYear = getFullYear(year);
  if (!departments.includes(dept)) {
    dept = undefined;
  }

  return {
    dept,
    course,
    year: fullYear,
    sem: validSemester.name
  };
  //console.log('dept course year sem' , dept, course, fullYear, validSemester);
}

function handleThreeChunks(arr) {
  let year;
  let sem;
  let dept;
  let course;
  let [first, second, third] = arr;
  if (!isNaN(first[first.length - 1])) {
    [dept, course] = separateDeptCourseCombo(first);
    year = handleYearSemSwap(second, third).year;
    sem = handleYearSemSwap(second, third).sem;
  } else {
    dept = first;
    course = second;
    sem = separateSemYearCombo(third)[0];
    year = separateSemYearCombo(third)[1];
  }

  if (!departments.includes(dept)) {
    dept = undefined;
  }
  let validSemester = getSemesterName(sem);
  let fullYear = getFullYear(year);

  return {
    dept,
    course,
    year: fullYear,
    sem: validSemester.name
  };
  //console.log('dept course year sem' , dept, course, fullYear, validSemester);
}

function handleTwoChunks(arr) {
  let [deptCourseCombo, semYearCombo] = arr;

  let [sem, year] = separateSemYearCombo(semYearCombo);
  let [dept, course] = separateDeptCourseCombo(deptCourseCombo);

  if (!departments.includes(dept)) {
    dept = undefined;
  }
  let validSemester = getSemesterName(sem);
  let fullYear = getFullYear(year);
  // console.log('sem year from combo', sem, year);
  // console.log('dept course from combo', dept, course);
  // console.log('dept course year sem' , dept, course, fullYear, validSemester);

  return {
    dept,
    course,
    year: fullYear,
    sem: validSemester.name
  };
}

let departments = ["CS", "EE", "Math", "Physics", "Biology", "Art", "Music"];

let semesters = [
  ["Fall", "F"],
  ["Winter", "W"],
  ["Spring", "S"],
  ["Summer", "Su"]
];

// let DeptSem = {
//     "CS" : [["Fall", 'F'], ["Winter", 'W'],["Spring", 'S'],  ["Summer", 'Su']],
//     "EE":  [["Fall", 'F'], ["Winter", 'W'],["Spring", 'S'],  ["Summer", 'Su']],
//     'Math' :[["Fall", 'F'], ["Winter", 'W'],["Spring", 'S'],  ["Summer", 'Su']],
//     'Physics': [["Fall", 'F'], ["Winter", 'W'],["Spring", 'S'],  ["Summer", 'Su']],
//     'Biology': [["Fall", 'F'], ["Winter", 'W'],["Spring", 'S'],  ["Summer", 'Su']],
//     'Art' : [["Fall", 'F'], ["Winter", 'W'],["Spring", 'S'],  ["Summer", 'Su']],
//     'Music' : [["Fall", 'F'], ["Winter", 'W'],["Spring", 'S'],  ["Summer", 'Su']]
// }

// isvalidString("Math 123 2015 Spring");
// isvalidString("Math 123 Spring 2015");

// isvalidString("Math 123 Su 2015");
// isvalidString("Math 123 2015 F");

// isvalidString("Math 123 Su 15");
// isvalidString("Math 123 20 F");

// 2 combos
//isvalidString("Math123 20F");
// isvalidString("Math123 S20");
// isvalidString("Math-123 S20");

//3 elements one combo
// isvalidString("Math123 W 20");
// isvalidString("Math 123 Summer20");

// isvalidString("hello world");
// isvalidString("Math 123 Fresh20");
// isvalidString("hello 123 F20");
//isvalidString("test test test test");

//isvalidString("Math222 test Winter");
//isvalidString("Math 222 test 2020");

//isvalidString("Math 222 W 2020 test")

export default parseString;
