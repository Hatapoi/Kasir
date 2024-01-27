import Menu from "../components/fpagetools/menu";
import {Link} from "react-router-dom";

import './fpage.css';

export function KasirNavbar() {
    return (
        <div className="KasirNavbar">
            <img src={require('../components/assets/logo.png')} alt="..." className="KasirNavbar-header-logo" />
            <div className="kasirnavbar-decoration">
                <Link to='setting' className="kasirnavbar-setting"><p className="kasirnavbar-settinglink">Menu Setting</p></Link>
            </div>
            <Link to='add' className="kasirnavbar-addlink"><button className="kasirnavbar-addbutton" to='add'>Add Menu</button></Link>
        </div>
    )
}

const Fpage = () => {
    return (
        <div className="Fpage">
            <KasirNavbar />
            <div className="Fpage-wrapper">
                <Menu /> 
            </div>
        </div>
    )
}

export default Fpage;