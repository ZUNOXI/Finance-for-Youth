import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { coinName } from "./CoinName.js";
import crypto from "../images/crypto.jpg";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

/* 3자리 단위로 콤마 */
function addComma(number) {
  var number_parts = number.split(".");
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  if (number_parts.length > 1) {
    return number_parts[0].replace(regexp, ",") + "." + number_parts[1];
  } else {
    return number.replace(regexp, ",");
  }
}

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
const Coindata = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .post("https://api.bithumb.com/public/ticker/ALL")
      .then(res => {
        console.log(res.data.data);
        const all_rows = [];
        for (let [key, value] of Object.entries(res.data.data)) {
          if (key !== "date") {
            all_rows.push({
              name: key,
              opening_price: `${addComma(value.opening_price)}원`,
              acc_trade_value: `${addComma(value.acc_trade_value)}원`,
              fluctate_24H: `${addComma(value.fluctate_24H)}원`,
              fluctate_rate_24H: `${value.fluctate_rate_24H}%`
            });
          }
        }
        setRows(all_rows);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div>
      <CoinHeader />
      <CustomPaginationActionsTable rows={rows} />
    </div>
  );
};

/*header 달기 */
const CoinHeader = () => (
  <header
    style={{
      borderRadius: "5px",
      marginTop: "30px"
      // background: "white"
    }}
  >
    <img
      src={crypto}
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  /* 등락 색깔 바꾸기 */
  const table = row => {
    if (row.fluctate_24H[0] === "-") {
      return (
        <>
          <TableCell align="right" style={{ color: "blue" }}>
            ▼ {row.fluctate_24H}
          </TableCell>
          <TableCell align="right" style={{ color: "blue" }}>
            ▼ {row.fluctate_rate_24H}
          </TableCell>
        </>
      );
    } else {
      return (
        <>
          <TableCell align="right" style={{ color: "red" }}>
            ▲ {row.fluctate_24H}
          </TableCell>
          <TableCell align="right" style={{ color: "red" }}>
            ▲ {row.fluctate_rate_24H}
          </TableCell>
        </>
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>순위</TableCell>
            <TableCell align="right">이름</TableCell>
            <TableCell align="right">시가</TableCell>
            <TableCell align="right">변동가</TableCell>
            <TableCell align="right">변동률</TableCell>
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
              <TableCell align="right">
                {row.name} <p>{coinName["bithumb"][row.name]}</p>
              </TableCell>
              <TableCell align="right">{row.opening_price}</TableCell>
              {table(row)}
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
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
  );
}

export default Coindata;
