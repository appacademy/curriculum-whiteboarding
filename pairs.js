const FIRST = 'FIRST';
const SECOND = 'SECOND';
const ODD = 'ODD';
const EVEN = 'EVEN';

const getPodWrappers = () => {
  const podWrappers = document.querySelectorAll('section.pod-tables');
  return Array.from(podWrappers);
}

const getPairNameWrappers = (parent = document) => {
  const nameWrappers = parent.querySelectorAll('figure.pair-selects');
  return Array.from(nameWrappers);
}

const getAllStudents = (parent = document) => {
  const studentNameWrappers = parent.querySelectorAll('h4.student-name');
  return Array.from(studentNameWrappers);
}

const getAllStudentNames = (n) => {
  const pairNameWrappers = getPairNameWrappers();
  let names = [];
  pairNameWrappers.forEach((wrapper) => {
    const nameStrings = getAllStudents(wrapper).map((el) => {
      return el.innerHTML.trim();
    });
    nameStrings.forEach((name) => {
      names.push(name);
    });
    if (nameStrings.length < 2) {
      names.push('empty');
    }
  });
  const filteredNames = names.filter((val, idx) => {
    if (n === ODD) {
      return idx % 2 !== 0;
    } else if (n === EVEN) {
      return idx % 2 === 0;
    }
  })
  const namesString = filteredNames.join('\n');

  return namesString;
}

const getStudents = (index) => {
  const allStudentNames = getAllStudentNames();
  let studentNames;
  switch (index) {
    case FIRST:
      studentNames = getAllStudentNames(EVEN);
      console.log(studentNames);
      return;
    case SECOND:
      studentNames = getAllStudentNames(ODD);
      console.log(studentNames);
      return;
    default:
      throw 'Invalid Index';
  };
}

// Use this script to get the first row of names
const getFirstStudents = () => {
  const students = getStudents(FIRST);
}

// Use this script to get the second row of names
const getSecondStudents = () => {
  const students = getStudents(SECOND);
}

// Use this script to get the pods
const getPodNames = () => {
  const podWrappers = getPodWrappers();
  let result = '';
  podWrappers.forEach((pod) => {
    const name = pod.querySelector('h2').innerHTML.trim();
    const numPairs = getPairNameWrappers(pod).length;
    for (let i = 0; i < numPairs; i += 1) {
      result += `${name}\n`;
    }
  });
  console.log(result);
}

// INSTRUCTIONS:
//
// Get all the first students with `getFirstStudents()`.
// Get all the second students with `getSecondStudents()`.
// Get their pod names with `getPodNames()`.
//
// Like as follows:
//
// getFirstStudents();
// getSecondStudents();
// getPodNames();
