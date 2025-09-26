export const fetchDocuments = async () => {
    try {
        const res = await fetch('http://192.168.146.10:3001/documents');
        return res.json();
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
};

export const fetchDocumentsByCategory = async (categorySlug: string) => {
    try {
        const res = await fetch(`http://192.168.146.10:3001/documents?category=${categorySlug}`);
        return res.json();
    } catch (error) {
        console.error('Error fetching documents by category:', error);
        throw error;
    }
}