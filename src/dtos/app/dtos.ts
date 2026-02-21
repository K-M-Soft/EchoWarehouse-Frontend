export class AppSettingsDTO {
  defaultVatRate: number;
  vatNumber: string;
  companyName: string;
  currency: string;
  defaultLanguage: string;

  constructor(
    defaultVatRate: number,
    vatNumber: string,
    companyName: string,
    currency: string,
    defaultLanguage: string,
  ) {
    this.defaultVatRate = defaultVatRate;
    this.vatNumber = vatNumber;
    this.companyName = companyName;
    this.currency = currency;
    this.defaultLanguage = defaultLanguage;
  }
}

export class AppVersionDTO {
  backend: string;
  database: string;

  constructor(backend: string, database: string) {
    this.backend = backend;
    this.database = database;
  }
}

export class SupportedLocaleDTO {
  code: string;
  name: string;
  nativeName: string;

  constructor(code: string, name: string, nativeName: string) {
    this.code = code;
    this.name = name;
    this.nativeName = nativeName;
  }
}

export class AppConfigDTO {
  appSettings: AppSettingsDTO;
  localization: Record<string, string>;
  version: AppVersionDTO;
  supportedLocales: SupportedLocaleDTO[];
  loadedAt: string;

  constructor(
    appSettings: AppSettingsDTO,
    localization: Record<string, string>,
    version: AppVersionDTO,
    supportedLocales: SupportedLocaleDTO[],
    loadedAt: string,
  ) {
    this.appSettings = appSettings;
    this.localization = localization;
    this.version = version;
    this.supportedLocales = supportedLocales;
    this.loadedAt = loadedAt;
  }
}
