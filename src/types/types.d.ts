import { AddDialerFormType } from "@/schemas";

export type TDialer = {
  created_at: string;
  id: number;
  name: string;
  pass: string;
  url: string;
  user: string;
  user_id: number;
  folder_name: string;
};

// export type InputKeys = keyof Omit<AddDialerFormType, "pass">;
export type InputKeys = keyof AddDialerFormType;

interface InputColumn {
  key: InputKeys;
  title: string;
  type: "input";
}

interface ActionColumn {
  key: "actions";
  title: string;
  type: "action";
}

export type DialerColumn = InputColumn | ActionColumn;
