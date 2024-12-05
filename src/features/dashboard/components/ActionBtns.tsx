import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCheck, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setIsSelected } from "../dialerSlice";
import { TDialer } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFlask } from "@/lib/interceptors";

interface ActionBtnsProps {
  data: TDialer;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: React.MouseEventHandler<HTMLButtonElement>;
  isSubmitting: boolean;
}

const ActionBtns: React.FC<ActionBtnsProps> = ({ data, isEditing, setIsEditing, handleSave, isSubmitting }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const editHandler = () => {
    setIsEditing(true);
    dispatch(setIsSelected(data.id));
  };

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiFlask.delete(`/portal/configure-dialer/${id}`);
      console.log(response);
      return id;
    },
    onMutate: async () => {
      toast({
        title: "Deleting!",
        description: "Your request has been submitted.",
        variant: "default",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["dialers"] });
      toast({
        title: "Updated!",
        description: "Your request was successfully submitted.",
        variant: "success",
      });
    },
    onError() {
      toast({
        title: "Failed!",
        description: "Your  request failed.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(data.id);
  };

  return (
    <TableCell className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() => navigate("/recordings-single-agent", { state: { formData: data } })}
            >
              {/* <Voicemail /> */}
              Sing
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Get Agent Recordings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() => navigate("/recordings-all-agents", { state: { formData: data } })}
            >
              {/* <Voicemail /> */}
              All
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Get All Recordings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {isEditing ? (
              <Button variant="outline" onClick={handleSave} size="icon" disabled={isSubmitting}>
                <CheckCheck />
              </Button>
            ) : (
              <Button variant="outline" onClick={editHandler} size="icon">
                <Pencil />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>{isEditing ? <p>Save Changes</p> : <p>Edit Dialer</p>}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleDelete} disabled={deleteMutation.isPending}>
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Dialer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  );
};

export default ActionBtns;
