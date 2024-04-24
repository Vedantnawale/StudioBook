import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/HomePage'
import Login from './Pages/Login'
import { AboutUs } from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/User/Signup'
import RequireAuth from './Components/Auth/RequireAuth'
import Denied from './Pages/Denied'
import EditProfile from './Pages/User/EditProfile'
import Profile from './Pages/User/Profile'
import PhoneSignin from './Components/PhoneSignin'
import CreateStudio from './Pages/Studio/CreateStudio'
import StudioDescription from './Pages/Studio/StudioDescription'
import StudioList from './Pages/Studio/StudioList'
import ClientDescription from './Pages/Studio/ClientDescription'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/denied" element={<Denied />}></Route>


        <Route path="/phone" element={<PhoneSignin />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route path='/aboutus' element={<AboutUs />}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        {/* <Route path="/studio/description" element={<StudioDescription />}></Route> */}
        <Route path="/studio/description" element={<ClientDescription />}></Route>
        <Route path="/studios" element={<StudioList />}></Route>
        </Route>


        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/studio/create" element={<CreateStudio />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path='/user/profile' element={<Profile />}></Route>
          <Route path='/user/editprofile' element={<EditProfile />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
