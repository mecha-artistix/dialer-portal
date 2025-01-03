import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DialerRow } from "./DialerRow";
import { dialerColumns } from "@/lib/constants";
import { LinearProgress } from "@/components/ui/LinearProgress";

export function DialersTable({ data, isLoading }) {
  return (
    <Card className="p-5">
      <CardTitle>Account Dialers</CardTitle>
      <CardHeader>All the dialer for your account</CardHeader>
      <CardContent>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Table>
            <TableCaption>A list of all the dialers</TableCaption>
            <TableHeader>
              <TableRow>
                {dialerColumns.map((col) => (
                  <TableHead key={col.key}>{col.title}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>{data?.map((row) => <DialerRow key={row.id} data={row} />)}</TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>This is card footer</CardFooter>
    </Card>
  );
}
