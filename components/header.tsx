import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header({
    category,
    page,
}: {
    category: string;
    page: string;
}) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-40 bg-background">
            <SidebarTrigger className="-ml-1" />
            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbPage className="opacity-70">
                            {category}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {page}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    );
}