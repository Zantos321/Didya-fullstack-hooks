import React from "react";

function AddTask(fill) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="8"
         height="8"
         viewBox="0 0 8 8"
         className="addTaskIcon"
      >
         <path fill={fill} d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" />
      </svg>
   );
}

function YesIcon({ fill }) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="8"
         height="8"
         viewBox="0 0 8 8"
         className="yesIcon"
      >
         <path
            fill={fill}
            d="M6.41 0l-.69.72-2.78 2.78-.81-.78-.72-.72-1.41 1.41.72.72 1.5 1.5.69.72.72-.72 3.5-3.5.72-.72-1.44-1.41z"
            transform="translate(0 1)"
         />
      </svg>
   );
}

function NoIcon({ fill }) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="8"
         height="8"
         viewBox="0 0 8 8"
         className="noIcon"
      >
         <path
            fill={fill}
            d="M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z"
         />
      </svg>
   );
}

function EditIcon({ fill }) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="8"
         height="8"
         viewBox="0 0 8 8"
         className="editTaskIcon"
      >
         <path fill={fill} d="M6 0l-1 1 2 2 1-1-2-2zm-2 2l-4 4v2h2l4-4-2-2z" />
      </svg>
   );
}

export { AddTask, YesIcon, NoIcon, EditIcon };
