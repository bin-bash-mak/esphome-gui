import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

const gpioOptions = ["GPIO0", "GPIO1", "GPIO2", "GPIO3", "GPIO4", "GPIO5"];

function GPIONode({}: { data: { label: string } }) {
  return (
    <Paper
      elevation={3}
      style={{ padding: "10px", width: "200px", background: "#f0f8ff" }}
    >
      <Tooltip title="Connect from Switch or Binary Sensor" placement="left">
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#4CAF50" }}
        />
      </Tooltip>
      <FormControl fullWidth size="small">
        <InputLabel>GPIO</InputLabel>
        <Select
          label="GPIO"
          defaultValue={gpioOptions[0]}
          style={{ zIndex: 10000 }}
        >
          {gpioOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}

export default memo(GPIONode);

