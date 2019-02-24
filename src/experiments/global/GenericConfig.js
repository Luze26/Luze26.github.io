class GenericConfig {

  static _cloneParam(paramValue) {
    if (paramValue.clone) {
      return paramValue.clone();
    }
    else if (paramValue.slice) {
      return paramValue.slice();
    }
    return paramValue;
  }

  constructor(paramsKeys, values) {
    this.paramsKeys = paramsKeys;
    paramsKeys.forEach(
      (paramKey, index) => this[paramKey] = values[index],
    );
  }

  clone(shallow = false) {
    let clone;
    if (shallow) {
      clone = new this.constructor(...this.paramsKeys.map((paramKey) => this[paramKey]));
    }
    else {
      clone = new this.constructor(...this.paramsKeys.map((paramKey) => GenericConfig._cloneParam(this[paramKey])));
    }
    return clone;
  }

  copy(changes) {
    return new this.constructor(
      ...this.paramsKeys.map(
        (paramKey) => changes[paramKey] != null ? changes[paramKey] : GenericConfig._cloneParam(this[paramKey]),
      ),
    );
  }
}

export default GenericConfig;