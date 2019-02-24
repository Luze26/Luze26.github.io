const randomUtils = {};

randomUtils.rndInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

randomUtils.rndElem = (array) => array[randomUtils.rndInt(0, array.length)];

export default randomUtils;