import {Injectable, Inject, EventEmitter} from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token

export const AcceptLangs = ["zh", "en", "jp"];

@Injectable()
export class TranslateService {
	private _currentLang: string = "zh";
	private PLACEHOLDER = '%';
	private _defaultLang: string;
  private _fallback: boolean;

	public get currentLang() {
	  return this._currentLang || this._defaultLang;
	}
	// set current language
	public set currentLang(_lang: string){
		this._currentLang = _lang;
	}
	public setDefaultLang(lang: string) {
    this._defaultLang = lang;
  }
	public enableFallback(enable: boolean) {
    this._fallback = enable;
  }
  // inject our translations
	constructor(@Inject(TRANSLATIONS) private _translations: any) {
	}

	public use(lang: string): void {
		// set current language
		this._currentLang = lang;
	}

	private translate(key: string): string {
		// private perform translation
		let translation = key;

    if (this._translations[StaticTranslateService.currentLang] && this._translations[StaticTranslateService.currentLang][key]) {
			return this._translations[StaticTranslateService.currentLang][key];
		}
		// fallback disabled
    if (!this._fallback) {
      return translation;
    }

    // found in default language
    if (this._translations[this._defaultLang] && this._translations[this._defaultLang][key]) {
      return this._translations[this._defaultLang][key];
    }
		return translation;
	}

	public replace(word: string = '', words: string | string[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
      values.forEach((e, i) => {
        translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
      });

    return translation;
  }

	public instant(key: string, words?: string | string[]) {
		// public perform translation
		const translation: string = this.translate(key);

    if (!words) return translation;
    return this.replace(translation, words);
	}
}
export class StaticTranslateService {
	static appLang: string = "zh";
	static get currentLang(){
		return StaticTranslateService.appLang;
	}

	static set currentLang(_lang: string){
		if(AcceptLangs.indexOf(_lang) === -1) return;
		StaticTranslateService.appLang = _lang;
	}
}