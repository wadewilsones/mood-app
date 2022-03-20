
import { Link } from "react-router-dom";
import Today from './date';

let todayInfo = Today();
const date = todayInfo[0];
function Header(){
        return (
        <header>
        <h4>{date}</h4>
        <h3>Hello username</h3>
        <h5><Link to="/login">Log Out</Link></h5>
        </header>)
}

export default Header;