import Today from './js/date';
let todayInfo = Today();
const date = todayInfo[0];
function Header(){
        return (
        <header>
        <h4>{date}</h4>
        <h3>Hello username</h3>
        </header>)
}

export default Header;