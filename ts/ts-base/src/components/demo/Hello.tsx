/*
 * @Author: qf
 * @Date: 2022-04-23 14:29:35
 * @LastEditTime: 2022-04-23 14:30:55
 * @LastEditors: qf
 * @Description:
 */
import React from "react";

interface Greeting {
  name: string;
}

const Hello = (props: Greeting) => <h1>Hello {props.name}</h1>;

export default Hello