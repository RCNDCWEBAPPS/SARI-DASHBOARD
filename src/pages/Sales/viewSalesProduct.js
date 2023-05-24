import React from 'react'
import { useEffect, useState } from 'react'
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useTable from "../../components/ui/useTable";
import Norecords from '../../components/ui/Norecords';
import { Avatar, Input } from '@mui/material';
import axios from 'axios';
import { url } from '../../utiles/config'
import { saveAs } from 'file-saver';
function ViewSaleProduct({ products }) {
  const headCells = [
    { id: "name", label: "Name" },
    { id: "quantity", label: "Quantity" },
    { id: "price", label: "Price" },
    { id: "image", label: "Image" },
    { id: "date", label: "Date" },
    { id: "month", label: "Mont" },
    { id: "year", label: "Year" },
    { id: "comment", label: "Description" },

  ];
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [Q, setQ] = useState("");
  const [minTime, setMinTime] = useState("2000-05-16T08:42:29.000Z");
  const [maxTime, setMaxTime] = useState(new Date());
  const [toggler, setToggler] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(products.filter((product) => {
      let date = new Date(product.date)
      return new Date(minTime) <= date.getTime() && date.getTime() <= new Date(maxTime);
    }), headCells, filterFn);
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

  function createAndDownloadPDF() {
    const product = products.filter((product) => {
      let date = new Date(product.date)
      return new Date(minTime) <= date.getTime() && date.getTime() <= new Date(maxTime);
    })
    axios.post(`${url}/create-pdf`, {product, minTime, maxTime})
      .then(() => axios.get(`${url}/create-pdf`, { responseType: 'blob' }))
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
        saveAs(pdfBlob, 'report.pdf');
      })
  }
  return (
    <div>
      <div style={{ display: 'flex', gap: "20px" }}>
        <div style={{ display: 'flex', gap: "10px", alignItems: "center" }}>
          <label>From: </label>
          <Input type="date" onChange={(e) => {
            setMinTime(e.target.value)
          }} />
        </div>

        <div style={{ display: 'flex', gap: "10px", alignItems: "center" }}>
          <label>To: </label>
          <Input type="date" onChange={(e) => {
            setMaxTime(e.target.value)
          }} />
        </div>

        <button onClick={createAndDownloadPDF}>
          Export
        </button>
      </div>
      {/* { toggler && <PDFcomp from={minTime} to={maxTime} data={products} /> } */}
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().length > 0 ? (
            recordsAfterPagingAndSorting().map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                {item.product.ProductImages.map((item) => (
                  <TableCell>
                    <Avatar
                      alt="Remy Sharp"
                      src={item.imageURI}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  {new Date(item.date).toLocaleString("en-US", {
                    hour12: true,
                  })}
                </TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleString("en-us", {
                    month: "long",
                  })}
                </TableCell>
                <TableCell>{new Date(item.date).getFullYear()}</TableCell>
                <TableCell>{item.comment}</TableCell>
              </TableRow>
            ))
          ) : (

            <Norecords />

          )}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );

}
export default ViewSaleProduct