import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		buttonText = 'Default Text',
		buttonSize = 'medium',
		buttonColor = 'primary',
		buttonShape = '',
		buttonType = 'default', // Новый параметр buttonType
	} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<a
				href="#"
				className={`btn btn-${buttonSize} btn-${buttonColor} ${buttonShape} btn-type-${buttonType}`}
			>
				<RichText.Content tagName="span" value={buttonText} />
			</a>
		</div>
	);
}
