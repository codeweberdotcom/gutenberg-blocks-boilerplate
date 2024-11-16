import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	TextControl,
	Button,
	PanelBody,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

export const LinkTypeSelector = ({ attributes, setAttributes }) => {
	const {
		LinkType,
		LinkUrl,
		PostId,
		PageId,
		CF7ID,
		ModalID,
		HtmlID,
		PhoneType, // Добавляем PhoneType к атрибутам
		PhoneNumber,
		YoutubeID,
		RutubeID,
		VKID,
	} = attributes;

	// Состояния для хранения списка постов, страниц, модальных окон, HTML и форм CF7
	const [posts, setPosts] = useState([]);
	const [pages, setPages] = useState([]);
	const [cf7Forms, setCf7Forms] = useState([]);
	const [modals, setModals] = useState([]);
	const [htmlPosts, setHtmlPosts] = useState([]);
	const [isLoadingCF7, setIsLoadingCF7] = useState(true);

	// Состояние для телефонов
	const [phones, setPhones] = useState([]);

	// Получаем базовый URL сайта с использованием глобальной переменной WordPress
	const sitelinkurl = wpApiSettings.root.replace('/wp-json/', '');

	// Функция для загрузки телефонов
	const fetchPhoneNumbers = async () => {
		const response = await fetch(`${sitelinkurl}/wp-json/wp/v2/options`);
		const data = await response.json();
		const phoneNumbers = data.phones || {};
		const phoneOptions = Object.entries(phoneNumbers).map(
			([id, phone]) => ({
				label: phone,
				value: phone,
			})
		);
		setPhones(phoneOptions);
	};

	// Загрузка постов, страниц, модальных окон и HTML с использованием WordPress REST API
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`${wpApiSettings.root}wp/v2/posts`);
			const data = await response.json();
			setPosts(data);
		};

		const fetchPages = async () => {
			const response = await fetch(`${wpApiSettings.root}wp/v2/pages`);
			const data = await response.json();
			setPages(data);
		};

		const fetchCF7Forms = async () => {
			const response = await fetch(
				`${sitelinkurl}/wp-json/wp/v2/options`
			);
			const data = await response.json();
			const forms = data.cf7_forms || {};
			const formOptions = Object.entries(forms).map(([id, title]) => ({
				label: `${id}: ${title}`,
				value: id,
			}));
			setCf7Forms(formOptions);

			if (formOptions.length === 1) {
				setAttributes({ CF7ID: formOptions[0].value });
			}

			setIsLoadingCF7(false);
		};

		const fetchModals = async () => {
			const response = await fetch(`${wpApiSettings.root}wp/v2/modal`);
			const data = await response.json();
			setModals(data);
		};

		const fetchHtmlPosts = async () => {
			const response = await fetch(`${wpApiSettings.root}wp/v2/html`);
			const data = await response.json();
			setHtmlPosts(data);
		};

		// Загрузка данных в зависимости от типа ссылки
		if (LinkType === 'post') {
			fetchPosts();
		} else if (LinkType === 'page') {
			fetchPages();
		} else if (LinkType === 'cf7') {
			fetchCF7Forms();
		} else if (LinkType === 'modal') {
			fetchModals();
		} else if (LinkType === 'html') {
			fetchHtmlPosts();
		} else if (LinkType === 'phone') {
			// Загружаем телефоны только при выборе типа 'contacts'
			fetchPhoneNumbers();
		}
	}, [LinkType, sitelinkurl]);

	const handleLinkTypeChange = (newLinkType) => {
		setAttributes({ LinkType: newLinkType });
		if (newLinkType === 'external') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				PhoneType: '',
				DataValue: '',
			});
		} else if (newLinkType === 'phone') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				PhoneType: 'custom',
				DataValue: '',
			});
		} else if (newLinkType === 'post') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				DataValue: '',
			});
		} else if (newLinkType === 'page') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				DataValue: '',
			});
		} else if (newLinkType === 'cf7') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				DataValue: '',
			});
		} else if (newLinkType === 'modal') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				DataValue: '',
			});
		} else if (newLinkType === 'html') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				DataValue: '',
			});
		} else if (newLinkType === 'youtube') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				PhoneType: '',
				DataValue: '',
				YoutubeID: '',
				RutubeID: '',
				VKID: '',
			});
		} else if (newLinkType === 'rutube') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				PhoneType: '',
				DataValue: '',
				YoutubeID: '',
				RutubeID: '',
				VKID: '',
			});
		} else if (newLinkType === 'vk') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				ModalID: '',
				HtmlID: '',
				PhoneType: '',
				DataValue: '',
				YoutubeID: '',
				RutubeID: '',
				VKID: '',
			});
		}
	};

	const handlePhoneTypeChange = (newPhoneType) => {
		setAttributes({ PhoneType: newPhoneType });
		if (newPhoneType === 'contacts') {
			fetchPhoneNumbers(); // Загрузка телефонов при выборе "Contacts"
		}
	};

	const handleLinkUrlChange = (newLinkUrl) => {
		if (PhoneType === 'custom') {
			// Проверяем и добавляем "tel:" только если его еще нет
			const formattedLinkUrl = newLinkUrl.startsWith('tel:')
				? newLinkUrl
				: `tel:${newLinkUrl}`;
			setAttributes({ LinkUrl: formattedLinkUrl });
		} else {
			setAttributes({ LinkUrl: newLinkUrl });
		}
	};

	const handlePostSelect = (selectedPostId) => {
		setAttributes({ PostId: selectedPostId });
		const selectedPost = posts.find(
			(post) => post.id === parseInt(selectedPostId)
		);
		if (selectedPost) {
			setAttributes({ LinkUrl: selectedPost.link });
		}
	};

	const handlePageSelect = (selectedPageId) => {
		setAttributes({ PageId: selectedPageId });
		const selectedPage = pages.find(
			(page) => page.id === parseInt(selectedPageId)
		);
		if (selectedPage) {
			setAttributes({ LinkUrl: selectedPage.link });
		}
	};

	const handleCF7Select = (selectedCF7Id) => {
		setAttributes({ CF7ID: selectedCF7Id });
		setAttributes({
			DataValue: `cf7-${selectedCF7Id}`,
			LinkUrl: 'javascript:void(0)',
		});
	};

	const handleModalSelect = (selectedModalId) => {
		setAttributes({ ModalID: selectedModalId });
		setAttributes({
			DataValue: `modal-${selectedModalId}`,
			LinkUrl: 'javascript:void(0)',
		});
	};

	const handleHtmlSelect = (selectedHtmlId) => {
		setAttributes({ HtmlID: selectedHtmlId });
		setAttributes({
			DataValue: `html-${selectedHtmlId}`,
			LinkUrl: 'javascript:void(0)',
		});
	};

	const handleYoutubeIDChange = (newYoutubeID) => {
		setAttributes({
			YoutubeID: newYoutubeID,
			LinkUrl: 'javascript:void(0)',
			DataValue: `youtube-${newYoutubeID}`,
		});
	};

	const handleRutubeIDChange = (newRutubeID) => {
		setAttributes({
			RutubeID: newRutubeID,
			LinkUrl: 'javascript:void(0)',
			DataValue: `rutube-${newRutubeID}`,
		});
	};

	const handleVKIDChange = (newVKID) => {
		setAttributes({
			VKID: newVKID,
			LinkUrl: 'javascript:void(0)',
			DataValue: `vkvideo-${newVKID}`,
		});
	};

	return (
		<>
			<PanelBody
				title={__('Link Settings', 'naviddev-gutenberg-blocks')}
				className="custom-panel-body"
			>
				<SelectControl
					label="Type link"
					value={LinkType}
					options={[
						{ label: 'External', value: 'external' },
						{ label: 'Page', value: 'page' },
						{ label: 'Post', value: 'post' },
						{ label: 'CF7', value: 'cf7' },
						{ label: 'Modal', value: 'modal' },
						{ label: 'HTML', value: 'html' },
						{ label: 'Phone', value: 'phone' },
						{ label: 'YouTube', value: 'youtube' },
						{ label: 'Rutube', value: 'rutube' },
						{ label: 'VK Video', value: 'vk' },
					]}
					onChange={handleLinkTypeChange}
				/>

				{/* Поля для YouTube */}
				{LinkType === 'youtube' && (
					<TextControl
						label="YouTube Video URL"
						value={YoutubeID}
						onChange={handleYoutubeIDChange}
						placeholder="Введите YouTube URL"
					/>
				)}

				{/* Поля для Rutube */}
				{LinkType === 'rutube' && (
					<TextControl
						label="Rutube Video ID"
						value={RutubeID}
						onChange={handleRutubeIDChange}
						placeholder="Введите Rutube ID"
					/>
				)}

				{/* Поля для VK */}
				{LinkType === 'vk' && (
					<TextControl
						label="VK Video ID"
						value={VKID}
						onChange={handleVKIDChange}
						placeholder="Введите VK Video ID"
					/>
				)}

				{LinkType === 'external' && (
					<TextControl
						label="Введите URL"
						value={LinkUrl}
						onChange={handleLinkUrlChange}
						placeholder="https://example.com"
					/>
				)}

				{LinkType === 'phone' && (
					<>
						<div className="component-sidebar-title">
							<label>
								{__('Phone Type', 'naviddev-gutenberg-blocks')}
							</label>
						</div>

						<div className="phone-type-controls button-group-sidebar_50">
							<Button
								isPrimary={PhoneType === 'custom'}
								onClick={() => {
									handlePhoneTypeChange('custom');
									setAttributes({
										LinkUrl: '', // Обновляем другие атрибуты, если нужно
										PhoneNumber: '', // Очищаем или изменяем другие атрибуты
									});
								}}
							>
								Custom
							</Button>
							<Button
								isPrimary={PhoneType === 'contacts'}
								onClick={() =>
									handlePhoneTypeChange('contacts')
								}
							>
								Contacts
							</Button>
						</div>

						{PhoneType === 'custom' && (
							<TextControl
								label="Custom phone"
								value={LinkUrl.replace(/^tel:/, '')} // Убираем "tel:" для отображения
								onChange={handleLinkUrlChange}
								placeholder="+1234567890"
							/>
						)}

						{PhoneType === 'contacts' && (
							<SelectControl
								label="Select Phone"
								value={PhoneNumber}
								options={phones}
								onChange={(newPhone) => {
									setAttributes({
										PhoneNumber: newPhone,
									});
									setAttributes({
										LinkUrl: `tel:${newPhone}`,
									});
									setAttributes({
										DataValue: ``,
									});
								}}
							/>
						)}
					</>
				)}

				{LinkType === 'post' && (
					<SelectControl
						label="Select Post"
						value={PostId}
						options={posts.map((post) => ({
							label: post.title.rendered,
							value: post.id,
						}))}
						onChange={handlePostSelect}
					/>
				)}

				{LinkType === 'page' && (
					<SelectControl
						label="Select Page"
						value={PageId}
						options={pages.map((page) => ({
							label: page.title.rendered,
							value: page.id,
						}))}
						onChange={handlePageSelect}
					/>
				)}

				{LinkType === 'cf7' && (
					<SelectControl
						label="Select CF7"
						value={CF7ID}
						options={cf7Forms}
						onChange={handleCF7Select}
					/>
				)}

				{LinkType === 'modal' && (
					<SelectControl
						label="Select Modal"
						value={ModalID}
						options={modals.map((modal) => ({
							label: modal.title.rendered,
							value: modal.id,
						}))}
						onChange={handleModalSelect}
					/>
				)}

				{LinkType === 'html' && (
					<SelectControl
						label="Select HTML"
						value={HtmlID}
						options={htmlPosts.map((htmlPost) => ({
							label: htmlPost.title.rendered,
							value: htmlPost.id,
						}))}
						onChange={handleHtmlSelect}
					/>
				)}
			</PanelBody>
		</>
	);
};
