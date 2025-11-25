import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export default function DashboardLayout({ children }) {
    return (
        <>
            <Sidebar />
            <div className="main-content">
                {children}
            </div>
            <MobileNav />
        </>
    );
}
