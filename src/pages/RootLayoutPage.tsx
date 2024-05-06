import { Outlet } from "react-router-dom"
import NavMenu from "../components/NavMenu";

export default function RootLayoutPage() {
    return <div>
        <NavMenu />
        <Outlet />
    </div>;
}
