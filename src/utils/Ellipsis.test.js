import Ellipsis from './Ellipsis';


describe('utils/Ellipsis', () => {
	describe('.prepend', () => {
		it('should show 3 dots and some text with large input', () => {
			expect(Ellipsis.prepend('123456789', 3)).toBe('...789');
		});

		it('should show just text with small input', () => {
			expect(Ellipsis.prepend('1234', 5)).toBe('1234');
		});
	});

	describe('.append', () => {
		it('should show some text and 3 dots with large input', () => {
			expect(Ellipsis.append('123456789', 3)).toBe('123...');
		});

		it('should show just text with small input', () => {
			expect(Ellipsis.append('1234', 5)).toBe('1234');
		});
	});
});
