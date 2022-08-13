import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  
} from "@material-ui/icons";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="container">
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/adminchat" className="link">
            <li className="sidebarListItem">
              <ChatBubbleIcon className="sidebarIcon" />
              Analytics
            </li>
            </Link>
            {/* <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Employees Information
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products Information
              </li>
            </Link>
            {/* <Link to="/productrequest" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Product Requests
              </li>
            </Link> */}
          </ul>
        </div>        
      </div>
    </div>
    </div>
  );
}
