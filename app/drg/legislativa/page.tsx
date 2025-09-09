import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/drg/legislativa" />
            <SidebarInset>
                <Header category="DRG" page="Legislatíva" />
                <DocumentList listName="Legislatíva" categorySlug="drg_legislativa" />
            </SidebarInset>
        </SidebarProvider>
    )
}