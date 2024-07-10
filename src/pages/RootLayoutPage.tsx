import { Outlet } from "react-router-dom"
import NavMenu from "../components/NavMenu";
import SiteManagerFooter from "../components/general/SiteManagerFooter";

export default function RootLayoutPage() {
    return <div>
        <NavMenu />
            <Outlet />
        <SiteManagerFooter />
    </div>;
}
