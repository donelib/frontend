import { Link } from "@mui/material";

export default function AppBarNav() {
  return (
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
        href="/tag"
        sx={{ my: 1, mx: 1.5 }}
      >
        Tags
      </Link>
      <Link
        variant="button"
        color="text.primary"
        href="/analyze"
        sx={{ my: 1, mx: 1.5 }}
      >
        Analyze
      </Link>
    </nav>
  );
}
