import SideBar from "./components/SideBar/SideBar"
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from "./redux/store"
import { isLoggedIn } from "./redux/features/authSlice"


type layoutPropType = {
    allowedRoles: string
}

function Layout({ allowedRoles }: layoutPropType) {
    const location = useLocation()
    const dispatch = useAppDispatch()


    return (
        allowedRoles === useAppSelector(state => state.auth.role) ?
            // eslint-disable-next-line react-hooks/rules-of-hooks
            <SideBar><Outlet /> </SideBar>
            :
            dispatch(isLoggedIn()) ? <Navigate to='/accessDenied' state={{ from: location }} replace /> :
                <Navigate to='/signin' />
    )
}

export default Layout