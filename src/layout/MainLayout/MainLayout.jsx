
import { Outlet } from 'react-router-dom';
import NavBar from '../../component/shared/Nav/Nav';
import Footer from '../../component/shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;