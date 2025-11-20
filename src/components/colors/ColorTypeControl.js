import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

const DEFAULT_TYPES = [
	{ value: 'solid', label: __('Solid', 'naviddev-gutenberg-blocks') },
	{ value: 'soft', label: __('Soft', 'naviddev-gutenberg-blocks') },
	{ value: 'pale', label: __('Pale', 'naviddev-gutenberg-blocks') },
	{ value: 'gradient', label: __('Gradient', 'naviddev-gutenberg-blocks') },
];

/**
 * Универсальный контрол выбора типа цветов (solid/soft/pale/gradient).
 * Позволяет передать кастомный набор вариантов и заголовок.
 */
export const ColorTypeControl = ({
	label = __('Color Type', 'naviddev-gutenberg-blocks'),
	value,
	onChange,
	options = DEFAULT_TYPES,
	wrapperClassName = 'button-group-sidebar_33',
}) => (
	<>
		{label && (
			<div className="component-sidebar-title">
				<label>{label}</label>
			</div>
		)}
		<div className={wrapperClassName}>
			{options.map((option) => (
				<Button
					key={option.value}
					isPrimary={value === option.value}
					onClick={() => onChange(option.value)}
				>
					{option.label}
				</Button>
			))}
		</div>
	</>
);

export default ColorTypeControl;
