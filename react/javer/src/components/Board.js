import React from "react";
import { Grid, Link } from "@material-ui/core";
import questionicon from "../images/questionicon.png";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const Board = ({ one }) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      style={{
        border: "1px solid #c8d0d0",
        borderRadius: "15px",
        marginBottom: "15px"
      }}
    >
      <Grid item xs={1}>
        <img
          src={questionicon}
          alt=""
          style={{
            width: "60%",
            height: "auto",
            marginTop: "35%",
            marginLeft: "30%"
          }}
        />
      </Grid>
      <Grid item xs={10}>
        <StyledLink
          style={{
            color: "black"
          }}
          href={"/question/" + one.bnum}
        >
          <div>
            <h2>{one.btitle}</h2>
            <p>{one.bcontent}</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <p style={{ fontSize: "10px", marginRight: "10px" }}>
                작성자: {one.uid}
              </p>
              <p style={{ fontSize: "10px", marginRight: "10px" }}>
                조회수: {one.bhit}
              </p>
              <p style={{ fontSize: "10px" }}>생성일: {one.bcreation_date}</p>
            </div>
          </div>
        </StyledLink>
      </Grid>
    </Grid>
  );
};

export default Board;
