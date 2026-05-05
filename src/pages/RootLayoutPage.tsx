import { Outlet } from "react-router-dom"
import NavMenu from "../components/NavMenu";
import SiteManagerFooter from "../components/general/SiteManagerFooter";
import { useApiStatus } from "../context/ApiStatusContext";

export default function RootLayoutPage() {
    const apiReady = useApiStatus();

    return <div>
        {!apiReady && (
            <div style={{
                backgroundColor: "#fff3cd",
                color: "#856404",
                textAlign: "center",
                padding: "0.5rem",
                fontWeight: "bold",
                borderBottom: "1px solid #ffc107"
            }}>
                Väntar på kallstartande API...
            </div>
        )}
        <NavMenu />
            <Outlet />
        <SiteManagerFooter />
    </div>;
}
