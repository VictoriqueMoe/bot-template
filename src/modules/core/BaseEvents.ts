import {Events} from "discord.js";
import {type ArgsOf, Client, Discord, MetadataStorage, On, Once,} from "discordx";
import {inject, injectable} from "tsyringe";
import {Logger} from "../../services/index.js";

@Discord()
@injectable()
export class BaseEvents {
    constructor(
		private readonly logger: Logger,
		@inject("config") private readonly config: any
    ){}


	@Once({
		event: Events.ClientReady,
	})
	readyHandler([client]: [Client]) {

		console.log(`>> Logged in as ${client.user?.username}`);
		client.clearApplicationCommands(this.config.guild_id);
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
