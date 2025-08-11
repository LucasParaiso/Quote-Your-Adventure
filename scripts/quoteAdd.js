import { quoteById } from "./quoteById.js";

const API_URL = "https://quote.lparaiso.com";

export async function quoteAdd(message) {
    if (!message) {
        await ChatMessage.create({
            speaker: { alias: "Quote your Adventure" },
            content: "Uso: quote add <mensagem>"
        });
        return;
    }

    const table = canvas.scene?.name ?? null;
    const author = game.user?.name ?? null;
    console.log("quoteAdd | Dados da quote:", { message, table, author });

    try {
        message = message.replace("\n", "<br>")
        console.log("quoteAdd | Dados da quote:", message);

        const res = await fetch(`${API_URL}/quote_add.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, table, author })
        });

        if (!res.ok) {
            await ChatMessage.create({ content: "Erro ao adicionar quote." });
            return;
        }

        const data = await res.json();
        await quoteById(data.id);

    } catch (err) {
        console.error("quoteAdd | Erro ao adicionar quote:", err);
        await ChatMessage.create({
            speaker: { alias: "Quote your Adventure" },
            content: "Erro ao buscar quote no servidor"
        });
    }
}
