import { SlashCommandAssertions } from '../src/index';

const largeArray = Array.from({ length: 26 }, () => 1 as any);

describe('Slash Command Assertions tests', () => {
	test('GIVEN valid name THEN does not throw error', () => {
		expect(() => SlashCommandAssertions.validateName('ping')).not.toThrowError();
	});

	test('GIVEN invalid name THEN throw error', () => {
		// @ts-expect-error Testing validation with invalid data
		expect(() => SlashCommandAssertions.validateName(null)).toThrowError();

		// Too short of a name
		expect(() => SlashCommandAssertions.validateName('')).toThrowError();

		// Invalid characters used
		expect(() => SlashCommandAssertions.validateName('ABC123$%^&')).toThrowError();

		// Too long of a name
		expect(() => SlashCommandAssertions.validateName('qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm')).toThrowError();
	});

	test('GIVEN valid description THEN does not throw error', () => {
		expect(() => SlashCommandAssertions.validateDescription('This is an OwO moment fur sure!~')).not.toThrowError();
	});

	test('GIVEN invalid description THEN throw error', () => {
		// @ts-expect-error Testing validation with invalid data
		expect(() => SlashCommandAssertions.validateDescription(null)).toThrowError();

		// Too short of a description
		expect(() => SlashCommandAssertions.validateDescription('')).toThrowError();

		// Too long of a description
		expect(() =>
			SlashCommandAssertions.validateDescription(
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam autem libero expedita vitae accusamus nostrum ipsam tempore repudiandae deserunt ipsum facilis, velit fugiat facere accusantium, explicabo corporis aliquam non quos.'
			)
		).toThrowError();
	});

	test('GIVEN valid array of options or choices THEN does not throw error', () => {
		expect(() => SlashCommandAssertions.validateMaxOptionsLength([])).not.toThrowError();

		expect(() => SlashCommandAssertions.validateMaxChoicesLength([])).not.toThrowError();
	});

	test('GIVEN invalid options or choices THEN throw error', () => {
		// @ts-expect-error Testing validation with invalid data
		expect(() => SlashCommandAssertions.validateMaxOptionsLength(null)).toThrowError();

		// @ts-expect-error Testing validation with invalid data
		expect(() => SlashCommandAssertions.validateMaxChoicesLength(null)).toThrowError();

		// Given an array that's too big
		expect(() => SlashCommandAssertions.validateMaxOptionsLength(largeArray)).toThrowError();

		expect(() => SlashCommandAssertions.validateMaxChoicesLength(largeArray)).toThrowError();
	});
});
