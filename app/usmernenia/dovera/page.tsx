import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/usmernenia/dovera" />
            <SidebarInset>
                <Header category="Usmernenia" page="Dôvera" />
                <DocumentList listName="Usmernenia (Dôvera)" categorySlug="usmernenia_dovera" />
            </SidebarInset>
        </SidebarProvider>
    )
}