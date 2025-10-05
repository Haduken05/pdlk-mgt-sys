import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function Account() {
  
   return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div>
          <Button>REQUEST</Button>
        </div>
      </main>
    </SidebarProvider>
    </>
    
  )
}

export default Account
