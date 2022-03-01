import React from "react";

function ToolTip({ currentState }) {
  if (!currentState) return null;
  return (
    <>
      <div
        className="tooltip"
        style={{
          left: parseFloat(currentState.x + 10),
          top: parseFloat(currentState.y + 10),
          position: "absolute",
          zIndex: 8,
          backgroundColor: "#fff",
          padding: "4px",
          transition: "all 0.7 ease-in-out",
        }}
      >
        <p>{`${currentState.properties.NAME_1}, ${currentState.properties.NAME_0}`}</p>
      </div>
    </>
  );
}

export default ToolTip;
