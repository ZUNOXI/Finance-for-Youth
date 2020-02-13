import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
});

export default function CardPart(data) {
  console.log(data);
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      style={{
        // boxShadow: "none",
        borderRadius: "30px"
        // border: "1px solid #f5f5f5"
      }}
    >
      <CardActionArea href={data.data.title}>
        <CardMedia
          className={classes.media}
          image={data.data.img}
          title={data.data.urltitle}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            style={{
              display: "inline-block",
              width: "100%",
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "2rem",
              height: "4rem",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              fontFamily: "Noto Serif KR"
            }}
          >
            {data.data.urltitle}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
