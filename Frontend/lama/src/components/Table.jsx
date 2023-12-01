import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect } from "react";

export function Table({ rows }) {
  const head = ["Name", "Uploaded Date & Time", "Status", "Actions"];

  function handleDelete(id) {
    axios
      .delete(`https://cloudy-jade-shift.cyclic.app/files/${id}`)
      .then((res) => alert(res.data.msg))
      .catch(err=>alert(err.err));
  }

 
  return (
    <Card className=" w-11/12 m-auto rounded-lg my-6 text-center">
      <table className="w-full min-w-max table-auto text-left rounded-lg">
        <thead>
          <tr>
            {head.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 p-4 rounded-lg"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ _id, name, uploadedDateTime, description }, index) => {
            const isLast = index === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {uploadedDateTime}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Completed
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <div className="flex items-center cursor-pointer">
                      <p className=" ring-1 ring-gray-400  p-3">Edit</p>
                      <p
                        className=" text-red-500 ring-1 ring-gray-400  p-3"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </p>
                    </div>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
