import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/dokumenty/riaditelske_prikazy" />
            <SidebarInset>
                <Header category="Dokumenty" page="Riaditeľské príkazy" />
                <DocumentList listName="Riaditeľské príkazy" categorySlug="riaditelske_prikazy" />
            </SidebarInset>
        </SidebarProvider>
    )
}