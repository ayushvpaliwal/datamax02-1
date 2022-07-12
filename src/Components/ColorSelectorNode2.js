import React, { memo } from "react";

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

      <div
        style={{ width: "75px", height: "75px", backgroundColor: data.color }}
      >
          A1: <strong>{data.color}</strong>
        {console.log("Hello world!! current hex color code is "+data.color)}
      </div>

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
