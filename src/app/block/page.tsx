"use client";
import blocks from "@/components/blocks/blocks";
import BlocksInitializer from "@/components/blocks/initializer";
// import * as Blockly from "blockly/core";
import React, { lazy, useEffect, useRef } from "react";
const BlocklyWorkspaceComponent = lazy(() =>
  import("react-blockly").then((m) => ({ default: m.BlocklyWorkspace }))
);

const toolbox = {
  kind: "flyoutToolbox",
  contents: blocks.map((block) => ({ type: block.type, kind: "block" })),
};
BlocksInitializer();
const Blocks: React.FC = () => {
  const workspaceRef = useRef(null);
  useEffect(() => {
    if (workspaceRef.current) {
    }
  }, []);

  // const handleJsonChange = (e: never) => {
  //   console.log(e);
  // };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <BlocklyWorkspaceComponent
        // onJsonChange={handleJsonChange}
        className={"my-blockly"}
        toolboxConfiguration={toolbox}
        workspaceConfiguration={{
          grid: {
            spacing: 22,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
        }}
        onInject={() => {
          console.log("Injected!");
        }}
      />
    </div>
  );
};

export default Blocks;
