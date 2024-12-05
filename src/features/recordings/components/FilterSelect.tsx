import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addFilterOption, removeFilterOption } from "../recordingsSlice";

const options = [
  "A",
  "AA",
  "AB",
  "ADAIR",
  "ADC",
  "ADCT",
  "AFAX",
  "AFTHRS",
  "AL",
  "AM",
  "B",
  "CALLBK",
  "CBHOLD",
  "DAIR",
  "DC",
  "DEC",
  "DNC",
  "DNCC",
  "DNCL",
  "DROP",
  "ERI",
  "INCALL",
  "IQNANQ",
  "IVRXFR",
  "LRERR",
  "LSMERG",
  "MAXCAL",
  "MLINAT",
  "N",
  "NA",
  "NANQUE",
  "NEW",
  "NI",
  "NP",
  "PDROP",
  "PM",
  "PU",
  "QCFAIL",
  "QUEUE",
  "QVMAIL",
  "RQXFER",
  "SALE",
  "SVYCLM",
  "SVYEXT",
  "SVYHU",
  "SVYREC",
  "SVYVM",
  "TIMEOT",
  "XDROP",
  "XFER",
];

const FilterSelect = ({ placeholder = "Select options" }) => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state.recordings);

  const toggleOption = (option) => {
    if (filter.includes(option)) {
      dispatch(removeFilterOption(option));
    } else {
      dispatch(addFilterOption(option));
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
            {options.map((option) => (
              <CommandItem key={option} onSelect={() => toggleOption(option)}>
                <Checkbox
                  checked={filter.includes(option)}
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
