import { Logger } from "@services";
import { Events } from "discord.js";
import {
	type ArgsOf,
	type Client,
	Discord,
	MetadataStorage,
	On,
	Once,
} from "discordx";
import { container, injectable } from "tsyringe";

@Discord()
@injectable()
export class BaseEvents {
    constructor(
         private readonly logger: Logger
    ){}


	@Once({
		event: Events.ClientReady,
	})
	readyHandler([client]: [Client]) {
		const config = container.resolve("config") as any;

		console.log(`>> Logged in as ${client.user?.username}`);
		client.clearApplicationCommands(config.guild_id);
		client.initApplicationCommands();

		MetadataStorage.instance.applicationCommands.forEach((command: any) => {
			console.log(`Loaded command: ${command._name}`);
		});
	}

	@On({
		event: Events.InteractionCreate,
	})
	async interactionHandler(
		[interaction]: ArgsOf<"interactionCreate">,
		client: Client,
	) {
		await client.executeInteraction(interaction);
	}
}
