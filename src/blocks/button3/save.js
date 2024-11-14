// src/blocks/button/save.js

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { getClassNames } from './sidebar'; // Импортируем функцию для формирования классов

const Save = ({ attributes }) => {
	const {
		buttonText,
		iconClass,
		socialIconClass,
		socialIconStyle,
		DataValue,
	} = attributes;

	// Динамически формируем классы кнопки
	const buttonClass = getClassNames(attributes);

	return (
		<div {...useBlockProps.save()}>
			<a href="#" className={buttonClass} data-value={DataValue}>
				{iconClass && <i className={iconClass}></i>}
				<RichText.Content tagName="span" value={buttonText} />
				{socialIconClass && (
					<i className={`${socialIconClass} ${socialIconStyle}`}></i>
				)}
			</a>
		</div>
	);
};

export default Save;
