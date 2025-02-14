import { useToast } from "@/hooks/use-toast";
import { apiFlask } from "@/lib/interceptors";
import { useMutation } from "@tanstack/react-query";

interface MutationFnType {
  email: string;
  dialer: string;
  status: string[];
  recordings: string[];
}
export default function useTranscriptions() {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, dialer, status, recordings }: MutationFnType) => {
      const data = await apiFlask.post(import.meta.env.VITE_FLASK_API + "/mail-transcriptions", {
        email,
        dialer,
        status,
        recordings,
      });
      console.log(data);
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Transcription Request Received",
        description: data.data.status + " You will receive an email shortly",
        variant: "default",
        duration: 3000,
      });
    },
  });
  return { mutate, isPending };
}
