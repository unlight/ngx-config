// angular
import { Injectable } from '@angular/core';

// module
import { ConfigLoader } from './config.loader';

@Injectable()
export class ConfigService {
  private settings: any;

  constructor(public loader: ConfigLoader) {
  }

  init(): any {
    return this.loader.loadSettings()
      .then((res: any) => this.settings = res);
  }

  getSettings(key?: string | Array<string>, defaultValue?: any): any {
    if (!key || (Array.isArray(key) && !key[0]))
      return this.settings;

    if (!Array.isArray(key))
      key = key.split('.');

    let result = key.reduce((acc: any, current: string) => acc && acc[current], this.settings);

    if (result === undefined) {
      result = defaultValue;

      if (result === undefined)
        throw new Error(`No setting found with the specified key [${key.join('/')}]!`);
    }

    return result;
  }

  get(path: string, defaultValue?: any): any;
  get(path: string[], defaultValue?: any): any;

  get(path: any, defaultValue: any = null): any {
    if (!Array.isArray(path)) {
      path = String(path).split('.');
    }
    let result = path.reduce((prev: any, curr: string) => {
      return prev && prev[curr];
    }, this.settings);
    return (result !== undefined) ? result : defaultValue;
  }
}
