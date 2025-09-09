import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/dokumenty/osetrovatelstvo" />
            <SidebarInset>
                <Header category="Dokumenty" page="Ošetrovateľstvo" />
                <DocumentList listName="Ošetrovateľstvo" categorySlug="osetrovatelstvo" />
            </SidebarInset>
        </SidebarProvider>
    )
}