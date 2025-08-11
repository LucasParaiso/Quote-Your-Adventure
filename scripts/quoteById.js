const API_URL = "https://quote.lparaiso.com";

export async function quoteById(id) {
    try {
        const res = await fetch(`${API_URL}/quote_id.php?id=${encodeURIComponent(id)}`);

        if (!res.ok) {
            await ChatMessage.create({ content: `Quote ${id} não encontrado.` });
            return;
        }

        const data = await res.json();
        console.log("quoteById | Dados da quote:", { message: data.message, table: data.table, author: data.author });

        let content = `${data.message} <br><br><small><i>Criado em: ${new Date(data.created_at).toLocaleDateString()}`;
        if (data.author && data.table) { content += ` por ${data.author} em ${data.table}`; }
        content += "</i></small>";

        await ChatMessage.create({
            user: game.user.id,
            speaker: { alias: `Quote #${data.id}` },
            content: content
        });

    } catch (err) {
        console.error(`quoteById | Erro ao buscar quote ${id}:`, err);
        await ChatMessage.create({
            speaker: { alias: "Quote your Adventure" },
            content: "Erro ao buscar quote no servidor"
        });
    }
}
