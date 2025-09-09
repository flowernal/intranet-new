import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/drg/dolezite_linky" />
            <SidebarInset>
                <Header category="DRG" page="Dôležité linky" />
                <DocumentList listName="Dôležité linky" categorySlug="drg_dolezite_linky" />
            </SidebarInset>
        </SidebarProvider>
    )
}