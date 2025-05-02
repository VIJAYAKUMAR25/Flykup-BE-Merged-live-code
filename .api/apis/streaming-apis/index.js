"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'streaming-apis/1.0.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Update account level expiration rule for various media asset types.
     *
     * @summary Update Account Media Assets Expiration Rules
     */
    SDK.prototype.accountMediaExpirationPut = function (body) {
        return this.core.fetch('/api/v3/account/media/expiration', 'put', body);
    };
    /**
     * Get account level expiration rule for various media asset types.
     *
     * @summary Get Account Media Assets Expiration Rule
     */
    SDK.prototype.accountMediaExpirationGet = function () {
        return this.core.fetch('/api/v3/account/media/expiration', 'get');
    };
    /**
     * List all storage profiles created on your account.
     *
     * @summary List Storage Profiles
     */
    SDK.prototype.accountMediaStorageGet = function (metadata) {
        return this.core.fetch('/api/v3/account/media/storage', 'get', metadata);
    };
    /**
     * Create a storage profile identifying the configuration for a cloud storage provider that
     * can receive media assets when they are finished processing. Only one storage profile
     * will be set as a default for the entire account, otherwise you may specify a storage
     * location using the `storageProfileId` on any individual media clip request.
     *
     * @summary Create Storage Profile
     * @throws FetchError<400, types.AccountMediaStoragePostResponse400> Bad Request
     */
    SDK.prototype.accountMediaStoragePost = function (body) {
        return this.core.fetch('/api/v3/account/media/storage', 'post', body);
    };
    /**
     * Specify the id of a storage profile you wish to delete.
     *
     * @summary Delete Storage Profile
     */
    SDK.prototype.accountMediaStorageIdDelete = function (metadata) {
        return this.core.fetch('/api/v3/account/media/storage/{id}', 'delete', metadata);
    };
    /**
     * Get details of a saved storage profile
     *
     * @summary Get Storage Profile
     */
    SDK.prototype.accountMediaStorageIdGet = function (metadata) {
        return this.core.fetch('/api/v3/account/media/storage/{id}', 'get', metadata);
    };
    /**
     * Change the details of a storage profile.
     *
     * @summary Update Storage Profile
     */
    SDK.prototype.accountMediaStorageIdPut = function (body, metadata) {
        return this.core.fetch('/api/v3/account/media/storage/{id}', 'put', body, metadata);
    };
    /**
     * Validates third party storage is configured with permissions for Dolby.io to upload
     * media assets.
     *
     *  To track the validation result, keep note of the the `id` returned in the response
     * body. If correctly configured, when calling [Get Media
     * Asset](#tag/MediaAssets/operation/MediaAssets_GetMediaAssets), the response should
     * return a successful entry with `id` matching the `id`.
     *
     *  Run once to validate write permissions. If successful, optionally run a second time to
     * confirm that overwriting is allowed.
     *
     *  Note that validation results are only available for 1 hour.
     *
     * @summary Validate Third Party Storage Setup
     */
    SDK.prototype.accountMediaStorageValidatePost = function (body) {
        return this.core.fetch('/api/v3/account/media/storage/validate', 'post', body);
    };
    /**
     * Gets account wide distribution settings. Whenever publish tokens are created, these will
     * be the default settings used for features that impact how streams are distributed.
     *  * geoCascade: controls if and which geographic clusters are included for regional
     * content delivery
     *
     *
     * @summary Read Account Distribution Settings
     * @throws FetchError<400, types.AccountDistributionGetResponse400> Bad Request
     */
    SDK.prototype.accountDistributionGet = function () {
        return this.core.fetch('/api/v3/account/distribution', 'get');
    };
    /**
     * Update account wide distribution settings to enable/disable the feature or update the
     * account default cluster list. Whenever publish tokens are created, these will be the
     * default settings used for features that impact how streams are distributed.
     * '["all"]' could be used in place of cluster list to cascade stream to all existing and
     * any future clusters available to the account.
     * Empty cluster list is not allowed when enabling account wide distribution settings.
     * Cluster list is translated to '["all"]' clusters if not specified or set to null.
     * Cluster list is ignored when geo cascade is disabled.
     *
     * @summary Update Account Distribution Settings
     * @throws FetchError<400, types.AccountDistributionPutResponse400> Bad Request
     */
    SDK.prototype.accountDistributionPut = function (body) {
        return this.core.fetch('/api/v3/account/distribution', 'put', body);
    };
    /**
     * Gets account wide security settings. If a Token (either Publish or Subscribe) does not
     * define any security settings, the account wide rules are used.
     *
     * @summary Read Account Security Settings
     * @throws FetchError<400, types.AccountSecurityGetResponse400> Bad Request
     */
    SDK.prototype.accountSecurityGet = function () {
        return this.core.fetch('/api/v3/account/security', 'get');
    };
    /**
     * Update account wide security settings. Updated to an empty array `[]` removes all rules
     * of that type.
     *
     * @summary Update Account Security Settings
     * @throws FetchError<400, types.AccountSecurityPutResponse400> Bad Request
     */
    SDK.prototype.accountSecurityPut = function (body) {
        return this.core.fetch('/api/v3/account/security', 'put', body);
    };
    /**
     * Create a live clip from an ongoing live stream. You must provide the stream name and
     * start time, and once processing is complete the media asset of the type clip will be
     * available for retrieval.
     *
     * If a stop time is not specified, the time the request was received will be used. The
     * clip duration must be a minimum of ten (10) seconds and cannot exceed eight (8) hours.
     *
     *  There are a few cases where more than one clip will be generated from a single request.
     *
     *  1. A stream went offline during the time range will generate separate clips for the
     * period before and after the restart.
     * 2. A stream that is configured for multi-source when a simulcastId is not given in the
     * request to select a single layer.
     *  3. A stream that is configured for multi-bitrate contribution or redundant fallback
     * ingest and a sourceId is not given in the request to specify which to use. In that
     * scenario, sources will be ranked based on the following criteria and the highest ranked
     * source is selected for clipping:
     *  * priority
     * * quality
     * * start time
     *
     *
     *  By using an `Idempotency-Key` header in your requests, you can avoid generating more
     * than one identical clip should the same request be received more than once. To avoid
     * unnecessary charges, it is recommended you use a common identifier for live clip
     * requests based on a common source stream and time range. For background on the usage of
     * this header, please refer to the [IETF
     * Draft](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/)
     *
     * @summary Create Media Asset
     * @throws FetchError<400, types.MediaAssetsPostResponse400> Bad Request
     */
    SDK.prototype.mediaAssetsPost = function (body) {
        return this.core.fetch('/api/v3/media/assets', 'post', body);
    };
    /**
     * List media assets, excluding those that have been deleted.
     * A media asset can be:
     * * A `"recording"` that is from the full duration of the stream
     * * A `"clip"` which is generated from [Create Media
     * Asset](#tag/MediaAssets/operation/MediaAssets_CreateMediaAsset)
     * * A `"timeline"` which is a series of segments that is buffered in a cache and available
     * for clipping.  A `"timeline"` is capped at a 12 hour duration or whenever the stream is
     * re-started.
     *  * Of type `storageValidation`, which is a record reflecting the outcome of triggering
     * [Validate Third Party Storage
     * Setup](#tag/Account/operation/Account_ValidateThirdPartyStorage)
     *
     *
     * @summary List Media Assets
     * @throws FetchError<400, types.MediaAssetsGetResponse400> Bad Request
     */
    SDK.prototype.mediaAssetsGet = function (metadata) {
        return this.core.fetch('/api/v3/media/assets', 'get', metadata);
    };
    /**
     * Deletes multiple media assets from storage. Only media assets with status Complete or
     * Error can be deleted.
     *
     * @summary Delete Media Assets
     */
    SDK.prototype.mediaAssetsDelete = function (metadata) {
        return this.core.fetch('/api/v3/media/assets', 'delete', metadata);
    };
    /**
     * Gets media asset specified by id. Includes temporary download link if the media asset is
     * complete.
     *
     * @summary Read Media Asset
     * @throws FetchError<400, types.MediaAssetsMediaAssetIdGetResponse400> Bad Request
     */
    SDK.prototype.mediaAssetsMediaAssetIdGet = function (metadata) {
        return this.core.fetch('/api/v3/media/assets/{mediaAssetId}', 'get', metadata);
    };
    /**
     * Deletes all media assets of a specified type from storage.
     *
     * @summary Delete All Media Assets
     */
    SDK.prototype.mediaAssetsAllTypeDelete = function (metadata) {
        return this.core.fetch('/api/v3/media/assets/all/{type}', 'delete', metadata);
    };
    /**
     * **Please refer to [List Media Assets](#operation/MediaAssets_ListMediaAssets)**
     *
     * List media assets, excluding those that have been deleted.
     * A media asset can be:
     * * A `"FullRecording"` that is from the full duration of the stream
     * * A `"Clip"` which is generated from a clip request
     *
     *
     *
     * @summary List Media Assets
     * @throws FetchError<400, types.RecordFilesV2ListMediaAssetsResponse400> Bad Request
     */
    SDK.prototype.recordFilesV2_ListMediaAssets = function (body, metadata) {
        return this.core.fetch('/api/v2/record_files/list', 'get', body, metadata);
    };
    /**
     * **Please refer to [Read Media Asset](#operation/MediaAssets_ReadMediaAsset)**
     *
     * Gets media asset specified by id. Includes temporary download link if the media asset is
     * complete.
     *
     * @summary Read Media Asset
     * @throws FetchError<400, types.RecordFilesV2ReadMediaAssetResponse400> Bad Request
     */
    SDK.prototype.recordFilesV2_ReadMediaAsset = function (metadata) {
        return this.core.fetch('/api/v2/record_files/{mediaAssetId}', 'get', metadata);
    };
    /**
     * **Please refer to [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets)**
     *
     * Deletes multiple media assets from storage. Only media assets with status Complete or
     * Error can be deleted.
     *
     * @summary Delete Media Assets
     */
    SDK.prototype.recordFilesV2_DeleteMediaAssets = function (body) {
        return this.core.fetch('/api/v2/record_files/delete', 'post', body);
    };
    /**
     * Get total usage on account over a date range.
     *
     * @summary Account Total
     * @throws FetchError<400, types.AnalyticsAccountTotalResponse400> Bad Request
     */
    SDK.prototype.analytics_AccountTotal = function (metadata) {
        return this.core.fetch('/api/analytics/account/total', 'get', metadata);
    };
    /**
     * Get usage as a time series on account over a date range.
     * Response keys are ISO 8601 dates from requested resolution.
     *
     * @summary Account Series
     * @throws FetchError<400, types.AnalyticsAccountSeriesResponse400> Bad Request
     */
    SDK.prototype.analytics_AccountSeries = function (metadata) {
        return this.core.fetch('/api/analytics/account/series', 'get', metadata);
    };
    /**
     * Get bandwidth and duration per country code on account over a date range.
     * Response keys are ISO 3166-1 alpha-2 country codes.
     *
     * @summary Account Geo Total
     * @throws FetchError<400, types.AnalyticsAccountGeoTotalResponse400> Bad Request
     */
    SDK.prototype.analytics_AccountGeoTotal = function (metadata) {
        return this.core.fetch('/api/analytics/account/geo_total', 'get', metadata);
    };
    /**
     * Get bandwidth, duration, publishes, and views as a time series per country code on
     * account over a date range.
     * Response keys are ISO 8601 dates from requested resolution, followed by keys for ISO
     * 3166-1 alpha-2 country codes.
     *
     * @summary Account Geo Series
     * @throws FetchError<400, types.AnalyticsAccountGeoSeriesResponse400> Bad Request
     */
    SDK.prototype.analytics_AccountGeoSeries = function (metadata) {
        return this.core.fetch('/api/analytics/account/geo_series', 'get', metadata);
    };
    /**
     * Get total usage on specified streamnames over a date range.
     * Response keys are requested streamnames.
     *
     * @summary Streams Total
     * @throws FetchError<400, types.AnalyticsStreamsTotalResponse400> Bad Request
     */
    SDK.prototype.analytics_StreamsTotal = function (metadata) {
        return this.core.fetch('/api/analytics/streams/total', 'get', metadata);
    };
    /**
     * Get usage as a time series on specified streamnames over a date range.
     * Response keys are requested streamnames, followed by keys for ISO 8601 dates from
     * requested resolution.
     *
     * @summary Streams Series
     * @throws FetchError<400, types.AnalyticsStreamsSeriesResponse400> Bad Request
     */
    SDK.prototype.analytics_StreamsSeries = function (metadata) {
        return this.core.fetch('/api/analytics/streams/series', 'get', metadata);
    };
    /**
     * Get bandwidth and duration per country code on specified streamnames over a date range.
     * Response keys are requested streamnames, followed by keys for ISO 3166-1 alpha-2 country
     * codes.
     *
     * @summary Streams Geo Total
     * @throws FetchError<400, types.AnalyticsStreamsGeoTotalResponse400> Bad Request
     */
    SDK.prototype.analytics_StreamsGeoTotal = function (metadata) {
        return this.core.fetch('/api/analytics/streams/geo_total', 'get', metadata);
    };
    /**
     * Get bandwidth, duration, publishes, and views as a time series per country code on
     * specified streamnames over a date range.
     * Response keys are requested streamnames,  followed by keys for ISO 8601 dates from
     * requested resolution, followed by keys for ISO 3166-1 alpha-2 country codes.
     *
     * @summary Streams Geo Series
     * @throws FetchError<400, types.AnalyticsStreamsGeoSeriesResponse400> Bad Request
     */
    SDK.prototype.analytics_StreamsGeoSeries = function (metadata) {
        return this.core.fetch('/api/analytics/streams/geo_series', 'get', metadata);
    };
    /**
     * Get bandwidth and views per country code on account over a date range.
     * Response keys are ISO 3166-1 alpha-2 country codes.
     *
     * @summary Account Geo
     * @throws FetchError<400, types.AnalyticsAccountGeoResponse400> Bad Request
     */
    SDK.prototype.analytics_AccountGeo = function (metadata) {
        return this.core.fetch('/api/analytics/account/geo', 'get', metadata);
    };
    /**
     * Get bandwidth and views per country code on specified streamnames over a date range.
     * Response keys are requested streamnames, followed by keys for ISO 3166-1 alpha-2 country
     * codes.
     *
     * @summary Streams Geo
     * @throws FetchError<400, types.AnalyticsStreamsGeoResponse400> Bad Request
     */
    SDK.prototype.analytics_StreamsGeo = function (metadata) {
        return this.core.fetch('/api/analytics/streams/geo', 'get', metadata);
    };
    /**
     * Get total bandwidth for each TrackingID associated with specified streamNames over a
     * date range. Response keys are requested streamnames.
     *
     * @summary Total bandwidth per TrackingID per stream
     * @throws FetchError<400, types.AnalyticsGetTrackingTotalForStreamsResponse400> Bad Request
     */
    SDK.prototype.analytics_GetTrackingTotalForStreams = function (metadata) {
        return this.core.fetch('/api/analytics/tracking/streams/total', 'get', metadata);
    };
    /**
     * Get bandwidth used as a time series on specified streamnames over a date range. Response
     * keys are requested streamnames, followed by keys for ISO 8601 dates from requested
     *
     * @summary Series bandwidth per TrackingID per stream
     * @throws FetchError<400, types.AnalyticsGetTrackingSeriesForStreamsResponse400> Bad Request
     */
    SDK.prototype.analytics_GetTrackingSeriesForStreams = function (metadata) {
        return this.core.fetch('/api/analytics/tracking/streams/series', 'get', metadata);
    };
    /**
     * Get total bandwidth for TrackingIDs specified on a stream-by-stream basis. Response keys
     * are requested TrackingIDs.
     *
     * @summary Total bandwidth for streams specified by TrackingID
     * @throws FetchError<400, types.AnalyticsGetTotalBandwidthForTrackingIdResponse400> Bad Request
     */
    SDK.prototype.analytics_GetTotalBandwidthForTrackingId = function (metadata) {
        return this.core.fetch('/api/analytics/tracking/total', 'get', metadata);
    };
    /**
     * Get bandwidth information  used as a time series on specified TrackingIDs over a date
     * range on a stream-by-stream basis. Response keys are requested TrackingIDs, followed by
     * keys for ISO 8601 dates from requested
     *
     * @summary Series bandwidth for streams specified by TrackingID
     * @throws FetchError<400, types.AnalyticsGetSeriesBandwidthForTrackingIdResponse400> Bad Request
     */
    SDK.prototype.analytics_GetSeriesBandwidthForTrackingId = function (metadata) {
        return this.core.fetch('/api/analytics/tracking/series', 'get', metadata);
    };
    /**
     * Lists total transcoder uptime in minutes calculated between two date ranges for an
     * account.
     *
     *  Note: Transcoding billing is calculated once per day for the previous day, so you may
     * not see an entry for today yet.
     *
     * @summary Get Total Transcoder Minutes
     * @throws FetchError<400, types.AnalyticsGetTotalTranscoderMinutesForAccountResponse400> Bad Request
     */
    SDK.prototype.analytics_GetTotalTranscoderMinutesForAccount = function (metadata) {
        return this.core.fetch('/api/analytics/transcoder/total', 'get', metadata);
    };
    /**
     * List Transcoder uptime in minutes calculated between two date ranges for an account. The
     * data will show a list of dates each with corresponding transcoder minutes for that
     * specific day.
     *
     *  Note: Transcoding billing is calculated once per day for the previous day, so you may
     * not see an entry for today yet.
     *
     * @summary Get Transcoder Minutes Series
     * @throws FetchError<400, types.AnalyticsGetSeriesTranscoderMinutesForAccountResponse400> Bad Request
     */
    SDK.prototype.analytics_GetSeriesTranscoderMinutesForAccount = function (metadata) {
        return this.core.fetch('/api/analytics/transcoder/series', 'get', metadata);
    };
    /**
     * Returns the total number of bytes used to store all media assets. The total is inclusive
     * of all contributing media types including recordings, clips, and timelines.
     *
     * @summary Usage
     */
    SDK.prototype.analytics_MediaAssetUsage = function () {
        return this.core.fetch('/api/analytics/media/storage/usage', 'get');
    };
    /**
     * Returns the number of gigabyte hours of storage used for a given date range. The total
     * is inclusive of all contributing media types including recordings, clips, and timelines.
     *
     *
     * @summary Usage Billable
     */
    SDK.prototype.analytics_MediaAssetUsageBillable = function (metadata) {
        return this.core.fetch('/api/analytics/media/storage/usage/billing', 'get', metadata);
    };
    /**
     * Returns streams that are live or were live within the previous 60 minutes. This can help
     * monitor broadcast sources for stream duration, number of viewers, and ingest feed status
     * for overall stream health.
     *
     *
     * @summary List Recent Live Streams
     * @throws FetchError<400, types.MonitoringListRecentStreamsResponse400> Bad Request
     */
    SDK.prototype.monitoring_ListRecentStreams = function (metadata) {
        return this.core.fetch('/api/monitoring/streams', 'get', metadata);
    };
    /**
     * Returns the broadcast details of a specific stream by name if it was live within the
     * previous 60 minutes. This can help monitor broadcast sources for stream duration, number
     * of viewers, and ingest feed status for overall stream health.
     *
     *
     * @summary Get Live Stream
     * @throws FetchError<400, types.MonitoringGetStreamResponse400> Bad Request
     */
    SDK.prototype.monitoring_GetStream = function (metadata) {
        return this.core.fetch('/api/monitoring/streams/{streamName}', 'get', metadata);
    };
    /**
     * Returns the configuration of a Transcoder and any individual host instances for the
     * given transcoderId.
     *
     * @summary Get Transcoder
     * @throws FetchError<400, types.TranscoderGetTranscoderResponse400> Bad Request
     */
    SDK.prototype.transcoder_GetTranscoder = function (metadata) {
        return this.core.fetch('/api/transcoders/{transcoderId}', 'get', metadata);
    };
    /**
     * Make changes to the configuration of an existing Transcoder. Changes should take effect
     * without requiring a server restart except for DNS prefix and cluster, which can only be
     * updated when the transcoder is in a shutdown state.
     *
     *  Changing the profile will require either a profile id or the height, frameRate, and
     * passThrough. If you specify both, only the profile will be used. See the 'List
     * Transcoder Profiles' endpoint to find available Transcoder profiles.
     *
     * @summary Update Transcoder
     * @throws FetchError<400, types.TranscoderUpdateTranscoderResponse400> Bad Request
     */
    SDK.prototype.transcoder_UpdateTranscoder = function (body, metadata) {
        return this.core.fetch('/api/transcoders/{transcoderId}', 'put', body, metadata);
    };
    /**
     * Delete the configuration of a Transcoder and any instances for it for the given
     * transcoderId. If the Transcoder is still running it will be shutdown immediately.
     *
     * @summary Delete Transcoder
     * @throws FetchError<400, types.TranscoderDeleteTranscoderResponse400> Bad Request
     */
    SDK.prototype.transcoder_DeleteTranscoder = function (metadata) {
        return this.core.fetch('/api/transcoders/{transcoderId}', 'delete', metadata);
    };
    /**
     * Create a Cloud Transcoder to enable Adaptive Bitrate (ABR) Simulcast streams without
     * requiring multiple broadcast contribution sources.
     *
     *  A Transcoder represents the configuration of your bitrate ladder from a pre-defined
     * profile or by setting the maximum height and frameRate you'd like to target. See the
     * 'List Transcoder Profiles' endpoint to find available Transcoder profiles. If you
     * specify both a profile id and height/frameRate settings only the profile will be used.
     *
     *  You should update any broadcast encoders to use this new origin server as configured by
     * the DNS of the Transcoder which can be found in the response data.
     *
     *  There are additional charges for a Transcoder so you should use the Stop Transcoder and
     * Start Transcoder  endpoints to enable cloud transcoding only when you need to broadcast.
     *
     * @summary Create Transcoder
     * @throws FetchError<400, types.TranscoderCreateTranscoderResponse400> Bad Request
     */
    SDK.prototype.transcoder_CreateTranscoder = function (body) {
        return this.core.fetch('/api/transcoders', 'post', body);
    };
    /**
     * Return the Transcoders that have been configured for your account. You can use query
     * parameters to filter, sort, or paginate the results returned.
     *
     * @summary List Transcoders
     * @throws FetchError<400, types.TranscoderListTranscodersResponse400> Bad Request
     */
    SDK.prototype.transcoder_ListTranscoders = function (metadata) {
        return this.core.fetch('/api/transcoders', 'get', metadata);
    };
    /**
     * Enable a Transcoder by ID to accept incoming broadcast sources.
     *
     * @summary Start Transcoder
     * @throws FetchError<400, types.TranscoderStartTranscoderResponse400> Bad Request
     */
    SDK.prototype.transcoder_StartTranscoder = function (metadata) {
        return this.core.fetch('/api/transcoders/start/{transcoderId}', 'put', metadata);
    };
    /**
     * Disable a Transcoder by ID so that it will shutdown and no longer accept incoming
     * broadcast sources.
     *
     * @summary Stop Transcoder
     * @throws FetchError<400, types.TranscoderStopTranscoderResponse400> Bad Request
     */
    SDK.prototype.transcoder_StopTranscoder = function (metadata) {
        return this.core.fetch('/api/transcoders/stop/{transcoderId}', 'put', metadata);
    };
    /**
     * Get transcoder instance information by Transcoder Instance ID. Instances can be listed
     * and filtered using the List Transcoder Instances endpoint.
     *
     * @summary Get Transcoder Instance
     * @throws FetchError<400, types.TranscoderGetTranscoderInstanceResponse400> Bad Request
     */
    SDK.prototype.transcoder_GetTranscoderInstance = function (metadata) {
        return this.core.fetch('/api/transcoders/instances/{instanceId}', 'get', metadata);
    };
    /**
     * A Transcoder Instance is an individual host within a cluster that has been configured
     * based on the Transcoder settings. By default, Deleted instances are returned unless
     * specified with Status parameter. This can be used to get historical instance
     * information.
     *
     * @summary List Transcoder Instances
     * @throws FetchError<400, types.TranscoderListTranscoderInstancesResponse400> Bad Request
     */
    SDK.prototype.transcoder_ListTranscoderInstances = function (metadata) {
        return this.core.fetch('/api/transcoders/instances', 'get', metadata);
    };
    /**
     * A Transcoder Profile is a pre-defined configuration for how to direct the bitrate ladder
     * in distributing individual layers.
     *
     * @summary List Transcoder Profiles
     * @throws FetchError<400, types.TranscoderListTranscoderProfilesResponse400> Bad Request
     */
    SDK.prototype.transcoder_ListTranscoderProfiles = function (metadata) {
        return this.core.fetch('/api/transcoders/profiles', 'get', metadata);
    };
    /**
     * **Please refer to [Get Account Distribution
     * Settings](#tag/Account/operation/Account_GetAccountDistribution)**
     *
     * Gets account wide geo cascade settings. If a Publish Token does not define any geo
     * cascade settings, the account wide settings are used.
     *
     * @summary Read Account Geo Cascade Settings
     * @throws FetchError<400, types.AccountGetGeoCascadeResponse400> Bad Request
     */
    SDK.prototype.account_GetGeoCascade = function () {
        return this.core.fetch('/api/account/geo_cascade', 'get');
    };
    /**
     * **Please refer to [Update Account Distribution
     * Settings](#tag/Account/operation/Account_UpdateAccountDistribution)**
     *
     * Update account wide geo cascade settings to enable/disable the feature or update the
     * account default cluster list.
     * '["all"]' could be used in place of cluster list to cascade stream to all existing and
     * any future clusters available to the account.
     * Empty cluster list is not allowed when enabling geo cascade feature. Cluster list is
     * translated to '["all"]' clusters if not specified or set to null.
     * Cluster list is ignored when geo cascade is disabled.
     *
     * @summary Update Account Geo Cascade Settings
     * @throws FetchError<400, types.AccountUpdateGeoCascadeResponse400> Bad Request
     */
    SDK.prototype.account_UpdateGeoCascade = function (body) {
        return this.core.fetch('/api/account/geo_cascade', 'put', body);
    };
    /**
     * Default cluster and list of available clusters.
     *
     * @summary Read Clusters
     */
    SDK.prototype.cluster_GetClustersInfo = function () {
        return this.core.fetch('/api/cluster', 'get');
    };
    /**
     * Update default cluster on account.
     *
     * @summary Update Cluster
     * @throws FetchError<400, types.ClusterUpdateClusterInfoResponse400> Bad Request
     */
    SDK.prototype.cluster_UpdateClusterInfo = function (body) {
        return this.core.fetch('/api/cluster', 'put', body);
    };
    /**
     * **Please refer to [Get Account Security
     * Settings](#tag/Account/operation/Account_GetAccountSecurity)**
     *
     * Gets account wide geo restrictions. If a Token (either Publish or Subscribe) does not
     * define any geo restrictions, the account wide rules are used.
     *
     * @summary Read Account Geo Restrictions
     * @throws FetchError<400, types.GeoGeoResponse400> Bad Request
     */
    SDK.prototype.geo_Geo = function () {
        return this.core.fetch('/api/geo/account', 'get');
    };
    /**
     * **Please refer to [Update Account Security
     * Settings](#tag/Account/operation/Account_UpdateAccountSecurity)**
     *
     * Update account wide geo restrictions. Updated to an empty array `[]` removes all rules
     * of that type.
     *
     * @summary Update Account Geo Restrictions
     * @throws FetchError<400, types.GeoUpdateGeoResponse400> Bad Request
     */
    SDK.prototype.geo_UpdateGeo = function (body) {
        return this.core.fetch('/api/geo/account', 'post', body);
    };
    /**
     * Gets token specified by token id.
     *
     * @summary Read Token
     * @throws FetchError<400, types.PublishTokenV1ReadTokenResponse400> Bad Request
     */
    SDK.prototype.publishTokenV1_ReadToken = function (metadata) {
        return this.core.fetch('/api/publish_token/{tokenId}', 'get', metadata);
    };
    /**
     * Deletes token specified by the token's ID. The Token ID can be found using the List
     * Tokens API or in the API response of Create Token API.
     *
     * @summary Delete Token
     */
    SDK.prototype.publishTokenV1_DeleteToken = function (metadata) {
        return this.core.fetch('/api/publish_token/{tokenId}', 'delete', metadata);
    };
    /**
     * Update token stream information as well as updates token itself.
     *
     * @summary Update Token
     * @throws FetchError<400, types.PublishTokenV1UpdateTokenResponse400> Bad Request
     */
    SDK.prototype.publishTokenV1_UpdateToken = function (body, metadata) {
        return this.core.fetch('/api/publish_token/{tokenId}', 'put', body, metadata);
    };
    /**
     * List all tokens with specific sorting and pagination. If response array is empty, you
     * have reached the end of the list ordering.
     *
     * @summary List Tokens
     * @throws FetchError<400, types.PublishTokenV1ListTokensResponse400> Bad Request
     */
    SDK.prototype.publishTokenV1_ListTokens = function (metadata) {
        return this.core.fetch('/api/publish_token/list', 'get', metadata);
    };
    /**
     * List all tokens with specific sorting and pagination that matches given token name or
     * stream name. If response array is empty, you have reached the end of the list ordering.
     *
     * @summary List Tokens By Name
     * @throws FetchError<400, types.PublishTokenV1ListTokensByNameResponse400> Bad Request
     */
    SDK.prototype.publishTokenV1_ListTokensByName = function (metadata) {
        return this.core.fetch('/api/publish_token/list_by_name', 'get', metadata);
    };
    /**
     * List all tokens with specific sorting and pagination that matches given cluster region.
     * If response array is empty, you have reached the end of the list ordering.
     *
     * @summary List Tokens By Cluster
     * @throws FetchError<400, types.PublishTokenV1ListTokensByClusterResponse400> Bad Request
     */
    SDK.prototype.publishTokenV1_ListTokensByCluster = function (metadata) {
        return this.core.fetch('/api/publish_token/list_by_cluster', 'get', metadata);
    };
    /**
     * Creates new token given a label and associated stream name(s). Stream names are limited
     * to 128 characters.
     *
     * @summary Create Token
     * @throws FetchError<400, types.PublishTokenV1CreateTokenResponse400> Bad Request
     */
    SDK.prototype.publishTokenV1_CreateToken = function (body) {
        return this.core.fetch('/api/publish_token', 'post', body);
    };
    /**
     * Gets the Publish Token ID of an active stream by its Stream ID. Publish Tokens for long
     * running streams published before 1st October 2022 will not be returned. If you need to
     * stop a long running stream, use the Dashboard or try republishing the stream.
     *
     * @summary Get active Publish Token ID
     */
    SDK.prototype.publishTokenV1_GetActiveTokenByStreamId = function (metadata) {
        return this.core.fetch('/api/publish_token/active', 'get', metadata);
    };
    /**
     * Get all Publish Token IDs for active streams on the account. Publish Tokens for long
     * running streams published before 1st October 2022 will not be returned. If you need to
     * stop a long running stream, use the Dashboard or try republishing the stream.
     *
     * @summary Get all active Publish Token IDs
     */
    SDK.prototype.publishTokenV1_GetAllActiveTokensByAccount = function () {
        return this.core.fetch('/api/publish_token/active/all', 'get');
    };
    /**
     * Disables Publish Token(s) by their Token ID. An array of Token IDs can be used for bulk
     * disable.
     *
     * @summary Disable Publish Token(s)
     */
    SDK.prototype.publishTokenV1_DisableTokens = function (body) {
        return this.core.fetch('/api/publish_token/disable', 'patch', body);
    };
    /**
     * **Please refer to [Read Media Assets](#operation/MediaAssets_ReadMediaAsset)**
     *
     * Gets file specified by record file id. Includes temporary download link.
     *
     * @summary Read File
     * @throws FetchError<400, types.RecordFilesGetRecordFileResponse400> Bad Request
     */
    SDK.prototype.recordFiles_GetRecordFile = function (metadata) {
        return this.core.fetch('/api/record_files/{recordFileId}', 'get', metadata);
    };
    /**
     * **Please refer to [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets)**
     *
     * Deletes recorded file from storage.
     *
     * @summary Delete File
     */
    SDK.prototype.recordFiles_DeleteRecordFile = function (metadata) {
        return this.core.fetch('/api/record_files/{recordFileId}', 'delete', metadata);
    };
    /**
     * **Please refer to [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets)**
     *
     * Deletes multiple recorded file from storage.
     *
     * @summary Delete Files
     */
    SDK.prototype.recordFiles_DeleteRecordFiles = function (body) {
        return this.core.fetch('/api/record_files/delete', 'post', body);
    };
    /**
     * **Please refer to [Delete All Media Assets](#operation/MediaAssets_DeleteMediaAssets2)**
     *
     * Deletes all recorded files from storage.
     *
     * @summary Delete All Files
     */
    SDK.prototype.recordFiles_DeleteAllRecordFiles = function () {
        return this.core.fetch('/api/record_files/delete/all', 'post');
    };
    /**
     * **Please refer to [List Media Assets](#operation/MediaAssets_ListMediaAssets)**
     *
     * List files for account with specific sorting and pagination. If response array is empty,
     * you have reached the end of the list ordering.
     *
     * @summary List Files
     * @throws FetchError<400, types.RecordFilesListRecordFilesResponse400> Bad Request
     */
    SDK.prototype.recordFiles_ListRecordFiles = function (metadata) {
        return this.core.fetch('/api/record_files/list', 'get', metadata);
    };
    /**
     * **Please refer to [List Media Assets](#operation/MediaAssets_ListMediaAssets) and query
     * using the `tokenId` parameter**
     *
     * List files using a token with specific sorting and pagination. If response array is
     * empty, you have reached the end of the list ordering.
     *
     * @summary List Files By Token
     * @throws FetchError<400, types.RecordFilesListRecordFilesByTokenResponse400> Bad Request
     */
    SDK.prototype.recordFiles_ListRecordFilesByToken = function (metadata) {
        return this.core.fetch('/api/record_files/list_by_token', 'get', metadata);
    };
    /**
     * **Please refer to [List Media Assets](#operation/MediaAssets_ListMediaAssets) and query
     * using the `streamName`parameter**
     *
     * List files using a streamname with specific sorting and pagination. If response array is
     * empty, you have reached the end of the list ordering.
     *
     * @summary List Files By Stream
     * @throws FetchError<400, types.RecordFilesListRecordFilesByStreamResponse400> Bad Request
     */
    SDK.prototype.recordFiles_ListRecordFilesByStream = function (metadata) {
        return this.core.fetch('/api/record_files/list_by_stream', 'get', metadata);
    };
    /**
     * **Please refer to [Usage](#operation/Account_MediaAssetUsage)**
     *
     * Get current total bytes of recorded files in storage.
     *
     * @summary Usage
     */
    SDK.prototype.recordFiles_RecordFileUsage = function () {
        return this.core.fetch('/api/record_files/usage', 'get');
    };
    /**
     * **Please refer to [Usage Billable](#operation/Account_RecordFileUsageBillable)**
     *
     * Get total number of gigabyte hours of storage used within date range.
     *
     * @summary Usage Billable
     */
    SDK.prototype.recordFiles_RecordFileUsageBillable = function (metadata) {
        return this.core.fetch('/api/record_files/usage_billing', 'get', metadata);
    };
    /**
     * **Please refer to [Create Media Asset](#operation/MediaAssets_CreateMediaAsset)**
     *
     * Create clip of recording with specified start and stop times. Start and stop times must
     * be at least 10 seconds apart. Use the mediaAssetIds in the response to retrieve the
     * record files.
     *
     * @summary Create Clip
     * @throws FetchError<400, types.RecordFilesCreateRecordClipResponse400> Bad Request
     */
    SDK.prototype.recordFiles_CreateRecordClip = function (body) {
        return this.core.fetch('/api/record_files/clip', 'post', body);
    };
    /**
     * **There is no direct replacement for this endpoint. Media assets can be retrieved using
     * [Get Media Asset](#operation/MediaAssets_ReadMediaAsset).**
     *
     * Get clip request
     *
     * @summary Get Clip Request
     */
    SDK.prototype.recordFiles_GetClipRequest = function (metadata) {
        return this.core.fetch('/api/record_files/clip/{clipRequestId}', 'get', metadata);
    };
    /**
     * **There is no direct replacement for this endpoint. Media assets can be deleted using
     * [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets).**
     *
     * Delete a clip request and all associated media assets. Clip requests that are InProgress
     * may not be deleted.
     *
     * @summary Delete Clip Request
     * @throws FetchError<400, types.RecordFilesDeleteClipRequestLiveResponse400> Bad Request
     */
    SDK.prototype.recordFiles_DeleteClipRequestLive = function (metadata) {
        return this.core.fetch('/api/record_files/clip/{clipRequestId}', 'delete', metadata);
    };
    /**
     * **There is no direct replacement for this endpoint. Media assets can be retrieved using
     * [List Media Assets](#operation/MediaAssets_ListMediaAssets).**
     *
     * List clip requests. Captures the requests made for live clips. Entries are removed after
     * expiry time. Use the Get Clip Request endpoint to view the media assets associated with
     * each clip request.
     *
     * @summary List Clip Requests
     * @throws FetchError<400, types.RecordFilesListClipRequestsResponse400> Bad Request
     */
    SDK.prototype.recordFiles_ListClipRequests = function (body, metadata) {
        return this.core.fetch('/api/record_files/clip/list', 'get', body, metadata);
    };
    /**
     * **Please refer to [List Media Assets](#operation/MediaAssets_ListMediaAssets) and query
     * with `type=timeline`**
     *
     * Indicates which streams and time frames are available for clipping.
     *
     * @summary List Available Clip Sources
     * @throws FetchError<400, types.RecordFilesListAvailableClipSourcesResponse400> Bad Request
     */
    SDK.prototype.recordFiles_ListAvailableClipSources = function (body, metadata) {
        return this.core.fetch('/api/record_files/clip/sources', 'get', body, metadata);
    };
    /**
     * **Please refer to [Validate Third Party Storage
     * Setup](#operation/Account_ValidateThirdPartyStorage)**
     *
     * Validates third party storage is configured with permissions for Dolby.io to upload
     * media assets.
     *
     *  To track the validation result, keep note of the the `validationId` returned in the
     * response body. If correctly configured, when calling [Read Media
     * Asset](#tag/Beta/operation/RecordFilesV2_ReadMediaAsset), the response should return a
     * successful entry with `id` matching the `validationId`.
     *
     *  Run once to validate write permissions. If successful, optionally run a second time to
     * confirm that overwriting is allowed.
     *
     *  Note that validation results are only available for 1 hour.
     *
     * If you provide an empty body or no body your default storage profile will be validated.
     *
     * @summary Validate Third Party Storage Setup
     */
    SDK.prototype.recordFiles_ValidateStorageProfile = function (body) {
        return this.core.fetch('/api/record_files/storage_profiles/validate', 'post', body);
    };
    /**
     * **Please refer to [Update Account Media Assets Expiration
     * Rules](#operation/Account_UpdateExpirationRules)**
     *
     * Update account level expiry rule for clip creation. Streams that were published outside
     * this expiry period will not be available for creating clips.
     *
     * @summary Update Clip Source Expiry Rule
     */
    SDK.prototype.recordFiles_UpdateExpiryRule = function (body) {
        return this.core.fetch('/api/record_files/clip/sources/expiry', 'post', body);
    };
    /**
     * **Please refer to [Get Account Media Assets Expiration
     * Rules](#operation/Account_GetExpirationRules)**
     *
     * Get account level expiry rule for clip creation. Streams that were published outside
     * this expiry period will not be available for creating clips.
     *
     * @summary Get Clip Source Expiry Rule
     */
    SDK.prototype.recordFiles_GetExpiryRule = function () {
        return this.core.fetch('/api/record_files/clip/sources/expiry', 'get');
    };
    /**
     * **Please refer to [Update Account Media Assets Expiration
     * Rules](#operation/Account_UpdateExpirationRules)**
     *
     * Delete account level expiry rule for clip creation and use system default.
     *
     *  This may immediately trigger removal of existing stream data outside of the system
     * default expiry period, thus preventing clips from being created on those expired
     * streams. Use with caution.
     *
     * @summary Delete Clip Source Expiry Rule
     */
    SDK.prototype.recordFiles_DeleteExpiryRule = function () {
        return this.core.fetch('/api/record_files/clip/sources/expiry', 'delete');
    };
    /**
     * **Please refer to [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets)**
     *
     * Indicates to delete via `clipSourceId`.
     *
     * @summary Delete Clip Sources
     * @throws FetchError<400, types.RecordFilesDeleteClipSourcesResponse400> Bad Request
     */
    SDK.prototype.recordFiles_DeleteClipSources = function (body) {
        return this.core.fetch('/api/record_files/clip/sources/delete', 'post', body);
    };
    /**
     * Will force an active stream for the given streamId to be disconnected immediately. The
     * publishing token should also be disabled, otherwise the client may attempt to re-connect
     * and begin publishing again.
     *
     *
     * @summary Stop Stream by ID
     * @throws FetchError<400, types.StreamStopStreamResponse400> Bad Request
     */
    SDK.prototype.stream_StopStream = function (body) {
        return this.core.fetch('/api/stream/stop', 'post', body);
    };
    /**
     * Will force all active streams associated with an account to disconnect immediately. The
     * publishing token(s) should also be disabled, otherwise the client may attempt to
     * re-connect and begin publishing again.
     *
     *
     * @summary Stop All Streams
     * @throws FetchError<400, types.StreamStopByAccountResponse400> Bad Request
     */
    SDK.prototype.stream_StopByAccount = function () {
        return this.core.fetch('/api/stream/stop/all', 'post');
    };
    /**
     * Gets token specified by token id.
     *
     * @summary Read Token
     * @throws FetchError<400, types.SubscribeTokenV1ReadTokenResponse400> Bad Request
     */
    SDK.prototype.subscribeTokenV1_ReadToken = function (metadata) {
        return this.core.fetch('/api/subscribe_token/{tokenId}', 'get', metadata);
    };
    /**
     * Deletes token specified by the token's ID. The Token ID can be found using the List
     * Tokens API or in the API response of Create Token API.
     *
     * @summary Delete Token
     */
    SDK.prototype.subscribeTokenV1_DeleteToken = function (metadata) {
        return this.core.fetch('/api/subscribe_token/{tokenId}', 'delete', metadata);
    };
    /**
     * Update token stream information as well as updates token itself.
     *
     * @summary Update Token
     * @throws FetchError<400, types.SubscribeTokenV1UpdateTokenResponse400> Bad Request
     */
    SDK.prototype.subscribeTokenV1_UpdateToken = function (body, metadata) {
        return this.core.fetch('/api/subscribe_token/{tokenId}', 'put', body, metadata);
    };
    /**
     * List all tokens with specific sorting and pagination. If response array is empty, you
     * have reached the end of the list ordering.
     *
     * @summary List Tokens
     * @throws FetchError<400, types.SubscribeTokenV1ListTokensResponse400> Bad Request
     */
    SDK.prototype.subscribeTokenV1_ListTokens = function (metadata) {
        return this.core.fetch('/api/subscribe_token/list', 'get', metadata);
    };
    /**
     * List all tokens with specific sorting and pagination that matches given token name or
     * stream name. If response array is empty, you have reached the end of the list ordering.
     *
     * @summary List Tokens By Name
     * @throws FetchError<400, types.SubscribeTokenV1ListTokensByNameResponse400> Bad Request
     */
    SDK.prototype.subscribeTokenV1_ListTokensByName = function (metadata) {
        return this.core.fetch('/api/subscribe_token/list_by_name', 'get', metadata);
    };
    /**
     * Creates new token given a label and associated stream name(s). Stream names are limited
     * to 128 characters.
     *
     * @summary Create Token
     * @throws FetchError<400, types.SubscribeTokenV1CreateTokenResponse400> Bad Request
     */
    SDK.prototype.subscribeTokenV1_CreateToken = function (body) {
        return this.core.fetch('/api/subscribe_token', 'post', body);
    };
    /**
     * Webhook url and details used on account.
     *
     * @summary Read Webhook
     */
    SDK.prototype.webhooks_Get = function (metadata) {
        return this.core.fetch('/api/webhooks/{webhookId}', 'get', metadata);
    };
    /**
     * Update webhook url, events to signal, or refresh signing secret.
     *
     * @summary Update Webhook
     * @throws FetchError<400, types.WebhooksUpdateWebhookResponse400> Bad Request
     */
    SDK.prototype.webhooks_UpdateWebhook = function (body, metadata) {
        return this.core.fetch('/api/webhooks/{webhookId}', 'put', body, metadata);
    };
    /**
     * Removes all webhook data for account.
     *
     * @summary Remove Webhook
     */
    SDK.prototype.webhooks_RemoveWebhook = function (metadata) {
        return this.core.fetch('/api/webhooks/{webhookId}', 'delete', metadata);
    };
    /**
     * Iterative call to list webhooks on account.
     *
     * @summary List Webhooks
     */
    SDK.prototype.webhooks_ListWebhooks = function (metadata) {
        return this.core.fetch('/api/webhooks/list', 'get', metadata);
    };
    /**
     * Add new webhook on account.
     *
     * @summary Add Webhook
     * @throws FetchError<400, types.WebhooksAddWebhookResponse400> Bad Request
     */
    SDK.prototype.webhooks_AddWebhook = function (body) {
        return this.core.fetch('/api/webhooks', 'post', body);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
