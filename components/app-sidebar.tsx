import * as React from "react";
import { FileText, Minus, Plus } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
    navMain: [
        {
            title: "Dokumenty",
            items: [
                {
                    title: "Dôležité",
                    url: "/dokumenty/dolezite",
                },
                {
                    title: "Monitoring",
                    url: "/dokumenty/monitoring",
                },
                {
                    title: "Riaditeľské príkazy",
                    url: "/dokumenty/riaditelske_prikazy",
                },
                {
                    title: "Kybernetická bezpečnosť",
                    url: "/dokumenty/kyberneticka_bezpecnost",
                },
                {
                    title: "Formuláre",
                    url: "/dokumenty/formulare",
                },
                {
                    title: "Ošetrovateľstvo",
                    url: "/dokumenty/osetrovatelstvo",
                },
                {
                    title: "Liekový formulár",
                    url: "http://intranet.nsp/dokumenty/lekaren/liekovy%20formular_2014/(Liekov%C3%BD%20formul%C3%A1r%202015%20_1_).pdf",
                },
                {
                    title: "Telefónny zoznam",
                    url: "http://intranet.nsp/Telef%C3%B3nny%20zoznam3333.pdf",
                },
                {
                    title: "Žiadosť o prístup. práva",
                    url: "http://intranet.nsp/stranky/ZIADOST%20O%20PRIDELENIE%20PRISTUPOVYCH%20PRAV.docx",
                },
            ],
        },
        {
            title: "Zdravotné poisťovne",
            items: [
                {
                    title: "Zmluvy (VšZP)",
                    url: "/zmluvy/vszp",
                },
                {
                    title: "Zmluvy (Dôvera)",
                    url: "/zmluvy/dovera",
                },
                {
                    title: "Zmluvy (Union)",
                    url: "/zmluvy/union",
                },
                {
                    title: "Usmernenia (VšZP)",
                    url: "/usmernenia/vszp",
                },
                {
                    title: "Usmernenia (Dôvera)",
                    url: "/usmernenia/dovera",
                },
                {
                    title: "Usmernenia (Union)",
                    url: "/usmernenia/union",
                },
            ],
        },
        {
            title: "DRG",
            items: [
                {
                    title: "Legislatíva",
                    url: "/drg/legislativa",
                },
                {
                    title: "Dôležité linky",
                    url: "/drg/dolezite_linky",
                }
            ],
        },
        {
            title: "Odkazy",
            items: [
                {
                    title: "Jedálny lístok",
                    url: "http://192.168.239.106:81/stravovanie/Jidelnicek.aspx"
                },
                {
                    title: "Zdravotníctvo",
                    url: "/odkazy/zdravotnictvo",
                },
                {
                    title: "Vláda a ministerstvá",
                    url: "/odkazy/vlada_a_ministerstva",
                },
            ]
        }
    ],
};

export function AppSidebar({ activePage }: { activePage: string }) {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <FileText className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">Intranet NsP Myjava</span>
                                    <span className="">1.0.0-alpha</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <Collapsible
                                key={item.title}
                                defaultOpen={item.items?.some(subItem => subItem.url === activePage) || false}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            {item.title}{" "}
                                            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {item.items?.length ? (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((item) => (
                                                    <SidebarMenuSubItem key={item.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={item.url === activePage}
                                                        >
                                                            <Link href={item.url}>{item.title}</Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    ) : null}
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
