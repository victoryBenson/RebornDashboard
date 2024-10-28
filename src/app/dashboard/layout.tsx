import { Sidebar } from "@/components/Sidebar"

const DashboardLayout = ({children}: {children: React.ReactNode}) =>{
return(
    <div className="grid grid-cols-12 min-h-screen">
        <Sidebar/>
        <main className="col-span-9">{children}</main>
    </div>
)
}

export default DashboardLayout;
