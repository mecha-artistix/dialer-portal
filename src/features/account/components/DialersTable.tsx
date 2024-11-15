import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getDialerConfig } from "@/lib/services";
import { useEffect } from "react";
import { setDialers } from "../dialerSlice";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { DialerRow } from "./DialerRow";
import { dialerColumns } from "@/lib/constants";

export function DialersTable() {
  const selector = useAppSelector((state) => state.dialers);
  const dispatch = useAppDispatch();
  const dialers = selector.dialers;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDialerConfig();
      dispatch(setDialers(data));
    };
    fetchData();
  }, []);

  return (
    <Card className="p-5">
      <CardTitle>Account Dialers</CardTitle>
      <CardHeader>All the dialer for your account</CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all the dialers</TableCaption>
          <TableHeader>
            <TableRow>
              {dialerColumns.map((col) => (
                <TableHead key={col.key}>{col.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dialers.map((row, i) => (
              <DialerRow key={i} data={row} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>This is card footer</CardFooter>
    </Card>
  );
}

/*


  return (
    <Card className="p-5">
      <CardTitle>Account Dialers</CardTitle>
      <CardHeader>All the dialer for your account</CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all the dialers</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dialers.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col, i) =>
                  col.key === "actions" ? (
                    <TableCell>
                      <Button size="sm" onClick={() => navigate("/recordings", { state: { formData: row } })}>
                        Get Recordings
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell key={`${col.key}i`}>{row[col.key]}</TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>This is card footer</CardFooter>
    </Card>
  );



  */
