import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar activePage="/odkazy/vlada_a_ministerstva" />
            <SidebarInset>
                <Header category="Odkazy" page="Vláda a ministerstvá" />
                <DocumentList listName="Vláda a ministerstvá" categorySlug="odkazy_vlada_a_ministerstva" />
            </SidebarInset>
        </SidebarProvider>
    )
}