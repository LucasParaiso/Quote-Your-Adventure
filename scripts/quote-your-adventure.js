import { quoteAdd } from "./quoteAdd.js";
import { quoteById } from "./quoteById.js";
import { quoteRandom } from "./quoteRandom.js";

// const API_URL = "https://quote.lparaiso.com";

Hooks.once("init", () => {
    console.log("quote-your-adventure | Inicializado");
});

Hooks.on("chatMessage", async (chatLog, messageText, chatData) => {
    try {
        if (!messageText) return true;

        const args = messageText.trim().split(" ");
        const command = args.shift()?.toLowerCase();

        if (command !== "quote") return true;

        setTimeout(async () => {
            if (args[0]?.toLowerCase() === "add") {
                await quoteAdd(args.slice(1).join(" "));
                return;
            }

            if (args.length === 1 && !isNaN(args[0])) {
                await quoteById(args[0]);
                return;
            }

            if (args.length === 0) {
                await quoteRandom();
                return;
            }

            await ChatMessage.create({ content: "Comando inválido" });
        }, 10);

        return true;

    } catch (err) {
        console.error("quote-your-adventure | Erro:", err);
        await ChatMessage.create({ content: "Erro ao processar comando" });
        return true;
    }
});
