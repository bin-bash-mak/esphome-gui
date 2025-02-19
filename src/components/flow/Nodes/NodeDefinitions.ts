type NodeDefinition<T> = {
  type: string;
  label: string;
  data: T;
};

export const NodeDefinitions: Record<string, NodeDefinition<unknown>> = {
  ESPHomeNode: {
    type: "ESPHomeNode",
    label: "ESPHome Node",
    data: { name: "Name", ota: false, logger: false, api: false },
  },
  GPIONode: { type: "GPIONode", label: "GPIO Node", data: { gpio: "GPIO0" } },
  SwitchNode: {
    type: "SwitchNode",
    label: "Switch Node",
    data: { name: "Name" },
  },
} as const;
