import React, { memo } from "react";
import './Node.css'

import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <div style={{ width: "75px", height: "75px", backgroundColor: "white" }} >
        A1: <strong>{data.color}</strong>
      </div>

      <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      />

      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
     