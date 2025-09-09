import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/dokumenty/dolezite" />
            <SidebarInset>
                <Header category="Dokumenty" page="Dôležité" />
                <DocumentList listName="Dôležité dokumenty" categorySlug="dolezite" />
            </SidebarInset>
        </SidebarProvider>
    )
}