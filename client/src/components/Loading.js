import React from "react";
import { Spin } from "antd";
import {useState} from 'react';


export const Loading = ({ ...props }) => {
  return (
  <div className="loading-container">
      <div className="middle-loading">
        <p>Loading...</p>
        <Spin size="large" />
      </div>
  </div>
  )
}
