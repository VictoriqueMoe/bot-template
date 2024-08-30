import { singleton } from 'tsyringe';

@singleton()
export class Logger {
	constructor() {}

	private readonly levels = ['debug', 'info', 'warn', 'error'] as const;
	private embedLevelBuilder = {
		debug: (message: string): BaseMessageOptions => ({ embeds: [{ title: 'DEBUG', description: message, color: 0x00ff00, timestamp: new Date().toISOString() }] }),
		info: (message: string): BaseMessageOptions => ({ embeds: [{ title: 'INFO', description: message, color: 0x007fe7, timestamp: new Date().toISOString() }] }),
		warn: (message: string): BaseMessageOptions => ({ embeds: [{ title: 'WARN', description: message, color: 0xf37100, timestamp: new Date().toISOString() }] }),
		error: (message: string): BaseMessageOptions => ({ embeds: [{ title: 'ERROR', description: message, color: 0x7c1715, timestamp: new Date().toISOString() }] }),
	};

	private spinner = ora();

	log(message: string) {
		console.log(message);
	}
}
