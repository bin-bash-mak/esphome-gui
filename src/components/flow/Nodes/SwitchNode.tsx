import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { TextField, Paper, Typography } from "@mui/material";
import { LabeledHandle } from "../common/Labeledhandle";

function SwitchNode({ data }: { data: { label: string } }) {
  return (
    <Paper
      elevation={3}
      style={{ padding: "10px", width: "200px", background: "#fffacd" }}
    >
      <Typography variant="h6" gutterBottom>
        Switch
      </Typography>
      <Handle
        type="target"
        position={Position.Left}
        id="esphome"
        style={{ background: "#FFA500" }}
      />
      <TextField
        label="Name"
        variant="outlined"
        defaultValue={data.label}
        fullWidth
        size="small"
      />
      <LabeledHandle
        type="source"
        title="PIN"
        position={Position.Right}
        id="gpio"
        style={{ background: "#4CAF50" }}
      />
    </Paper>
  );
}

export default memo(SwitchNode);

