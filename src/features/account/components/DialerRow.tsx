import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setIsSelected } from "../dialerSlice";
import { patchDialer } from "@/lib/services";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { dialerColumns } from "@/lib/constants";
import { TDialer } from "@/types/types";
import { AddDialerFormType } from "@/schemas";

interface DialerProps {
  data: TDialer;
}

export const DialerRow: React.FC<DialerProps> = ({ data }) => {
  const selector = useAppSelector((state) => state.dialers);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [inputVals, setInputVals] = useState<Omit<AddDialerFormType, "pass">>({
    name: data.name,
    url: data.url,
    user: data.user,
  });

  const editHandler = () => {
    setIsEditing(true);
    dispatch(setIsSelected(data.id));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setInputVals((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const response = await patchDialer(data.id, inputVals);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableRow>
      {dialerColumns.map((col, i) =>
        col.key === "actions" ? (
          <TableCell key={i} className="flex">
            <Button size="sm" onClick={() => navigate("/recordings", { state: { formData: data } })}>
              Get Recordings
            </Button>
            <Button onClick={editHandler}>Edit</Button>
            {isEditing && <Button onClick={handleSave}>Save</Button>}
          </TableCell>
        ) : (
          <TableCell key={i}>
            <input
              type="text"
              onChange={handleChange}
              value={inputVals[col.key]}
              name={col.key}
              disabled={Boolean(data.id !== selector.isSelected)}
              className={`w-full px-3 py-1 rounded transition-colors ${
                data.id !== selector.isSelected
                  ? "bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-500 border-gray-200"
              }`}
            />
          </TableCell>
        )
      )}
    </TableRow>
  );
};
