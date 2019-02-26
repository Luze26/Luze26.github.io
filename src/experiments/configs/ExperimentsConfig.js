import DlaExperiment from '../dla/DlaExperiment';
import dlaImage from './images/dla/dla.png';
import tenPrintImage from './images/10print/10print.png';
import TenPrintExperiment from '../10print/TenPrintExperiment';
import simplexNoiseXStringImage from './images/simplexNoiseXString/simplexNoise.png';
import PerlinCharsExperiment from '../perlinChars/PerlinCharsExperiment';

const EXPERIMENTS = [
  {
    id: 'DLA',
    path: '/experiments/dla',
    component: DlaExperiment,
    title: 'Diffusion Limited Aggregation',
    date: '01/03/2018',
    number: '#001',
    image: dlaImage,
  },
  {
    id: '10PRINT',
    path: '/experiments/10print',
    component: TenPrintExperiment,
    date: '20/03/2018',
    title: '10PRINT',
    number: '#002',
    image: tenPrintImage,
  },
  {
    id: 'SimplexNoisXSrting',
    path: '/experiments/simplexNoiseXString',
    component: PerlinCharsExperiment,
    date: '12/02/2019',
    title: 'Simplex Noise x String',
    number: '#003',
    image: simplexNoiseXStringImage,
  },
];

export default EXPERIMENTS;