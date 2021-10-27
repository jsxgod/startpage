import {
  
  BsHeartFill,
  BsStarFill,
  BsAlarmFill,
  BsFillExclamationCircleFill,
  BsBriefcaseFill,
  BsBookFill
} from "react-icons/bs";

import {
  IoSchool,
} from "react-icons/io5";

const availableGroups = [
  {
    name: "important",
    icon: <BsFillExclamationCircleFill />,
    color: "#ff9800",
    selected: false,
  },
  { name: "heart", 
    icon: <BsHeartFill />, 
    color: "#F8BBD0",
    selected: false,
  },
  {
    name: "star",
    icon: <BsStarFill />,
    color: "#ffea00",
    selected: false,
  },
  
  {
    name: "alarm",
    icon: <BsAlarmFill />,
    color: "#EF5350",
    selected: false,
  },
  
  {
    name: "work",
    icon: <BsBriefcaseFill />,
    color: "#6D4C41",
    selected: false,
  },
  
  {
    name: "school",
    icon: <IoSchool />,
    color: "#CFD8DC",
    selected: false,
  },
  {
    name: "books",
    icon: <BsBookFill />,
    color: "#E0E0E0",
    selected: false,
  }
];

export default availableGroups;