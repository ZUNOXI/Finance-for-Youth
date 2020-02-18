import React, { useEffect } from "react";
// import { Grid } from "@material-ui/core";
// import Ctest from "../components/Ctest";
// import CardPart from "../components/CardPart";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import stock from "../images/stock3.jpg";
import "../pages/Stock.css";
import PropTypes from "prop-types";
import LastPageIcon from "@material-ui/icons/LastPage";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650
//   }
// });

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

// function addComma(number) {
//   var number_parts = number.split(".");
//   var regexp = /\B(?=(\d{3})+(?!\d))/g;
//   if (number_parts.length > 1) {
//     return number_parts[0].replace(regexp, ",") + "." + number_parts[1];
//   } else {
//     return number.replace(regexp, ",");
//   }
// }

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

/* api로 데이터 가져와서 정리하기 */
const Stock = () => {
  const [stockdata, setStockdata] = React.useState([]);
  useEffect(() => {
    const url = `http://15.165.18.192:8080/api/stock`;
    axios
      .get(url)
      .then(res => {
        console.log(res.data.resdata);
        setStockdata(res.data.resdata);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <StockHeader />
      <CustomPaginationActionsTable rows={stockdata} />
    </div>
  );
};

/*header 달기 */
const StockHeader = () => (
  <header
    style={{
      borderRadius: "5px",
      marginTop: "30px"
      // background: "white"
    }}
  >
    <img
      src={stock}
      alt=""
      style={{
        height: "auto",
        width: "100%",
        opacity: "1",
        // filter: "blur(1px)",
        borderRadius: "5px"
      }}
    />
  </header>
);

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  }
});

function CustomPaginationActionsTable({ rows }) {
  // console.log(rows)
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const table = row => {
    if (row.befnum < 0) {
      return (
        <>
          <TableCell align="right" style={{ color: "blue" }}>
            ▼ {row.befnum}
          </TableCell>
        </>
      );
    } else {
      return (
        <>
          <TableCell align="right" style={{ color: "red" }}>
            ▲ {row.befnum}
          </TableCell>
        </>
      );
    }
  };
  return (
    <div>
      <div
        class="section-headline text-center"
        style={{
          textAlign: "center"
        }}
      >
        <h2>TODAY's STOCK</h2>
      </div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>순위</TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="right">현재가</TableCell>
              <TableCell align="right">전일대비</TableCell>
              <TableCell align="right">전일가</TableCell>
              <TableCell align="right">고가</TableCell>
              <TableCell align="right">시가</TableCell>
              <TableCell align="right">저가</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, idx) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="data">
                  {page * rowsPerPage + idx + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.now}</TableCell>
                {table(row)}
                <TableCell align="right">{row.close}</TableCell>
                <TableCell align="right">{row.high}</TableCell>
                <TableCell align="right">{row.open}</TableCell>
                <TableCell align="right">{row.low}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

/* 주식정보 table */

// export default Stock;
export default Stock;
