import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const StyledCard = styled(Card)`
  &:hover {
    border: 5px solid #9e9e9e;
  }
`;

const useStyles = makeStyles({
  root: {
    // minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function OutlinedCard(data) {
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;
  return (
    <div>
      <StyledCard className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={{ fontFamily: "Nanum Gothic", marginBottom: "5%" }}
          >
            {data.data.title}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            style={{
              display: "inline-block",
              textOverflow: "ellipsis",
              lineHeight: "2rem",
              height: "4rem",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              fontFamily: "Noto Serif KR",
              fontSize: "1rem"
            }}
          >
            {data.data.description}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "3%"
          }}
        >
          <Button
            size="small"
            href={data.data.url}
            style={{
              border: "2px solid #9e9e9e",
              fontFamily: "Noto Serif KR"
            }}
          >
            알아보기
          </Button>
        </CardActions>
      </StyledCard>
    </div>
  );
}
