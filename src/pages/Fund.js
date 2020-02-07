import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Paper } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import blackrock from "../static/media/blackrock.jpg";
import barings from "../static/media/barings.jpg";
import eastspring from "../static/media/eastspring.jpg";

const Fund = () => {
  const images = [
    { background: blackrock },
    { background: barings },
    { background: eastspring }
  ];

  return (
    <div>
      {images.map(data => (
        <img src={data.background} alt="" />
      ))}
    </div>
  );
};

export default Fund;

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

// const images = [
//   {
//     url: '../static/media/barings.jpg',
//     title: 'Breakfast',
//     width: '40%',
//   },
//   {
//     url:'../static/media/blackrock.jpg',
//     title: 'Burgers',
//     width: '30%',
//   },
//   {
//     url: '../static/media/eastspring.jpg',
//     title: 'Camera',
//     width: '30%',
//   },
// ];

// /* eslint-disable no-unused-expressions */
// export default function Fund() {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;
//   // const images = [barings,blackrock,eastspring];
//   // const images = ['../fundlogo/blackrock.jpg', '../fundlogo/barings.jpg', '../fundlogo/eastspring.jpg']
//   return (
//     <div className={classes.root}>
//     {images.map(image => (
//         <span
//           style={{
//             width: "100px", height: "auto", backgroundImage: `url(${image.url})`,
//           }}
//         >
//           ㅎㅇㅎㅇㅎㅇㅎㅇ
//         </span>
//     ))}
//   </div>
//   );
// }
