import { AppBar, Toolbar, Link, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function BackButtonAppBar() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="back button"
          onClick={() => {
            navigate(-1);
          }}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
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
