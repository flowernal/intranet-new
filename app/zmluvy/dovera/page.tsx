import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/zmluvy/dovera" />
            <SidebarInset>
                <Header category="Zmluvy" page="Dôvera" />
                <DocumentList listName="Zmluvy (Dôvera)" categorySlug="zmluvy_dovera" />
            </SidebarInset>
        </SidebarProvider>
    )
}