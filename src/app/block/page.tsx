"use client";
import React, { lazy, useEffect, useRef } from "react";
import * as Blockly from "blockly/core";
import { BlocklyWorkspace, useBlocklyWorkspace } from "react-blockly";
import BlocksInitializer from "@/components/blocks/initializer";
import blocks from "@/components/blocks/blocks";
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
  }, [Blockly]);

  const handleJsonChange = (e: any) => {
    console.log(e);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <BlocklyWorkspaceComponent
        onJsonChange={handleJsonChange}
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
        onInject={(workspace) => {
          console.log("Injected!");
        }}
      />
    </div>
  );
};

export default Blocks;
