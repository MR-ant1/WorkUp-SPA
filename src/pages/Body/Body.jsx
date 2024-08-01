
import { Route, Routes } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Welcome } from '../Welcome/Welcome';


export const Body = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/welcome' element={<Welcome />} />


        </Routes>
    )
}