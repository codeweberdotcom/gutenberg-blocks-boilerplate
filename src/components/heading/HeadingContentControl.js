import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { createHeadingTagOptions, createSubtitleTagOptions } from '../../blocks/heading-subtitle/utils';

export const HeadingContentControl = ({ attributes, setAttributes }) => {
    const {
        enableTitle,
        enableSubtitle,
        title,
        subtitle,
        order,
        titleTag,
        subtitleTag,
    } = attributes;

    return (
        <PanelBody title={__('Content Settings', 'naviddev-gutenberg-blocks')} className="custom-panel-body">
            <ToggleControl
                label={__('Enable Title', 'naviddev-gutenberg-blocks')}
                checked={enableTitle}
                onChange={(value) => setAttributes({ enableTitle: value })}
            />
            <ToggleControl
                label={__('Enable Subtitle', 'naviddev-gutenberg-blocks')}
                checked={enableSubtitle}
                onChange={(value) => setAttributes({ enableSubtitle: value })}
            />
            <ToggleControl
                label={__('Subtitle First', 'naviddev-gutenberg-blocks')}
                checked={order === 'subtitle-first'}
                onChange={(value) => setAttributes({ order: value ? 'subtitle-first' : 'title-first' })}
            />
            {enableTitle && (
                <>
                    <SelectControl
                        label={__('Title Tag', 'naviddev-gutenberg-blocks')}
                        value={titleTag}
                        options={createHeadingTagOptions()}
                        onChange={(value) => setAttributes({ titleTag: value })}
                    />
                    <div className="mb-3">
                        <label>{__('Title Text', 'naviddev-gutenberg-blocks')}</label>
                        <RichText
                            tagName="div"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter title...', 'naviddev-gutenberg-blocks')}
                        />
                    </div>
                </>
            )}
            {enableSubtitle && (
                <>
                    <SelectControl
                        label={__('Subtitle Tag', 'naviddev-gutenberg-blocks')}
                        value={subtitleTag}
                        options={createSubtitleTagOptions()}
                        onChange={(value) => setAttributes({ subtitleTag: value })}
                    />
                    <div className="mb-3">
                        <label>{__('Subtitle Text', 'naviddev-gutenberg-blocks')}</label>
                        <RichText
                            tagName="div"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Enter subtitle...', 'naviddev-gutenberg-blocks')}
                        />
                    </div>
                </>
            )}
        </PanelBody>
    );
};