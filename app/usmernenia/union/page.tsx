import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/usmernenia/union" />
            <SidebarInset>
                <Header category="Usmernenia" page="Union" />
                <DocumentList listName="Usmernenia (Union)" categorySlug="usmernenia_union" />
            </SidebarInset>
        </SidebarProvider>
    )
}