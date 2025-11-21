import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl, ComboboxControl, ButtonGroup, Button } from '@wordpress/components';
import { ColorTypeControl } from '../colors/ColorTypeControl';
import { colors } from '../../utilities/colors';
import {
    createSizeOptions,
    createWeightOptions,
    createTransformOptions,
} from '../../blocks/heading-subtitle/utils';

export const HeadingTypographyControl = ({ attributes, setAttributes }) => {
    const {
        titleColor,
        titleColorType,
        subtitleColor,
        subtitleColorType,
        titleSize,
        subtitleSize,
        titleWeight,
        subtitleWeight,
        titleTransform,
        subtitleTransform,
        titleLine,
        subtitleLine,
        lead,
    } = attributes;

    const [activeTab, setActiveTab] = useState('title');

    return (
        <div style={{ padding: '16px' }}>
            <ButtonGroup>
                <Button
                    isPrimary={activeTab === 'title'}
                    onClick={() => setActiveTab('title')}
                >
                    {__('Title', 'naviddev-gutenberg-blocks')}
                </Button>
                <Button
                    isPrimary={activeTab === 'subtitle'}
                    onClick={() => setActiveTab('subtitle')}
                >
                    {__('Subtitle', 'naviddev-gutenberg-blocks')}
                </Button>
            </ButtonGroup>
            {activeTab === 'title' && (
                <>
                    <ColorTypeControl
                        label={__('Title Color Type', 'naviddev-gutenberg-blocks')}
                        value={titleColorType}
                        onChange={(value) => setAttributes({ titleColorType: value })}
                        options={[
                            { value: 'solid', label: __('Solid', 'naviddev-gutenberg-blocks') },
                            { value: 'soft', label: __('Soft', 'naviddev-gutenberg-blocks') },
                            { value: 'pale', label: __('Pale', 'naviddev-gutenberg-blocks') },
                        ]}
                    />
                    <ComboboxControl
                        label={__('Title Color', 'naviddev-gutenberg-blocks')}
                        value={titleColor}
                        options={colors}
                        onChange={(value) => setAttributes({ titleColor: value })}
                    />
                    <SelectControl
                        label={__('Title Size', 'naviddev-gutenberg-blocks')}
                        value={titleSize}
                        options={createSizeOptions()}
                        onChange={(value) => setAttributes({ titleSize: value })}
                    />
                    <SelectControl
                        label={__('Title Weight', 'naviddev-gutenberg-blocks')}
                        value={titleWeight}
                        options={createWeightOptions()}
                        onChange={(value) => setAttributes({ titleWeight: value })}
                    />
                    <SelectControl
                        label={__('Title Transform', 'naviddev-gutenberg-blocks')}
                        value={titleTransform}
                        options={createTransformOptions()}
                        onChange={(value) => setAttributes({ titleTransform: value })}
                    />
                    <ToggleControl
                        label={__('Title Line', 'naviddev-gutenberg-blocks')}
                        checked={titleLine}
                        onChange={(value) => setAttributes({ titleLine: value })}
                    />
                </>
            )}
            {activeTab === 'subtitle' && (
                <>
                    <ColorTypeControl
                        label={__('Subtitle Color Type', 'naviddev-gutenberg-blocks')}
                        value={subtitleColorType}
                        onChange={(value) => setAttributes({ subtitleColorType: value })}
                        options={[
                            { value: 'solid', label: __('Solid', 'naviddev-gutenberg-blocks') },
                            { value: 'soft', label: __('Soft', 'naviddev-gutenberg-blocks') },
                            { value: 'pale', label: __('Pale', 'naviddev-gutenberg-blocks') },
                        ]}
                    />
                    <ComboboxControl
                        label={__('Subtitle Color', 'naviddev-gutenberg-blocks')}
                        value={subtitleColor}
                        options={colors}
                        onChange={(value) => setAttributes({ subtitleColor: value })}
                    />
                    <SelectControl
                        label={__('Subtitle Size', 'naviddev-gutenberg-blocks')}
                        value={subtitleSize}
                        options={createSizeOptions()}
                        onChange={(value) => setAttributes({ subtitleSize: value })}
                    />
                    <SelectControl
                        label={__('Subtitle Weight', 'naviddev-gutenberg-blocks')}
                        value={subtitleWeight}
                        options={createWeightOptions()}
                        onChange={(value) => setAttributes({ subtitleWeight: value })}
                    />
                    <SelectControl
                        label={__('Subtitle Transform', 'naviddev-gutenberg-blocks')}
                        value={subtitleTransform}
                        options={createTransformOptions()}
                        onChange={(value) => setAttributes({ subtitleTransform: value })}
                    />
                    <ToggleControl
                        label={__('Subtitle Line', 'naviddev-gutenberg-blocks')}
                        checked={subtitleLine}
                        onChange={(value) => setAttributes({ subtitleLine: value })}
                    />
                    <ToggleControl
                        label={__('Lead Style', 'naviddev-gutenberg-blocks')}
                        checked={lead}
                        onChange={(value) => setAttributes({ lead: value })}
                    />
                </>
            )}
        </div>
    );
};