import React from 'react'
import { Button } from 'zarm'
import stl from './style.module.less'

export default function Index() {
  return <div className={stl.home}>
    主页
    <span></span>
    <Button theme='primary'>按钮</Button>
  </div>
}