import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import React, { memo } from "react";
import { LabeledHandle } from "../common/Labeledhandle";

const ESPHomeNode: React.FC<
  NodeProps<Node<{ name: string; ota: boolean; logger: boolean; api: boolean }>>
> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  return (
    <Paper
      elevation={3}
      style={{ padding: "10px", width: "250px", background: "#fff0f5" }}
    >
      <Typography variant="h6" gutterBottom>
        ESPHome
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={data.name ?? ""}
        onChange={(e) => updateNodeData(id, { name: e.target.value })}
        fullWidth
        size="small"
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              value={data.ota ?? false}
              onChange={(e) => updateNodeData(id, { ota: e.target.checked })}
              size="small"
            />
          }
          label="OTA"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={data.logger ?? false}
              onChange={(e) => updateNodeData(id, { logger: e.target.checked })}
              size="small"
            />
          }
          label="Logger"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={data.api ?? false}
              onChange={(e) => updateNodeData(id, { api: e.target.checked })}
              size="small"
            />
          }
          label="API"
        />
      </FormGroup>

      <LabeledHandle
        type="source"
        position={Position.Right}
        id="switches"
        title="Switches"
        style={{ background: "#FFA500" }}
      />
      <LabeledHandle
        type="source"
        position={Position.Right}
        id="binary_sensors"
        title="Binary Sensors"
        style={{ background: "#9C27B0" }}
      />
    </Paper>
  );
};

export default memo(ESPHomeNode);

