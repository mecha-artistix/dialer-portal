import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import FilterParamsForm from "./FilterParamsForm";
import { ViciFilterParams, ViciFilterParamsType } from "@/schemas";
import { setFilterParams } from "../recordingsSliceV2";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useViciQueryMutation } from "../useViciQueryMutation";

function FilterSheet() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const mutation = useViciQueryMutation();
  const filterHandler = () => {
    setOpen(false);
  };
  const submitHandler = (data: ViciFilterParamsType) => {
    console.log("Form Submit Triggered", { data });
    const parsedData = ViciFilterParams.parse(data);
    try {
      // const parsedData = ViciRequiredParams.parse(data);
      console.log("Parsed Form Data:", parsedData);
      dispatch(setFilterParams(parsedData));
      mutation.mutate({ filterForm: parsedData });
    } catch (error) {
      console.error("Form Submission Error:", error);
      // Optional: Add error toast or user notification
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Filter</Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Apply Filters to get filtered data</DialogTitle>
          <DialogDescription>
            <FilterParamsForm submitHandler={submitHandler} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Apply Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// function FilterSheet() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline">Open</Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Edit profile</SheetTitle>
//           <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
//         </SheetHeader>

//         <SheetFooter>
//           <SheetClose asChild>
//             <Button type="submit">Save changes</Button>
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }

export default FilterSheet;
