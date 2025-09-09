import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/usmernenia/vszp" />
            <SidebarInset>
                <Header category="Usmernenia" page="VšZP" />
                <DocumentList listName="Usmernenia (VšZP)" categorySlug="usmernenia_vszp" />
            </SidebarInset>
        </SidebarProvider>
    )
}