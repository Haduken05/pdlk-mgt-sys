import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Skeleton } from "@/components/ui/skeleton"

function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main style={{ paddingTop: '2rem', paddingLeft: '2rem' }}>
        <div className="w-max space-y-4">
          {/* Skeleton Card */}
          <div className="p-4 rounded-xl shadow-md bg-gray-100 w-max">
            <Skeleton className="h-6 w-[150px] mb-4 bg-gray-300" /> {/* Title */}
            <div className="flex gap-4">
              <Skeleton className="h-10 w-32 rounded-md bg-gray-300" /> {/* Button 1 */}
              <Skeleton className="h-10 w-32 rounded-md bg-gray-300" /> {/* Button 2 */}
            </div>
          </div>

          {/* Additional skeletons below the card */}
          <Skeleton className="h-[225px] w-[550px] rounded-xl bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-300" />
            <Skeleton className="h-4 w-[200px] bg-gray-300" />
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Dashboard
