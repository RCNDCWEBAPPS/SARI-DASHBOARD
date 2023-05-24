import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { useEffect, useState } from 'react'
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Popup from "../../components/ui/Popup";
import useTable from "../../components/ui/useTable";
import Norecords from '../../components/ui/Norecords';
import { Avatar, Input } from '@mui/material';
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    color: "#131925",
    marginBottom: 8
  },
  statement: {
    fontSize: 20,
    color: "#131925",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#999999",
    margin: "24px 0 24px 0"
  },
  paragraph: {
    fontSize: 12,
    color: "#212935",
    lineHeight: 1.67,
  },
  columnParent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  columnStart: {
    flex: 1,
  },
  columnEnd: {
    flex: 1,
    alignItems: "flex-end"
  },
});

const PDF = ({ data, from, to }) => {
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
 
 
  const filteredData = data.filter((product) => {
    let date = new Date(product.date)
    return new Date(from) <= date.getTime() && date.getTime() <= new Date(to);
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(filteredData, headCells, filterFn);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().length > 0 ? (
                recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.product.price}</TableCell>
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
        </View>
      </Page>
    </Document>
  );
};

export default PDF;

{/* <View style={styles.columnParent}>
              <View style={styles.columnStart}>
                <Text style={styles.heading}>{data.name}</Text>
                <Text style={styles.paragraph}>{data.description}</Text>
                {/* <Text style={styles.paragraph}>{data.companyEmail}</Text> */}
{/* </View>
              <View style={styles.columnEnd}>
                <Text style={styles.heading}>Receipt</Text>
                <Text style={styles.paragraph}>Receipt number: {data.name}</Text>
                <Text style={styles.paragraph}>Date paid: {data.date}</Text>
                <Text style={styles.paragraph}>Price: {data.price}</Text>
              </View>
          //   </View> */}
{/* //   <View style={styles.divider}></View>
          //   <View>
          //     <Text style={styles.statement}>{`${data.amount} paid on ${data.datePaid}`}</Text>
          //     <Text style={styles.paragraph}>Thank you for your business!</Text>
          //   </View>
          // </View> */} 