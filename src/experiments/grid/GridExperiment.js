import React from 'react';
import GridConfig from './models/GridConfig';
import GenericExperimentWithControls from '../global/GenericExperimentWithControls';
import GridSketch from './sketch/GridSketch';
import {GRID_PATTERN_SETS} from './sketch/GridPatterns';

class GridExperiment extends React.PureComponent {

  static controlsConfig = {
    id: 'Grid',
    tabs: ['COLORS', 'SETTINGS', 'STYLES'],
    colors: {
      controlsBlocks: [
        {
          id: 'backgroundColor',
          title: 'Background Color',
          type: 'COLOR_PICKER',
          inputProps: {
            disableAlpha: true,
          },
        },
        {
          id: 'colors',
          title: 'Colors',
          type: 'EXTENDED_COLOR_PICKER',
        },
        {
          id: 'hiddenChance',
          title: 'Hidden percentage',
          type: 'SLIDER',
          showValue: true,
          inputProps: {
            min: 0,
            max: 1,
            step: 0.02,
          },
        },
        {
          id: 'thickness',
          title: 'Thickness',
          type: 'SLIDER',
          showValue: true,
          inputProps: {
            min: 1,
            max: 30,
          },
        },
        {
          id: 'randomThickness',
          title: 'Random Thickness',
          doNotShowTitle: true,
          type: 'CHECKBOX',
          showValue: true,
        },
        {
          id: 'patterns',
          title: 'Patterns',
          type: 'DROPDOWN',
          transformValue: (patterns) => {
            const patternSet = GRID_PATTERN_SETS.find(
              (set) =>
                set.patterns.length === patterns.length &&
                !patterns.find((pattern) => !set.patterns.includes(pattern)),
            );
            return patternSet ? patternSet.label : null;
          },
          transformOnChange: (patternLabel) => {
            const patternSet = GRID_PATTERN_SETS.find((patternSet) => patternSet.label === patternLabel);
            return patternSet.patterns;
          },
          inputProps: {
            items: GRID_PATTERN_SETS.map((set) => set.label),
          },
        },
      ],
    },
    settings: {
      controlsBlocks: [
        {
          id: 'width',
          title: 'Width',
          type: 'SLIDER',
          showValue: true,
          inputProps: {
            min: 100,
            max: 1200,
          },
        },
        {
          id: 'height',
          title: 'Height',
          type: 'SLIDER',
          showValue: true,
          inputProps: {
            min: 100,
            max: 1200,
          },
        },
        {
          id: 'margin',
          title: 'Margin',
          type: 'SLIDER',
          showValue: true,
          inputProps: {
            min: 0,
            max: 200,
          },
        },
        {
          id: 'nbCols',
          title: 'Columns',
          type: 'SLIDER',
          showValue: true,
          inputProps: {
            min: 0,
            max: 200,
          },
        },
        {
          id: 'nbRows',
          title: 'Rows',
          type: 'SLIDER',
          showValue: true,
          inputProps: {
            min: 0,
            max: 200,
          },
        },
      ],
    },
  };

  render() {
    return (
      <GenericExperimentWithControls
        backgroundColor='#fff'
        configModel={GridConfig}
        SketchComponent={GridSketch}
        controlsConfig={GridExperiment.controlsConfig}
      />
    );
  }
}

export default GridExperiment;
