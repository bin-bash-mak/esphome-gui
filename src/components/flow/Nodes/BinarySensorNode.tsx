import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { TextField, Paper, Tooltip, Typography } from "@mui/material";
import { LabeledHandle } from "../common/Labeledhandle";

function BinarySensorNode({ data }: { data: { label: string } }) {
  return (
    <Paper
      elevation={3}
      style={{ padding: "10px", width: "200px", background: "#e6e6fa" }}
    >
      <Typography variant="h6" gutterBottom>
        Binary Sensor
      </Typography>
      <Handle
        type="target"
        position={Position.Left}
        id="esphome"
        style={{ background: "#9C27B0" }}
      />
      <TextField
        label="Name"
        variant="outlined"
        defaultValue={data.label}
        fullWidth
        size="small"
      />

      <LabeledHandle
        title="PIN"
        type="source"
        position={Position.Right}
        id="gpio"
        style={{ background: "#4CAF50" }}
      />
    </Paper>
  );
}

export default memo(BinarySensorNode);

