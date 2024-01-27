import './menu.css';
import './kasirTools.css';

import { TiDeleteOutline } from "react-icons/ti";
import React,{ useState, useEffect } from "react";
import axios from "axios";

const Menu = () => {

    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(() => {
        getMenu()
    }, []);

    const getMenu = async() => {
        const response = await axios.get("http://localhost:4002/kasir");
        setMenu(response.data)
        if(response.data.length > 9) {
            setActive(true)
        }
    }

    const orderMenu = (menu) => {
        const existOrder = order.find((item) => item.id === menu.id);

        if(existOrder) {
            const updateOrder = order.map((item) => 
                item.id === menu.id ? { ...item, count: item.count + 1, price: item.price + menu.price} : item,
            )
            setOrder(updateOrder);
        } else {
            const newOrder = {
                ...menu,
                count: 1,
            };
            setOrder([...order, newOrder])
        }

        const getTotal = total + 1;
        setTotal(getTotal);
    }
    
    const deleteList = (ordered) => {
        const deletedOrder = order[ordered]
        const deleteOrder = [...order];
        deleteOrder.splice(ordered, 1);
        setOrder(deleteOrder);

        const newTotal = total - deletedOrder.count;
        setTotal(newTotal);
    }

    const getTotalPrice = () => {
        return order.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div className='container-menu'>
            <div className="kasirt">
                <div className="kasirt-pesanan">
                    <div className="kasirt-pesanan-deskripsi">
                        <p className="kasirt-pesanan-deskripsi-nama">Nama Pesanan</p>
                        <p className="kasirt-pesanan-deskripsi-jumlah">Jumlah</p>
                        <p className="kasirt-pesanan-deskripsi-harga">Harga</p>
                    </div>
                    <div className="kasirt-pesanan-wapper-list">
                        {order.map((data, e) => (
                            <div className="kasirt-pesanan-list" key={e}>
                                <p className="kasirt-pesanan-list-nama">{data.name}</p>
                                <p className="kasirt-pesanan-list-jumlah">{data.count}</p>
                                <p className="kasirt-pesanan-list-harga">Rp. {data.price}</p>
                                <button onClick={() => deleteList(e)} className="kasirt-pesanan-list-deletebtn"><TiDeleteOutline /></button>
                            </div>
                        ))}       
                    </div>
                    <div className="kasirt-pesanan-total">
                        <p className="kasirt-pesanan-total-nama">Total Pesanan</p>
                        <p className="kasirt-pesanan-total-jumlah">{total}</p>
                        <p className="kasirt-pesanan-total-harga">Rp. {getTotalPrice()}</p>
                    </div>
                    <button className="kasirt-pesanan-btnbayar">Save</button>
                </div>
            </div>

            <div className="Menu">
                <div className="Menu-title">Menu Special</div>
                <div className={`Menu-wrapper ${active ? 'flow' : ''}`}>

                    {menu.map((data) => (
                        <div onClick={() => orderMenu(data)} className="Menu-card" key={data.id}>
                            <img src={data.url} alt="..." className="Menu-card-img" />
                            <p className="Menu-card-title">{data.name}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Menu;