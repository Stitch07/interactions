import type { APIApplicationCommandOption } from 'discord-api-types/v8';
import { use } from 'typescript-mix';
import { validateMaxOptionsLength, validateRequiredParameters } from './Assertions';
import { Shared__NameAndDescription, Shared__Options } from './SlashCommandOptions';
import { SlashCommandSubCommandBuilder, SlashCommandSubCommandGroupBuilder } from './SlashCommandSubCommands';

export class SlashCommandBuilder {
	@use(Shared__Options, Shared__NameAndDescription) protected this!: SlashCommandSubCommandBuilder;
	protected name: string = null!;
	protected description: string = null!;
	protected options: ToJSON[] = [];

	/**
	 * Returns the final data that should be sent to Discord. You won't need this unless you're manually
	 * creating slash commands via this builder.
	 *
	 * **Note:** Calling this getter will validate required properties based on their conditions.
	 */
	public toJSON() {
		validateRequiredParameters(this.name, this.description, this.options);
		return {
			name: this.name,
			description: this.description,
			options: this.options.map((option) => option.toJSON())
		};
	}

	// #region Builder methods

	/**
	 * Adds a new sub command group to this command
	 * @param input A function that returns a sub command group builder, or an already built builder
	 */
	public addSubCommandGroup(
		input: SlashCommandSubCommandGroupBuilder | ((subCommandGroup: SlashCommandSubCommandGroupBuilder) => SlashCommandSubCommandGroupBuilder)
	) {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Make sure there is no sub command at the root level - if there is, throw
		const hasSubCommands = options.some((item) => item instanceof SlashCommandSubCommandBuilder);
		if (hasSubCommands) throw new RangeError(`You cannot mix sub commands and sub command groups at the root level.`);

		// Get the final result
		const result = typeof input === 'function' ? input(new SlashCommandSubCommandGroupBuilder()) : input;

		// Push it
		options.push(result);

		return this;
	}

	/**
	 * Adds a new sub command to this command
	 * @param input A function that returns a sub command builder, or an already built builder
	 */
	public addSubCommand(input: SlashCommandSubCommandBuilder | ((subCommandGroup: SlashCommandSubCommandBuilder) => SlashCommandSubCommandBuilder)) {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Make sure there is no sub command at the root level - if there is, throw
		const hasSubCommands = options.some((item) => item instanceof SlashCommandSubCommandGroupBuilder);
		if (hasSubCommands) throw new RangeError(`You cannot mix sub commands and sub command groups at the root level.`);

		// Get the final result
		const result = typeof input === 'function' ? input(new SlashCommandSubCommandBuilder()) : input;

		// Push it
		options.push(result);

		return this;
	}

	// #endregion
}

export interface SlashCommandBuilder extends Shared__NameAndDescription, Shared__Options {}

export interface ToJSON {
	toJSON(): APIApplicationCommandOption;
}
