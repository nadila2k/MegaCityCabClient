import { Typography } from "@mui/material";

const PageTitle = ({ variant = "h4", title = "Ttitle" }) => {
  return <Typography variant={variant}>{title}</Typography>;
};

export default PageTitle;
