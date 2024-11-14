import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getDialerConfig, patchDialer } from "@/lib/services";
import { useEffect, useState } from "react";
import { setDialers, setIsSelected } from "../dialerSlice";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const columns = [
  { key: "name", title: "Dialer Name" },
  { key: "url", title: "Dialer Url" },
  { key: "user", title: "User" },
  // { key: "pass", title: "Password" },
  { key: "actions", title: "Actions" },
];

export function DialersTable() {
  const navigate = useNavigate();
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
              {columns.map((col) => (
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

const DialerRow = ({ data }) => {
  const selector = useAppSelector((state) => state.dialers);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [inputVals, setInputVals] = useState({ name: data.name, url: data.url, user: data.user });

  const editHandler = (key) => {
    console.log({ key }, selector.isSelected);
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
      {columns.map((col, i) =>
        col.key === "actions" ? (
          <TableCell key={i} className="flex">
            <Button size="sm" onClick={() => navigate("/recordings", { state: { formData: data } })}>
              Get Recordings
            </Button>
            <Button onClick={editHandler}>Edit</Button>
            {isEditing && <Button onClick={handleSave}>Save</Button>}
          </TableCell>
        ) : (
          <TableCell key={`${col.key}i`}>
            <input
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
