import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/odkazy/zdravotnictvo" />
            <SidebarInset>
                <Header category="Odkazy" page="Zdravotníctvo" />
                <DocumentList listName="Zdravotníctvo" categorySlug="odkazy_zdravotnictvo" />
            </SidebarInset>
        </SidebarProvider>
    )
}