import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../redux/reducer';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userActive);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(addUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    const handleLogout = () => {
        
        localStorage.removeItem('user');
        dispatch(addUser({})); 
        navigate('/login');
    };

    return (
        <nav className={styles.navbarContainer}>
            <Link to="/" className={styles.logo}>
                <img src="./logo-cb.png" alt="Logo" />
            </Link>
            <div className={styles.buttonsContainer}>
                {userData.name ? (
                    <>
                        <Link to="/appointments" className={styles.navButton}>
                            <p>Mis Turnos</p>
                        </Link>
                        <button className={styles.navButton} onClick={handleLogout}>
                            <p>Logout</p>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.navButton}>
                            <p>Login</p>
                        </Link>
                        <Link to="/register" className={styles.navButton}>
                            <p>Registrar</p>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
