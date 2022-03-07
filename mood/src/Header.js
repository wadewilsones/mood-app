import Today from './js/date';

function Header(){
        return (
        <header>
        <h4>Today: {Today()}</h4>
        </header>)
}

export default Header;