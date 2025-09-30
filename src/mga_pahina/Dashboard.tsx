import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function Dashboard() {
  
   return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div>
          
        </div>
      </main>
    </SidebarProvider>
    </>
    
  )
}

export default Dashboard
