import React from "react";
import { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Popup from "../../components/ui/Popup";
import Norecords from "../../components/ui/Norecords";
import useTable from "../../components/ui/useTable";
import { Avatar } from "@mui/material";
function ViewSaleProduct({ products }) {
  const headCells = [
    { id: "name", label: "Name" },
    { id: "frameMaterieal", label: "Frame Materieal" },
    { id: "categoryName", label: "Categorie Name" },
    { id: "quantity", label: "Quantity" },
    { id: "image", label: "Image" },
    { id: "date", label: "Date" },
    { id: "month", label: "Mont" },
    { id: "year", label: "Year" },
  ];
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [Q, setQ] = useState("");
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(products, headCells, filterFn);
  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = ["name", "frameMaterieal", "categoryName"];

        if (Q === "") return items;
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              return x[column].toString().toLowerCase().includes(Q);
            });
          });
        }
      },
    });
  }, [Q]);
  console.log(products);
  return (
    <div>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().length > 0 ? (
            recordsAfterPagingAndSorting().map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.frameMaterieal}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                {item.ProductImages.map((item) => (
                  <TableCell>
                    <Avatar
                      alt="Remy Sharp"
                      src={item.imageURI}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    hour12: true,
                  })}
                </TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleString("en-us", {
                    month: "long",
                  })}
                </TableCell>
                <TableCell>{new Date(item.createdAt).getFullYear()}</TableCell>
              </TableRow>
            ))
          ) : (
            <div><Norecords/> </div>
          )}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );
}

export default ViewSaleProduct;
