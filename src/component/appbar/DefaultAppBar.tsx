import { AppBar, Toolbar, Link } from "@mui/material";
import AppBarNav from "./AppBarNav";

export default function DefaultAppBar() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
        <AppBarNav />
      </Toolbar>
    </AppBar>
  );
}
