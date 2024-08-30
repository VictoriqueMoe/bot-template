import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
class HelloWorld {
	@Slash({
		name: "hello_world",
		description: "Hello World!",
	})
	hello(interaction: CommandInteraction) {
		interaction.reply({
			content: "Hello World!",
		});
	}
}
