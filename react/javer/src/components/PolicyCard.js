import React from "react";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const StyledCard = styled(Card)`
  &:hover {
    border: 1px solid black;
  }
`;

const PolicyCard = ({ data }) => {
  return (
    <a href={data.url} style={{ textDecoration: "none" }}>
      <StyledCard style={{ height: "15rem" }}>
        <CardContent>
          <Typography
            color="textSecondary"
            gutterBottom
            style={{ fontFamily: "Nanum Gothic" }}
          >
            {data.category}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            style={{ fontFamily: "Nanum Gothic" }}
          >
            {data.title}
          </Typography>

          {/* <Typography color="textSecondary">{data.location}</Typography> */}
          <Typography
            variant="body2"
            component="p"
            style={{ fontFamily: "Noto Serif KR" }}
          >
            <br />
            {data.content}
          </Typography>
        </CardContent>
      </StyledCard>
    </a>
  );
};

export default PolicyCard;
