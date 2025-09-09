import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/dokumenty/kyberneticka_bezpecnost" />
            <SidebarInset>
                <Header category="Dokumenty" page="Kybernetická bezpečnosť" />
                <DocumentList listName="Kybernetická bezpečnosť" categorySlug="kyberneticka_bezpecnost" />
            </SidebarInset>
        </SidebarProvider>
    )
}