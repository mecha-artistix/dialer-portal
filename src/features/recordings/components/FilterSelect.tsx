import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addStatusFilterOption, removeStatusFilterOption } from "../recordingsSlice";
import { statusOptions } from "../constants";

const FilterSelect = ({ placeholder = "Select options" }) => {
  const dispatch = useAppDispatch();
  const { statusFilter } = useAppSelector((state) => state.recordings);

  const toggleOption = (option) => {
    if (statusFilter.includes(option)) {
      dispatch(removeStatusFilterOption(option));
    } else {
      dispatch(addStatusFilterOption(option));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            {statusOptions.map((option) => (
              <CommandItem key={option} onSelect={() => toggleOption(option)}>
                <Checkbox
                  checked={statusFilter.includes(option)}
                  onCheckedChange={() => toggleOption(option)}
                  className="mr-2"
                />
                <span>{option}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterSelect;
