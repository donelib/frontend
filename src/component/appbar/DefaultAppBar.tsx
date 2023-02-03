import { AppBar, Toolbar, Link } from "@mui/material";

export default function DefaultAppBar() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="/"
            sx={{ my: 1, mx: 1.5 }}
          >
            Done
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Search
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/tag"
            sx={{ my: 1, mx: 1.5 }}
          >
            Tags
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Settings
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
