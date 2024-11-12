export type StatusType = "success" | "error" | "warning" | "info" | "";

export type TServerResponse = {
  status: "success" | "error" | "warning" | "info" | "";
  message: string;
};
