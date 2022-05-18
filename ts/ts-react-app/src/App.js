/*
 * @Author: qf
 * @Date: 2022-04-23 14:58:10
 * @LastEditTime: 2022-04-25 17:41:17
 * @LastEditors: qf
 * @Description: 
 */
// import logo from './logo.svg';
// import './App.css';

// import Hello from "./components/demo/Hello.tsx";
// import React, { FC } from 'react'

// const App: FC = () => (
//   <div className="App">
//     <Hello name="TypeScript!" />
//   </div>
// )

// export default App;


import React from "react";
import ReactDom from "react-dom";

import Hello from "./components/demo/Hello";

ReactDom.render(
  <Hello name="TypeScript!" />,
  document.querySelectorAll('.app')[0]
);
