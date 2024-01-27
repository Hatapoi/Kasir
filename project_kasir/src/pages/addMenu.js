import "./addMenu.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("")
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const saveMenu = async(e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price)
        formData.append("file", file);
        try {
            await axios.post("http://localhost:4002/kasir", formData, {
                headers: {
                    "content-type": "multipart/from-data"
                }
            });
            navigate("/mode-kasir");
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form className="addmenu-container" onSubmit={saveMenu}>
            <div className="addmenu-wrapper">
                <div className="addmenu-inputs">
                    <p className="addmenu-title">Name</p>
                    <input
                        type="text" 
                        placeholder="Name" 
                        className="addmenu-inptname" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="addmenu-inputs">
                    <p className="addmenu-title">Harga</p>
                    <input
                        type="number" 
                        placeholder="Harga" 
                        className="addmenu-inptname" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="addmenu-inputs">
                    <p className="addmenu-title">Image</p>
                    <input type="file" className="addmenu-inptimg" onChange={loadImage}/>
                </div>

                {preview ? (
                    <figure className="addmenu-figure">
                        <img src={preview} alt="..." className="addmenu-figureimg" />
                    </figure>
                ): (
                    ""
                )}

                <button className="addmenu-savebtn">Save</button>
            </div>
        </form>
    )
}

export default AddMenu;