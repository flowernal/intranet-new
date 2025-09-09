import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/dokumenty/formulare" />
            <SidebarInset>
                <Header category="Dokumenty" page="Formuláre" />
                <DocumentList listName="Formuláre" categorySlug="formulare" />
            </SidebarInset>
        </SidebarProvider>
    )
}