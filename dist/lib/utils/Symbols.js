"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandPreconditionRunFunction = exports.SlashCommandRunFunction = exports.SlashCommandPreParseFunction = exports.SlashCommandGuildOnlyFunction = exports.SlashCommandBuilderFunction = void 0;
/**
 * Represents the function that is called when building a new slash command (or updates an existing one)
 *
 * @example
 * ```typescript
 * [SlashCommandBuilderFunction]() {
 *    return new SlashCommandBuilder().setName(this.name).setDescription('Examples are hard, ok?');
 * }
 * ```
 *
 * @example
 * ```typescript
 * [SlashCommandBuilderFunction]() {
 *    return {
 * 		  name: 'raw',
 * 		  description: 'You can use this too!'
 *    };
 * }
 * ```
 */
exports.SlashCommandBuilderFunction = Symbol('SlashCommands.Builder');
/**
 * Represents the function that is called when a slash command should be limited to some guild IDs
 *
 * @example
 * ```typescript
 * [SlashCommandGuildOnlyFunction]() {
 *    return ['737141877803057244'];
 * }
 * ```
 */
exports.SlashCommandGuildOnlyFunction = Symbol('SlashCommand.GuildOnly');
/**
 * Represents the function that is called before a slash command gets ran, similar to Command#preParse
 *
 * @example
 * ```typescript
 * [SlashCommandPreParseFunction](interaction: SlashCommandInteraction, rawData: APIInteraction, context: SlashCommandContext) {
 *    return new SlashCommandArgs(interaction, this, rawData, context);
 * }
 * ```
 */
exports.SlashCommandPreParseFunction = Symbol('SlashCommand.PreParse');
/**
 * Represents the function that is called when a slash command interaction is received
 *
 * @example
 * ```typescript
 * [SlashCommandRunFunction](interaction: SlashCommandInteraction) {
 * 	  return interaction.reply('Hello from slash commands!', { ephemeral: true });
 * }
 * ```
 */
exports.SlashCommandRunFunction = Symbol('SlashCommands.Run');
// Preconditions
/**
 * Represents the function that is called in a precondition when a slash command interaction is received
 *
 * @example
 * ```typescript
 * [SlashCommandPreconditionRunFunction](interaction: SlashCommandInteraction, command: Command) {
 *    return interaction.author.id === '139836912335716352' ? this.ok() : this.error('No');
 * }
 * ```
 */
exports.SlashCommandPreconditionRunFunction = Symbol('SlashCommands.PreconditionRun');
//# sourceMappingURL=Symbols.js.map