import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/zmluvy/union" />
            <SidebarInset>
                <Header category="Zmluvy" page="Union" />
                <DocumentList listName="Zmluvy (Union)" categorySlug="zmluvy_union" />
            </SidebarInset>
        </SidebarProvider>
    )
}