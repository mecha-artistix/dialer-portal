import { LinearProgress } from "@/components/ui/LinearProgress";
import RegisterForm from "../auth/components/RegisterForm";
import useUsers from "./useUsers";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function Account() {
  const { users, isLoading, isError, error } = useUsers();
  console.log(users, error);
  return (
    <div className="grid grid-cols-2 gap-4">
      <RegisterForm />
      <div>
        <Table>
          <TableCaption>A list of your all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <LinearProgress />}
            {users &&
              users.data.map((user, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                </TableRow>
              ))}
            {isError && <p>{JSON.stringify(error?.response?.data?.error)}</p>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
