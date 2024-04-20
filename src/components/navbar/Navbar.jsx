
import Auth from "./Auth";

const Navbar = () => {

    return (
        <div className="navbar-container">
            <div className="logo-container">
                <a href="/"><h1 className="logo">Kanaye</h1></a>
            </div>
            <div className="menu-container">
                <ul className="menu-list">
                    <li className="menu-list-item active">Home</li>
                    <li className="menu-list-item">Movies</li>
                    <li className="menu-list-item"><a href="/create" style={{color: "#4dbf00"}}>Send Movie</a></li>

                </ul>
            </div>
            <Auth />
        </div>
    );
};

export default Navbar;