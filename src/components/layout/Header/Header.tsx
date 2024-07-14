import { IconButton } from "@mui/material";
import { Container } from "react-bootstrap";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";
interface HeaderProps {
  title: string;
  details: boolean
  dataLink:string
}
function Header({ title, details,dataLink }: HeaderProps) {
  return (
    <div className="bg-white py-3">
      <Container fluid>
        <div className="title-search  d-flex gap-5 justify-content-between align-items-center">
          <div className="head d-flex justify-content-center align-items-center">
            {details ?
              <Link to={dataLink}>
                <IconButton >
                  <ChevronLeftIcon className=" border border-2 border-primary rounded-circle text-primary" sx={{ fontSize: "30px" }} />
                </IconButton>
              </Link>
            :""
              }
            <h1 className="fs-4 mt-2">{title}</h1>
          </div>
          
        </div>
      </Container>
    </div>
  );
}

export default Header;
