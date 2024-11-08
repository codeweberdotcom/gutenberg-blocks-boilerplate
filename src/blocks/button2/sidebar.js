// Импорт необходимых модулей
import { colors } from '../../utilities/colors';
import { gradientcolors } from '../../utilities/gradient_colors';
import { shapes } from '../../utilities/shapes';
import { fontIcons } from '../../utilities/font_icon';
import { fontIconsSocial } from '../../utilities/font_icon_social';
import { __ } from '@wordpress/i18n';
import { PanelBody, Button, ComboboxControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

// Функция для динамического формирования класса кнопки
export const getClassNames = (attributes) => {
	const {
		buttonSize,
		buttonColor,
		buttonGradientColor,
		buttonStyle,
		buttonType,
		buttonShape,
		buttonIconPosition,
		socialIconStyle,
		socialIconClass,
	} = attributes;

	// Создаем массив классов
	const classes = [];

	if (
		buttonType === 'solid' ||
		buttonType === 'circle' ||
		buttonType === 'play' ||
		buttonType === 'circle' ||
		(buttonType === 'social' && socialIconStyle === 'style_1') ||
		buttonType === 'icon'
	)
		classes.push(`btn`);

	// Добавляем классы в зависимости от выбранных значений
	if (
		(buttonType === 'solid' ||
			buttonType === 'circle' ||
			(buttonType === 'social' && socialIconStyle === 'style_1') ||
			buttonType === 'icon') &&
		buttonSize
	)
		classes.push(`${buttonSize}`);

	if (
		buttonType === 'circle' ||
		(buttonType === 'social' && socialIconStyle === 'style_1') ||
		buttonType === 'play'
	)
		classes.push(`btn-circle`);

	if (buttonType === 'play') classes.push(`btn-play ripple`);

	if (buttonType === 'expand') classes.push(`btn-expand rounded-pill`);

	if (buttonType === 'icon' && buttonIconPosition === 'left')
		classes.push(`btn-icon btn-icon-start`);

	if (buttonType === 'icon' && buttonIconPosition === 'right')
		classes.push(`btn-icon btn-icon-end`);

	if (
		(buttonType === 'solid' ||
			buttonType === 'circle' ||
			buttonType === 'icon' ||
			buttonType === 'expand' ||
			buttonType === 'play') &&
		buttonStyle === 'solid' &&
		buttonColor
	)
		classes.push(`btn-${buttonColor}`);

	if (
		(buttonType === 'solid' ||
			buttonType === 'circle' ||
			buttonType === 'icon' ||
			buttonType === 'expand' ||
			buttonType === 'play') &&
		buttonStyle === 'outline' &&
		buttonColor
	)
		classes.push(`btn-outline-${buttonColor}`);

	if (
		(buttonType === 'solid' ||
			buttonType === 'circle' ||
			buttonType === 'icon' ||
			buttonType === 'expand' ||
			buttonType === 'play') &&
		buttonStyle === 'soft' &&
		buttonColor
	)
		classes.push(`btn-soft-${buttonColor}`);

	if (
		(buttonType === 'solid' ||
			buttonType === 'circle' ||
			buttonType === 'icon' ||
			buttonType === 'expand' ||
			buttonType === 'play') &&
		buttonStyle === 'gradient' &&
		buttonGradientColor
	)
		classes.push(`btn-${buttonGradientColor}`);

	if (buttonType === 'social' && socialIconStyle === 'style_1')
		classes.push(`btn-${socialIconClass}`);

	if (
		(buttonType === 'solid' ||
			buttonType === 'circle' ||
			buttonType === 'icon' ||
			buttonType === 'ezpand' ||
			buttonType === 'play') &&
		buttonStyle === 'outline-gradient' &&
		buttonGradientColor
	)
		classes.push(`btn-outline-${buttonGradientColor}`);

	if ((buttonType === 'solid' || buttonType === 'icon') && buttonShape)
		classes.push(`${buttonShape}`);

	// Объединяем массив в строку
	return classes.join(' ');
};

const ButtonSidebar = ({ attributes, setAttributes }) => {
	const {
		buttonText,
		buttonSize,
		buttonColor,
		buttonGradientColor,
		buttonStyle,
		buttonType,
		buttonShape,
		buttonIconPosition,
		iconClass,
		socialIconClass,
		socialIconStyle,
	} = attributes;

	// Условие для ограничения отображения кнопок Outline, Gradient и Outline Gradient
	const isRestrictedType = ['expand', 'social', 'play'].includes(buttonType);

	return (
		<InspectorControls>
			<PanelBody
				title={__('Button Settings', 'naviddev-gutenberg-blocks')}
			>
				{/* Тип кнопки */}
				<div className="component-sidebar-title">
					<label>
						{__('Button Type', 'naviddev-gutenberg-blocks')}
					</label>
				</div>
				<div className="button-type-controls button-group-sidebar_33">
					{[
						{ label: 'Solid', value: 'solid' },
						{ label: 'Circle', value: 'circle' },
						{ label: 'Social', value: 'social' },
						{ label: 'Icon', value: 'icon' },
						{ label: 'Expand', value: 'expand' },
						{ label: 'Play', value: 'play' },
					].map((type) => (
						<Button
							key={type.value}
							isPrimary={buttonType === type.value}
							onClick={() =>
								setAttributes({ buttonType: type.value })
							}
						>
							{type.label}
						</Button>
					))}
				</div>

				{(buttonType === 'solid' ||
					buttonType === 'circle' ||
					buttonType === 'social' ||
					buttonType === 'icon') && (
					<>
						{/* Размер кнопки */}
						<div className="component-sidebar-title">
							<label>
								{__('Button Size', 'naviddev-gutenberg-blocks')}
							</label>
						</div>
						<div className="button-size-controls button-group-sidebar_33">
							{[
								{ label: 'Small', value: 'btn-sm' },
								{ label: 'Medium', value: '' },
								{ label: 'Large', value: 'btn-lg' },
							].map((size) => (
								<Button
									key={size.value}
									isPrimary={buttonSize === size.value}
									onClick={() =>
										setAttributes({
											buttonSize: size.value,
										})
									}
								>
									{size.label}
								</Button>
							))}
						</div>
					</>
				)}

				{/* Форма кнопки */}
				{(buttonType === 'icon' || buttonType === 'solid') && (
					<div className="button-shape-controls">
						<div className="component-sidebar-title">
							<label>
								{__(
									'Button Shape',
									'naviddev-gutenberg-blocks'
								)}
							</label>
						</div>
						<div className="button-shape-buttons button-group-sidebar_33">
							{shapes.map((shape) => (
								<Button
									key={shape.value}
									isPrimary={buttonShape === shape.value}
									onClick={() =>
										setAttributes({
											buttonShape: shape.value,
										})
									}
								>
									{shape.label}
								</Button>
							))}
						</div>
					</div>
				)}

				{/* Стиль кнопки */}
				{(buttonType === 'icon' ||
					buttonType === 'solid' ||
					buttonType === 'circle' ||
					buttonType === 'expand' ||
					buttonType === 'play') && (
					<div className="button-style-controls">
						<div className="component-sidebar-title">
							<label>
								{__(
									'Button Style',
									'naviddev-gutenberg-blocks'
								)}
							</label>
						</div>
						<div className="button-style-buttons button-group-sidebar_50">
							{[
								{ label: 'Solid', value: 'solid' },
								{ label: 'Soft', value: 'soft' },
								// Отображаем кнопки Outline, Gradient и Outline Gradient только если не выбран ограниченный тип
								...(!isRestrictedType
									? [
											{
												label: 'Outline',
												value: 'outline',
											},
											{
												label: 'Gradient',
												value: 'gradient',
											},
											{
												label: 'Outline Gradient',
												value: 'outline-gradient',
											},
									  ]
									: []),
							].map((style) => (
								<Button
									key={style.value}
									isPrimary={buttonStyle === style.value}
									onClick={() =>
										setAttributes({
											buttonStyle: style.value,
										})
									}
								>
									{style.label}
								</Button>
							))}
						</div>
					</div>
				)}

				{/* Цвет кнопки */}
				{(buttonType === 'icon' ||
					buttonType === 'solid' ||
					buttonType === 'circle' ||
					buttonType === 'expand' ||
					buttonType === 'play') &&
					(buttonStyle === 'solid' ||
						buttonStyle === 'outline' ||
						buttonStyle === 'soft') && (
						<ComboboxControl
							label={__(
								'Button Color',
								'naviddev-gutenberg-blocks'
							)}
							value={buttonColor}
							options={colors}
							onChange={(newColor) =>
								setAttributes({ buttonColor: newColor })
							}
						/>
					)}

				{/* Градиентный цвет */}
				{(buttonType === 'icon' ||
					buttonType === 'solid' ||
					buttonType === 'circle' ||
					buttonType === 'expand' ||
					buttonType === 'play') &&
					(buttonStyle === 'outline-gradient' ||
						buttonStyle === 'gradient') && (
						<ComboboxControl
							label={__(
								'Gradient Color',
								'naviddev-gutenberg-blocks'
							)}
							value={buttonGradientColor}
							options={gradientcolors}
							onChange={(newGradient) =>
								setAttributes({
									buttonGradientColor: newGradient,
								})
							}
						/>
					)}

				{/* Позиция иконки */}
				{buttonType === 'icon' && (
					<>
						<div className="icon-position-controls button-group-sidebar_50">
							<div className="component-sidebar-title">
								<label>
									{__(
										'Icon Position',
										'naviddev-gutenberg-blocks'
									)}
								</label>
							</div>
							<Button
								isPrimary={buttonIconPosition === 'left'}
								onClick={() =>
									setAttributes({
										buttonIconPosition: 'left',
									})
								}
							>
								{__('Left Icon', 'naviddev-gutenberg-blocks')}
							</Button>
							<Button
								isPrimary={buttonIconPosition === 'right'}
								onClick={() =>
									setAttributes({
										buttonIconPosition: 'right',
									})
								}
							>
								{__('Right Icon', 'naviddev-gutenberg-blocks')}
							</Button>
						</div>
					</>
				)}

				{/* Иконка круга */}
				{(buttonType === 'circle' || buttonType === 'icon') && (
					<ComboboxControl
						label={__('Icon Class', 'naviddev-gutenberg-blocks')}
						value={iconClass}
						options={fontIcons}
						onChange={(newIcon) =>
							setAttributes({ iconClass: newIcon })
						}
					/>
				)}

				{buttonType === 'social' && (
					<ComboboxControl
						label={__(
							'Social Icon Class',
							'naviddev-gutenberg-blocks'
						)}
						value={socialIconClass}
						options={fontIconsSocial}
						onChange={(newSocialIcon) =>
							setAttributes({ socialIconClass: newSocialIcon })
						}
					/>
				)}

				{/* Социальные иконки */}
				{buttonType === 'social' && (
					<>
						<div className="social-icon-style-controls button-group-sidebar">
							<div className="component-sidebar-title">
								<label>
									{__(
										'Social Icon Style',
										'naviddev-gutenberg-blocks'
									)}
								</label>
							</div>
							<div className="social-icon-style-buttons">
								{[
									{ label: 'Style 1', value: 'style_1' },
									{ label: 'Style 2', value: 'style_2' },
									{ label: 'Style 3', value: 'style_3' },
								].map((style) => (
									<Button
										key={style.value}
										isPrimary={
											socialIconStyle === style.value
										}
										onClick={() =>
											setAttributes({
												socialIconStyle: style.value,
											})
										}
									>
										{style.label}
									</Button>
								))}
							</div>
						</div>
					</>
				)}
			</PanelBody>
		</InspectorControls>
	);
};

export default ButtonSidebar;
