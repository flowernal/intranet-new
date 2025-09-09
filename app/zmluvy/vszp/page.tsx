import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/zmluvy/vszp" />
            <SidebarInset>
                <Header category="Zmluvy" page="VšZP" />
                <DocumentList listName="Zmluvy (VšZP)" categorySlug="zmluvy_vszp" />
            </SidebarInset>
        </SidebarProvider>
    )
}