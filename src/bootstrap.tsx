import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

type renderTarget = HTMLElement;
const root = ReactDOM.createRoot(
  document.getElementById("root1") as HTMLElement
);

root.render(<App />);

// const mount = (e1: renderTarget) => {
//   const root = ReactDOM.createRoot(e1);
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// };

// mount
