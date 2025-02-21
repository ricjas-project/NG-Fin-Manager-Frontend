import { AppBar, Toolbar, Typography } from "@mui/material";

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">NG-Fin-Manager</Typography>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;