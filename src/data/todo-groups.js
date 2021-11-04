import {
  
  BsHeartFill,
  BsStarFill,
  BsAlarmFill,
  BsFillExclamationCircleFill,
  BsBriefcaseFill,
  BsBookFill,
  BsCodeSlash,
  BsCheckCircleFill,
  BsFillXCircleFill,
  BsFillPaletteFill,
  BsMusicNoteBeamed,
} from "react-icons/bs";

import {
  IoSchool,
  IoHome,
} from "react-icons/io5";
import {
  RiCarFill,
} from "react-icons/ri";

const bookmarks = [
  {
    name: "important",
    icon: <BsFillExclamationCircleFill />,
    color: "#ff9800",
    selected: false,
  },
  { name: "heart", 
    icon: <BsHeartFill />, 
    color: "#f48fb1",
    selected: false,
  },
  {
    name: "star",
    icon: <BsStarFill />,
    color: "#ffee58",
    selected: false,
  },
  
  {
    name: "alarm",
    icon: <BsAlarmFill />,
    color: "#e57373",
    selected: false,
  },
  
  {
    name: "work",
    icon: <BsBriefcaseFill />,
    color: "#455a64",
    selected: false,
  },
  
  {
    name: "school",
    icon: <IoSchool />,
    color: "#b3e5fc",
    selected: false,
  },
  {
    name: "books",
    icon: <BsBookFill />,
    color: "#D7CCC8",
    selected: false,
  },
  {
    name: "programming",
    icon: <BsCodeSlash />,
    color: "#03A062",
    selected: false,
  },
  {
    name: "art",
    icon: <BsFillPaletteFill />,
    color: "#DAF7A6 ",
    selected: false,
  },
  {
    name: "music",
    icon: <BsMusicNoteBeamed />,
    color: "#304FFE",
    selected: false,
  },
  {
    name: "car",
    icon: <RiCarFill />,
    color: "#757575",
    selected: false,
  },
  {
    name: "home",
    icon: <IoHome />,
    color: "#795548",
    selected: false,
  },
];

const history = [
  {
    name: "completed",
    icon: <BsCheckCircleFill />,
    color: "#00c853",
    selected: false,

  },
  {
    name: "removed",
    icon: <BsFillXCircleFill />,
    color: "#cf291d",
    selected: false,

  }
];

const availableGroups = {
  bookmarks,
  history
}

export default availableGroups;