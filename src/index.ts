import 'reflect-metadata';

import {dirname, importx} from '@discordx/importer';
import {IntentsBitField} from 'discord.js';
import {Client, DIService, tsyringeDependencyRegistryEngine} from 'discordx';
import {container} from 'tsyringe';
import config from '../config.json' with {type: 'json'};

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

container.register('config', {useValue: config});

class Main {
	private static _client: Client;

	static get Client(): Client {
		return this._client;
	}

	static async start() {

		this._client = new Client({
			intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.MessageContent],
			botGuilds: [config.guild_id],
		});

		container.registerInstance(Client, this._client);

		await importx(`${dirname(import.meta.url)}/{modules,services}/**/*.{ts,js}`);

		await this._client.login(config.bot_token);
	}
}

Main.start();
