import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormDialog } from "@/components/FormDialog"
import { Separator } from "@/components/ui/separator"

function Account() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main style={{ paddingTop: '2rem', paddingLeft: '2rem' }}>
        <Card className="w-[1380px] h-[110px]">
          <CardHeader>
            <CardTitle>Account Page</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <p>WELCOME, &#123;USER&#125;</p>
          </CardContent>
        </Card>
        <Card className="w-max mt-4">
          <CardHeader>
            <CardTitle>REQUESTS</CardTitle>
            <CardDescription>This is where you can apply for requests.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <FormDialog/>
          </CardContent>
        </Card>
        <Separator className="my-4" />
        <Card className="w-max mt-4 w-[1000px]">
          <CardHeader>
            <CardTitle>PENDING REQUESTS</CardTitle>
            <CardDescription>This is where you can view current requests.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <p>No new requests pending.</p>
          </CardContent>
        </Card>
      </main>
    </SidebarProvider>
  )
}

export default Account
