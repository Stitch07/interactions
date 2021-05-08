"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandIntegerOption = exports.SlashCommandStringOption = exports.SlashCommandOptionBase = exports.Shared__NameAndDescription = exports.Shared__Options = void 0;
const tslib_1 = require("tslib");
require("discord-api-types/v8");
const ow_1 = tslib_1.__importDefault(require("ow"));
const Assertions_1 = require("./Assertions");
// #region Mixins
class Shared__Options {
    constructor() {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /**
     * Adds a boolean option
     * @param input A function that returns an option builder, or an already built builder
     */
    addBooleanOption(input) {
        return this.__sharedOptionMethod(input, 5 /* BOOLEAN */);
    }
    /**
     * Adds a user option
     * @param input A function that returns an option builder, or an already built builder
     */
    addUserOption(input) {
        return this.__sharedOptionMethod(input, 6 /* USER */);
    }
    /**
     * Adds a channel option
     * @param input A function that returns an option builder, or an already built builder
     */
    addChannelOption(input) {
        return this.__sharedOptionMethod(input, 7 /* CHANNEL */);
    }
    /**
     * Adds a role option
     * @param input A function that returns an option builder, or an already built builder
     */
    addRoleOption(input) {
        return this.__sharedOptionMethod(input, 8 /* ROLE */);
    }
    /**
     * Adds a string option
     * @param input A function that returns an option builder, or an already built builder
     */
    addStringOption(input) {
        const { options } = this;
        // First, assert options conditions - we cannot have more than 25 options
        Assertions_1.validateMaxOptionsLength(options);
        // Get the final result
        const result = typeof input === 'function' ? input(new SlashCommandStringOption(3 /* STRING */)) : input;
        if (!(result instanceof SlashCommandStringOption))
            throw new TypeError(`Expected to receive a string option builder, got "${typeof result}" instead`);
        // Push it
        options.push(result);
        return this;
    }
    addIntegerOption(input) {
        const { options } = this;
        // First, assert options conditions - we cannot have more than 25 options
        Assertions_1.validateMaxOptionsLength(options);
        // Get the final result
        const result = typeof input === 'function' ? input(new SlashCommandIntegerOption(4 /* INTEGER */)) : input;
        if (!(result instanceof SlashCommandIntegerOption))
            throw new TypeError(`Expected to receive an integer option builder, got "${typeof result}" instead`);
        // Push it
        options.push(result);
        return this;
    }
    __sharedOptionMethod(input, type) {
        const { options } = this;
        // First, assert options conditions - we cannot have more than 25 options
        Assertions_1.validateMaxOptionsLength(options);
        // Get the final result
        const result = typeof input === 'function' ? input(new SlashCommandOptionBase(type)) : input;
        if (!(result instanceof SlashCommandOptionBase))
            throw new TypeError(`Expected to receive an option builder, got "${typeof result}" instead`);
        // Push it
        options.push(result);
        return this;
    }
}
exports.Shared__Options = Shared__Options;
class Shared__NameAndDescription {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /**
     * Sets the name
     * @param name The name
     */
    setName(name) {
        // Assert the name matches the conditions
        Assertions_1.validateName(name);
        this.name = name;
        return this;
    }
    /**
     * Sets the description
     * @param description The description
     */
    setDescription(description) {
        // Assert the description matches the conditions
        Assertions_1.validateDescription(description);
        this.description = description;
        return this;
    }
}
exports.Shared__NameAndDescription = Shared__NameAndDescription;
// #endregion
// #region Basic options
class SlashCommandOptionBase extends Shared__NameAndDescription {
    constructor(type) {
        super();
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: type
        });
        Object.defineProperty(this, "required", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    /**
     * Marks the option as required
     * @param required If this option should be required
     */
    setRequired(required) {
        // Assert that you actually passed a boolean
        ow_1.default(required, 'required', ow_1.default.boolean);
        this.required = required;
        return this;
    }
    toJSON() {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            required: this.required
        };
    }
}
exports.SlashCommandOptionBase = SlashCommandOptionBase;
// #endregion
// #region Options with choices
class ApplicationCommandOptionWithChoicesBase extends SlashCommandOptionBase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "choices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /**
     * Adds a choice for this option
     * @param name The name of the choice
     * @param value The value of the choice
     */
    addChoice(name, value) {
        if (typeof this.choices === 'undefined')
            this.choices = [];
        Assertions_1.validateMaxChoicesLength(this.choices);
        // Validate name
        ow_1.default(name, 'choice name', ow_1.default.string.minLength(1).maxLength(100));
        // Validate the value
        if (this.type === 3 /* STRING */)
            ow_1.default(value, 'choice value', ow_1.default.string.maxLength(100));
        else
            ow_1.default(value, 'choice value', ow_1.default.number.finite);
        this.choices.push({ name, value });
        return this;
    }
    /**
     * Adds multiple choices for this option
     * @param choices The choices array
     */
    addChoices(choices) {
        const finalOptions = Array.isArray(choices) ? choices : Object.entries(choices);
        for (const [name, value] of finalOptions)
            this.addChoice(name, value);
        return this;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            choices: this.choices
        };
    }
}
class SlashCommandStringOption extends ApplicationCommandOptionWithChoicesBase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3 /* STRING */
        });
    }
}
exports.SlashCommandStringOption = SlashCommandStringOption;
class SlashCommandIntegerOption extends ApplicationCommandOptionWithChoicesBase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4 /* INTEGER */
        });
    }
}
exports.SlashCommandIntegerOption = SlashCommandIntegerOption;
// #endregion
//# sourceMappingURL=SlashCommandOptions.js.map