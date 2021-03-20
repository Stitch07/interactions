import type { Command } from '@sapphire/framework';
import type { APIInteraction } from 'discord-api-types/v8';
import type { SlashCommandInteraction } from '../structures/interactions/SlashCommandInteraction';

export const enum SlashCommandEvents {
	PreSlashCommandRun = 'preSlashCommandRun',
	SlashCommandDenied = 'slashCommandDenied',
	SlashCommandAccepted = 'slashCommandAccepted',
	SlashCommandRun = 'slashCommandRun',
	SlashCommandSuccess = 'slashCommandSuccess',
	SlashCommandError = 'slashCommandError',
	SlashCommandFinish = 'slashCommandFinish'
}

export interface SlashCommandPreRunPayload {
	interaction: SlashCommandInteraction;
	command: Command;
	rawData: APIInteraction;
}
