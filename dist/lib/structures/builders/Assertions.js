"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMaxChoicesLength = exports.validateMaxOptionsLength = exports.validateDescription = exports.validateName = exports.validateRequiredParameters = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
function validateRequiredParameters(name, description, options) {
    // Assert name matches all conditions
    validateName(name);
    // Assert description conditions
    validateDescription(description);
    // Assert options conditions
    validateMaxOptionsLength(options);
}
exports.validateRequiredParameters = validateRequiredParameters;
function validateName(name) {
    ow_1.default(name, 'slash command name', ow_1.default.string.lowercase.alphabetical //
        .minLength(1)
        .maxLength(32));
}
exports.validateName = validateName;
function validateDescription(description) {
    ow_1.default(description, 'slash command description', ow_1.default.string.minLength(1).maxLength(100));
}
exports.validateDescription = validateDescription;
function validateMaxOptionsLength(options) {
    ow_1.default(options, 'slash command options', ow_1.default.array.maxLength(25));
}
exports.validateMaxOptionsLength = validateMaxOptionsLength;
function validateMaxChoicesLength(choices) {
    ow_1.default(choices, 'slash command choices', ow_1.default.array.maxLength(25));
}
exports.validateMaxChoicesLength = validateMaxChoicesLength;
//# sourceMappingURL=Assertions.js.map