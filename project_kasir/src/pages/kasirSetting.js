import "./kasirSetting.css";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

import {Link} from "react-router-dom";
import React,{ useState, useEffect } from "react";
import axios from "axios";

const KasirSetting = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        getMenu()
    });

    const getMenu = async() => {
        const response = await axios.get("http://localhost:4002/kasir");
        setMenu(response.data)
    }

    const deleteMenu = async(menuId) => {
        try {
            await axios.delete(`http://localhost:4002/kasir/${menuId}`);
            getMenu();
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="setting-container">
            <div className='setting-wrapper'>
                <div className="setting-header">
                    <p className="setting-title">Product Setting</p>
                </div>
                
                <div className="setting-wrapperlist">
                    {menu.map((data) => (
                        <div className="setting-productlist" key={data.id}>
                            <img src={data.url} alt="..." className="setting-productimg" />
                            <div className="setting-productname">{data.name}</div>
                            <div className="setting-buttons">
                                <Link to={`edit/${data.id}`}><button className="setting-editbtn"><CiEdit /></button></Link>
                                <button className="setting-deletebtn" onClick={() => deleteMenu(data.id)}><TiDeleteOutline /></button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default KasirSetting;