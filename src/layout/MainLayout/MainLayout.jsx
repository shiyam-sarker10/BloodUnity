
import { Outlet } from 'react-router-dom';
import NavBar from '../../component/shared/Nav/Nav';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;