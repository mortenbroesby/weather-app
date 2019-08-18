import Vue from "vue";
import VueI18n from "vue-i18n";
import config from "../config";

import { setItem, getItem } from "../utilities";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: config.defaultLanguage,
  messages: {}
});

interface LanguageOptions {
  language: string;
  messages: Object;
}

interface LanguageConfig {
  culture: string;
  currency: string;
}

class LocalisationService {
  defaultLanguage = config.defaultLanguage;
  activeLanguage = "";
  useSystemLocale: boolean = true;

  initBeforeApplicationLoad(): void {
    this.setLanguage(`${this.getFromStorage()}`, false);
  }

  initAfterApplicationLoad(locale: string): void {
    let language = locale.substr(0, 2);

    if (!this.exists(language)) {
      language = this.defaultLanguage;
    }

    let systemLanguage = getItem("systemLanguage");
    if (!systemLanguage || systemLanguage !== language) {
      setItem("systemLanguage", language);
      systemLanguage = language;
    }

    if (this.useSystemLocale) {
      this.setLanguage(systemLanguage, false);
    } else {
      this.setLanguage(this.defaultLanguage, false);
    }
  }

  setLanguage(language: string, isUserPreference: boolean = true): void {
    if (this.exists(language) && language !== this.activeLanguage) {
      const options: any = this.getOptions(language);
      this.activeLanguage = language;

      if (isUserPreference) {
        setItem("userLanguage", language);
      }

      i18n.locale = language;

      i18n.setLocaleMessage(language, options.messages);
    }
  }

  getActiveLanguage(): string {
    return this.activeLanguage || this.defaultLanguage;
  }

  getActiveLanguageConfiguration(): LanguageConfig {
    return this.getLangConfig(this.activeLanguage);
  }

  private getLangConfig(language: string): LanguageConfig {
    return config.languages[language];
  }

  private exists(language: string): boolean {
    const result = this.getLangConfig(language);
    return typeof result === "object";
  }

  public getObjectProperty(object: any, key: any) {
    const array = key.split(".");
    while (array.length && (object = object[array.shift()]));
    return object;
  }

  public translate(key: string, payload?: any) {
    return i18n.t(key, payload);
  }

  public translateManual(key: string, payload?: any): string {
    const messages = this.getOptions(this.activeLanguage || this.defaultLanguage).messages;
    let text = this.getObjectProperty(messages, key);
    if (payload) {
      for (const id in payload) {
        text = text.replace(`{${id}}`, payload[id]);
      }
    }
    return text;
  }

  private getFromStorage(): string | undefined {
    const userLanguage = getItem("userLanguage");
    const systemLanguage = getItem("systemLanguage");

    if (this.useSystemLocale) {
      return userLanguage || systemLanguage || this.defaultLanguage;
    } else {
      return userLanguage || this.defaultLanguage;
    }
  }

  private getOptions(language: string): LanguageOptions {
    const langConfig = this.getLangConfig(language);

    // @TODO: Fix hardcoded import issue with Parcel
    const en = require(`./locale/en.json`);

    const json = require(`./locale/${language}.json`);

    return {
      language: langConfig.culture,
      messages: json
    };
  }
}

export let localisationService = new LocalisationService();

export const formatMessage = (key: string, payload?: any) => String(i18n.t(key, payload));
