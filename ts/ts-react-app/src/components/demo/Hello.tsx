/*
 * @Author: qf
 * @Date: 2022-04-23 14:29:35
 * @LastEditTime: 2022-04-25 17:19:24
 * @LastEditors: qf
 * @Description:
 */
import React from "react";

import { Button } from 'antd'

interface Greeting {
  name: string;
}

const Hello = (props: Greeting) => <Button>Hello {props.name}</Button>;

export default Hello