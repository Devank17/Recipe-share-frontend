import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

const RecipeCard = ({ recipe }) => {
  if (!recipe || !recipe.image) {
    return <CircularProgress/>; // or return null;
  }

  return (
    <>
      <Card
        className="h-full border border-gray-600"
        sx={{
          my: "0.5rem",
          maxWidth: "100%",
          maxHeight: "auto",
          backgroundColor: "hsl(var(--background))",
        }}
      >
        <CardMedia
          sx={{ height: 200, objectFit: "cover", objectPosition: "center" }}
          image={recipe.image}
          title={recipe.title}
        />
        <CardContent className="bg-[hsl(var(--background))]">
          <div className="flex justify-between items-center">
            <Typography
              sx={{
                minHeight: "2rem",
                maxHeight: "4.5rem",
                fontFamily: "monsterrat",
                letterSpacing: "1px",
                fontSize: "1.2rem",
                color: "white",
              }}
              className="px-4 inline-block font-[poppins] "
              gutterBottom
              variant="h2"
              component="div"
            >
              {recipe.title}
            </Typography>{" "}
            <span className="text-nowrap text-[0.65rem] border text-white rounded-md px-2 border-slate-700 py-1">
              {recipe.category}
            </span>
          </div>
          <Typography
            sx={{
              // minHeight: "3rem",
              maxHeight: "5rem",
              fontFamily: "arial",
              letterSpacing: "0.5px",
              fontSize: "0.8rem",
            }}
            variant="body2"
            className="px-4 text-gray-400 line-clamp-2"
          >
            {recipe.description}
          </Typography>
        </CardContent>
        <CardActions className="font-xs bg-[hsl(var(--background))] text-gray-400 flex justify-between ">
          <span style={{ fontSize: "0.8rem" }} className="ml-6 pb-2 ">
            {recipe.time}
          </span>
          <span style={{ fontSize: "0.8rem" }} className="mr-6 pb-2">
            {recipe.difficulty}
          </span>
        </CardActions>
      </Card>
    </>
  );
};

export default RecipeCard;
