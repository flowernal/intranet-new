import { db } from "./client";
import { documents } from "./schema";

const intranet_page_name = "formulare";
const categoryId = 5;

// Fetch http://intranet.nsp:3000/${intranet_page_name}
const data = await fetch(`http://intranet.nsp:3000/${intranet_page_name}`);

if (!data.ok) {
    throw new Error(`Failed to fetch data from intranet: ${data.statusText}`);
}

const jsonData = await data.json();

for (const table of jsonData) {
    for (const row of table.data) {
        let date = "2025-09-19";
        const links: { name: string; url: string }[] = [];

        for (const cell of row) {
            if (typeof cell === "string") {
                const dateMatch = cell.match(/(\d{1,2}\.\d{1,2}\.\d{4})/);
                if (dateMatch) {
                    // Convert date format from "dd.mm.yyyy" to "yyyy-mm-dd"
                    const parts = dateMatch[0].split(".");
                    date = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                }
            }
            
            if (Array.isArray(cell)) {
                for (const item of cell) {
                    if (item.href && item.text) {
                        links.push({ name: item.text, url: item.href });
                    }
                }
            } else if (typeof cell === "object" && cell.href && cell.text) {
                links.push({ name: cell.text, url: cell.href });
            }
        }

        for (const link of links) {
            if (link.url.startsWith("../")) {
                link.url = `http://intranet.nsp/${link.url.slice(3)}`;
            } else if (link.url.startsWith("/")) {
                link.url = `http://intranet.nsp${link.url}`;
            }

            const documentData = {
                title: link.name,
                link: link.url,
                categoryId: categoryId,
                createdAt: new Date(date),
                updatedAt: new Date(date),
            };

            await db.insert(documents).values(documentData);
        }
    }
}

export {};
