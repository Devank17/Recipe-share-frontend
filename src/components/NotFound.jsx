import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const NotFound = () => {
  return (
    <>
      <div className="container flex flex-1 justify-center items-center mx-auto w-full h-[40vh]">
        <Alert className="w-2/3 opacity-80" severity="error">
          <AlertTitle sx={{ fontWeight: "600", fontSize: "1.5rem" }}>
            404 - Error
          </AlertTitle>
          <p className="font-bold">
            The page you have requested for could not be found
          </p>
        </Alert>
      </div>
    </>
  );
};

export default NotFound;
