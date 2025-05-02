declare const AccountDistributionGet: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["geoCascade"];
                    readonly properties: {
                        readonly geoCascade: {
                            readonly description: "Controls if and which geographic clusters are included for regional content delivery";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["isEnabled"];
                                readonly properties: {
                                    readonly isEnabled: {
                                        readonly type: "boolean";
                                        readonly description: "Enable or Disable account-wide distribution settings.";
                                    };
                                    readonly clusters: {
                                        readonly type: readonly ["array", "null"];
                                        readonly description: "List of cluster IDs to distribute publish stream. List cannot be empty when IsEnabled is true. List is ignored when IsEnabled is set to false. Defaults to '[\"all\"]' if unset.";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountDistributionPut: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["geoCascade"];
        readonly properties: {
            readonly geoCascade: {
                readonly description: "Controls if and which geographic clusters are included for regional content delivery";
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["isEnabled"];
                    readonly properties: {
                        readonly isEnabled: {
                            readonly type: "boolean";
                            readonly description: "Enable or Disable account-wide distribution settings.";
                        };
                        readonly clusters: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "List of cluster IDs to distribute publish stream. List cannot be empty when IsEnabled is true. List is ignored when IsEnabled is set to false. Defaults to '[\"all\"]' if unset.";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                }];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["geoCascade"];
                    readonly properties: {
                        readonly geoCascade: {
                            readonly description: "Controls if and which geographic clusters are included for regional content delivery";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["isEnabled"];
                                readonly properties: {
                                    readonly isEnabled: {
                                        readonly type: "boolean";
                                        readonly description: "Enable or Disable account-wide distribution settings.";
                                    };
                                    readonly clusters: {
                                        readonly type: readonly ["array", "null"];
                                        readonly description: "List of cluster IDs to distribute publish stream. List cannot be empty when IsEnabled is true. List is ignored when IsEnabled is set to false. Defaults to '[\"all\"]' if unset.";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountGetGeoCascade: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly isEnabled: {
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly clusters: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountMediaExpirationGet: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly timelines: {
                            readonly description: "Account level expiration rule for timelines. If custom rule is not set, by default, timelines expire after 30 days. ";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly days: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly maximum: 365;
                                        readonly minimum: 1;
                                    };
                                };
                            }];
                        };
                        readonly recordings: {
                            readonly description: "Account level expiration rule for recordings.Expiration countdown begin upon recording creation (i.e. when [Create Media Asset](#operation/MediaAssets_CreateMediaAsset) the recording is stopped). \n \n If custom rule is not set, recordings never expire and this field will be empty. ";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly days: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly maximum: 365;
                                        readonly minimum: 1;
                                    };
                                };
                            }];
                        };
                        readonly clips: {
                            readonly description: "Account level expiration rule for clips. Expiration countdown begin upon clip creation (i.e. when [Create Media Asset](#operation/MediaAssets_CreateMediaAsset) is invoke). \n \n If custom rule is not set, clips never expire by default and this field will be empty. Setting the `expiration` value on in the request body of [Create Media Asset](#operation/MediaAssets_CreateMediaAsset) overrides the rule configured here.";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly days: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly maximum: 365;
                                        readonly minimum: 1;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountMediaExpirationPut: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly timelines: {
                readonly description: "Update account level expiration rule for timelines. Specified timespans must be non-zero. \n \n This limits the earliest permissible startTime when creating clips. Expiration rule updates take effect immediately, with then system cleaning up any timelines created prior to the expiration rule. \n \n By default, timelines expire after 30 days. \n \n Provide an empty json to clear settings. ";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly days: {
                            readonly type: readonly ["integer", "null"];
                            readonly format: "int32";
                            readonly maximum: 365;
                            readonly minimum: 1;
                        };
                    };
                }];
            };
            readonly recordings: {
                readonly description: "Update account level expiration rule for recordings. Specified timespans must be non-zero. \n \n Updates to the expiration rule are applied only to new recordings. \n \n By default, recordings do not expire unless this value is updated. \n \n Provide an empty json to clear settings. ";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly days: {
                            readonly type: readonly ["integer", "null"];
                            readonly format: "int32";
                            readonly maximum: 365;
                            readonly minimum: 1;
                        };
                    };
                }];
            };
            readonly clips: {
                readonly description: "Update account level expiration rule for clips. Specified timespans must be non-zero. \n \n Updates to the expiration rule are applied only to new clips. This account level default can be overridden for individual clips upon clip creation. \n \n By default, clip do not expire unless this value is updated or expiration is specified on creation. \n \n Provide an empty json to clear settings. ";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly days: {
                            readonly type: readonly ["integer", "null"];
                            readonly format: "int32";
                            readonly maximum: 365;
                            readonly minimum: 1;
                        };
                    };
                }];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly timelines: {
                            readonly description: "Account level expiration rule for timelines. If custom rule is not set, by default, timelines expire after 30 days. ";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly days: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly maximum: 365;
                                        readonly minimum: 1;
                                    };
                                };
                            }];
                        };
                        readonly recordings: {
                            readonly description: "Account level expiration rule for recordings.Expiration countdown begin upon recording creation (i.e. when [Create Media Asset](#operation/MediaAssets_CreateMediaAsset) the recording is stopped). \n \n If custom rule is not set, recordings never expire and this field will be empty. ";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly days: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly maximum: 365;
                                        readonly minimum: 1;
                                    };
                                };
                            }];
                        };
                        readonly clips: {
                            readonly description: "Account level expiration rule for clips. Expiration countdown begin upon clip creation (i.e. when [Create Media Asset](#operation/MediaAssets_CreateMediaAsset) is invoke). \n \n If custom rule is not set, clips never expire by default and this field will be empty. Setting the `expiration` value on in the request body of [Create Media Asset](#operation/MediaAssets_CreateMediaAsset) overrides the rule configured here.";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly days: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly maximum: 365;
                                        readonly minimum: 1;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountMediaStorageGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sort: {
                    readonly default: "name";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Name"];
                        readonly enum: readonly ["name"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly default: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Set to true to get the default storage profile on your account";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly default: 1;
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly default: 25;
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly desc: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly default: {
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly description: "\n\n`gcs` `awsS3` `dolbyStorage`";
                                readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                                readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                            };
                            readonly options: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["bucketName"];
                                    readonly properties: {
                                        readonly objectPrefix: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                                            readonly maxLength: 1000;
                                            readonly minLength: 0;
                                        };
                                        readonly bucketName: {
                                            readonly type: "string";
                                            readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access.";
                                            readonly minLength: 1;
                                        };
                                        readonly bucketRegion: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Region of the specified bucket. Required when using storageType awsS3 ";
                                            readonly maxLength: 32;
                                            readonly minLength: 1;
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountMediaStorageIdDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountMediaStorageIdGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly default: {
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "\n\n`gcs` `awsS3` `dolbyStorage`";
                            readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                            readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                        };
                        readonly options: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["bucketName"];
                                readonly properties: {
                                    readonly objectPrefix: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                                        readonly maxLength: 1000;
                                        readonly minLength: 0;
                                    };
                                    readonly bucketName: {
                                        readonly type: "string";
                                        readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access.";
                                        readonly minLength: 1;
                                    };
                                    readonly bucketRegion: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Region of the specified bucket. Required when using storageType awsS3 ";
                                        readonly maxLength: 32;
                                        readonly minLength: 1;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountMediaStorageIdPut: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly name: {
                readonly type: readonly ["string", "null"];
                readonly description: "Update the label for your storage profile";
                readonly maxLength: 256;
                readonly minLength: 0;
            };
            readonly default: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Set this as the default storage profile for your account. If set to true this will replace the previous default profile.";
            };
            readonly type: {
                readonly description: "Storage provider type. One of the following:\n* awsS3 - Amazon S3\n* gcs - Google Cloud Storage";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                    readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                }];
            };
            readonly options: {
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly objectPrefix: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. Ignored when using Dolby.io's storage buckets. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                            readonly maxLength: 1000;
                            readonly minLength: 0;
                        };
                        readonly bucketName: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access.";
                        };
                        readonly bucketRegion: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Region of the specified bucket if using storage provider awsS3";
                            readonly maxLength: 32;
                            readonly minLength: 1;
                        };
                    };
                }];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly default: {
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "\n\n`gcs` `awsS3` `dolbyStorage`";
                            readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                            readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                        };
                        readonly options: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["bucketName"];
                                readonly properties: {
                                    readonly objectPrefix: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                                        readonly maxLength: 1000;
                                        readonly minLength: 0;
                                    };
                                    readonly bucketName: {
                                        readonly type: "string";
                                        readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access.";
                                        readonly minLength: 1;
                                    };
                                    readonly bucketRegion: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Region of the specified bucket. Required when using storageType awsS3 ";
                                        readonly maxLength: 32;
                                        readonly minLength: 1;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountMediaStoragePost: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["type", "options"];
        readonly properties: {
            readonly name: {
                readonly type: readonly ["string", "null"];
                readonly description: "Provide a label for your storage profile";
                readonly maxLength: 256;
                readonly minLength: 1;
            };
            readonly default: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Set this as the default storage profile for your account. If set to true this will replace the previous default profile.";
                readonly default: false;
            };
            readonly type: {
                readonly description: "Storage provider type. One of the following:\n* awsS3 - Amazon S3\n* gcs - Google Cloud Storage";
                readonly oneOf: readonly [{
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                    readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                }];
            };
            readonly options: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["bucketName"];
                readonly properties: {
                    readonly objectPrefix: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                        readonly maxLength: 1000;
                        readonly minLength: 0;
                    };
                    readonly bucketName: {
                        readonly type: "string";
                        readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access.";
                        readonly minLength: 1;
                    };
                    readonly bucketRegion: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "Region of the specified bucket. Required when using storageType awsS3 ";
                        readonly maxLength: 32;
                        readonly minLength: 1;
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly default: {
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "\n\n`gcs` `awsS3` `dolbyStorage`";
                            readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                            readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                        };
                        readonly options: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["bucketName"];
                                readonly properties: {
                                    readonly objectPrefix: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                                        readonly maxLength: 1000;
                                        readonly minLength: 0;
                                    };
                                    readonly bucketName: {
                                        readonly type: "string";
                                        readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access.";
                                        readonly minLength: 1;
                                    };
                                    readonly bucketRegion: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Region of the specified bucket. Required when using storageType awsS3 ";
                                        readonly maxLength: 32;
                                        readonly minLength: 1;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountMediaStorageValidatePost: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly profileId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Provide the id of a storage profile. Mutually exclusive with Type.";
            };
            readonly type: {
                readonly description: "Optional. Use to indicate the storage provider type for a one-off storage configuration. Mutually exclusive with ProfileId. Storage provider type. One of the following:\n* awsS3 - Amazon S3\n* gcs - Google Cloud Storage\n* dolbyStorage - Dolby.io's storage buckets. Call Read Media Asset to retrieve the clip file.";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                    readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                }];
            };
            readonly options: {
                readonly description: "May be used in the following ways: <br />1. Optional. Override parameters of a storage profile specified via ProfileId <br />2. Required. Set parameters for a one-off storage configuration when Type is provided <br /> 3. Optional. Override parameters of the default storage profile if neither ProfileId or Type are provided";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly objectPrefix: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. Ignored when using Dolby.io's storage buckets. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                            readonly maxLength: 1000;
                            readonly minLength: 0;
                        };
                        readonly bucketName: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access.";
                        };
                        readonly bucketRegion: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Region of the specified bucket if using storage provider awsS3";
                            readonly maxLength: 32;
                            readonly minLength: 1;
                        };
                    };
                }];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly storage: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly type: {
                                        readonly description: "Storage provider type";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`gcs` `awsS3` `dolbyStorage`";
                                            readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                                            readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                                        }];
                                    };
                                    readonly path: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountSecurityGet: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountSecurityPut: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly updateAllowedCountries: {
                readonly type: readonly ["array", "null"];
                readonly description: "Set the list of permitted countries as the account default when creating new tokens.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateDeniedCountries: {
                readonly type: readonly ["array", "null"];
                readonly description: "Set the list of excluded countries as the account default when creating new tokens.";
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AccountUpdateGeoCascade: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["isEnabled"];
        readonly properties: {
            readonly isEnabled: {
                readonly type: "boolean";
                readonly description: "Enable or Disable account-wide distribution settings.";
            };
            readonly clusters: {
                readonly type: readonly ["array", "null"];
                readonly description: "List of cluster IDs to distribute publish stream. List cannot be empty when IsEnabled is true. List is ignored when IsEnabled is set to false. Defaults to '[\"all\"]' if unset.";
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["phx-1"];
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly isEnabled: {
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly clusters: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsAccountGeo: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly geo: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly "x-additionalPropertiesName": "CountryCode";
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly bytes: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly views: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsAccountGeoSeries: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly resolution: {
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["Hour", "Day"];
                    readonly enum: readonly ["Hour", "Day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["resolution", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly geo: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly "x-additionalPropertiesName": "CountryCode";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly publishDuration: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly viewDuration: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly bytesOut: {
                                            readonly type: "integer";
                                            readonly description: "Output bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly bytesIn: {
                                            readonly type: "integer";
                                            readonly description: "Input bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly publishes: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly views: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                                readonly "x-additionalPropertiesName": "Time";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsAccountGeoTotal: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly geo: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly "x-additionalPropertiesName": "CountryCode";
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly bytesOut: {
                                        readonly type: "integer";
                                        readonly description: "Output bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly bytesIn: {
                                        readonly type: "integer";
                                        readonly description: "Input bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly publishDuration: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly viewDuration: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsAccountSeries: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly resolution: {
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["Hour", "Day", "Month"];
                    readonly enum: readonly ["Hour", "Day", "Month"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["resolution", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly bandwidth: {
                            readonly type: "object";
                            readonly description: "Total usage.";
                            readonly additionalProperties: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly bytesOut: {
                                        readonly type: "integer";
                                        readonly description: "Output bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly bytesIn: {
                                        readonly type: "integer";
                                        readonly description: "Input bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                                readonly "x-additionalPropertiesName": "Time";
                            };
                        };
                        readonly standardStream: {
                            readonly type: "object";
                            readonly description: "Standard stream usage.";
                            readonly additionalProperties: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly bytesOut: {
                                        readonly type: "integer";
                                        readonly description: "Output bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly bytesIn: {
                                        readonly type: "integer";
                                        readonly description: "Input bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                                readonly "x-additionalPropertiesName": "Time";
                            };
                        };
                        readonly restream: {
                            readonly type: readonly ["object", "null"];
                            readonly description: "Restream usage.";
                            readonly additionalProperties: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly bytesOut: {
                                        readonly type: "integer";
                                        readonly description: "Output bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly bytesIn: {
                                        readonly type: "integer";
                                        readonly description: "Input bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly duration: {
                                        readonly type: "integer";
                                        readonly description: "Usage duration in seconds.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                                readonly "x-additionalPropertiesName": "Time";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsAccountTotal: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly bytesOut: {
                            readonly type: "integer";
                            readonly description: "Total output bytes.";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly bytesIn: {
                            readonly type: "integer";
                            readonly description: "Total input bytes.";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly standardStream: {
                            readonly description: "Standard stream usage.";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly bytesOut: {
                                        readonly type: "integer";
                                        readonly description: "Output bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly bytesIn: {
                                        readonly type: "integer";
                                        readonly description: "Input bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                            }];
                        };
                        readonly restream: {
                            readonly description: "Restream usage.";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly bytesOut: {
                                        readonly type: "integer";
                                        readonly description: "Output bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly bytesIn: {
                                        readonly type: "integer";
                                        readonly description: "Input bytes.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly duration: {
                                        readonly type: "integer";
                                        readonly description: "Usage duration in seconds.";
                                        readonly format: "int64";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsGetSeriesBandwidthForTrackingId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly resolution: {
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["Hour", "Day"];
                    readonly enum: readonly ["Hour", "Day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly trackingIds: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["resolution", "trackingIds", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly additionalProperties: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly standardStream: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly bytesOut: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                                readonly bytesIn: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                            };
                                        }];
                                    };
                                    readonly restream: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly bytesOut: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                                readonly bytesIn: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                                readonly duration: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                            };
                                        }];
                                    };
                                    readonly streamName: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsGetSeriesTranscoderMinutesForAccount: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly streamAccountId: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The account that was queried.";
                        };
                        readonly transcoder: {
                            readonly type: readonly ["object", "null"];
                            readonly description: "Date associated transcoder analytics.";
                            readonly additionalProperties: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly transcoderId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly minutesUsed: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsGetTotalBandwidthForTrackingId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly trackingIds: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["trackingIds", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly properties: {
                                readonly standardStream: {
                                    readonly nullable: true;
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly properties: {
                                            readonly bytesOut: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly bytesIn: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                    }];
                                };
                                readonly restream: {
                                    readonly nullable: true;
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly properties: {
                                            readonly bytesOut: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly bytesIn: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly duration: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                    }];
                                };
                                readonly streamName: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsGetTotalTranscoderMinutesForAccount: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly streamAccountId: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The account we have queried for.";
                        };
                        readonly startDate: {
                            readonly type: "string";
                            readonly description: "The start date of the query.";
                            readonly format: "date-time";
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly description: "The end date of the query.";
                            readonly format: "date-time";
                        };
                        readonly transcoderMinutesUsed: {
                            readonly type: "integer";
                            readonly description: "The total transcoder minutes used between the two dates.";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsGetTrackingSeriesForStreams: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly resolution: {
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["Hour", "Day"];
                    readonly enum: readonly ["Hour", "Day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly streamNames: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Each string must be <= 128 characters";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["resolution", "streamNames", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly additionalProperties: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly standardStream: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly bytesOut: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                                readonly bytesIn: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                            };
                                        }];
                                    };
                                    readonly restream: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly bytesOut: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                                readonly bytesIn: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                                readonly duration: {
                                                    readonly type: "integer";
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                            };
                                        }];
                                    };
                                    readonly trackingId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsGetTrackingTotalForStreams: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly streamNames: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Each string must be <= 128 characters";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["streamNames", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly properties: {
                                readonly standardStream: {
                                    readonly nullable: true;
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly properties: {
                                            readonly bytesOut: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly bytesIn: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                    }];
                                };
                                readonly restream: {
                                    readonly nullable: true;
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly properties: {
                                            readonly bytesOut: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly bytesIn: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly duration: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                    }];
                                };
                                readonly trackingId: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsMediaAssetUsage: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly totalBytes: {
                            readonly type: "integer";
                            readonly description: "Total storage usage reported in bytes";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly recordings: {
                            readonly type: "integer";
                            readonly description: "Storage usage of recordings reported in bytes";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly clips: {
                            readonly type: "integer";
                            readonly description: "Storage usage of clips reported in bytes";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly timelines: {
                            readonly type: "integer";
                            readonly description: "Storage usage of timelines reported in bytes";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsMediaAssetUsageBillable: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly gigabyteHours: {
                            readonly type: "integer";
                            readonly description: "Measured as binary gigabytes (1024^3) per hour";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly recordings: {
                            readonly type: "integer";
                            readonly description: "Billable storage usage of recordings measured as binary gigabytes (1024^3) per hour";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly clips: {
                            readonly type: "integer";
                            readonly description: "Billable storage usage of clips measured as binary gigabytes (1024^3) per hour";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly timelines: {
                            readonly type: "integer";
                            readonly description: "Billable storage usage of timelines measured as binary gigabytes (1024^3) per hour";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsStreamsGeo: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly streamNames: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Each string must be <= 128 characters";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["streamNames", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly geo: {
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly "x-additionalPropertiesName": "CountryCode";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly bytes: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly views: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                            };
                        };
                        readonly "x-additionalPropertiesName": "StreamName";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsStreamsGeoSeries: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly resolution: {
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["Hour", "Day"];
                    readonly enum: readonly ["Hour", "Day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly streamNames: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Each string must be <= 128 characters";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["resolution", "streamNames", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly geo: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly "x-additionalPropertiesName": "CountryCode";
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly properties: {
                                            readonly publishDuration: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly viewDuration: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly bytesOut: {
                                                readonly type: "integer";
                                                readonly description: "Output bytes.";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly bytesIn: {
                                                readonly type: "integer";
                                                readonly description: "Input bytes.";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly publishes: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly views: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                    };
                                    readonly "x-additionalPropertiesName": "Time";
                                };
                                readonly "x-additionalPropertiesName": "StreamName";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsStreamsGeoTotal: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly streamNames: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Each string must be <= 128 characters";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["streamNames", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly geo: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly "x-additionalPropertiesName": "CountryCode";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly bytesOut: {
                                            readonly type: "integer";
                                            readonly description: "Output bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly bytesIn: {
                                            readonly type: "integer";
                                            readonly description: "Input bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly publishDuration: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly viewDuration: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                };
                                readonly "x-additionalPropertiesName": "StreamName";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsStreamsSeries: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly resolution: {
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["Hour", "Day"];
                    readonly enum: readonly ["Hour", "Day"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly streamNames: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Each string must be <= 128 characters";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["resolution", "streamNames", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly bandwidth: {
                                readonly type: "object";
                                readonly description: "Total usage.";
                                readonly additionalProperties: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly bytesOut: {
                                            readonly type: "integer";
                                            readonly description: "Output bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly bytesIn: {
                                            readonly type: "integer";
                                            readonly description: "Input bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                    readonly "x-additionalPropertiesName": "Time";
                                };
                            };
                            readonly standardStream: {
                                readonly type: "object";
                                readonly description: "Standard stream usage.";
                                readonly additionalProperties: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly bytesOut: {
                                            readonly type: "integer";
                                            readonly description: "Output bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly bytesIn: {
                                            readonly type: "integer";
                                            readonly description: "Input bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                    readonly "x-additionalPropertiesName": "Time";
                                };
                            };
                            readonly restream: {
                                readonly type: readonly ["object", "null"];
                                readonly description: "Restream usage.";
                                readonly additionalProperties: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly bytesOut: {
                                            readonly type: "integer";
                                            readonly description: "Output bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly bytesIn: {
                                            readonly type: "integer";
                                            readonly description: "Input bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                            readonly description: "Usage duration in seconds.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                    readonly "x-additionalPropertiesName": "Time";
                                };
                            };
                        };
                        readonly "x-additionalPropertiesName": "StreamName";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyticsStreamsTotal: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly streamNames: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Each string must be <= 128 characters";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["streamNames", "startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly bytesOut: {
                                readonly type: "integer";
                                readonly description: "Total output bytes.";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly bytesIn: {
                                readonly type: "integer";
                                readonly description: "Total input bytes.";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly standardStream: {
                                readonly description: "Standard stream usage.";
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly bytesOut: {
                                            readonly type: "integer";
                                            readonly description: "Output bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly bytesIn: {
                                            readonly type: "integer";
                                            readonly description: "Input bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                }];
                            };
                            readonly restream: {
                                readonly description: "Restream usage.";
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly bytesOut: {
                                            readonly type: "integer";
                                            readonly description: "Output bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly bytesIn: {
                                            readonly type: "integer";
                                            readonly description: "Input bytes.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                            readonly description: "Usage duration in seconds.";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                }];
                            };
                        };
                        readonly "x-additionalPropertiesName": "StreamName";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ClusterGetClustersInfo: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly defaultCluster: {
                            readonly type: "string";
                            readonly description: "Used as cluster when not explicitly specified during Token creation";
                        };
                        readonly availableClusters: {
                            readonly type: "array";
                            readonly description: "List of clusters available";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "Unique id of cluster";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Display name";
                                    };
                                    readonly rtmp: {
                                        readonly type: "string";
                                        readonly description: "Rtmp publish domain for cluster";
                                    };
                                    readonly srt: {
                                        readonly type: "string";
                                        readonly description: "Srt publish domain for cluster";
                                    };
                                    readonly location: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly city: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "City for cluster";
                                                };
                                                readonly region: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "Region for cluster";
                                                };
                                                readonly country: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "Country for cluster";
                                                };
                                            };
                                        }];
                                    };
                                    readonly features: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly transcoding: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether the Transcoder feature is supported in the corresponding cluster.";
                                                };
                                            };
                                        }];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ClusterUpdateClusterInfo: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["defaultCluster"];
        readonly properties: {
            readonly defaultCluster: {
                readonly type: "string";
                readonly minLength: 1;
                readonly examples: readonly ["ams-1"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly defaultCluster: {
                            readonly type: "string";
                            readonly description: "Used as cluster when not explicitly specified during Token creation";
                        };
                        readonly availableClusters: {
                            readonly type: "array";
                            readonly description: "List of clusters available";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "Unique id of cluster";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Display name";
                                    };
                                    readonly rtmp: {
                                        readonly type: "string";
                                        readonly description: "Rtmp publish domain for cluster";
                                    };
                                    readonly srt: {
                                        readonly type: "string";
                                        readonly description: "Srt publish domain for cluster";
                                    };
                                    readonly location: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly city: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "City for cluster";
                                                };
                                                readonly region: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "Region for cluster";
                                                };
                                                readonly country: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "Country for cluster";
                                                };
                                            };
                                        }];
                                    };
                                    readonly features: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly transcoding: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether the Transcoder feature is supported in the corresponding cluster.";
                                                };
                                            };
                                        }];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GeoGeo: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GeoUpdateGeo: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly updateAllowedCountries: {
                readonly type: readonly ["array", "null"];
                readonly description: "Set the list of permitted countries as the account default when creating new tokens.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateDeniedCountries: {
                readonly type: readonly ["array", "null"];
                readonly description: "Set the list of excluded countries as the account default when creating new tokens.";
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const MediaAssetsAllTypeDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["Recording", "Clip", "StorageValidation", "Timeline"];
                    readonly enum: readonly ["recording", "clip", "storageValidation", "timeline"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["type"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly errors: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly id: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly error: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const MediaAssetsDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: readonly ["array", "null"];
                    readonly maxItems: 100;
                    readonly minItems: 1;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly errors: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly id: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly error: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const MediaAssetsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sort: {
                    readonly default: "startTime";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["StartTime", "StopTime", "StreamName", "TokenId", "Created"];
                        readonly enum: readonly ["startTime", "stopTime", "streamName", "tokenId", "created"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly status: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Processing", "Complete", "Error", "Deleting", "Deleted"];
                        readonly enum: readonly ["processing", "complete", "error", "deleting", "deleted"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Defaults to \"Processing\" and \"Complete\" unless specified. ";
                };
                readonly type: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Recording", "Clip", "StorageValidation", "Timeline"];
                        readonly enum: readonly ["recording", "clip", "storageValidation", "timeline"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional. Defaults to \"Clip\" and \"Recording\" unless specified.";
                };
                readonly name: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional. Filter by media asset name. ";
                };
                readonly streamName: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional.";
                };
                readonly tokenId: {
                    readonly type: readonly ["integer", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional.";
                };
                readonly sourceId: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional.";
                };
                readonly simulcastId: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional. If the query parameter is provided without specifying a value, i.e. `?simulcastId&...`, response will return entries where the simulcastId is an empty string. There is no filter for unset or `null` simulcastIds. ";
                };
                readonly priority: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly default: 1;
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly default: 25;
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly desc: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly description: "\n\n`recording` `clip` `storageValidation` `timeline`";
                                readonly "x-enumNames": readonly ["Recording", "Clip", "StorageValidation", "Timeline"];
                                readonly enum: readonly ["recording", "clip", "storageValidation", "timeline"];
                            };
                            readonly feed: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly tokenId: {
                                            readonly type: readonly ["integer", "null"];
                                        };
                                        readonly streamName: {
                                            readonly type: "string";
                                        };
                                        readonly sourceId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly simulcastId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly priority: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                    };
                                }];
                            };
                            readonly startTime: {
                                readonly type: "string";
                                readonly format: "date";
                            };
                            readonly stopTime: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly storage: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly type: {
                                            readonly description: "Storage provider type";
                                            readonly oneOf: readonly [{
                                                readonly type: "string";
                                                readonly description: "\n\n`gcs` `awsS3` `dolbyStorage`";
                                                readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                                                readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                                            }];
                                        };
                                        readonly path: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                        };
                                    };
                                }];
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`processing` `complete` `error` `deleting` `deleted`";
                                readonly "x-enumNames": readonly ["Processing", "Complete", "Error", "Deleting", "Deleted"];
                                readonly enum: readonly ["processing", "complete", "error", "deleting", "deleted"];
                            };
                            readonly error: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly created: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly expiration: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly removed: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly metadata: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["tracks", "thumbnails"];
                                    readonly properties: {
                                        readonly format: {
                                            readonly type: "string";
                                        };
                                        readonly sizes: {
                                            readonly type: readonly ["object", "null"];
                                            readonly additionalProperties: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                        };
                                        readonly tracks: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                    };
                                                    readonly codec: {
                                                        readonly type: "string";
                                                    };
                                                    readonly bitrate: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly width: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly height: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly framerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly channels: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly samplerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int64";
                                                        readonly minimum: -9223372036854776000;
                                                        readonly maximum: 9223372036854776000;
                                                    };
                                                };
                                            };
                                        };
                                        readonly thumbnails: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const MediaAssetsMediaAssetIdGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly mediaAssetId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["mediaAssetId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "\n\n`recording` `clip` `storageValidation` `timeline`";
                            readonly "x-enumNames": readonly ["Recording", "Clip", "StorageValidation", "Timeline"];
                            readonly enum: readonly ["recording", "clip", "storageValidation", "timeline"];
                        };
                        readonly feed: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly tokenId: {
                                        readonly type: readonly ["integer", "null"];
                                    };
                                    readonly streamName: {
                                        readonly type: "string";
                                    };
                                    readonly sourceId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly simulcastId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly priority: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                            }];
                        };
                        readonly startTime: {
                            readonly type: "string";
                            readonly format: "date";
                        };
                        readonly stopTime: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly storage: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly type: {
                                        readonly description: "Storage provider type";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`gcs` `awsS3` `dolbyStorage`";
                                            readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                                            readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                                        }];
                                    };
                                    readonly path: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                    };
                                };
                            }];
                        };
                        readonly status: {
                            readonly type: "string";
                            readonly description: "\n\n`processing` `complete` `error` `deleting` `deleted`";
                            readonly "x-enumNames": readonly ["Processing", "Complete", "Error", "Deleting", "Deleted"];
                            readonly enum: readonly ["processing", "complete", "error", "deleting", "deleted"];
                        };
                        readonly error: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly created: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly expiration: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly removed: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly metadata: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["tracks", "thumbnails"];
                                readonly properties: {
                                    readonly format: {
                                        readonly type: "string";
                                    };
                                    readonly sizes: {
                                        readonly type: readonly ["object", "null"];
                                        readonly additionalProperties: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                    readonly duration: {
                                        readonly type: "integer";
                                    };
                                    readonly tracks: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly type: {
                                                    readonly type: "string";
                                                };
                                                readonly codec: {
                                                    readonly type: "string";
                                                };
                                                readonly bitrate: {
                                                    readonly type: "integer";
                                                };
                                                readonly width: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly height: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly framerate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly channels: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly samplerate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                            };
                                        };
                                    };
                                    readonly thumbnails: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            }];
                        };
                        readonly download: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly downloadUrl: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly downloadExpiresOn: {
                                        readonly type: "string";
                                        readonly format: "date-time";
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const MediaAssetsPost: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["streamName", "startTime"];
        readonly properties: {
            readonly streamName: {
                readonly type: "string";
                readonly description: "Name of stream to create live clip.";
                readonly minLength: 1;
            };
            readonly tokenId: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Publish token of stream.";
            };
            readonly sourceId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. ";
            };
            readonly simulcastId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. <br /> <br /> If this field is omitted, a media asset will be created per available simulcastId <br /> <br /> Otherwise, set the field to `null` to select a source published without a specified simulcastId. <br /> <br />Provide an empty string to select a source published using RTMP/SRT paths where the simulcastId parameter was specified without a defined value as shown in [Multi-source RTMP](https://docs.dolby.io/streaming-apis/docs/multi-source-broadcasting#multi-source-rtmp), i.e. `?simulcastId&...`.<br /> <br />This field can also be set to any standard string.";
            };
            readonly priority: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Optional. Priority level of stream(s) to clip. By default the stream with highest priority for a given sourceId will be chosen to clip.";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly startTime: {
                readonly type: "string";
                readonly description: "Start time of live recording clip. Must be provided to disambiguate between discontinuous streams. Media assets returned will start on or after specified time, depending on the availability of the content requested. Time must be set in the past. <br /><br />ISO 8601 format should be used (eg 2020-01-01T00:00:00Z), all times are expected to be UTC.";
                readonly format: "date";
                readonly minLength: 1;
            };
            readonly stopTime: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Stop time of live recording clip. If not provided, defaults to the current time. Time must be set in the past. <br /><br />ISO 8601 format should be used (eg 2020-01-01T00:00:00Z), all times are expected to be UTC.";
                readonly format: "date";
            };
            readonly name: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Provide a label for the live recording clip. If not specified, this value will be assigned. <br /> <br />`name` must meet the naming requirements recommended by [Google Cloud Storage](https://cloud.google.com/storage/docs/objects#naming) and [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-guidelines). <br /> <br />If a media asset is uploaded to third party storage, the `name` will be used as the name of the uploaded object. To avoid failed uploads the name should be either unique to avoid conflict with existing objects in the upload location or if overwriting existing objects is desired, appropriate permissions must be granted: [DELETE permissions must be granted to us](https://docs.dolby.io/streaming-apis/docs/live-clipping#granting-dolbyio-access-to-your-gcp-storage). <br /> <br />`name` may not contain carriage return or line feed characters, or any of the characters #, [, ], *, ?, :, \", “, ”, <, >, |, /, {, }, ^, %, `, ~.";
                readonly maxLength: 256;
                readonly minLength: 1;
            };
            readonly storage: {
                readonly description: "Optional. Provide storage configurations for clip. If unspecified your default storage profile will be used, or our storage buckets if the former does not exist. <br /> <br />If specifying user-defined storage, please refer to setup instructions to grant us upload access to buckets and ensure that configurations have been tested using [Test Storage Configuration](#tag/RecordFileTasks/operation/Account_ValidateStorageProfile). ";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly profileId: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Optional. Provide the id of a storage profile. Mutually exclusive with Type.";
                        };
                        readonly type: {
                            readonly description: "Optional. Use to indicate the storage provider type for a one-off storage configuration. Mutually exclusive with ProfileId. Storage provider type. One of the following:\n* awsS3 - Amazon S3\n* gcs - Google Cloud Storage\n* dolbyStorage - Dolby.io's storage buckets. Call Read Media Asset to retrieve the clip file.";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "";
                                readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                                readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                            }];
                        };
                        readonly options: {
                            readonly description: "May be used in the following ways: <br />1. Optional. Override parameters of a storage profile specified via ProfileId <br />2. Required. Set parameters for a one-off storage configuration when Type is provided <br /> 3. Optional. Override parameters of the default storage profile if neither ProfileId or Type are provided";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly objectPrefix: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. Ignored when using Dolby.io's storage buckets. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                                        readonly maxLength: 1000;
                                        readonly minLength: 0;
                                    };
                                    readonly bucketName: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access.";
                                    };
                                    readonly bucketRegion: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Region of the specified bucket if using storage provider awsS3";
                                        readonly maxLength: 32;
                                        readonly minLength: 1;
                                    };
                                };
                            }];
                        };
                    };
                }];
            };
            readonly expiration: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Provide expiry time for live recording clip. <br /><br />If not specified, file will be retained until removed via [Delete Files](#operation/RecordFilesV2_DeleteRecordFileItems). <br /><br />Has no effect when files are uploaded to user-specified storage locations. ";
                readonly format: "date";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly description: "\n\n`recording` `clip` `storageValidation` `timeline`";
                                readonly "x-enumNames": readonly ["Recording", "Clip", "StorageValidation", "Timeline"];
                                readonly enum: readonly ["recording", "clip", "storageValidation", "timeline"];
                            };
                            readonly feed: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly tokenId: {
                                            readonly type: readonly ["integer", "null"];
                                        };
                                        readonly streamName: {
                                            readonly type: "string";
                                        };
                                        readonly sourceId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly simulcastId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly priority: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                    };
                                }];
                            };
                            readonly startTime: {
                                readonly type: "string";
                                readonly format: "date";
                            };
                            readonly stopTime: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly storage: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly type: {
                                            readonly description: "Storage provider type";
                                            readonly oneOf: readonly [{
                                                readonly type: "string";
                                                readonly description: "\n\n`gcs` `awsS3` `dolbyStorage`";
                                                readonly "x-enumNames": readonly ["gcs", "awsS3", "dolbyStorage"];
                                                readonly enum: readonly ["gcs", "awsS3", "dolbyStorage"];
                                            }];
                                        };
                                        readonly path: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                        };
                                    };
                                }];
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`processing` `complete` `error` `deleting` `deleted`";
                                readonly "x-enumNames": readonly ["Processing", "Complete", "Error", "Deleting", "Deleted"];
                                readonly enum: readonly ["processing", "complete", "error", "deleting", "deleted"];
                            };
                            readonly error: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly created: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly expiration: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly removed: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly metadata: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["tracks", "thumbnails"];
                                    readonly properties: {
                                        readonly format: {
                                            readonly type: "string";
                                        };
                                        readonly sizes: {
                                            readonly type: readonly ["object", "null"];
                                            readonly additionalProperties: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                        };
                                        readonly tracks: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                    };
                                                    readonly codec: {
                                                        readonly type: "string";
                                                    };
                                                    readonly bitrate: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly width: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly height: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly framerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly channels: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly samplerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int64";
                                                        readonly minimum: -9223372036854776000;
                                                        readonly maximum: 9223372036854776000;
                                                    };
                                                };
                                            };
                                        };
                                        readonly thumbnails: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const MonitoringGetStream: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly streamName: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The URL encoded name of the stream.";
                };
            };
            readonly required: readonly ["streamName"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly streamId: {
                            readonly type: "string";
                            readonly description: "A unique identifier for the stream.";
                        };
                        readonly streamName: {
                            readonly type: "string";
                            readonly description: "The name of the stream being distributed.";
                        };
                        readonly clusterId: {
                            readonly type: "string";
                            readonly description: "The unique identifier for the origin cluster.";
                        };
                        readonly clusters: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "A list of unique identifiers for the cluster regions to use.";
                        };
                        readonly secureStream: {
                            readonly type: "boolean";
                            readonly description: "Indicates whether or not subscribe tokens are necessary for playback.";
                        };
                        readonly isRecordingAllowed: {
                            readonly type: "boolean";
                            readonly description: "Indicates whether or not the stream is enabled for recording.";
                        };
                        readonly multisource: {
                            readonly type: "boolean";
                            readonly description: "Indicates whether or not the stream is enabled for multi-source contribution.";
                        };
                        readonly live: {
                            readonly type: "boolean";
                            readonly description: "Indicates whether or not the stream is currently live.";
                        };
                        readonly startTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "The datetime when the stream began.";
                        };
                        readonly endTime: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                            readonly description: "The datetime when the broadcast ended if no longer live.";
                        };
                        readonly viewerCount: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "The most recent value for the number of viewers.";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly hasRedundant: {
                            readonly type: "boolean";
                            readonly description: "Indicates whether or not the stream has a backup publishing source.";
                        };
                        readonly restreaming: {
                            readonly type: "boolean";
                            readonly description: "Whether or not restreaming is supported.";
                        };
                        readonly feeds: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly streamId: {
                                        readonly type: "string";
                                        readonly description: "A unique identifier for the stream.";
                                    };
                                    readonly feedId: {
                                        readonly type: "string";
                                        readonly description: "A unique identifier for each feed that is broadcasting.";
                                    };
                                    readonly clusterId: {
                                        readonly type: "string";
                                        readonly description: "The unique identifier for the origin cluster.";
                                    };
                                    readonly sourceId: {
                                        readonly type: "string";
                                        readonly description: "An identifier for the source. Should be unique for multi-view but will be identical for MBR contribution and redundant ingest.";
                                    };
                                    readonly simulcastId: {
                                        readonly type: "string";
                                        readonly description: "An identifier for simulcast.";
                                    };
                                    readonly serverId: {
                                        readonly type: "string";
                                        readonly description: "An identifier for the origin server used for publishing.";
                                    };
                                    readonly active: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether or not the feed is actively broadcasting.";
                                    };
                                    readonly startTime: {
                                        readonly type: "string";
                                        readonly format: "date-time";
                                        readonly description: "The datetime when the stream began.";
                                    };
                                    readonly endTime: {
                                        readonly type: readonly ["string", "null"];
                                        readonly format: "date-time";
                                        readonly description: "The datetime when the broadcast ended if no longer live.";
                                    };
                                    readonly isRecordingAllowed: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether or not the stream is enabled for recording.";
                                    };
                                    readonly packetLoss: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "The number of packets lost from the publishing feed.";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly isRedundant: {
                                        readonly type: readonly ["boolean", "null"];
                                        readonly description: "Indicates whether or not there is more than one backup publishing feed.";
                                    };
                                    readonly priority: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly description: "The priority value to indicate the order of redundant ingest";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly description: "The type of broadcast.";
                                    };
                                    readonly tokenId: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "A unique identifier for the publishing token.";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly client: {
                                        readonly description: "Additional details about the broadcast client application.";
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly properties: {
                                            readonly country: {
                                                readonly type: "string";
                                                readonly description: "The country identified from the IP address of the broadcast source.";
                                            };
                                            readonly city: {
                                                readonly type: "string";
                                                readonly description: "The closest city identified from the IP address of the broadcast source.";
                                            };
                                            readonly continent: {
                                                readonly type: "string";
                                                readonly description: "The continent identified from the IP address of the broadcast source.";
                                            };
                                            readonly coordinates: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "number";
                                                    readonly format: "decimal";
                                                };
                                                readonly description: "Latitude and Longitude GPS coordinates for the IP address of the broadcast source.";
                                            };
                                            readonly sub: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                };
                                                readonly description: "sub";
                                            };
                                            readonly ip: {
                                                readonly type: "string";
                                                readonly description: "The IP address of the broadcast source.";
                                            };
                                        };
                                    };
                                    readonly restreams: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly label: {
                                                    readonly type: "string";
                                                };
                                                readonly index: {
                                                    readonly type: "integer";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly url: {
                                                    readonly type: "string";
                                                };
                                                readonly active: {
                                                    readonly type: "boolean";
                                                };
                                                readonly events: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly additionalProperties: false;
                                                        readonly properties: {
                                                            readonly started: {
                                                                readonly type: "string";
                                                                readonly format: "date-time";
                                                            };
                                                            readonly ended: {
                                                                readonly type: readonly ["string", "null"];
                                                                readonly format: "date-time";
                                                            };
                                                            readonly error: {
                                                                readonly type: "string";
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly description: "The list of media servers to target for restreaming.";
                                    };
                                    readonly trackDetails: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly trackId: {
                                                    readonly type: "string";
                                                    readonly description: "An identifier for each track included in the broadcast.";
                                                };
                                                readonly encodingDetails: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly additionalProperties: false;
                                                        readonly properties: {
                                                            readonly encodingId: {
                                                                readonly type: "string";
                                                                readonly description: "An identifier for the encoding setting.";
                                                            };
                                                            readonly encodingStats: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly additionalProperties: false;
                                                                    readonly properties: {
                                                                        readonly timestamp: {
                                                                            readonly type: "string";
                                                                            readonly format: "date-time";
                                                                            readonly description: "The capture time for the feed.";
                                                                        };
                                                                        readonly resolution: {
                                                                            readonly nullable: true;
                                                                            readonly oneOf: readonly [{
                                                                                readonly type: "object";
                                                                                readonly additionalProperties: false;
                                                                                readonly properties: {
                                                                                    readonly height: {
                                                                                        readonly type: "number";
                                                                                        readonly format: "double";
                                                                                        readonly description: "The height of the video frame.";
                                                                                        readonly minimum: -1.7976931348623157e+308;
                                                                                        readonly maximum: 1.7976931348623157e+308;
                                                                                    };
                                                                                    readonly width: {
                                                                                        readonly type: "number";
                                                                                        readonly format: "double";
                                                                                        readonly description: "The width of the video frame.";
                                                                                        readonly minimum: -1.7976931348623157e+308;
                                                                                        readonly maximum: 1.7976931348623157e+308;
                                                                                    };
                                                                                };
                                                                            }];
                                                                            readonly description: "The resolution of the broadcast.";
                                                                        };
                                                                        readonly bitRate: {
                                                                            readonly description: "The bitrate the media is encoded at the source.";
                                                                            readonly type: "object";
                                                                            readonly additionalProperties: false;
                                                                            readonly properties: {
                                                                                readonly audioBitrate: {
                                                                                    readonly type: "number";
                                                                                    readonly format: "double";
                                                                                    readonly description: "The bitrate in which the audio is encoded.";
                                                                                    readonly minimum: -1.7976931348623157e+308;
                                                                                    readonly maximum: 1.7976931348623157e+308;
                                                                                };
                                                                                readonly videoBitrate: {
                                                                                    readonly type: "number";
                                                                                    readonly format: "double";
                                                                                    readonly description: "The bitrate in which the video is encoded.";
                                                                                    readonly minimum: -1.7976931348623157e+308;
                                                                                    readonly maximum: 1.7976931348623157e+308;
                                                                                };
                                                                            };
                                                                        };
                                                                        readonly videoCodec: {
                                                                            readonly type: "string";
                                                                            readonly description: "The video codec being used for encoding.";
                                                                        };
                                                                        readonly audioCodec: {
                                                                            readonly type: "string";
                                                                            readonly description: "The audio codec being used for encoding.";
                                                                        };
                                                                        readonly frames: {
                                                                            readonly type: "integer";
                                                                            readonly format: "int32";
                                                                            readonly description: "The number of frames being transmitted.";
                                                                            readonly minimum: -2147483648;
                                                                            readonly maximum: 2147483647;
                                                                        };
                                                                        readonly rtt: {
                                                                            readonly type: readonly ["number", "null"];
                                                                            readonly format: "double";
                                                                            readonly description: "The round-trip time for the origin server to acknowledge receipt of the encoded stream.";
                                                                            readonly minimum: -1.7976931348623157e+308;
                                                                            readonly maximum: 1.7976931348623157e+308;
                                                                        };
                                                                        readonly bufferTime: {
                                                                            readonly type: readonly ["number", "null"];
                                                                            readonly format: "double";
                                                                            readonly description: "The amount of time encoded video that is buffered before transmission.";
                                                                            readonly minimum: -1.7976931348623157e+308;
                                                                            readonly maximum: 1.7976931348623157e+308;
                                                                        };
                                                                        readonly bFrames: {
                                                                            readonly type: readonly ["number", "null"];
                                                                            readonly format: "double";
                                                                            readonly description: "Indicates whether or not b-frames are included.";
                                                                            readonly minimum: -1.7976931348623157e+308;
                                                                            readonly maximum: 1.7976931348623157e+308;
                                                                        };
                                                                    };
                                                                };
                                                                readonly description: "Additional details about the encoded media.";
                                                            };
                                                        };
                                                    };
                                                    readonly description: "Additional details about the broadcast feed encoding settings.";
                                                };
                                            };
                                        };
                                        readonly description: "Additional details about the audio and video tracks being broadcast.";
                                    };
                                };
                            };
                            readonly description: "Additional details about the contributing ingest feeds.";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const MonitoringListRecentStreams: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 1;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Return results for this page.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to include per page.";
                };
                readonly sortBy: {
                    readonly default: "Live";
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["StreamId", "Cluster", "StartTime", "Duration", "Live", "ViewerCount", "Restream"];
                        readonly enum: readonly ["StreamId", "Cluster", "StartTime", "Duration", "Live", "ViewerCount", "Restream"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Value to use when sorting results.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Reverse the order being sorted.";
                };
                readonly isActive: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return streams that have active ingest feeds.";
                };
                readonly cluster: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return streams that are being ingested by the listed cluster ids.";
                };
                readonly isSecure: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return streams that are secure and require subscribe tokens to view.";
                };
                readonly isMultisource: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return streams that have more than one ingest feed.";
                };
                readonly hasRedundant: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return streams that have a backup ingestion feed.";
                };
                readonly searchSubstring: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return streams with a partial match on the name.";
                };
                readonly isRecordingAllowed: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return streams that allow recordings.";
                };
                readonly isRestreaming: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly transcoderId: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly pagination: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly totalItems: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly totalPages: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly itemsOnPage: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                            }];
                        };
                        readonly data: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly streamId: {
                                        readonly type: "string";
                                        readonly description: "A unique identifier for the stream.";
                                    };
                                    readonly streamName: {
                                        readonly type: "string";
                                        readonly description: "The name of the stream being distributed.";
                                    };
                                    readonly clusterId: {
                                        readonly type: "string";
                                        readonly description: "The unique identifier for the origin cluster.";
                                    };
                                    readonly clusters: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                        readonly description: "A list of unique identifiers for the cluster regions to use.";
                                    };
                                    readonly secureStream: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether or not subscribe tokens are necessary for playback.";
                                    };
                                    readonly isRecordingAllowed: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether or not the stream is enabled for recording.";
                                    };
                                    readonly multisource: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether or not the stream is enabled for multi-source contribution.";
                                    };
                                    readonly live: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether or not the stream is currently live.";
                                    };
                                    readonly startTime: {
                                        readonly type: "string";
                                        readonly format: "date-time";
                                        readonly description: "The datetime when the stream began.";
                                    };
                                    readonly endTime: {
                                        readonly type: readonly ["string", "null"];
                                        readonly format: "date-time";
                                        readonly description: "The datetime when the broadcast ended if no longer live.";
                                    };
                                    readonly viewerCount: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "The most recent value for the number of viewers.";
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly hasRedundant: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates whether or not the stream has a backup publishing source.";
                                    };
                                    readonly restreaming: {
                                        readonly type: "boolean";
                                        readonly description: "Whether or not restreaming is supported.";
                                    };
                                    readonly feeds: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly streamId: {
                                                    readonly type: "string";
                                                    readonly description: "A unique identifier for the stream.";
                                                };
                                                readonly feedId: {
                                                    readonly type: "string";
                                                    readonly description: "A unique identifier for each feed that is broadcasting.";
                                                };
                                                readonly clusterId: {
                                                    readonly type: "string";
                                                    readonly description: "The unique identifier for the origin cluster.";
                                                };
                                                readonly sourceId: {
                                                    readonly type: "string";
                                                    readonly description: "An identifier for the source. Should be unique for multi-view but will be identical for MBR contribution and redundant ingest.";
                                                };
                                                readonly simulcastId: {
                                                    readonly type: "string";
                                                    readonly description: "An identifier for simulcast.";
                                                };
                                                readonly serverId: {
                                                    readonly type: "string";
                                                    readonly description: "An identifier for the origin server used for publishing.";
                                                };
                                                readonly active: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether or not the feed is actively broadcasting.";
                                                };
                                                readonly startTime: {
                                                    readonly type: "string";
                                                    readonly format: "date-time";
                                                    readonly description: "The datetime when the stream began.";
                                                };
                                                readonly endTime: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly format: "date-time";
                                                    readonly description: "The datetime when the broadcast ended if no longer live.";
                                                };
                                                readonly isRecordingAllowed: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates whether or not the stream is enabled for recording.";
                                                };
                                                readonly packetLoss: {
                                                    readonly type: "number";
                                                    readonly format: "double";
                                                    readonly description: "The number of packets lost from the publishing feed.";
                                                    readonly minimum: -1.7976931348623157e+308;
                                                    readonly maximum: 1.7976931348623157e+308;
                                                };
                                                readonly isRedundant: {
                                                    readonly type: readonly ["boolean", "null"];
                                                    readonly description: "Indicates whether or not there is more than one backup publishing feed.";
                                                };
                                                readonly priority: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly description: "The priority value to indicate the order of redundant ingest";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly description: "The type of broadcast.";
                                                };
                                                readonly tokenId: {
                                                    readonly type: "integer";
                                                    readonly format: "int32";
                                                    readonly description: "A unique identifier for the publishing token.";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly client: {
                                                    readonly description: "Additional details about the broadcast client application.";
                                                    readonly type: "object";
                                                    readonly additionalProperties: false;
                                                    readonly properties: {
                                                        readonly country: {
                                                            readonly type: "string";
                                                            readonly description: "The country identified from the IP address of the broadcast source.";
                                                        };
                                                        readonly city: {
                                                            readonly type: "string";
                                                            readonly description: "The closest city identified from the IP address of the broadcast source.";
                                                        };
                                                        readonly continent: {
                                                            readonly type: "string";
                                                            readonly description: "The continent identified from the IP address of the broadcast source.";
                                                        };
                                                        readonly coordinates: {
                                                            readonly type: "array";
                                                            readonly items: {
                                                                readonly type: "number";
                                                                readonly format: "decimal";
                                                            };
                                                            readonly description: "Latitude and Longitude GPS coordinates for the IP address of the broadcast source.";
                                                        };
                                                        readonly sub: {
                                                            readonly type: "array";
                                                            readonly items: {
                                                                readonly type: "string";
                                                            };
                                                            readonly description: "sub";
                                                        };
                                                        readonly ip: {
                                                            readonly type: "string";
                                                            readonly description: "The IP address of the broadcast source.";
                                                        };
                                                    };
                                                };
                                                readonly restreams: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly additionalProperties: false;
                                                        readonly properties: {
                                                            readonly label: {
                                                                readonly type: "string";
                                                            };
                                                            readonly index: {
                                                                readonly type: "integer";
                                                                readonly format: "int32";
                                                                readonly minimum: -2147483648;
                                                                readonly maximum: 2147483647;
                                                            };
                                                            readonly url: {
                                                                readonly type: "string";
                                                            };
                                                            readonly active: {
                                                                readonly type: "boolean";
                                                            };
                                                            readonly events: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly additionalProperties: false;
                                                                    readonly properties: {
                                                                        readonly started: {
                                                                            readonly type: "string";
                                                                            readonly format: "date-time";
                                                                        };
                                                                        readonly ended: {
                                                                            readonly type: readonly ["string", "null"];
                                                                            readonly format: "date-time";
                                                                        };
                                                                        readonly error: {
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly description: "The list of media servers to target for restreaming.";
                                                };
                                                readonly trackDetails: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly additionalProperties: false;
                                                        readonly properties: {
                                                            readonly trackId: {
                                                                readonly type: "string";
                                                                readonly description: "An identifier for each track included in the broadcast.";
                                                            };
                                                            readonly encodingDetails: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly additionalProperties: false;
                                                                    readonly properties: {
                                                                        readonly encodingId: {
                                                                            readonly type: "string";
                                                                            readonly description: "An identifier for the encoding setting.";
                                                                        };
                                                                        readonly encodingStats: {
                                                                            readonly type: "array";
                                                                            readonly items: {
                                                                                readonly type: "object";
                                                                                readonly additionalProperties: false;
                                                                                readonly properties: {
                                                                                    readonly timestamp: {
                                                                                        readonly type: "string";
                                                                                        readonly format: "date-time";
                                                                                        readonly description: "The capture time for the feed.";
                                                                                    };
                                                                                    readonly resolution: {
                                                                                        readonly nullable: true;
                                                                                        readonly oneOf: readonly [{
                                                                                            readonly type: "object";
                                                                                            readonly additionalProperties: false;
                                                                                            readonly properties: {
                                                                                                readonly height: {
                                                                                                    readonly type: "number";
                                                                                                    readonly format: "double";
                                                                                                    readonly description: "The height of the video frame.";
                                                                                                    readonly minimum: -1.7976931348623157e+308;
                                                                                                    readonly maximum: 1.7976931348623157e+308;
                                                                                                };
                                                                                                readonly width: {
                                                                                                    readonly type: "number";
                                                                                                    readonly format: "double";
                                                                                                    readonly description: "The width of the video frame.";
                                                                                                    readonly minimum: -1.7976931348623157e+308;
                                                                                                    readonly maximum: 1.7976931348623157e+308;
                                                                                                };
                                                                                            };
                                                                                        }];
                                                                                        readonly description: "The resolution of the broadcast.";
                                                                                    };
                                                                                    readonly bitRate: {
                                                                                        readonly description: "The bitrate the media is encoded at the source.";
                                                                                        readonly type: "object";
                                                                                        readonly additionalProperties: false;
                                                                                        readonly properties: {
                                                                                            readonly audioBitrate: {
                                                                                                readonly type: "number";
                                                                                                readonly format: "double";
                                                                                                readonly description: "The bitrate in which the audio is encoded.";
                                                                                                readonly minimum: -1.7976931348623157e+308;
                                                                                                readonly maximum: 1.7976931348623157e+308;
                                                                                            };
                                                                                            readonly videoBitrate: {
                                                                                                readonly type: "number";
                                                                                                readonly format: "double";
                                                                                                readonly description: "The bitrate in which the video is encoded.";
                                                                                                readonly minimum: -1.7976931348623157e+308;
                                                                                                readonly maximum: 1.7976931348623157e+308;
                                                                                            };
                                                                                        };
                                                                                    };
                                                                                    readonly videoCodec: {
                                                                                        readonly type: "string";
                                                                                        readonly description: "The video codec being used for encoding.";
                                                                                    };
                                                                                    readonly audioCodec: {
                                                                                        readonly type: "string";
                                                                                        readonly description: "The audio codec being used for encoding.";
                                                                                    };
                                                                                    readonly frames: {
                                                                                        readonly type: "integer";
                                                                                        readonly format: "int32";
                                                                                        readonly description: "The number of frames being transmitted.";
                                                                                        readonly minimum: -2147483648;
                                                                                        readonly maximum: 2147483647;
                                                                                    };
                                                                                    readonly rtt: {
                                                                                        readonly type: readonly ["number", "null"];
                                                                                        readonly format: "double";
                                                                                        readonly description: "The round-trip time for the origin server to acknowledge receipt of the encoded stream.";
                                                                                        readonly minimum: -1.7976931348623157e+308;
                                                                                        readonly maximum: 1.7976931348623157e+308;
                                                                                    };
                                                                                    readonly bufferTime: {
                                                                                        readonly type: readonly ["number", "null"];
                                                                                        readonly format: "double";
                                                                                        readonly description: "The amount of time encoded video that is buffered before transmission.";
                                                                                        readonly minimum: -1.7976931348623157e+308;
                                                                                        readonly maximum: 1.7976931348623157e+308;
                                                                                    };
                                                                                    readonly bFrames: {
                                                                                        readonly type: readonly ["number", "null"];
                                                                                        readonly format: "double";
                                                                                        readonly description: "Indicates whether or not b-frames are included.";
                                                                                        readonly minimum: -1.7976931348623157e+308;
                                                                                        readonly maximum: 1.7976931348623157e+308;
                                                                                    };
                                                                                };
                                                                            };
                                                                            readonly description: "Additional details about the encoded media.";
                                                                        };
                                                                    };
                                                                };
                                                                readonly description: "Additional details about the broadcast feed encoding settings.";
                                                            };
                                                        };
                                                    };
                                                    readonly description: "Additional details about the audio and video tracks being broadcast.";
                                                };
                                            };
                                        };
                                        readonly description: "Additional details about the contributing ingest feeds.";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1CreateToken: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["label", "streams"];
        readonly properties: {
            readonly subscribeRequiresAuth: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Optional. Set to true to require authentication to subscribe to the specified streams. Default is false.";
                readonly default: false;
            };
            readonly record: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Optional. Set to true to allow this publish token to be allowed to record the specified streams. Default is false.";
                readonly default: false;
            };
            readonly clip: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Optional. Set to true to allow this publish token to enable live clipping on specified streams. Default is false. \nThis flag cannot be set to true when the `record` flag is enabled. \nNote: Live clipping is currently in Beta phase. ";
                readonly default: false;
            };
            readonly multisource: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Optional. Set to false to disable the multi source capability for this publish token. Default is true.";
                readonly default: true;
            };
            readonly enableThumbnails: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Optional. Set to true to receive webhook notifications for thumbnails for the specified streams. Default is false. See documentation https://docs.dolby.io/streaming-apis/docs/thumbnail-webhooks";
                readonly default: false;
            };
            readonly displaySrtPassphrase: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Optional. Set to true to display passphrase encryption settings in the dashboard as well as returning the SRT passphrase in response to this API call. Default is false.";
                readonly default: false;
            };
            readonly lowLatencyRtmp: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Optional.";
                readonly default: true;
            };
            readonly geoCascade: {
                readonly description: "Geo cascade settings for cascading stream to other clusters. Defaults to account related setting if unset.";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly isEnabled: {
                            readonly type: readonly ["boolean", "null"];
                            readonly description: "Enable or Disable geo cascade. Defaults to Account settings if unset.";
                        };
                        readonly clusters: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "List of cluster IDs to geo cascade publish stream. List cannot be empty when IsEnabled is true. List is ignored when IsEnabled is set to false. Defaults to '[\"all\"]' if unset.";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                }];
            };
            readonly restream: {
                readonly type: readonly ["array", "null"];
                readonly description: "List of endpoints to restream media.";
                readonly maxItems: 10;
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["url", "key"];
                    readonly properties: {
                        readonly label: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Restream config label";
                            readonly maxLength: 2048;
                            readonly minLength: 0;
                            readonly examples: readonly ["simple_token"];
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly description: "The endpoint to restream media";
                            readonly maxLength: 2048;
                            readonly minLength: 1;
                            readonly examples: readonly ["rtmp://testrtmp.com"];
                        };
                        readonly key: {
                            readonly type: "string";
                            readonly description: "Secret key for restreaming endpoint";
                            readonly maxLength: 512;
                            readonly minLength: 5;
                            readonly examples: readonly ["5ce4d599cfd4a44131e422eaeede2929"];
                        };
                    };
                };
            };
            readonly label: {
                readonly type: "string";
                readonly description: "Name for the token that is used to display in the dashboard.";
                readonly minLength: 1;
                readonly examples: readonly ["simple_token"];
            };
            readonly expires: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Optional. Number of seconds until the token expires. If not specified, the token never expires (default).";
                readonly format: "int32";
                readonly maximum: 2147483647;
                readonly minimum: 1;
            };
            readonly streams: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["streamName"];
                    readonly properties: {
                        readonly streamName: {
                            readonly type: "string";
                            readonly description: "Name of the stream this token can access.";
                            readonly maxLength: 128;
                            readonly minLength: 1;
                            readonly examples: readonly ["stream1"];
                        };
                        readonly isRegex: {
                            readonly type: "boolean";
                            readonly description: "Set to true if the name of the stream is a regular expression.";
                            readonly default: false;
                        };
                    };
                };
            };
            readonly allowedOrigins: {
                readonly type: readonly ["array", "null"];
                readonly description: "Optional. If specified only the domains in list will be allowed in requests to Director API with token. Wildcard subdomains are also allowed, e.g.: \"*.demo.com\". When unspecified (empty list) there are no domain restrictions.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly allowedIpAddresses: {
                readonly type: readonly ["array", "null"];
                readonly description: "Optional. May specify multiple IPv4 addresses or CIDR notated network blocks. If specified, the token will only be usable from those IP addresses. Not currently supported with RTMP.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly bindIpsOnUsage: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Optional. If specified will bind the token to the first X IP addresses used with token in requests to Director API, thus restricting the token to those IP addresses without being known beforehand. Mutually exclusive with allowedIpAddresses option. Not currently supported with RTMP.";
            };
            readonly originCluster: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Cluster to route specified streams to. Default is the account's default cluster.";
            };
            readonly allowedCountries: {
                readonly type: readonly ["array", "null"];
                readonly description: "Optional. Specify the ISO 3166-1 two letter country codes to explicitly allow viewer to watch the stream from. If the viewer's location does not match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream. This geo-fencing rule works in concert with the IP and domain restrictions as well. Specifying geo restriction rules in a token will override account-wide rules. Only one of allowedCountries or deniedCountries should be specified. If the specified streams require authentication, the list of allowed countries can be overridden by the subscribe token.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly deniedCountries: {
                readonly type: readonly ["array", "null"];
                readonly description: "Optional. Specify the ISO 3166-1 two letter country codes to explicitly deny viewer to watch the stream from. If the viewer's location does match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream. This geo-fencing rule works in concert with the IP and domain restrictions as well. Specifying geo restriction rules in a token will override account-wide rules. Only one of allowedCountries or deniedCountries should be specified.If the specified streams require authentication, the list of denied countries can be overridden by the subscribe token.";
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly deprecated: true;
                            readonly "x-deprecatedMessage": "use Label";
                        };
                        readonly subscribeRequiresAuth: {
                            readonly type: "boolean";
                        };
                        readonly record: {
                            readonly type: "boolean";
                        };
                        readonly clip: {
                            readonly type: "boolean";
                        };
                        readonly multisource: {
                            readonly type: "boolean";
                        };
                        readonly enableThumbnails: {
                            readonly type: "boolean";
                        };
                        readonly lowLatencyRtmp: {
                            readonly type: "boolean";
                        };
                        readonly integrationId: {
                            readonly type: "string";
                            readonly description: "\n\n`None` `Maestro` `Passthru` `Internal`";
                            readonly "x-enumNames": readonly ["None", "Maestro", "Passthru", "Internal"];
                            readonly enum: readonly ["None", "Maestro", "Passthru", "Internal"];
                        };
                        readonly displaySrtPassphrase: {
                            readonly type: "boolean";
                        };
                        readonly srtPassphrase: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly geoCascade: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly isEnabled: {
                                        readonly type: readonly ["boolean", "null"];
                                    };
                                    readonly clusters: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            }];
                        };
                        readonly restream: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["url", "key"];
                                readonly properties: {
                                    readonly label: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Restream config label";
                                        readonly maxLength: 2048;
                                        readonly minLength: 0;
                                    };
                                    readonly url: {
                                        readonly type: "string";
                                        readonly description: "The endpoint to restream media";
                                        readonly maxLength: 2048;
                                        readonly minLength: 1;
                                    };
                                    readonly key: {
                                        readonly type: "string";
                                        readonly description: "Secret key for restreaming endpoint";
                                        readonly maxLength: 512;
                                        readonly minLength: 5;
                                    };
                                };
                            };
                        };
                        readonly adminSettings: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly forcedServerId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            }];
                        };
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly label: {
                            readonly type: "string";
                            readonly description: "Friendly name of token";
                        };
                        readonly token: {
                            readonly type: "string";
                            readonly description: "Actual token";
                        };
                        readonly addedOn: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly expiresOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly isActive: {
                            readonly type: "boolean";
                        };
                        readonly streams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly streamName: {
                                        readonly type: "string";
                                    };
                                    readonly isRegex: {
                                        readonly type: "boolean";
                                    };
                                };
                            };
                        };
                        readonly allowedOrigins: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly allowedIpAddresses: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly bindIpsOnUsage: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly originCluster: {
                            readonly type: "string";
                        };
                        readonly effectiveSettings: {
                            readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly originCluster: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly allowedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly deniedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly geoCascade: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly isEnabled: {
                                                    readonly type: readonly ["boolean", "null"];
                                                };
                                                readonly clusters: {
                                                    readonly type: readonly ["array", "null"];
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1DeleteToken: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly tokenId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["tokenId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1DisableTokens: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["tokenIds"];
        readonly properties: {
            readonly tokenIds: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "integer";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly successfulTokens: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "integer";
                            };
                        };
                        readonly failedTokens: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly tokenId: {
                                        readonly type: "integer";
                                    };
                                    readonly errorMessage: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1GetActiveTokenByStreamId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly streamId: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["streamId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly tokenIds: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "integer";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1GetAllActiveTokensByAccount: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly tokenIds: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "integer";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1ListTokens: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sortBy: {
                    readonly default: "Name";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Name", "AddedOn"];
                        readonly enum: readonly ["Name", "AddedOn"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                                readonly deprecated: true;
                                readonly "x-deprecatedMessage": "use Label";
                            };
                            readonly subscribeRequiresAuth: {
                                readonly type: "boolean";
                            };
                            readonly record: {
                                readonly type: "boolean";
                            };
                            readonly clip: {
                                readonly type: "boolean";
                            };
                            readonly multisource: {
                                readonly type: "boolean";
                            };
                            readonly enableThumbnails: {
                                readonly type: "boolean";
                            };
                            readonly lowLatencyRtmp: {
                                readonly type: "boolean";
                            };
                            readonly integrationId: {
                                readonly type: "string";
                                readonly description: "\n\n`None` `Maestro` `Passthru` `Internal`";
                                readonly "x-enumNames": readonly ["None", "Maestro", "Passthru", "Internal"];
                                readonly enum: readonly ["None", "Maestro", "Passthru", "Internal"];
                            };
                            readonly displaySrtPassphrase: {
                                readonly type: "boolean";
                            };
                            readonly srtPassphrase: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly geoCascade: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly isEnabled: {
                                            readonly type: readonly ["boolean", "null"];
                                        };
                                        readonly clusters: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                            readonly restream: {
                                readonly type: readonly ["array", "null"];
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["url", "key"];
                                    readonly properties: {
                                        readonly label: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Restream config label";
                                            readonly maxLength: 2048;
                                            readonly minLength: 0;
                                        };
                                        readonly url: {
                                            readonly type: "string";
                                            readonly description: "The endpoint to restream media";
                                            readonly maxLength: 2048;
                                            readonly minLength: 1;
                                        };
                                        readonly key: {
                                            readonly type: "string";
                                            readonly description: "Secret key for restreaming endpoint";
                                            readonly maxLength: 512;
                                            readonly minLength: 5;
                                        };
                                    };
                                };
                            };
                            readonly adminSettings: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly forcedServerId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                    };
                                }];
                            };
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly label: {
                                readonly type: "string";
                                readonly description: "Friendly name of token";
                            };
                            readonly token: {
                                readonly type: "string";
                                readonly description: "Actual token";
                            };
                            readonly addedOn: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly expiresOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly isActive: {
                                readonly type: "boolean";
                            };
                            readonly streams: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly streamName: {
                                            readonly type: "string";
                                        };
                                        readonly isRegex: {
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                            };
                            readonly allowedOrigins: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly allowedIpAddresses: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly bindIpsOnUsage: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly originCluster: {
                                readonly type: "string";
                            };
                            readonly effectiveSettings: {
                                readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly originCluster: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly allowedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly deniedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly geoCascade: {
                                            readonly nullable: true;
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly isEnabled: {
                                                        readonly type: readonly ["boolean", "null"];
                                                    };
                                                    readonly clusters: {
                                                        readonly type: readonly ["array", "null"];
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                }];
                            };
                            readonly allowedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly deniedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1ListTokensByCluster: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cluster: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sortBy: {
                    readonly default: "Name";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Name", "AddedOn"];
                        readonly enum: readonly ["Name", "AddedOn"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["cluster", "page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                                readonly deprecated: true;
                                readonly "x-deprecatedMessage": "use Label";
                            };
                            readonly subscribeRequiresAuth: {
                                readonly type: "boolean";
                            };
                            readonly record: {
                                readonly type: "boolean";
                            };
                            readonly clip: {
                                readonly type: "boolean";
                            };
                            readonly multisource: {
                                readonly type: "boolean";
                            };
                            readonly enableThumbnails: {
                                readonly type: "boolean";
                            };
                            readonly lowLatencyRtmp: {
                                readonly type: "boolean";
                            };
                            readonly integrationId: {
                                readonly type: "string";
                                readonly description: "\n\n`None` `Maestro` `Passthru` `Internal`";
                                readonly "x-enumNames": readonly ["None", "Maestro", "Passthru", "Internal"];
                                readonly enum: readonly ["None", "Maestro", "Passthru", "Internal"];
                            };
                            readonly displaySrtPassphrase: {
                                readonly type: "boolean";
                            };
                            readonly srtPassphrase: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly geoCascade: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly isEnabled: {
                                            readonly type: readonly ["boolean", "null"];
                                        };
                                        readonly clusters: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                            readonly restream: {
                                readonly type: readonly ["array", "null"];
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["url", "key"];
                                    readonly properties: {
                                        readonly label: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Restream config label";
                                            readonly maxLength: 2048;
                                            readonly minLength: 0;
                                        };
                                        readonly url: {
                                            readonly type: "string";
                                            readonly description: "The endpoint to restream media";
                                            readonly maxLength: 2048;
                                            readonly minLength: 1;
                                        };
                                        readonly key: {
                                            readonly type: "string";
                                            readonly description: "Secret key for restreaming endpoint";
                                            readonly maxLength: 512;
                                            readonly minLength: 5;
                                        };
                                    };
                                };
                            };
                            readonly adminSettings: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly forcedServerId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                    };
                                }];
                            };
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly label: {
                                readonly type: "string";
                                readonly description: "Friendly name of token";
                            };
                            readonly token: {
                                readonly type: "string";
                                readonly description: "Actual token";
                            };
                            readonly addedOn: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly expiresOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly isActive: {
                                readonly type: "boolean";
                            };
                            readonly streams: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly streamName: {
                                            readonly type: "string";
                                        };
                                        readonly isRegex: {
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                            };
                            readonly allowedOrigins: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly allowedIpAddresses: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly bindIpsOnUsage: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly originCluster: {
                                readonly type: "string";
                            };
                            readonly effectiveSettings: {
                                readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly originCluster: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly allowedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly deniedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly geoCascade: {
                                            readonly nullable: true;
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly isEnabled: {
                                                        readonly type: readonly ["boolean", "null"];
                                                    };
                                                    readonly clusters: {
                                                        readonly type: readonly ["array", "null"];
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                }];
                            };
                            readonly allowedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly deniedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1ListTokensByName: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly filterBy: {
                    readonly default: "TokenOrStreamName";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["None", "TokenName", "StreamName", "TokenOrStreamName"];
                        readonly enum: readonly ["None", "TokenName", "StreamName", "TokenOrStreamName"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sortBy: {
                    readonly default: "Name";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Name", "AddedOn"];
                        readonly enum: readonly ["Name", "AddedOn"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["name", "page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                                readonly deprecated: true;
                                readonly "x-deprecatedMessage": "use Label";
                            };
                            readonly subscribeRequiresAuth: {
                                readonly type: "boolean";
                            };
                            readonly record: {
                                readonly type: "boolean";
                            };
                            readonly clip: {
                                readonly type: "boolean";
                            };
                            readonly multisource: {
                                readonly type: "boolean";
                            };
                            readonly enableThumbnails: {
                                readonly type: "boolean";
                            };
                            readonly lowLatencyRtmp: {
                                readonly type: "boolean";
                            };
                            readonly integrationId: {
                                readonly type: "string";
                                readonly description: "\n\n`None` `Maestro` `Passthru` `Internal`";
                                readonly "x-enumNames": readonly ["None", "Maestro", "Passthru", "Internal"];
                                readonly enum: readonly ["None", "Maestro", "Passthru", "Internal"];
                            };
                            readonly displaySrtPassphrase: {
                                readonly type: "boolean";
                            };
                            readonly srtPassphrase: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly geoCascade: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly isEnabled: {
                                            readonly type: readonly ["boolean", "null"];
                                        };
                                        readonly clusters: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                            readonly restream: {
                                readonly type: readonly ["array", "null"];
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["url", "key"];
                                    readonly properties: {
                                        readonly label: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Restream config label";
                                            readonly maxLength: 2048;
                                            readonly minLength: 0;
                                        };
                                        readonly url: {
                                            readonly type: "string";
                                            readonly description: "The endpoint to restream media";
                                            readonly maxLength: 2048;
                                            readonly minLength: 1;
                                        };
                                        readonly key: {
                                            readonly type: "string";
                                            readonly description: "Secret key for restreaming endpoint";
                                            readonly maxLength: 512;
                                            readonly minLength: 5;
                                        };
                                    };
                                };
                            };
                            readonly adminSettings: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly forcedServerId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                    };
                                }];
                            };
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly label: {
                                readonly type: "string";
                                readonly description: "Friendly name of token";
                            };
                            readonly token: {
                                readonly type: "string";
                                readonly description: "Actual token";
                            };
                            readonly addedOn: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly expiresOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly isActive: {
                                readonly type: "boolean";
                            };
                            readonly streams: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly streamName: {
                                            readonly type: "string";
                                        };
                                        readonly isRegex: {
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                            };
                            readonly allowedOrigins: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly allowedIpAddresses: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly bindIpsOnUsage: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly originCluster: {
                                readonly type: "string";
                            };
                            readonly effectiveSettings: {
                                readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly originCluster: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly allowedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly deniedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly geoCascade: {
                                            readonly nullable: true;
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly isEnabled: {
                                                        readonly type: readonly ["boolean", "null"];
                                                    };
                                                    readonly clusters: {
                                                        readonly type: readonly ["array", "null"];
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                }];
                            };
                            readonly allowedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly deniedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1ReadToken: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly tokenId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["tokenId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly deprecated: true;
                            readonly "x-deprecatedMessage": "use Label";
                        };
                        readonly subscribeRequiresAuth: {
                            readonly type: "boolean";
                        };
                        readonly record: {
                            readonly type: "boolean";
                        };
                        readonly clip: {
                            readonly type: "boolean";
                        };
                        readonly multisource: {
                            readonly type: "boolean";
                        };
                        readonly enableThumbnails: {
                            readonly type: "boolean";
                        };
                        readonly lowLatencyRtmp: {
                            readonly type: "boolean";
                        };
                        readonly integrationId: {
                            readonly type: "string";
                            readonly description: "\n\n`None` `Maestro` `Passthru` `Internal`";
                            readonly "x-enumNames": readonly ["None", "Maestro", "Passthru", "Internal"];
                            readonly enum: readonly ["None", "Maestro", "Passthru", "Internal"];
                        };
                        readonly displaySrtPassphrase: {
                            readonly type: "boolean";
                        };
                        readonly srtPassphrase: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly geoCascade: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly isEnabled: {
                                        readonly type: readonly ["boolean", "null"];
                                    };
                                    readonly clusters: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            }];
                        };
                        readonly restream: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["url", "key"];
                                readonly properties: {
                                    readonly label: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Restream config label";
                                        readonly maxLength: 2048;
                                        readonly minLength: 0;
                                    };
                                    readonly url: {
                                        readonly type: "string";
                                        readonly description: "The endpoint to restream media";
                                        readonly maxLength: 2048;
                                        readonly minLength: 1;
                                    };
                                    readonly key: {
                                        readonly type: "string";
                                        readonly description: "Secret key for restreaming endpoint";
                                        readonly maxLength: 512;
                                        readonly minLength: 5;
                                    };
                                };
                            };
                        };
                        readonly adminSettings: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly forcedServerId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            }];
                        };
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly label: {
                            readonly type: "string";
                            readonly description: "Friendly name of token";
                        };
                        readonly token: {
                            readonly type: "string";
                            readonly description: "Actual token";
                        };
                        readonly addedOn: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly expiresOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly isActive: {
                            readonly type: "boolean";
                        };
                        readonly streams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly streamName: {
                                        readonly type: "string";
                                    };
                                    readonly isRegex: {
                                        readonly type: "boolean";
                                    };
                                };
                            };
                        };
                        readonly allowedOrigins: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly allowedIpAddresses: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly bindIpsOnUsage: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly originCluster: {
                            readonly type: "string";
                        };
                        readonly effectiveSettings: {
                            readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly originCluster: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly allowedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly deniedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly geoCascade: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly isEnabled: {
                                                    readonly type: readonly ["boolean", "null"];
                                                };
                                                readonly clusters: {
                                                    readonly type: readonly ["array", "null"];
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PublishTokenV1UpdateToken: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly subscribeRequiresAuth: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly record: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly clip: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly multisource: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly lowLatencyRtmp: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly enableThumbnails: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly displaySrtPassphrase: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly updateGeoCascade: {
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly isEnabled: {
                            readonly type: readonly ["boolean", "null"];
                            readonly description: "Enable or Disable geo cascade. Defaults to Account settings if unset.";
                        };
                        readonly clusters: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "List of cluster IDs to geo cascade publish stream. List cannot be empty when IsEnabled is true. List is ignored when IsEnabled is set to false. Defaults to '[\"all\"]' if unset.";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                }];
            };
            readonly updateRestream: {
                readonly type: readonly ["array", "null"];
                readonly description: "List of endpoints to restream media.";
                readonly maxItems: 10;
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["url", "key"];
                    readonly properties: {
                        readonly label: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Restream config label";
                            readonly maxLength: 2048;
                            readonly minLength: 0;
                            readonly examples: readonly ["new_label_name"];
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly description: "The endpoint to restream media";
                            readonly maxLength: 2048;
                            readonly minLength: 1;
                        };
                        readonly key: {
                            readonly type: "string";
                            readonly description: "Secret key for restreaming endpoint";
                            readonly maxLength: 512;
                            readonly minLength: 5;
                        };
                    };
                };
            };
            readonly label: {
                readonly type: readonly ["string", "null"];
                readonly examples: readonly ["new_label_name"];
            };
            readonly refreshToken: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Generate new unique token, invalidating previous token";
                readonly examples: readonly [true];
            };
            readonly isActive: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly addTokenStreams: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["streamName"];
                    readonly properties: {
                        readonly streamName: {
                            readonly type: "string";
                            readonly description: "Name of the stream this token can access.";
                            readonly maxLength: 128;
                            readonly minLength: 1;
                        };
                        readonly isRegex: {
                            readonly type: "boolean";
                            readonly description: "Set to true if the name of the stream is a regular expression.";
                            readonly default: false;
                        };
                    };
                };
            };
            readonly removeTokenStreams: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateAllowedOrigins: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateAllowedIpAddresses: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateBindIpsOnUsage: {
                readonly type: readonly ["integer", "null"];
            };
            readonly updateOriginCluster: {
                readonly type: readonly ["string", "null"];
            };
            readonly updateAllowedCountries: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateDeniedCountries: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly tokenId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["tokenId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly deprecated: true;
                            readonly "x-deprecatedMessage": "use Label";
                        };
                        readonly subscribeRequiresAuth: {
                            readonly type: "boolean";
                        };
                        readonly record: {
                            readonly type: "boolean";
                        };
                        readonly clip: {
                            readonly type: "boolean";
                        };
                        readonly multisource: {
                            readonly type: "boolean";
                        };
                        readonly enableThumbnails: {
                            readonly type: "boolean";
                        };
                        readonly lowLatencyRtmp: {
                            readonly type: "boolean";
                        };
                        readonly integrationId: {
                            readonly type: "string";
                            readonly description: "\n\n`None` `Maestro` `Passthru` `Internal`";
                            readonly "x-enumNames": readonly ["None", "Maestro", "Passthru", "Internal"];
                            readonly enum: readonly ["None", "Maestro", "Passthru", "Internal"];
                        };
                        readonly displaySrtPassphrase: {
                            readonly type: "boolean";
                        };
                        readonly srtPassphrase: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly geoCascade: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly isEnabled: {
                                        readonly type: readonly ["boolean", "null"];
                                    };
                                    readonly clusters: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            }];
                        };
                        readonly restream: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["url", "key"];
                                readonly properties: {
                                    readonly label: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Restream config label";
                                        readonly maxLength: 2048;
                                        readonly minLength: 0;
                                    };
                                    readonly url: {
                                        readonly type: "string";
                                        readonly description: "The endpoint to restream media";
                                        readonly maxLength: 2048;
                                        readonly minLength: 1;
                                    };
                                    readonly key: {
                                        readonly type: "string";
                                        readonly description: "Secret key for restreaming endpoint";
                                        readonly maxLength: 512;
                                        readonly minLength: 5;
                                    };
                                };
                            };
                        };
                        readonly adminSettings: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly forcedServerId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            }];
                        };
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly label: {
                            readonly type: "string";
                            readonly description: "Friendly name of token";
                        };
                        readonly token: {
                            readonly type: "string";
                            readonly description: "Actual token";
                        };
                        readonly addedOn: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly expiresOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly isActive: {
                            readonly type: "boolean";
                        };
                        readonly streams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly streamName: {
                                        readonly type: "string";
                                    };
                                    readonly isRegex: {
                                        readonly type: "boolean";
                                    };
                                };
                            };
                        };
                        readonly allowedOrigins: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly allowedIpAddresses: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly bindIpsOnUsage: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly originCluster: {
                            readonly type: "string";
                        };
                        readonly effectiveSettings: {
                            readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly originCluster: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly allowedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly deniedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly geoCascade: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly isEnabled: {
                                                    readonly type: readonly ["boolean", "null"];
                                                };
                                                readonly clusters: {
                                                    readonly type: readonly ["array", "null"];
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesCreateRecordClip: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["streamName", "startTime"];
        readonly properties: {
            readonly tokenId: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Publish token of stream.";
            };
            readonly streamName: {
                readonly type: "string";
                readonly description: "Name of stream to create live clip.";
                readonly minLength: 1;
            };
            readonly sourceId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. ";
            };
            readonly simulcastId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. ";
            };
            readonly clipName: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Provide a label for the live recording clip. <br /> <br />ClipNames may not exceed 256 characters. ClipNames must meet the naming requirements recommended by [Google Cloud Storage](https://cloud.google.com/storage/docs/objects#naming) and [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html#object-key-guidelines). <br /> <br />If a media asset is uploaded to third party storage, the `clipName` will be used as the name of the uploaded object. To avoid failed uploads the name should be either unique to avoid conflict with existing objects in the upload location or if overwriting existing objects is desired, appropriate permissions must be granted: [DELETE permissions must be granted to Dolby.io](https://docs.dolby.io/streaming-apis/docs/live-clipping#granting-dolbyio-access-to-your-gcp-storage). <br /> <br />ClipNames may not contain carriage return or line feed characters, or any of the characters #, [, ], *, ?, :, \", “, ”, <, >, |, /, {, }, ^, %, `, ~.";
                readonly maxLength: 256;
                readonly minLength: 1;
            };
            readonly storage: {
                readonly description: "Optional. Provide storage configurations for clip. If unspecified, defaults to Dolby.io's storage buckets. <br /> <br />If specifying user-defined storage, please refer to setup instructions to grant Dolby.io upload access to buckets and ensure that configurations have been tested using [Test Storage Configuration](#tag/RecordFileTasks/operation/RecordFileTasks_TestRecordFileStorage). ";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly objectPrefix: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Optional. Prefix to object when stored in bucket i.e. `protocol`://`bucketName`/`objectPrefix`/`objectName.ext`. Ignored when using Dolby.io's storage buckets. `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.";
                        };
                        readonly storageType: {
                            readonly description: "Optional. Storage provider type. If not specified, defaults to Dolby.io's storage buckets. ";
                            readonly default: "Default";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "";
                                readonly "x-enumNames": readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                readonly enum: readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                            }];
                        };
                        readonly gcsStorageConfig: {
                            readonly description: "Optional unless `\"Gcs\"` is specified for `StorageType`";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["bucketName"];
                                readonly properties: {
                                    readonly bucketName: {
                                        readonly type: "string";
                                        readonly description: "Name of bucket to upload clips to. Please ensure Dolby.io's service account is granted access to `gs://bucketName`. ";
                                        readonly minLength: 1;
                                    };
                                };
                            }];
                        };
                        readonly awsS3StorageConfig: {
                            readonly description: "Optional unless `\"AwsS3\"` is specified for `StorageType`";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["bucketName", "bucketRegion"];
                                readonly properties: {
                                    readonly bucketName: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                    readonly bucketRegion: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                            }];
                        };
                    };
                }];
            };
            readonly expiresOn: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Provide expiry time for live recording clip. <br /><br />If not specified, file will be retained until removed via [Delete Files](#operation/RecordFilesV2_DeleteRecordFileItems). <br /><br />Has no effect when files are uploaded to user-specified storage locations. ";
                readonly format: "date";
            };
            readonly startTime: {
                readonly type: "string";
                readonly description: "Start time of live recording clip. Must be provided to disambiguate between discontinuous streams. Recordings returned will start on or after specified time, depending on the actual start time of the content request. Time must be set in the past. <br /><br />ISO 8601 format should be used (eg 2020-01-01T00:00:00Z), all times are expected to be UTC.";
                readonly format: "date";
                readonly minLength: 1;
            };
            readonly stopTime: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Stop time of live recording clip. If not provided, defaults to the current time. Time must be set in the past. <br /><br />ISO 8601 format should be used (eg 2020-01-01T00:00:00Z), all times are expected to be UTC.";
                readonly format: "date";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly status: {
                            readonly type: "string";
                            readonly description: "\n\n`Open` `InProgress` `Complete` `Error` `Invalid` `Started` `Deleted` `Expiring` `Deleting`";
                            readonly "x-enumNames": readonly ["Open", "InProgress", "Complete", "Error", "Invalid", "Started", "Deleted", "Expiring", "Deleting"];
                            readonly enum: readonly ["Open", "InProgress", "Complete", "Error", "Invalid", "Started", "Deleted", "Expiring", "Deleting"];
                        };
                        readonly streamName: {
                            readonly type: "string";
                        };
                        readonly sourceId: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly simulcastId: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly tokenId: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly itemType: {
                            readonly type: "string";
                            readonly description: "\n\n`FullRecording` `Clip` `StorageValidation` `Timeline`";
                            readonly "x-enumNames": readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                            readonly enum: readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                        };
                        readonly storage: {
                            readonly description: "Storage information";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly storageType: {
                                        readonly description: "Storage provider type";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`Default` `Gcs` `AwsS3` `DolbyStorage`";
                                            readonly "x-enumNames": readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                            readonly enum: readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                        }];
                                    };
                                    readonly storagePath: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                    };
                                };
                            }];
                        };
                        readonly removedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly clipName: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Clip label if assigned by user";
                        };
                        readonly clipRequestId: {
                            readonly type: "string";
                            readonly description: "Id associated with clipping request";
                        };
                        readonly startTime: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly stopTime: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly expiresOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly mediaAssets: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "List of media asset ids and statuses associated with this clip request. Call Read Media Asset to retrieve the record file and information about each media asset. ";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly id: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                        readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                                        readonly "x-enumFlags": true;
                                        readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                        readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesDeleteAllRecordFiles: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesDeleteClipRequestLive: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly clipRequestId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["clipRequestId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly errors: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly mediaAssetId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly error: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesDeleteClipSources: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["clipSourceIds"];
        readonly properties: {
            readonly clipSourceIds: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "integer";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "204": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly recordedOn: {
                                readonly type: "string";
                            };
                            readonly stoppedOn: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly streamName: {
                                readonly type: "string";
                            };
                            readonly sourceId: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly simulcastId: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly tokenId: {
                                readonly type: "integer";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                                readonly "x-enumFlags": true;
                                readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesDeleteExpiryRule: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesDeleteRecordFile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly recordFileId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["recordFileId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesDeleteRecordFiles: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["recordFileIds"];
        readonly properties: {
            readonly recordFileIds: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "integer";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesGetClipRequest: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly clipRequestId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Id obtained from start clip request";
                };
            };
            readonly required: readonly ["clipRequestId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly status: {
                            readonly type: "string";
                            readonly description: "\n\n`Open` `InProgress` `Complete` `Error` `Invalid` `Started` `Deleted` `Expiring` `Deleting`";
                            readonly "x-enumNames": readonly ["Open", "InProgress", "Complete", "Error", "Invalid", "Started", "Deleted", "Expiring", "Deleting"];
                            readonly enum: readonly ["Open", "InProgress", "Complete", "Error", "Invalid", "Started", "Deleted", "Expiring", "Deleting"];
                        };
                        readonly streamName: {
                            readonly type: "string";
                        };
                        readonly sourceId: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly simulcastId: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly tokenId: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly itemType: {
                            readonly type: "string";
                            readonly description: "\n\n`FullRecording` `Clip` `StorageValidation` `Timeline`";
                            readonly "x-enumNames": readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                            readonly enum: readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                        };
                        readonly storage: {
                            readonly description: "Storage information";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly storageType: {
                                        readonly description: "Storage provider type";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`Default` `Gcs` `AwsS3` `DolbyStorage`";
                                            readonly "x-enumNames": readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                            readonly enum: readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                        }];
                                    };
                                    readonly storagePath: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                    };
                                };
                            }];
                        };
                        readonly removedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly clipName: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Clip label if assigned by user";
                        };
                        readonly clipRequestId: {
                            readonly type: "string";
                            readonly description: "Id associated with clipping request";
                        };
                        readonly startTime: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly stopTime: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly expiresOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date";
                        };
                        readonly mediaAssets: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "List of media asset ids and statuses associated with this clip request. Call Read Media Asset to retrieve the record file and information about each media asset. ";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly id: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                        readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                                        readonly "x-enumFlags": true;
                                        readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                        readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesGetExpiryRule: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly timeSpan: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly days: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly maximum: 365;
                                        readonly minimum: 1;
                                    };
                                };
                            }];
                        };
                        readonly isCustom: {
                            readonly type: "boolean";
                            readonly description: "Indicates whether expiry rule is custom set or using system preset. There will be no guarantee that system preset remains unchanged. ";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesGetRecordFile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly recordFileId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["recordFileId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly tokenId: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly token: {
                            readonly type: "string";
                        };
                        readonly streamName: {
                            readonly type: "string";
                        };
                        readonly recordedOn: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly removedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly status: {
                            readonly type: "string";
                            readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                            readonly "x-enumFlags": true;
                            readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                            readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                        };
                        readonly metadata: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["tracks", "thumbnails"];
                                readonly properties: {
                                    readonly format: {
                                        readonly type: "string";
                                    };
                                    readonly sizes: {
                                        readonly type: readonly ["object", "null"];
                                        readonly additionalProperties: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                    readonly duration: {
                                        readonly type: "integer";
                                    };
                                    readonly tracks: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly type: {
                                                    readonly type: "string";
                                                };
                                                readonly codec: {
                                                    readonly type: "string";
                                                };
                                                readonly bitrate: {
                                                    readonly type: "integer";
                                                };
                                                readonly width: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly height: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly framerate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly channels: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly samplerate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                            };
                                        };
                                    };
                                    readonly thumbnails: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            }];
                        };
                        readonly download: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly downloadUrl: {
                                        readonly type: "string";
                                    };
                                    readonly downloadExpiresOn: {
                                        readonly type: "string";
                                        readonly format: "date-time";
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesListAvailableClipSources: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly tokenId: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Optional. Filter by tokenId.";
            };
            readonly streamName: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by streamName.";
            };
            readonly simulcastId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by SimulcastId.";
            };
            readonly sourceId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by SourceId.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sortBy: {
                    readonly default: "RecordedOn";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["RecordedOn", "StoppedOn"];
                        readonly enum: readonly ["RecordedOn", "StoppedOn"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly recordedOn: {
                                readonly type: "string";
                            };
                            readonly stoppedOn: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly streamName: {
                                readonly type: "string";
                            };
                            readonly sourceId: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly simulcastId: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly tokenId: {
                                readonly type: "integer";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                                readonly "x-enumFlags": true;
                                readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesListClipRequests: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly tokenId: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Optional. Filter by tokenId.";
            };
            readonly streamName: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by streamName.";
            };
            readonly sourceId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by sourceId. ";
            };
            readonly simulcastId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by simulcastId. ";
            };
            readonly status: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["Open", "InProgress", "Complete", "Error", "RawError", "Invalid", "Started"];
                    readonly enum: readonly ["Open", "InProgress", "Complete", "Error", "RawError", "Invalid", "Started"];
                };
            };
            readonly clipRequestId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by clipRequestId. ";
            };
            readonly clipName: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by clipName. ";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sortBy: {
                    readonly default: "RecordedOn";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["RecordedOn", "ExpiresOn"];
                        readonly enum: readonly ["RecordedOn", "ExpiresOn"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly clipName: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "Clip label if assigned by user";
                            };
                            readonly clipRequestId: {
                                readonly type: "string";
                                readonly description: "Id associated with clipping request";
                            };
                            readonly startTime: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly stopTime: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly expiresOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`Open` `InProgress` `Complete` `Error` `Invalid` `Started` `Deleted` `Expiring` `Deleting`";
                                readonly "x-enumNames": readonly ["Open", "InProgress", "Complete", "Error", "Invalid", "Started", "Deleted", "Expiring", "Deleting"];
                                readonly enum: readonly ["Open", "InProgress", "Complete", "Error", "Invalid", "Started", "Deleted", "Expiring", "Deleting"];
                            };
                            readonly streamName: {
                                readonly type: "string";
                            };
                            readonly sourceId: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly simulcastId: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly tokenId: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly itemType: {
                                readonly type: "string";
                                readonly description: "\n\n`FullRecording` `Clip` `StorageValidation` `Timeline`";
                                readonly "x-enumNames": readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                                readonly enum: readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                            };
                            readonly storage: {
                                readonly description: "Storage information";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly storageType: {
                                            readonly description: "Storage provider type";
                                            readonly oneOf: readonly [{
                                                readonly type: "string";
                                                readonly description: "\n\n`Default` `Gcs` `AwsS3` `DolbyStorage`";
                                                readonly "x-enumNames": readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                                readonly enum: readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                            }];
                                        };
                                        readonly storagePath: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                        };
                                    };
                                }];
                            };
                            readonly removedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesListRecordFiles: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sortBy: {
                    readonly default: "RecordedOn";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["RecordedOn", "StreamName", "Token"];
                        readonly enum: readonly ["RecordedOn", "StreamName", "Token"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly status: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumFlags": true;
                        readonly "x-enumNames": readonly ["Started", "Transcode", "Complete", "Deleting", "Error"];
                        readonly enum: readonly ["Started", "Transcode", "Complete", "Deleting", "Error"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly tokenId: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly token: {
                                readonly type: "string";
                            };
                            readonly streamName: {
                                readonly type: "string";
                            };
                            readonly recordedOn: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly removedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                                readonly "x-enumFlags": true;
                                readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                            };
                            readonly metadata: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["tracks", "thumbnails"];
                                    readonly properties: {
                                        readonly format: {
                                            readonly type: "string";
                                        };
                                        readonly sizes: {
                                            readonly type: readonly ["object", "null"];
                                            readonly additionalProperties: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                        };
                                        readonly tracks: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                    };
                                                    readonly codec: {
                                                        readonly type: "string";
                                                    };
                                                    readonly bitrate: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly width: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly height: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly framerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly channels: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly samplerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int64";
                                                        readonly minimum: -9223372036854776000;
                                                        readonly maximum: 9223372036854776000;
                                                    };
                                                };
                                            };
                                        };
                                        readonly thumbnails: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesListRecordFilesByStream: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly streamname: {
                    readonly type: readonly ["string", "null"];
                    readonly maxLength: 128;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sortBy: {
                    readonly default: "RecordedOn";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["RecordedOn", "StreamName", "Token"];
                        readonly enum: readonly ["RecordedOn", "StreamName", "Token"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly status: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumFlags": true;
                        readonly "x-enumNames": readonly ["Started", "Transcode", "Complete", "Deleting", "Error"];
                        readonly enum: readonly ["Started", "Transcode", "Complete", "Deleting", "Error"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["streamname", "page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly tokenId: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly token: {
                                readonly type: "string";
                            };
                            readonly streamName: {
                                readonly type: "string";
                            };
                            readonly recordedOn: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly removedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                                readonly "x-enumFlags": true;
                                readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                            };
                            readonly metadata: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["tracks", "thumbnails"];
                                    readonly properties: {
                                        readonly format: {
                                            readonly type: "string";
                                        };
                                        readonly sizes: {
                                            readonly type: readonly ["object", "null"];
                                            readonly additionalProperties: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                        };
                                        readonly tracks: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                    };
                                                    readonly codec: {
                                                        readonly type: "string";
                                                    };
                                                    readonly bitrate: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly width: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly height: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly framerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly channels: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly samplerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int64";
                                                        readonly minimum: -9223372036854776000;
                                                        readonly maximum: 9223372036854776000;
                                                    };
                                                };
                                            };
                                        };
                                        readonly thumbnails: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesListRecordFilesByToken: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Either token or tokenId must be specified.";
                };
                readonly tokenId: {
                    readonly type: readonly ["integer", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Either token or tokenId must be specified. Legacy name token_id.";
                };
                readonly sortBy: {
                    readonly default: "RecordedOn";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["RecordedOn", "StreamName", "Token"];
                        readonly enum: readonly ["RecordedOn", "StreamName", "Token"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly status: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumFlags": true;
                        readonly "x-enumNames": readonly ["Started", "Transcode", "Complete", "Deleting", "Error"];
                        readonly enum: readonly ["Started", "Transcode", "Complete", "Deleting", "Error"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["token", "page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly tokenId: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly token: {
                                readonly type: "string";
                            };
                            readonly streamName: {
                                readonly type: "string";
                            };
                            readonly recordedOn: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly removedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                                readonly "x-enumFlags": true;
                                readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                            };
                            readonly metadata: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["tracks", "thumbnails"];
                                    readonly properties: {
                                        readonly format: {
                                            readonly type: "string";
                                        };
                                        readonly sizes: {
                                            readonly type: readonly ["object", "null"];
                                            readonly additionalProperties: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                        };
                                        readonly tracks: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                    };
                                                    readonly codec: {
                                                        readonly type: "string";
                                                    };
                                                    readonly bitrate: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly width: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly height: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly framerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly channels: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly samplerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int64";
                                                        readonly minimum: -9223372036854776000;
                                                        readonly maximum: 9223372036854776000;
                                                    };
                                                };
                                            };
                                        };
                                        readonly thumbnails: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesRecordFileUsage: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly totalBytes: {
                            readonly type: "integer";
                            readonly description: "Total storage usage reported in bytes";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesRecordFileUsageBillable: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start date of the query. In the format of `YYYY-MM-DD`.";
                };
                readonly stopDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end date of the query. In the format of `YYYY-MM-DD`.";
                };
            };
            readonly required: readonly ["startDate", "stopDate"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly gigabyteHours: {
                            readonly type: "integer";
                            readonly description: "Measured as binary gigabytes (1024^3) per hour";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesUpdateExpiryRule: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["expiry"];
        readonly properties: {
            readonly expiry: {
                readonly description: "Update account level expiry rule for clip creation. ";
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly days: {
                            readonly type: readonly ["integer", "null"];
                            readonly format: "int32";
                            readonly maximum: 365;
                            readonly minimum: 1;
                        };
                    };
                }];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly timeSpan: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly days: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly maximum: 365;
                                        readonly minimum: 1;
                                    };
                                };
                            }];
                        };
                        readonly isCustom: {
                            readonly type: "boolean";
                            readonly description: "Indicates whether expiry rule is custom set or using system preset. There will be no guarantee that system preset remains unchanged. ";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesV2DeleteMediaAssets: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["mediaAssetIds"];
        readonly properties: {
            readonly mediaAssetIds: {
                readonly type: "array";
                readonly maxItems: 1000;
                readonly minItems: 1;
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly errors: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly mediaAssetId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly error: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesV2ListMediaAssets: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly tokenId: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Optional. Filter by tokenId.";
            };
            readonly streamName: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by streamName.";
            };
            readonly clipRequestId: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by clipRequestId. ";
            };
            readonly itemType: {
                readonly description: "Optional. Specify full recording or clip.";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "string";
                    readonly description: "";
                    readonly "x-enumNames": readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                    readonly enum: readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                }];
            };
            readonly clipName: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Filter by clipName. ";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sortBy: {
                    readonly default: "RecordedOn";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["RecordedOn", "StoppedOn", "StreamName", "TokenId", "Token"];
                        readonly enum: readonly ["RecordedOn", "StoppedOn", "StreamName", "TokenId", "Token"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly status: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumFlags": true;
                        readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "RawError", "Invalid", "Complete", "Deleting", "Error"];
                        readonly enum: readonly ["Started", "Transcode", "InProgress", "RawError", "Invalid", "Complete", "Deleting", "Error"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                                readonly "x-enumFlags": true;
                                readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                                readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                            };
                            readonly sourceId: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly simulcastId: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly itemType: {
                                readonly type: "string";
                                readonly description: "\n\n`FullRecording` `Clip` `StorageValidation` `Timeline`";
                                readonly "x-enumNames": readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                                readonly enum: readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                            };
                            readonly clipMetadata: {
                                readonly description: "Metadata if recording is a clip";
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly clipName: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Clip label if assigned by user";
                                        };
                                        readonly clipRequestId: {
                                            readonly type: "string";
                                            readonly description: "Id associated with clipping request";
                                        };
                                        readonly startTime: {
                                            readonly type: readonly ["string", "null"];
                                            readonly format: "date";
                                        };
                                        readonly stopTime: {
                                            readonly type: readonly ["string", "null"];
                                            readonly format: "date";
                                        };
                                        readonly expiresOn: {
                                            readonly type: readonly ["string", "null"];
                                            readonly format: "date";
                                        };
                                    };
                                }];
                            };
                            readonly tokenId: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly streamName: {
                                readonly type: "string";
                            };
                            readonly recordedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly stoppedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly removedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly metadata: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["tracks", "thumbnails"];
                                    readonly properties: {
                                        readonly format: {
                                            readonly type: "string";
                                        };
                                        readonly sizes: {
                                            readonly type: readonly ["object", "null"];
                                            readonly additionalProperties: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                        };
                                        readonly duration: {
                                            readonly type: "integer";
                                        };
                                        readonly tracks: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                    };
                                                    readonly codec: {
                                                        readonly type: "string";
                                                    };
                                                    readonly bitrate: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly width: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly height: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly framerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly channels: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly samplerate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly format: "int64";
                                                        readonly minimum: -9223372036854776000;
                                                        readonly maximum: 9223372036854776000;
                                                    };
                                                };
                                            };
                                        };
                                        readonly thumbnails: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                }];
                            };
                            readonly error: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly storage: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly storageType: {
                                            readonly description: "Storage provider type";
                                            readonly oneOf: readonly [{
                                                readonly type: "string";
                                                readonly description: "\n\n`Default` `Gcs` `AwsS3` `DolbyStorage`";
                                                readonly "x-enumNames": readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                                readonly enum: readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                            }];
                                        };
                                        readonly storagePath: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesV2ReadMediaAsset: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly mediaAssetId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["mediaAssetId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly sourceId: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly simulcastId: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly itemType: {
                            readonly type: "string";
                            readonly description: "\n\n`FullRecording` `Clip` `StorageValidation` `Timeline`";
                            readonly "x-enumNames": readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                            readonly enum: readonly ["FullRecording", "Clip", "StorageValidation", "Timeline"];
                        };
                        readonly clipMetadata: {
                            readonly description: "Metadata if recording is a clip";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly clipName: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Clip label if assigned by user";
                                    };
                                    readonly clipRequestId: {
                                        readonly type: "string";
                                        readonly description: "Id associated with clipping request";
                                    };
                                    readonly startTime: {
                                        readonly type: readonly ["string", "null"];
                                        readonly format: "date";
                                    };
                                    readonly stopTime: {
                                        readonly type: readonly ["string", "null"];
                                        readonly format: "date";
                                    };
                                    readonly expiresOn: {
                                        readonly type: readonly ["string", "null"];
                                        readonly format: "date";
                                    };
                                };
                            }];
                        };
                        readonly tokenId: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly streamName: {
                            readonly type: "string";
                        };
                        readonly recordedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly stoppedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly removedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly metadata: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["tracks", "thumbnails"];
                                readonly properties: {
                                    readonly format: {
                                        readonly type: "string";
                                    };
                                    readonly sizes: {
                                        readonly type: readonly ["object", "null"];
                                        readonly additionalProperties: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                    };
                                    readonly duration: {
                                        readonly type: "integer";
                                    };
                                    readonly tracks: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly type: {
                                                    readonly type: "string";
                                                };
                                                readonly codec: {
                                                    readonly type: "string";
                                                };
                                                readonly bitrate: {
                                                    readonly type: "integer";
                                                };
                                                readonly width: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly height: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly framerate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly channels: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly samplerate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly format: "int64";
                                                    readonly minimum: -9223372036854776000;
                                                    readonly maximum: 9223372036854776000;
                                                };
                                            };
                                        };
                                    };
                                    readonly thumbnails: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            }];
                        };
                        readonly error: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly storage: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly storageType: {
                                        readonly description: "Storage provider type";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`Default` `Gcs` `AwsS3` `DolbyStorage`";
                                            readonly "x-enumNames": readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                            readonly enum: readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                        }];
                                    };
                                    readonly storagePath: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                    };
                                };
                            }];
                        };
                        readonly id: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly status: {
                            readonly type: "string";
                            readonly description: "\n\n`Started` `Transcode` `InProgress` `Deleted` `Invalid` `Expiring` `Complete` `Deleting` `Error`";
                            readonly "x-enumFlags": true;
                            readonly "x-enumNames": readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                            readonly enum: readonly ["Started", "Transcode", "InProgress", "Deleted", "Invalid", "Expiring", "Complete", "Deleting", "Error"];
                        };
                        readonly download: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly downloadUrl: {
                                        readonly type: "string";
                                    };
                                    readonly downloadExpiresOn: {
                                        readonly type: "string";
                                        readonly format: "date-time";
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RecordFilesValidateStorageProfile: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly storage: {
                readonly description: "Storage settings.";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly objectPrefix: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Update storage object prefix. Set to empty string to clear exisiting value.";
                        };
                        readonly storageType: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "";
                                readonly "x-enumNames": readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                readonly enum: readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                            }];
                        };
                        readonly gcsStorageConfig: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["bucketName"];
                                readonly properties: {
                                    readonly bucketName: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                            }];
                        };
                        readonly awsS3StorageConfig: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly required: readonly ["bucketName", "bucketRegion"];
                                readonly properties: {
                                    readonly bucketName: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                    readonly bucketRegion: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                            }];
                        };
                    };
                }];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly validationId: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly validatedStorage: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly storageType: {
                                        readonly description: "Storage provider type";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`Default` `Gcs` `AwsS3` `DolbyStorage`";
                                            readonly "x-enumNames": readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                            readonly enum: readonly ["Default", "Gcs", "AwsS3", "DolbyStorage"];
                                        }];
                                    };
                                    readonly storagePath: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Path to clip storage location. Available only for external storage configurations. ";
                                    };
                                };
                            }];
                        };
                        readonly validationFilename: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Test vector uploaded to specified storage path. Expect to see this in your cloud storage if access permissions were currectly configured. ";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StreamStopByAccount: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly stoppingLevel: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "\n\n`Account` `Stream` `Feed` `Server` `None`";
                                readonly "x-enumNames": readonly ["Account", "Stream", "Feed", "Server", "None"];
                                readonly enum: readonly ["Account", "Stream", "Feed", "Server", "None"];
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StreamStopStream: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly streamId: {
                readonly type: readonly ["string", "null"];
                readonly description: "The stream to be stopped. This is given as the {accountId}/{streamName}.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly stoppingLevel: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "\n\n`Account` `Stream` `Feed` `Server` `None`";
                                readonly "x-enumNames": readonly ["Account", "Stream", "Feed", "Server", "None"];
                                readonly enum: readonly ["Account", "Stream", "Feed", "Server", "None"];
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SubscribeTokenV1CreateToken: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["label", "streams"];
        readonly properties: {
            readonly tracking: {
                readonly description: "Optional. Tracking Information for the Stream Syndication capability. See documentation https://docs.dolby.io/streaming-apis/docs/syndication.";
                readonly nullable: true;
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly trackingId: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Optional. Tracking identifier for Stream Syndication.";
                        };
                    };
                }];
            };
            readonly label: {
                readonly type: "string";
                readonly description: "Name for the token that is used to display in the dashboard.";
                readonly minLength: 1;
                readonly examples: readonly ["simple_token"];
            };
            readonly expires: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Optional. Number of seconds until the token expires. If not specified, the token never expires (default).";
                readonly format: "int32";
                readonly maximum: 2147483647;
                readonly minimum: 1;
            };
            readonly streams: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["streamName"];
                    readonly properties: {
                        readonly streamName: {
                            readonly type: "string";
                            readonly description: "Name of the stream this token can access.";
                            readonly maxLength: 128;
                            readonly minLength: 1;
                            readonly examples: readonly ["stream1"];
                        };
                        readonly isRegex: {
                            readonly type: "boolean";
                            readonly description: "Set to true if the name of the stream is a regular expression.";
                            readonly default: false;
                        };
                    };
                };
            };
            readonly allowedOrigins: {
                readonly type: readonly ["array", "null"];
                readonly description: "Optional. If specified only the domains in list will be allowed in requests to Director API with token. Wildcard subdomains are also allowed, e.g.: \"*.demo.com\". When unspecified (empty list) there are no domain restrictions.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly allowedIpAddresses: {
                readonly type: readonly ["array", "null"];
                readonly description: "Optional. May specify multiple IPv4 addresses or CIDR notated network blocks. If specified, the token will only be usable from those IP addresses. ";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly bindIpsOnUsage: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Optional. If specified will bind the token to the first X IP addresses used with token in requests to Director API, thus restricting the token to those IP addresses without being known beforehand. Mutually exclusive with allowedIpAddresses option. ";
            };
            readonly originCluster: {
                readonly type: readonly ["string", "null"];
                readonly description: "Optional. Cluster to route specified streams to. Default is the account's default cluster.";
            };
            readonly allowedCountries: {
                readonly type: readonly ["array", "null"];
                readonly description: "Optional. Specify the ISO 3166-1 two letter country codes to explicitly allow viewer to watch the stream from. If the viewer's location does not match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream. This geo-fencing rule works in concert with the IP and domain restrictions as well. Specifying geo restriction rules in a subscribe token will override publish token and account-wide rules. Only one of allowedCountries or deniedCountries should be specified.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly deniedCountries: {
                readonly type: readonly ["array", "null"];
                readonly description: "Optional. Specify the ISO 3166-1 two letter country codes to explicitly deny viewer to watch the stream from. If the viewer's location does match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream. This geo-fencing rule works in concert with the IP and domain restrictions as well. Specifying geo restriction rules in a subscribe token will override publish token and account-wide rules. Only one of allowedCountries or deniedCountries should be specified.";
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly deprecated: true;
                            readonly "x-deprecatedMessage": "use Label";
                        };
                        readonly tracking: {
                            readonly description: "Tracking information";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly trackingId: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Optional. Tracking identifier for Stream Syndication.";
                                    };
                                };
                            }];
                        };
                        readonly adminSettings: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly forcedServerId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly dumpStats: {
                                        readonly type: "boolean";
                                    };
                                };
                            }];
                        };
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly label: {
                            readonly type: "string";
                            readonly description: "Friendly name of token";
                        };
                        readonly token: {
                            readonly type: "string";
                            readonly description: "Actual token";
                        };
                        readonly addedOn: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly expiresOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly isActive: {
                            readonly type: "boolean";
                        };
                        readonly streams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly streamName: {
                                        readonly type: "string";
                                    };
                                    readonly isRegex: {
                                        readonly type: "boolean";
                                    };
                                };
                            };
                        };
                        readonly allowedOrigins: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly allowedIpAddresses: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly bindIpsOnUsage: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly originCluster: {
                            readonly type: "string";
                        };
                        readonly effectiveSettings: {
                            readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly originCluster: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly allowedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly deniedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly geoCascade: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly isEnabled: {
                                                    readonly type: readonly ["boolean", "null"];
                                                };
                                                readonly clusters: {
                                                    readonly type: readonly ["array", "null"];
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SubscribeTokenV1DeleteToken: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly tokenId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["tokenId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SubscribeTokenV1ListTokens: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sortBy: {
                    readonly default: "Name";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Name", "AddedOn"];
                        readonly enum: readonly ["Name", "AddedOn"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                                readonly deprecated: true;
                                readonly "x-deprecatedMessage": "use Label";
                            };
                            readonly tracking: {
                                readonly description: "Tracking information";
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly trackingId: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Optional. Tracking identifier for Stream Syndication.";
                                        };
                                    };
                                }];
                            };
                            readonly adminSettings: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly forcedServerId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly dumpStats: {
                                            readonly type: "boolean";
                                        };
                                    };
                                }];
                            };
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly label: {
                                readonly type: "string";
                                readonly description: "Friendly name of token";
                            };
                            readonly token: {
                                readonly type: "string";
                                readonly description: "Actual token";
                            };
                            readonly addedOn: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly expiresOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly isActive: {
                                readonly type: "boolean";
                            };
                            readonly streams: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly streamName: {
                                            readonly type: "string";
                                        };
                                        readonly isRegex: {
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                            };
                            readonly allowedOrigins: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly allowedIpAddresses: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly bindIpsOnUsage: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly originCluster: {
                                readonly type: "string";
                            };
                            readonly effectiveSettings: {
                                readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly originCluster: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly allowedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly deniedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly geoCascade: {
                                            readonly nullable: true;
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly isEnabled: {
                                                        readonly type: readonly ["boolean", "null"];
                                                    };
                                                    readonly clusters: {
                                                        readonly type: readonly ["array", "null"];
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                }];
                            };
                            readonly allowedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly deniedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SubscribeTokenV1ListTokensByName: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly filterBy: {
                    readonly default: "TokenOrStreamName";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["None", "TokenName", "StreamName", "TokenOrStreamName"];
                        readonly enum: readonly ["None", "TokenName", "StreamName", "TokenOrStreamName"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sortBy: {
                    readonly default: "Name";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Name", "AddedOn"];
                        readonly enum: readonly ["Name", "AddedOn"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["name", "page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                                readonly deprecated: true;
                                readonly "x-deprecatedMessage": "use Label";
                            };
                            readonly tracking: {
                                readonly description: "Tracking information";
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly trackingId: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Optional. Tracking identifier for Stream Syndication.";
                                        };
                                    };
                                }];
                            };
                            readonly adminSettings: {
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly forcedServerId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly dumpStats: {
                                            readonly type: "boolean";
                                        };
                                    };
                                }];
                            };
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly label: {
                                readonly type: "string";
                                readonly description: "Friendly name of token";
                            };
                            readonly token: {
                                readonly type: "string";
                                readonly description: "Actual token";
                            };
                            readonly addedOn: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly expiresOn: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "date-time";
                            };
                            readonly isActive: {
                                readonly type: "boolean";
                            };
                            readonly streams: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly streamName: {
                                            readonly type: "string";
                                        };
                                        readonly isRegex: {
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                            };
                            readonly allowedOrigins: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly allowedIpAddresses: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly bindIpsOnUsage: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly originCluster: {
                                readonly type: "string";
                            };
                            readonly effectiveSettings: {
                                readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly originCluster: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly allowedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly deniedCountries: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly geoCascade: {
                                            readonly nullable: true;
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly isEnabled: {
                                                        readonly type: readonly ["boolean", "null"];
                                                    };
                                                    readonly clusters: {
                                                        readonly type: readonly ["array", "null"];
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                }];
                            };
                            readonly allowedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly deniedCountries: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SubscribeTokenV1ReadToken: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly tokenId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["tokenId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly deprecated: true;
                            readonly "x-deprecatedMessage": "use Label";
                        };
                        readonly tracking: {
                            readonly description: "Tracking information";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly trackingId: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Optional. Tracking identifier for Stream Syndication.";
                                    };
                                };
                            }];
                        };
                        readonly adminSettings: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly forcedServerId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly dumpStats: {
                                        readonly type: "boolean";
                                    };
                                };
                            }];
                        };
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly label: {
                            readonly type: "string";
                            readonly description: "Friendly name of token";
                        };
                        readonly token: {
                            readonly type: "string";
                            readonly description: "Actual token";
                        };
                        readonly addedOn: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly expiresOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly isActive: {
                            readonly type: "boolean";
                        };
                        readonly streams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly streamName: {
                                        readonly type: "string";
                                    };
                                    readonly isRegex: {
                                        readonly type: "boolean";
                                    };
                                };
                            };
                        };
                        readonly allowedOrigins: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly allowedIpAddresses: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly bindIpsOnUsage: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly originCluster: {
                            readonly type: "string";
                        };
                        readonly effectiveSettings: {
                            readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly originCluster: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly allowedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly deniedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly geoCascade: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly isEnabled: {
                                                    readonly type: readonly ["boolean", "null"];
                                                };
                                                readonly clusters: {
                                                    readonly type: readonly ["array", "null"];
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SubscribeTokenV1UpdateToken: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly label: {
                readonly type: readonly ["string", "null"];
                readonly examples: readonly ["new_label_name"];
            };
            readonly refreshToken: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Generate new unique token, invalidating previous token";
                readonly examples: readonly [true];
            };
            readonly isActive: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly addTokenStreams: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["streamName"];
                    readonly properties: {
                        readonly streamName: {
                            readonly type: "string";
                            readonly description: "Name of the stream this token can access.";
                            readonly maxLength: 128;
                            readonly minLength: 1;
                        };
                        readonly isRegex: {
                            readonly type: "boolean";
                            readonly description: "Set to true if the name of the stream is a regular expression.";
                            readonly default: false;
                        };
                    };
                };
            };
            readonly removeTokenStreams: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateAllowedOrigins: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateAllowedIpAddresses: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateBindIpsOnUsage: {
                readonly type: readonly ["integer", "null"];
            };
            readonly updateOriginCluster: {
                readonly type: readonly ["string", "null"];
            };
            readonly updateAllowedCountries: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly updateDeniedCountries: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly tokenId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["tokenId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly deprecated: true;
                            readonly "x-deprecatedMessage": "use Label";
                        };
                        readonly tracking: {
                            readonly description: "Tracking information";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly trackingId: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Optional. Tracking identifier for Stream Syndication.";
                                    };
                                };
                            }];
                        };
                        readonly adminSettings: {
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly forcedServerId: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly dumpStats: {
                                        readonly type: "boolean";
                                    };
                                };
                            }];
                        };
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly label: {
                            readonly type: "string";
                            readonly description: "Friendly name of token";
                        };
                        readonly token: {
                            readonly type: "string";
                            readonly description: "Actual token";
                        };
                        readonly addedOn: {
                            readonly type: "string";
                            readonly format: "date-time";
                        };
                        readonly expiresOn: {
                            readonly type: readonly ["string", "null"];
                            readonly format: "date-time";
                        };
                        readonly isActive: {
                            readonly type: "boolean";
                        };
                        readonly streams: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly streamName: {
                                        readonly type: "string";
                                    };
                                    readonly isRegex: {
                                        readonly type: "boolean";
                                    };
                                };
                            };
                        };
                        readonly allowedOrigins: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly allowedIpAddresses: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly bindIpsOnUsage: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly originCluster: {
                            readonly type: "string";
                        };
                        readonly effectiveSettings: {
                            readonly description: "Token effective settings for properties that use account default settings. Value for each property will either be token or account level settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly originCluster: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly allowedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly deniedCountries: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly geoCascade: {
                                        readonly nullable: true;
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly isEnabled: {
                                                    readonly type: readonly ["boolean", "null"];
                                                };
                                                readonly clusters: {
                                                    readonly type: readonly ["array", "null"];
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly allowedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly deniedCountries: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderCreateTranscoder: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["name", "cluster"];
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly description: "Use a label to help with identifying this Transcoder.";
                readonly minLength: 1;
                readonly examples: readonly ["simple_transcoder"];
            };
            readonly dnsPrefix: {
                readonly type: readonly ["string", "null"];
                readonly description: "Choose a string that will be used to prefix the DNS entry for the Transcoder origin endpoint. You can only use alphabetic (A-Z), numeric (0-9), and a dash in your dns prefix. Used to construct the DNS name which follows the format of `dnsPrefix`-`accountId`.transcoder.millicast.com. Note that underscores (_) are invalid characters.";
                readonly examples: readonly ["testing-transcoder"];
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "Set the cluster region that will be used for the Transcoder to be deployed to. You should choose a cluster that is closest to the broadcast sources.";
                readonly minLength: 1;
                readonly examples: readonly ["phx-1"];
            };
            readonly height: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Set the resolution for the maximum height to be used in the stream. If a pre-configured profile is chosen the height value will be used from the profile.";
                readonly examples: readonly [240];
            };
            readonly frameRate: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Update the maximum frames per second to be used in transcoding. If a pre-configured profile is chosen the frame rate value will be used from the profile.";
                readonly examples: readonly [60];
            };
            readonly profile: {
                readonly type: readonly ["string", "null"];
                readonly description: "Update to use a pre-configured profile by id. The ’List Transcoder Profiles’ endpoint can be used to find available profiles.";
            };
            readonly startNow: {
                readonly type: "boolean";
                readonly description: "Indicates whether instances should be provisioned and started immediately once the Transcoder is created.";
                readonly default: false;
            };
            readonly passThrough: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Set whether or not the top layer of the contribution source should bypass transcoding and be distributed without processing.";
                readonly examples: readonly [true];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly transcoderId: {
                            readonly type: "string";
                            readonly description: "A unique identifier for a transcoder.";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "A label to help distinguish between multiple transcoders.";
                        };
                        readonly cluster: {
                            readonly type: "string";
                            readonly description: "The cluster region used as the origin for ingesting the source stream.";
                        };
                        readonly dnsName: {
                            readonly type: "string";
                            readonly description: "A DNS record for routing to the transcode server. It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                        };
                        readonly profile: {
                            readonly description: "Configuration for the output stream from the Transcoder. This may be a pre-defined profile or derived from custom resolution and frame rate settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly profileId: {
                                        readonly type: "string";
                                        readonly description: "A unique identifier for the profile configuration.";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Name of the profile.";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "Description to identify the purpose of the profile.";
                                    };
                                    readonly height: {
                                        readonly type: "integer";
                                        readonly description: "The maximum height to use for the frame resolution.";
                                    };
                                    readonly frameRate: {
                                        readonly type: "integer";
                                        readonly description: "The targeted frames per second.";
                                    };
                                    readonly passThrough: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates that the top layer is used as is and bypasses transcoding without additional processing.";
                                    };
                                    readonly layers: {
                                        readonly type: "array";
                                        readonly description: "The layers the Transcoder will produce for distribution. These values are pre-determined following the Millicast bitrate ladder as step-down layers from the overall Transcoder configuration.";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly height: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The height for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly width: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The width for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly fps: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The target frames-per-second for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly codec: {
                                                    readonly type: "string";
                                                    readonly description: "The codec used for this layer.";
                                                };
                                                readonly bitrate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The target bitrate for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly intraPeriod: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The I-Frame interval for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                            };
                                        };
                                    };
                                };
                            }];
                        };
                        readonly createdOn: {
                            readonly type: "string";
                            readonly description: "A timestamp for when this Transcoder was created.";
                            readonly format: "date-time";
                        };
                        readonly endedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "A timestamp for when this Transcoder was shutdown.";
                            readonly format: "date-time";
                        };
                        readonly instance: {
                            readonly description: "Information on the most recent transcoder instance. The transcoder may run multiple instances to support the scale of the broadcast streams.";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly transcoderId: {
                                        readonly type: "string";
                                        readonly description: "The unique identifier of the Transcoder.";
                                    };
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The unique identifier for this instance of the Transcoder.";
                                    };
                                    readonly publicIp: {
                                        readonly type: "string";
                                        readonly description: "The public IP address for the host that is processing the stream.";
                                    };
                                    readonly dnsName: {
                                        readonly type: "string";
                                        readonly description: "A DNS record for routing to the transcoder instance server(s). It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                                    };
                                    readonly createdOn: {
                                        readonly type: "string";
                                        readonly description: "A timestamp for when this Transcoder instance was created.";
                                        readonly format: "date-time";
                                    };
                                    readonly endedOn: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "A timestamp for when this Transcoder instance was shutdown.";
                                        readonly format: "date-time";
                                    };
                                    readonly status: {
                                        readonly description: "The status for this Transcoder instance.";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued` `ActiveError` `ShutdownError`";
                                            readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                            readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly status: {
                            readonly description: "The status for this Transcoder.";
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued`";
                                readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                                readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                            }];
                        };
                        readonly publishUrls: {
                            readonly description: "The discrete ingest URLs for each broadcast protocol (RTMP, RTMPS, SRT).";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly rtmp: {
                                        readonly type: "string";
                                    };
                                    readonly rtmps: {
                                        readonly type: "string";
                                    };
                                    readonly srt: {
                                        readonly type: "string";
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderDeleteTranscoder: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transcoderId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The unique identifier for the transcoder.";
                };
            };
            readonly required: readonly ["transcoderId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderGetTranscoder: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transcoderId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The unique identifier for the transcoder.";
                };
            };
            readonly required: readonly ["transcoderId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly transcoderId: {
                            readonly type: "string";
                            readonly description: "A unique identifier for a transcoder.";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "A label to help distinguish between multiple transcoders.";
                        };
                        readonly cluster: {
                            readonly type: "string";
                            readonly description: "The cluster region used as the origin for ingesting the source stream.";
                        };
                        readonly dnsName: {
                            readonly type: "string";
                            readonly description: "A DNS record for routing to the transcode server. It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                        };
                        readonly profile: {
                            readonly description: "Configuration for the output stream from the Transcoder. This may be a pre-defined profile or derived from custom resolution and frame rate settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly profileId: {
                                        readonly type: "string";
                                        readonly description: "A unique identifier for the profile configuration.";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Name of the profile.";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "Description to identify the purpose of the profile.";
                                    };
                                    readonly height: {
                                        readonly type: "integer";
                                        readonly description: "The maximum height to use for the frame resolution.";
                                    };
                                    readonly frameRate: {
                                        readonly type: "integer";
                                        readonly description: "The targeted frames per second.";
                                    };
                                    readonly passThrough: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates that the top layer is used as is and bypasses transcoding without additional processing.";
                                    };
                                    readonly layers: {
                                        readonly type: "array";
                                        readonly description: "The layers the Transcoder will produce for distribution. These values are pre-determined following the Millicast bitrate ladder as step-down layers from the overall Transcoder configuration.";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly height: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The height for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly width: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The width for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly fps: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The target frames-per-second for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly codec: {
                                                    readonly type: "string";
                                                    readonly description: "The codec used for this layer.";
                                                };
                                                readonly bitrate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The target bitrate for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly intraPeriod: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The I-Frame interval for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                            };
                                        };
                                    };
                                };
                            }];
                        };
                        readonly createdOn: {
                            readonly type: "string";
                            readonly description: "A timestamp for when this Transcoder was created.";
                            readonly format: "date-time";
                        };
                        readonly endedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "A timestamp for when this Transcoder was shutdown.";
                            readonly format: "date-time";
                        };
                        readonly instance: {
                            readonly description: "Information on the most recent transcoder instance. The transcoder may run multiple instances to support the scale of the broadcast streams.";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly transcoderId: {
                                        readonly type: "string";
                                        readonly description: "The unique identifier of the Transcoder.";
                                    };
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The unique identifier for this instance of the Transcoder.";
                                    };
                                    readonly publicIp: {
                                        readonly type: "string";
                                        readonly description: "The public IP address for the host that is processing the stream.";
                                    };
                                    readonly dnsName: {
                                        readonly type: "string";
                                        readonly description: "A DNS record for routing to the transcoder instance server(s). It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                                    };
                                    readonly createdOn: {
                                        readonly type: "string";
                                        readonly description: "A timestamp for when this Transcoder instance was created.";
                                        readonly format: "date-time";
                                    };
                                    readonly endedOn: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "A timestamp for when this Transcoder instance was shutdown.";
                                        readonly format: "date-time";
                                    };
                                    readonly status: {
                                        readonly description: "The status for this Transcoder instance.";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued` `ActiveError` `ShutdownError`";
                                            readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                            readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly status: {
                            readonly description: "The status for this Transcoder.";
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued`";
                                readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                                readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                            }];
                        };
                        readonly publishUrls: {
                            readonly description: "The discrete ingest URLs for each broadcast protocol (RTMP, RTMPS, SRT).";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly rtmp: {
                                        readonly type: "string";
                                    };
                                    readonly rtmps: {
                                        readonly type: "string";
                                    };
                                    readonly srt: {
                                        readonly type: "string";
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderGetTranscoderInstance: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly instanceId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The unique identifier for the instance.";
                };
            };
            readonly required: readonly ["instanceId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly transcoderId: {
                            readonly type: "string";
                            readonly description: "The unique identifier of the Transcoder.";
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The unique identifier for this instance of the Transcoder.";
                        };
                        readonly publicIp: {
                            readonly type: "string";
                            readonly description: "The public IP address for the host that is processing the stream.";
                        };
                        readonly dnsName: {
                            readonly type: "string";
                            readonly description: "A DNS record for routing to the transcoder instance server(s). It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                        };
                        readonly createdOn: {
                            readonly type: "string";
                            readonly description: "A timestamp for when this Transcoder instance was created.";
                            readonly format: "date-time";
                        };
                        readonly endedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "A timestamp for when this Transcoder instance was shutdown.";
                            readonly format: "date-time";
                        };
                        readonly status: {
                            readonly description: "The status for this Transcoder instance.";
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued` `ActiveError` `ShutdownError`";
                                readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderListTranscoderInstances: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transcoderId: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns only Instances for a given Transcoder ID.";
                };
                readonly startDate: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns Instances that were created after the given date. The date is of the format is `YYYY-MM-DD`.";
                };
                readonly endDate: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns Instances that were shutdown prior to the given date. The data is of the format is `YYYY-MM-DD`.";
                };
                readonly sortBy: {
                    readonly default: "CreatedDate";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["CreatedDate"];
                        readonly enum: readonly ["CreatedDate"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Order in which to return the list of Transcoder Instances. The default is by Creation Date.";
                };
                readonly status: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                        readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns only Transcoder Instances that match the given status. If empty, all the instances including Deleted are return.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly transcoderId: {
                                readonly type: "string";
                                readonly description: "The unique identifier of the Transcoder.";
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The unique identifier for this instance of the Transcoder.";
                            };
                            readonly publicIp: {
                                readonly type: "string";
                                readonly description: "The public IP address for the host that is processing the stream.";
                            };
                            readonly dnsName: {
                                readonly type: "string";
                                readonly description: "A DNS record for routing to the transcoder instance server(s). It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                            };
                            readonly createdOn: {
                                readonly type: "string";
                                readonly description: "A timestamp for when this Transcoder instance was created.";
                                readonly format: "date-time";
                            };
                            readonly endedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "A timestamp for when this Transcoder instance was shutdown.";
                                readonly format: "date-time";
                            };
                            readonly status: {
                                readonly description: "The status for this Transcoder instance.";
                                readonly oneOf: readonly [{
                                    readonly type: "string";
                                    readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued` `ActiveError` `ShutdownError`";
                                    readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                    readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderListTranscoderProfiles: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sortBy: {
                    readonly default: "Name";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Name", "Height", "FrameRate"];
                        readonly enum: readonly ["Name", "Height", "FrameRate"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Order in which to return the list of Profiles. The default is by Name.";
                };
                readonly height: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "integer";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The height to filter the profiles by.";
                };
                readonly frameRate: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "integer";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The framerate to filter the profiles by.";
                };
                readonly passthrough: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The passthrough value to filter by.";
                };
                readonly isDefault: {
                    readonly type: readonly ["boolean", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Used to filter for profiles that are either custom or provided by default.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly profileId: {
                                readonly type: "string";
                                readonly description: "A unique identifier for the profile configuration.";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Name of the profile.";
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "Description to identify the purpose of the profile.";
                            };
                            readonly height: {
                                readonly type: "integer";
                                readonly description: "The maximum height to use for the frame resolution.";
                            };
                            readonly frameRate: {
                                readonly type: "integer";
                                readonly description: "The targeted frames per second.";
                            };
                            readonly passThrough: {
                                readonly type: "boolean";
                                readonly description: "Indicates that the top layer is used as is and bypasses transcoding without additional processing.";
                            };
                            readonly layers: {
                                readonly type: "array";
                                readonly description: "The layers the Transcoder will produce for distribution. These values are pre-determined following the Millicast bitrate ladder as step-down layers from the overall Transcoder configuration.";
                                readonly items: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly height: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly description: "The height for this layer.";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly width: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly description: "The width for this layer.";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly fps: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly description: "The target frames-per-second for this layer.";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly codec: {
                                            readonly type: "string";
                                            readonly description: "The codec used for this layer.";
                                        };
                                        readonly bitrate: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly description: "The target bitrate for this layer.";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly intraPeriod: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly description: "The I-Frame interval for this layer.";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderListTranscoders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sortBy: {
                    readonly default: "CreatedDate";
                    readonly nullable: true;
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["CreatedDate", "TranscoderName"];
                        readonly enum: readonly ["CreatedDate", "TranscoderName"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Order in which to return the list of Transcoders. The default is by CreatedDate.";
                };
                readonly status: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                        readonly description: "";
                        readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                        readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns only Transcoders that match the given status. If empty, will return all but Deleted.";
                };
                readonly cluster: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns only Transcoders for the given cluster(s).";
                };
                readonly transcoderName: {
                    readonly type: readonly ["string", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns only Transcoders that match the given string. Will include partial sub-string matches.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 2147483647;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The index to start when paginating results.";
                };
                readonly itemsOnPage: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly maximum: 100;
                    readonly minimum: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results to include when paginating a large result set.";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Change the direction of the default sort ordering.";
                };
            };
            readonly required: readonly ["page", "itemsOnPage"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly transcoderId: {
                                readonly type: "string";
                                readonly description: "A unique identifier for a transcoder.";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "A label to help distinguish between multiple transcoders.";
                            };
                            readonly cluster: {
                                readonly type: "string";
                                readonly description: "The cluster region used as the origin for ingesting the source stream.";
                            };
                            readonly dnsName: {
                                readonly type: "string";
                                readonly description: "A DNS record for routing to the transcode server. It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                            };
                            readonly profile: {
                                readonly description: "Configuration for the output stream from the Transcoder. This may be a pre-defined profile or derived from custom resolution and frame rate settings.";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly profileId: {
                                            readonly type: "string";
                                            readonly description: "A unique identifier for the profile configuration.";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Name of the profile.";
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "Description to identify the purpose of the profile.";
                                        };
                                        readonly height: {
                                            readonly type: "integer";
                                            readonly description: "The maximum height to use for the frame resolution.";
                                        };
                                        readonly frameRate: {
                                            readonly type: "integer";
                                            readonly description: "The targeted frames per second.";
                                        };
                                        readonly passThrough: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates that the top layer is used as is and bypasses transcoding without additional processing.";
                                        };
                                        readonly layers: {
                                            readonly type: "array";
                                            readonly description: "The layers the Transcoder will produce for distribution. These values are pre-determined following the Millicast bitrate ladder as step-down layers from the overall Transcoder configuration.";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly additionalProperties: false;
                                                readonly properties: {
                                                    readonly height: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly description: "The height for this layer.";
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly width: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly description: "The width for this layer.";
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly fps: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly description: "The target frames-per-second for this layer.";
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly codec: {
                                                        readonly type: "string";
                                                        readonly description: "The codec used for this layer.";
                                                    };
                                                    readonly bitrate: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly description: "The target bitrate for this layer.";
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                    readonly intraPeriod: {
                                                        readonly type: readonly ["integer", "null"];
                                                        readonly description: "The I-Frame interval for this layer.";
                                                        readonly format: "int32";
                                                        readonly minimum: -2147483648;
                                                        readonly maximum: 2147483647;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                }];
                            };
                            readonly createdOn: {
                                readonly type: "string";
                                readonly description: "A timestamp for when this Transcoder was created.";
                                readonly format: "date-time";
                            };
                            readonly endedOn: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "A timestamp for when this Transcoder was shutdown.";
                                readonly format: "date-time";
                            };
                            readonly instance: {
                                readonly description: "Information on the most recent transcoder instance. The transcoder may run multiple instances to support the scale of the broadcast streams.";
                                readonly nullable: true;
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly transcoderId: {
                                            readonly type: "string";
                                            readonly description: "The unique identifier of the Transcoder.";
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The unique identifier for this instance of the Transcoder.";
                                        };
                                        readonly publicIp: {
                                            readonly type: "string";
                                            readonly description: "The public IP address for the host that is processing the stream.";
                                        };
                                        readonly dnsName: {
                                            readonly type: "string";
                                            readonly description: "A DNS record for routing to the transcoder instance server(s). It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                                        };
                                        readonly createdOn: {
                                            readonly type: "string";
                                            readonly description: "A timestamp for when this Transcoder instance was created.";
                                            readonly format: "date-time";
                                        };
                                        readonly endedOn: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "A timestamp for when this Transcoder instance was shutdown.";
                                            readonly format: "date-time";
                                        };
                                        readonly status: {
                                            readonly description: "The status for this Transcoder instance.";
                                            readonly oneOf: readonly [{
                                                readonly type: "string";
                                                readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued` `ActiveError` `ShutdownError`";
                                                readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                                readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                            }];
                                        };
                                    };
                                }];
                            };
                            readonly status: {
                                readonly description: "The status for this Transcoder.";
                                readonly oneOf: readonly [{
                                    readonly type: "string";
                                    readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued`";
                                    readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                                    readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                                }];
                            };
                            readonly publishUrls: {
                                readonly description: "The discrete ingest URLs for each broadcast protocol (RTMP, RTMPS, SRT).";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly properties: {
                                        readonly rtmp: {
                                            readonly type: "string";
                                        };
                                        readonly rtmps: {
                                            readonly type: "string";
                                        };
                                        readonly srt: {
                                            readonly type: "string";
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderStartTranscoder: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transcoderId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The unique identifier for the transcoder.";
                };
            };
            readonly required: readonly ["transcoderId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderStopTranscoder: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transcoderId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The unique identifier for the transcoder.";
                };
            };
            readonly required: readonly ["transcoderId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TranscoderUpdateTranscoder: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly name: {
                readonly type: readonly ["string", "null"];
                readonly description: "Update display name for transcoder.";
                readonly examples: readonly ["simple_transcoder"];
            };
            readonly dnsPrefix: {
                readonly type: readonly ["string", "null"];
                readonly description: "Update DNS prefix for the transcoder publisher. Used to construct the DNS name which follows the format of `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                readonly examples: readonly ["abcd-efgh"];
            };
            readonly cluster: {
                readonly type: readonly ["string", "null"];
                readonly description: "Update cluster that transcoder will be deployed to.";
                readonly examples: readonly ["phx-1"];
            };
            readonly height: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Update resolution of input stream specified in video height. New default profile will be selected unless specified.";
                readonly examples: readonly [240];
            };
            readonly frameRate: {
                readonly type: readonly ["integer", "null"];
                readonly description: "Update frame rate of input stream. New default profile will be selected unless specified.";
                readonly examples: readonly [60];
            };
            readonly profile: {
                readonly type: readonly ["string", "null"];
                readonly description: "Specify a profile id to select the corresponding transcoder profile. You can retrieve all system pre-defined profile ids by calling the ’List Transcoder Profiles’ endpoint.";
            };
            readonly passThrough: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "Update whether the top layer is passed through or transcoded.";
                readonly examples: readonly [true];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transcoderId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["transcoderId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly transcoderId: {
                            readonly type: "string";
                            readonly description: "A unique identifier for a transcoder.";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "A label to help distinguish between multiple transcoders.";
                        };
                        readonly cluster: {
                            readonly type: "string";
                            readonly description: "The cluster region used as the origin for ingesting the source stream.";
                        };
                        readonly dnsName: {
                            readonly type: "string";
                            readonly description: "A DNS record for routing to the transcode server. It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                        };
                        readonly profile: {
                            readonly description: "Configuration for the output stream from the Transcoder. This may be a pre-defined profile or derived from custom resolution and frame rate settings.";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly profileId: {
                                        readonly type: "string";
                                        readonly description: "A unique identifier for the profile configuration.";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Name of the profile.";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "Description to identify the purpose of the profile.";
                                    };
                                    readonly height: {
                                        readonly type: "integer";
                                        readonly description: "The maximum height to use for the frame resolution.";
                                    };
                                    readonly frameRate: {
                                        readonly type: "integer";
                                        readonly description: "The targeted frames per second.";
                                    };
                                    readonly passThrough: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates that the top layer is used as is and bypasses transcoding without additional processing.";
                                    };
                                    readonly layers: {
                                        readonly type: "array";
                                        readonly description: "The layers the Transcoder will produce for distribution. These values are pre-determined following the Millicast bitrate ladder as step-down layers from the overall Transcoder configuration.";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly properties: {
                                                readonly height: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The height for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly width: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The width for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly fps: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The target frames-per-second for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly codec: {
                                                    readonly type: "string";
                                                    readonly description: "The codec used for this layer.";
                                                };
                                                readonly bitrate: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The target bitrate for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly intraPeriod: {
                                                    readonly type: readonly ["integer", "null"];
                                                    readonly description: "The I-Frame interval for this layer.";
                                                    readonly format: "int32";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                            };
                                        };
                                    };
                                };
                            }];
                        };
                        readonly createdOn: {
                            readonly type: "string";
                            readonly description: "A timestamp for when this Transcoder was created.";
                            readonly format: "date-time";
                        };
                        readonly endedOn: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "A timestamp for when this Transcoder was shutdown.";
                            readonly format: "date-time";
                        };
                        readonly instance: {
                            readonly description: "Information on the most recent transcoder instance. The transcoder may run multiple instances to support the scale of the broadcast streams.";
                            readonly nullable: true;
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly transcoderId: {
                                        readonly type: "string";
                                        readonly description: "The unique identifier of the Transcoder.";
                                    };
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The unique identifier for this instance of the Transcoder.";
                                    };
                                    readonly publicIp: {
                                        readonly type: "string";
                                        readonly description: "The public IP address for the host that is processing the stream.";
                                    };
                                    readonly dnsName: {
                                        readonly type: "string";
                                        readonly description: "A DNS record for routing to the transcoder instance server(s). It follows the pattern: `dnsPrefix`-`accountId`.transcoder.millicast.com.";
                                    };
                                    readonly createdOn: {
                                        readonly type: "string";
                                        readonly description: "A timestamp for when this Transcoder instance was created.";
                                        readonly format: "date-time";
                                    };
                                    readonly endedOn: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "A timestamp for when this Transcoder instance was shutdown.";
                                        readonly format: "date-time";
                                    };
                                    readonly status: {
                                        readonly description: "The status for this Transcoder instance.";
                                        readonly oneOf: readonly [{
                                            readonly type: "string";
                                            readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued` `ActiveError` `ShutdownError`";
                                            readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                            readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued", "ActiveError", "ShutdownError"];
                                        }];
                                    };
                                };
                            }];
                        };
                        readonly status: {
                            readonly description: "The status for this Transcoder.";
                            readonly oneOf: readonly [{
                                readonly type: "string";
                                readonly description: "\n\n`Provisioning` `Active` `Error` `Shutdown` `Deleted` `ShuttingDown` `Deleting` `Queued`";
                                readonly "x-enumNames": readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                                readonly enum: readonly ["Provisioning", "Active", "Error", "Shutdown", "Deleted", "ShuttingDown", "Deleting", "Queued"];
                            }];
                        };
                        readonly publishUrls: {
                            readonly description: "The discrete ingest URLs for each broadcast protocol (RTMP, RTMPS, SRT).";
                            readonly oneOf: readonly [{
                                readonly type: "object";
                                readonly additionalProperties: false;
                                readonly properties: {
                                    readonly rtmp: {
                                        readonly type: "string";
                                    };
                                    readonly rtmps: {
                                        readonly type: "string";
                                    };
                                    readonly srt: {
                                        readonly type: "string";
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const WebhooksAddWebhook: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["url", "isFeedHooks"];
        readonly properties: {
            readonly url: {
                readonly type: "string";
                readonly description: "Url to send webhook data to.";
                readonly minLength: 1;
                readonly examples: readonly ["https://example-webhook.domain.com/path/route"];
            };
            readonly isFeedHooks: {
                readonly type: "boolean";
                readonly description: "If true sends webhook events on feeds start/stop.";
                readonly examples: readonly [true];
            };
            readonly isRecordingHooks: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "**Please use `isMediaHooks`.** \n \n If true sends webhook events on recording start/error/complete/deleted.";
                readonly default: false;
                readonly deprecated: true;
                readonly examples: readonly [true];
            };
            readonly isThumbnailHooks: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "If true sends webhook events on thumbnail generation";
                readonly default: false;
                readonly examples: readonly [true];
            };
            readonly isTranscoderHooks: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "If true sends webhook events on transcoder instance updates";
                readonly default: false;
                readonly examples: readonly [true];
            };
            readonly isMediaHooks: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "If true sends webhook events on media asset processing/errored/completed/deleted. Only media assets of type 'recording' and 'clip' types can trigger webhooks. ";
                readonly default: false;
            };
            readonly isViewerConnectionHooks: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "If true sends webhooks on important events related to viewers";
                readonly default: false;
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly description: "Url to send webhook data to.";
                        };
                        readonly secret: {
                            readonly type: "string";
                            readonly description: "Base64 string of signing secret.";
                        };
                        readonly isFeedHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on feeds start/stop.";
                        };
                        readonly isRecordingHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on recording start/error/complete/deleted.";
                        };
                        readonly isThumbnailHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on thumbnail generation";
                        };
                        readonly isTranscoderHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on transcoder instance updates";
                        };
                        readonly isMediaHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on media asset processing/errored/completed/deleted. Only media assets of type 'recording' and 'clip' types can trigger webhooks. ";
                        };
                        readonly isViewerConnectionHooks: {
                            readonly type: readonly ["boolean", "null"];
                            readonly description: "If true sends webhooks on important events related to viewers";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const WebhooksGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly webhookId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["webhookId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly description: "Url to send webhook data to.";
                        };
                        readonly secret: {
                            readonly type: "string";
                            readonly description: "Base64 string of signing secret.";
                        };
                        readonly isFeedHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on feeds start/stop.";
                        };
                        readonly isRecordingHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on recording start/error/complete/deleted.";
                        };
                        readonly isThumbnailHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on thumbnail generation";
                        };
                        readonly isTranscoderHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on transcoder instance updates";
                        };
                        readonly isMediaHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on media asset processing/errored/completed/deleted. Only media assets of type 'recording' and 'clip' types can trigger webhooks. ";
                        };
                        readonly isViewerConnectionHooks: {
                            readonly type: readonly ["boolean", "null"];
                            readonly description: "If true sends webhooks on important events related to viewers";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const WebhooksListWebhooks: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly startingId: {
                    readonly type: readonly ["integer", "null"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If null starts at beginning of list";
                };
                readonly itemCount: {
                    readonly type: readonly ["integer", "null"];
                    readonly default: 10;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "How many items to return in current query";
                };
                readonly isDescending: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Default order is ascending by order added";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly url: {
                                readonly type: "string";
                                readonly description: "Url to send webhook data to.";
                            };
                            readonly secret: {
                                readonly type: "string";
                                readonly description: "Base64 string of signing secret.";
                            };
                            readonly isFeedHooks: {
                                readonly type: "boolean";
                                readonly description: "If true sends webhook events on feeds start/stop.";
                            };
                            readonly isRecordingHooks: {
                                readonly type: "boolean";
                                readonly description: "If true sends webhook events on recording start/error/complete/deleted.";
                            };
                            readonly isThumbnailHooks: {
                                readonly type: "boolean";
                                readonly description: "If true sends webhook events on thumbnail generation";
                            };
                            readonly isTranscoderHooks: {
                                readonly type: "boolean";
                                readonly description: "If true sends webhook events on transcoder instance updates";
                            };
                            readonly isMediaHooks: {
                                readonly type: "boolean";
                                readonly description: "If true sends webhook events on media asset processing/errored/completed/deleted. Only media assets of type 'recording' and 'clip' types can trigger webhooks. ";
                            };
                            readonly isViewerConnectionHooks: {
                                readonly type: readonly ["boolean", "null"];
                                readonly description: "If true sends webhooks on important events related to viewers";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const WebhooksRemoveWebhook: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly webhookId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["webhookId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly description: "Url to send webhook data to.";
                        };
                        readonly secret: {
                            readonly type: "string";
                            readonly description: "Base64 string of signing secret.";
                        };
                        readonly isFeedHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on feeds start/stop.";
                        };
                        readonly isRecordingHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on recording start/error/complete/deleted.";
                        };
                        readonly isThumbnailHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on thumbnail generation";
                        };
                        readonly isTranscoderHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on transcoder instance updates";
                        };
                        readonly isMediaHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on media asset processing/errored/completed/deleted. Only media assets of type 'recording' and 'clip' types can trigger webhooks. ";
                        };
                        readonly isViewerConnectionHooks: {
                            readonly type: readonly ["boolean", "null"];
                            readonly description: "If true sends webhooks on important events related to viewers";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const WebhooksUpdateWebhook: {
    readonly body: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly properties: {
            readonly url: {
                readonly type: readonly ["string", "null"];
                readonly examples: readonly ["https://new-domain.com/other"];
            };
            readonly refreshSecret: {
                readonly type: readonly ["boolean", "null"];
                readonly description: "If true will generate new signing secret for webhook.";
            };
            readonly isFeedHooks: {
                readonly type: readonly ["boolean", "null"];
                readonly examples: readonly [true];
            };
            readonly isRecordingHooks: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly isThumbnailHooks: {
                readonly type: readonly ["boolean", "null"];
                readonly examples: readonly [true];
            };
            readonly isTranscoderHooks: {
                readonly type: readonly ["boolean", "null"];
                readonly examples: readonly [true];
            };
            readonly isMediaHooks: {
                readonly type: readonly ["boolean", "null"];
            };
            readonly isViewerConnectionHooks: {
                readonly type: readonly ["boolean", "null"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly webhookId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["webhookId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "success";
                    readonly minLength: 1;
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly description: "Url to send webhook data to.";
                        };
                        readonly secret: {
                            readonly type: "string";
                            readonly description: "Base64 string of signing secret.";
                        };
                        readonly isFeedHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on feeds start/stop.";
                        };
                        readonly isRecordingHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on recording start/error/complete/deleted.";
                        };
                        readonly isThumbnailHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on thumbnail generation";
                        };
                        readonly isTranscoderHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on transcoder instance updates";
                        };
                        readonly isMediaHooks: {
                            readonly type: "boolean";
                            readonly description: "If true sends webhook events on media asset processing/errored/completed/deleted. Only media assets of type 'recording' and 'clip' types can trigger webhooks. ";
                        };
                        readonly isViewerConnectionHooks: {
                            readonly type: readonly ["boolean", "null"];
                            readonly description: "If true sends webhooks on important events related to viewers";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "data"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "fail";
                    readonly minLength: 1;
                };
                readonly data: {};
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "message"];
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly default: "error";
                    readonly minLength: 1;
                };
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly code: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly data: {
                    readonly nullable: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { AccountDistributionGet, AccountDistributionPut, AccountGetGeoCascade, AccountMediaExpirationGet, AccountMediaExpirationPut, AccountMediaStorageGet, AccountMediaStorageIdDelete, AccountMediaStorageIdGet, AccountMediaStorageIdPut, AccountMediaStoragePost, AccountMediaStorageValidatePost, AccountSecurityGet, AccountSecurityPut, AccountUpdateGeoCascade, AnalyticsAccountGeo, AnalyticsAccountGeoSeries, AnalyticsAccountGeoTotal, AnalyticsAccountSeries, AnalyticsAccountTotal, AnalyticsGetSeriesBandwidthForTrackingId, AnalyticsGetSeriesTranscoderMinutesForAccount, AnalyticsGetTotalBandwidthForTrackingId, AnalyticsGetTotalTranscoderMinutesForAccount, AnalyticsGetTrackingSeriesForStreams, AnalyticsGetTrackingTotalForStreams, AnalyticsMediaAssetUsage, AnalyticsMediaAssetUsageBillable, AnalyticsStreamsGeo, AnalyticsStreamsGeoSeries, AnalyticsStreamsGeoTotal, AnalyticsStreamsSeries, AnalyticsStreamsTotal, ClusterGetClustersInfo, ClusterUpdateClusterInfo, GeoGeo, GeoUpdateGeo, MediaAssetsAllTypeDelete, MediaAssetsDelete, MediaAssetsGet, MediaAssetsMediaAssetIdGet, MediaAssetsPost, MonitoringGetStream, MonitoringListRecentStreams, PublishTokenV1CreateToken, PublishTokenV1DeleteToken, PublishTokenV1DisableTokens, PublishTokenV1GetActiveTokenByStreamId, PublishTokenV1GetAllActiveTokensByAccount, PublishTokenV1ListTokens, PublishTokenV1ListTokensByCluster, PublishTokenV1ListTokensByName, PublishTokenV1ReadToken, PublishTokenV1UpdateToken, RecordFilesCreateRecordClip, RecordFilesDeleteAllRecordFiles, RecordFilesDeleteClipRequestLive, RecordFilesDeleteClipSources, RecordFilesDeleteExpiryRule, RecordFilesDeleteRecordFile, RecordFilesDeleteRecordFiles, RecordFilesGetClipRequest, RecordFilesGetExpiryRule, RecordFilesGetRecordFile, RecordFilesListAvailableClipSources, RecordFilesListClipRequests, RecordFilesListRecordFiles, RecordFilesListRecordFilesByStream, RecordFilesListRecordFilesByToken, RecordFilesRecordFileUsage, RecordFilesRecordFileUsageBillable, RecordFilesUpdateExpiryRule, RecordFilesV2DeleteMediaAssets, RecordFilesV2ListMediaAssets, RecordFilesV2ReadMediaAsset, RecordFilesValidateStorageProfile, StreamStopByAccount, StreamStopStream, SubscribeTokenV1CreateToken, SubscribeTokenV1DeleteToken, SubscribeTokenV1ListTokens, SubscribeTokenV1ListTokensByName, SubscribeTokenV1ReadToken, SubscribeTokenV1UpdateToken, TranscoderCreateTranscoder, TranscoderDeleteTranscoder, TranscoderGetTranscoder, TranscoderGetTranscoderInstance, TranscoderListTranscoderInstances, TranscoderListTranscoderProfiles, TranscoderListTranscoders, TranscoderStartTranscoder, TranscoderStopTranscoder, TranscoderUpdateTranscoder, WebhooksAddWebhook, WebhooksGet, WebhooksListWebhooks, WebhooksRemoveWebhook, WebhooksUpdateWebhook };
