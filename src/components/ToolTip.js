import React from "react";
import MouseTooltip from "react-sticky-mouse-tooltip";

function ToolTip({ currentState }) {
  if (!currentState) return null;

  return (
    <>
      <MouseTooltip
        style={{ backgroundColor: "#fff", padding: " 0px 4px" }}
        visible={true}
        offsetX={10}
        offsetY={10}
      >
        <p>{`${currentState.properties.NAME_1}, ${currentState.properties.NAME_0}`}</p>
      </MouseTooltip>
    </>
  );
}

export default ToolTip;
