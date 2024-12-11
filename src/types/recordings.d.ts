// 'start_time|user|recording_id|lead_id|length_in_sec|location|status'
export type TRecording = {
  start_time: string;
  user: string;
  recording_id: string;
  lead_id: string;
  length_in_sec: string;
  location: string;
  status: string;
};

export interface TViciResponse<Data> {
  error: unknown;
  data: Data[];
  total_records: number;
  total_pages: number;
  showing: number;
  current_page: number;
}

export type TGetRecordingsFunc = (
  data: z.infer<typeof ViciAllRecordsSchema> | null,
  pagination?: { page: number; per_page: number },
  filter?: string[],
) => Promise<TViciResponse<TRecording>>;
