import DlaExperiment from '../dla/DlaExperiment';
import dlaImage from './images/dla/dla.png';
import TenPrintExperiment from '../10print/TenPrintExperiment';
import BasicExperiment from '../basic/BasicExperiment';
import Basic2Experiment from '../basic2/BasicExperiment';

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
    title: '10PRINT',
  },
  {
    id: 'BASIC',
    path: '/experiments/basic',
    component: BasicExperiment,
    title: 'BASIC',
  },
  {
    id: 'BASIC2',
    path: '/experiments/basic2',
    component: Basic2Experiment,
    title: 'BASIC2',
  },
];

export default EXPERIMENTS;