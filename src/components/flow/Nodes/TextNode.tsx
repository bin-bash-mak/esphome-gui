import React, { memo } from "react";
import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  type Node,
} from "@xyflow/react";
import { TextField, Paper, Tooltip } from "@mui/material";

const TextNode: React.FC<NodeProps<Node<{ text: string }>>> = ({
  id,
  data,
}) => {
  const { updateNodeData } = useReactFlow();

  return (
    <Paper
      elevation={3}
      style={{ padding: "10px", width: "200px", background: "#f8f8f8" }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <TextField
        label="Text"
        variant="outlined"
        value={data.text}
        onChange={(e) => updateNodeData(id, { text: e.target.value })}
        fullWidth
        size="small"
      />
    </Paper>
  );
};

export default memo(TextNode);

