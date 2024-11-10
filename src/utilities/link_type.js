import { useState, useEffect } from 'react';
const { useSelect, useDispatch } = wp.data;
const { SelectControl, TextControl } = wp.components;

export const LinkTypeControl = ({ value, onChange }) => {
	const { updateBlockAttributes } = useDispatch('core/block-editor');

	const [selectedLinkType, setSelectedLinkType] = useState(
		value.LinkType || 'external'
	);
	const [linkUrl, setLinkUrl] = useState(value.LinkUrl || '');
	const [cf7Forms, setCf7Forms] = useState([]);
	const [loadingCf7Forms, setLoadingCf7Forms] = useState(false);

	const username = 'admin'; // Ваш логин
	const password = 'I(W^m)J)MR#PtaOoUr!bTop1'; // Ваш пароль
	const auth = btoa(`${username}:${password}`); // Кодирование логина и пароля в base64

	const posts = useSelect((select) => {
		return (
			select('core').getEntityRecords('postType', 'post', {
				per_page: -1,
			}) || []
		);
	}, []);

	const pages = useSelect((select) => {
		return (
			select('core').getEntityRecords('postType', 'page', {
				per_page: -1,
			}) || []
		);
	}, []);

	useEffect(() => {
		if (selectedLinkType === 'cf7') {
			setLoadingCf7Forms(true);
			const fetchCf7Forms = async () => {
				try {
					const response = await fetch(
						'https://hoger.test//wp-json/contact-form-7/v1/contact-forms',
						{
							method: 'GET',
							headers: {
								Authorization: 'Basic ' + auth,
							},
						}
					);
					const data = await response.json();

					if (Array.isArray(data)) {
						const formOptions = data.map((form) => ({
							label: form.title.rendered || form.title,
							value: form.id,
						}));
						setCf7Forms(formOptions);
					} else {
						console.error(
							'Некорректный ответ API для форм CF7:',
							data
						);
					}
				} catch (error) {
					console.error('Ошибка при загрузке форм CF7:', error);
				} finally {
					setLoadingCf7Forms(false);
				}
			};
			fetchCf7Forms();
		}
	}, [selectedLinkType]);

	const linkTypeOptions = [
		{ label: 'Select a Link Type', value: '' },
		{ label: 'External', value: 'external' },
		{ label: 'Page', value: 'page' },
		{ label: 'Post', value: 'post' },
		{ label: 'CF7 Form', value: 'cf7' },
	];

	const updateFinalLink = (linkType, fieldValue) => {
		let link = '';
		switch (linkType) {
			case 'page':
			case 'post':
			case 'external':
			case 'cf7':
				link = fieldValue || '';
				break;
			default:
				link = linkUrl;
		}

		updateBlockAttributes({ LinkUrl: link });
		setLinkUrl(link);
		onChange(link);
	};

	const handleLinkTypeChange = (newValue) => {
		setSelectedLinkType(newValue);
		updateBlockAttributes({ LinkType: newValue });
		updateFinalLink(newValue, '');
	};

	const handleChange = (field, newValue) => {
		updateBlockAttributes({ [field]: newValue });
		updateFinalLink(selectedLinkType, newValue);
	};

	return (
		<div>
			<SelectControl
				label="Link Type"
				value={selectedLinkType}
				options={linkTypeOptions}
				onChange={handleLinkTypeChange}
			/>

			{selectedLinkType === 'page' && (
				<SelectControl
					label="Page"
					value={value.page}
					options={pages.map((page) => ({
						label: page.title.rendered,
						value: page.link,
					}))}
					onChange={(newValue) => handleChange('page', newValue)}
				/>
			)}

			{selectedLinkType === 'post' && (
				<SelectControl
					label="Post"
					value={value.post}
					options={posts.map((post) => ({
						label: post.title.rendered,
						value: post.link,
					}))}
					onChange={(newValue) => handleChange('post', newValue)}
				/>
			)}

			{selectedLinkType === 'external' && (
				<TextControl
					label="External URL"
					value={value.externalUrl}
					onChange={(newValue) =>
						handleChange('externalUrl', newValue)
					}
					placeholder="Enter external URL"
				/>
			)}

			{selectedLinkType === 'cf7' && (
				<SelectControl
					label="CF7 Form"
					value={value.cf7Form}
					options={cf7Forms}
					onChange={(newValue) => handleChange('cf7Form', newValue)}
					disabled={loadingCf7Forms || cf7Forms.length === 0}
				/>
			)}

			{selectedLinkType === 'cf7' && loadingCf7Forms && (
				<div>Loading CF7 forms...</div>
			)}
			{selectedLinkType === 'cf7' &&
				!loadingCf7Forms &&
				cf7Forms.length === 0 && <div>No CF7 forms available.</div>}

			<div>Final Link: {linkUrl || 'javascript:void(0)'}</div>
		</div>
	);
};
