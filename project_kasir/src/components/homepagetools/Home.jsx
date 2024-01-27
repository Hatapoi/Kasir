import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const Navigate = useNavigate();
    return (
        <div className='Home'>
            <div className="Home-Bar">
                <div className="Home-Bar-list">Home</div>
            </div>
            <div className="Home-wraplogo">
                <img src={require('../assets/logo.png')} alt="..." className="Home-logo" />
            </div>
            <div className="Home-section">
                <div className="Home-menu">
                    <img src="" alt="..." className="Home-menu-img" />
                    <button onClick={() => Navigate("/mode-kasir")} className="Home-menu-btn">Mode Kasir</button>
                </div>
            </div>
        </div>
    )
}

export default Home;