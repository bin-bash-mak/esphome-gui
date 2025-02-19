"use client";
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  type Connection,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  type NodeTypes,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Button,
  Drawer,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
  ListItemButton,
} from "@mui/material";
import Editor from "@monaco-editor/react";

import TextNode from "@/components/flow/Nodes/TextNode";
import GPIONode from "@/components/flow/Nodes/GPIONode";
import ESPHomeNode from "@/components/flow/Nodes/ESPHomeNode";
import SwitchNode from "@/components/flow/Nodes/SwitchNode";
import BinarySensorNode from "@/components/flow/Nodes/BinarySensorNode";
import { stringify } from "yaml";
const configToYaml = (config: {
  name: string;
  logging?: boolean;
  ota?: boolean;
  api?: boolean;
  switches?: Array<{ name: string; inverted: boolean; pin: string }>;
  sensors?: Array<{ name: string; pin: string }>;
}) => {
  const obj: any = {
    esphome: { name: config.name, platform: "ESP32", board: "esp32dev" },
    wifi: {
      ssid: "!secret wifi_ssid",
      password: "!secret wifi_password",
    },
  };
  if (config.logging) {
    obj["logger"] = null;
  }
  if (config.api) {
    obj["api"] = null;
  }
  if (config.ota) {
    obj["ota"] = null;
  }
  const yaml = stringify(obj, { keepUndefined: true, nullStr: "" });
  console.log(config);
  console.log(yaml);

  return yaml;
};

const nodeTypes: NodeTypes = {
  textNode: TextNode,
  gpioNode: GPIONode,
  espHomeNode: ESPHomeNode,
  switchNode: SwitchNode,
  binarySensorNode: BinarySensorNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "espHomeNode",
    data: { name: "MY ESPHome", ota: true, logger: true, api: true },
    position: { x: 400, y: 100 },
  },
];

const initialEdges: Edge[] = [];

const nodeOptions = [
  { type: "textNode", label: "Text Node" },
  { type: "gpioNode", label: "GPIO Node" },
  { type: "espHomeNode", label: "ESPHome Node" },
  { type: "switchNode", label: "Switch Node" },
  { type: "binarySensorNode", label: "Binary Sensor Node" },
] as const;
const Block = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addNodeDialogOpen, setAddNodeDialogOpen] = useState(false);
  const [yaml, setYaml] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    nodeId: string;
  } | null>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const isValidConnection = (connection: Connection) => {
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);

    if (!sourceNode || !targetNode) return false;

    if (sourceNode.type === "textNode") return true;
    if (
      sourceNode.type === "gpioNode" &&
      ["switchNode", "binarySensorNode"].includes(targetNode.type ?? "")
    )
      return true;
    if (
      sourceNode.type === "espHomeNode" &&
      connection.sourceHandle === "switches" &&
      targetNode.type === "switchNode"
    )
      return true;
    if (
      sourceNode.type === "espHomeNode" &&
      connection.sourceHandle === "binary_sensors" &&
      targetNode.type === "binarySensorNode"
    )
      return true;
    if (
      ["switchNode", "binarySensorNode"].includes(sourceNode.type ?? "") &&
      targetNode.type === "gpioNode"
    )
      return true;

    return false;
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      type,
      data: { name: `` },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nds) => nds.concat(newNode));
    setAddNodeDialogOpen(false);
  };

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
              nodeId: node.id,
            }
          : null
      );
    },
    [contextMenu]
  );

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  const handleDeleteNode = () => {
    if (contextMenu) {
      setNodes((nds) => nds.filter((node) => node.id !== contextMenu.nodeId));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== contextMenu.nodeId &&
            edge.target !== contextMenu.nodeId
        )
      );
      handleContextMenuClose();
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          ESP32 Configuration Flow
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Button variant="contained" onClick={() => setAddNodeDialogOpen(true)}>
          Add Node
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const espHomeNode = nodes.find(
              (node) => node.type === "espHomeNode"
            );
            if (!espHomeNode) return;
            setYaml(
              configToYaml({
                name: espHomeNode.data.name as string,
                api: Boolean(espHomeNode.data.api),
                logging: Boolean(espHomeNode.data.logger),
                ota: Boolean(espHomeNode.data.ota),
              })
            );
            setDrawerOpen(true);
          }}
        >
          Show Yaml
        </Button>
      </div>
      {/* <div style={{ flex: 1, border: "1px solid #ddd" }}> */}
      <div style={{ height: "70vh", width: "80vw" }}>
        <ReactFlow
          width={100}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          // isValidConnection={isValidConnection}
          connectionLineType={ConnectionLineType.SmoothStep}
          onNodeContextMenu={onNodeContextMenu}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      {/* </div> */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 500 }}>
          <Editor
            height="100vh"
            defaultLanguage="yaml"
            value={yaml}
            options={{ readOnly: true }}
          />
        </Box>
      </Drawer>
      <Dialog
        open={addNodeDialogOpen}
        onClose={() => setAddNodeDialogOpen(false)}
      >
        <DialogTitle>Select Node Type</DialogTitle>
        <DialogContent>
          <List>
            {nodeOptions
              .filter((o) => {
                // IK this is shit
                if (nodes.find((node) => node.type === "espHomeNode")) {
                  return o.type !== "espHomeNode";
                }
                return true;
              })

              .map((option) => (
                <ListItemButton
                  key={option.type}
                  onClick={() => addNode(option.type)}
                >
                  <ListItemText primary={option.label} />
                </ListItemButton>
              ))}
          </List>
        </DialogContent>
      </Dialog>
      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={handleDeleteNode}
          disabled={
            nodes.find((node) => node.id === contextMenu?.nodeId)?.type ===
            "espHomeNode"
          }
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Block;
