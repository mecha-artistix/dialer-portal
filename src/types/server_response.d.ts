export type StatusType = "success" | "error" | "warning" | "info" | "";

export type TServerResponse = {
  status: StatusType;
  message: string;
};
