import React from "react";
import { Button } from "@mui/material";

const ResetButton = ({ resetBoard }) => {
  return <Button variant="outlined" onClick={resetBoard}>Гоу ще раз 😉</Button>;
};

export default ResetButton;
