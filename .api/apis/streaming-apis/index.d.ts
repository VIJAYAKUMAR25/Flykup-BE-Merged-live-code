import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Update account level expiration rule for various media asset types.
     *
     * @summary Update Account Media Assets Expiration Rules
     */
    accountMediaExpirationPut(body: types.AccountMediaExpirationPutBodyParam): Promise<FetchResponse<200, types.AccountMediaExpirationPutResponse200> | FetchResponse<number, types.AccountMediaExpirationPutResponseDefault>>;
    /**
     * Get account level expiration rule for various media asset types.
     *
     * @summary Get Account Media Assets Expiration Rule
     */
    accountMediaExpirationGet(): Promise<FetchResponse<200, types.AccountMediaExpirationGetResponse200> | FetchResponse<number, types.AccountMediaExpirationGetResponseDefault>>;
    /**
     * List all storage profiles created on your account.
     *
     * @summary List Storage Profiles
     */
    accountMediaStorageGet(metadata?: types.AccountMediaStorageGetMetadataParam): Promise<FetchResponse<200, types.AccountMediaStorageGetResponse200> | FetchResponse<number, types.AccountMediaStorageGetResponseDefault>>;
    /**
     * Create a storage profile identifying the configuration for a cloud storage provider that
     * can receive media assets when they are finished processing. Only one storage profile
     * will be set as a default for the entire account, otherwise you may specify a storage
     * location using the `storageProfileId` on any individual media clip request.
     *
     * @summary Create Storage Profile
     * @throws FetchError<400, types.AccountMediaStoragePostResponse400> Bad Request
     */
    accountMediaStoragePost(body: types.AccountMediaStoragePostBodyParam): Promise<FetchResponse<200, types.AccountMediaStoragePostResponse200> | FetchResponse<number, types.AccountMediaStoragePostResponseDefault>>;
    /**
     * Specify the id of a storage profile you wish to delete.
     *
     * @summary Delete Storage Profile
     */
    accountMediaStorageIdDelete(metadata: types.AccountMediaStorageIdDeleteMetadataParam): Promise<FetchResponse<200, types.AccountMediaStorageIdDeleteResponse200> | FetchResponse<number, types.AccountMediaStorageIdDeleteResponseDefault>>;
    /**
     * Get details of a saved storage profile
     *
     * @summary Get Storage Profile
     */
    accountMediaStorageIdGet(metadata: types.AccountMediaStorageIdGetMetadataParam): Promise<FetchResponse<200, types.AccountMediaStorageIdGetResponse200> | FetchResponse<number, types.AccountMediaStorageIdGetResponseDefault>>;
    /**
     * Change the details of a storage profile.
     *
     * @summary Update Storage Profile
     */
    accountMediaStorageIdPut(body: types.AccountMediaStorageIdPutBodyParam, metadata: types.AccountMediaStorageIdPutMetadataParam): Promise<FetchResponse<200, types.AccountMediaStorageIdPutResponse200> | FetchResponse<number, types.AccountMediaStorageIdPutResponseDefault>>;
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
    accountMediaStorageValidatePost(body: types.AccountMediaStorageValidatePostBodyParam): Promise<FetchResponse<200, types.AccountMediaStorageValidatePostResponse200> | FetchResponse<number, types.AccountMediaStorageValidatePostResponseDefault>>;
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
    accountDistributionGet(): Promise<FetchResponse<200, types.AccountDistributionGetResponse200> | FetchResponse<number, types.AccountDistributionGetResponseDefault>>;
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
    accountDistributionPut(body: types.AccountDistributionPutBodyParam): Promise<FetchResponse<200, types.AccountDistributionPutResponse200> | FetchResponse<number, types.AccountDistributionPutResponseDefault>>;
    /**
     * Gets account wide security settings. If a Token (either Publish or Subscribe) does not
     * define any security settings, the account wide rules are used.
     *
     * @summary Read Account Security Settings
     * @throws FetchError<400, types.AccountSecurityGetResponse400> Bad Request
     */
    accountSecurityGet(): Promise<FetchResponse<200, types.AccountSecurityGetResponse200> | FetchResponse<number, types.AccountSecurityGetResponseDefault>>;
    /**
     * Update account wide security settings. Updated to an empty array `[]` removes all rules
     * of that type.
     *
     * @summary Update Account Security Settings
     * @throws FetchError<400, types.AccountSecurityPutResponse400> Bad Request
     */
    accountSecurityPut(body: types.AccountSecurityPutBodyParam): Promise<FetchResponse<200, types.AccountSecurityPutResponse200> | FetchResponse<number, types.AccountSecurityPutResponseDefault>>;
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
    mediaAssetsPost(body: types.MediaAssetsPostBodyParam): Promise<FetchResponse<200, types.MediaAssetsPostResponse200> | FetchResponse<number, types.MediaAssetsPostResponseDefault>>;
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
    mediaAssetsGet(metadata?: types.MediaAssetsGetMetadataParam): Promise<FetchResponse<200, types.MediaAssetsGetResponse200> | FetchResponse<number, types.MediaAssetsGetResponseDefault>>;
    /**
     * Deletes multiple media assets from storage. Only media assets with status Complete or
     * Error can be deleted.
     *
     * @summary Delete Media Assets
     */
    mediaAssetsDelete(metadata: types.MediaAssetsDeleteMetadataParam): Promise<FetchResponse<200, types.MediaAssetsDeleteResponse200> | FetchResponse<number, types.MediaAssetsDeleteResponseDefault>>;
    /**
     * Gets media asset specified by id. Includes temporary download link if the media asset is
     * complete.
     *
     * @summary Read Media Asset
     * @throws FetchError<400, types.MediaAssetsMediaAssetIdGetResponse400> Bad Request
     */
    mediaAssetsMediaAssetIdGet(metadata: types.MediaAssetsMediaAssetIdGetMetadataParam): Promise<FetchResponse<200, types.MediaAssetsMediaAssetIdGetResponse200> | FetchResponse<number, types.MediaAssetsMediaAssetIdGetResponseDefault>>;
    /**
     * Deletes all media assets of a specified type from storage.
     *
     * @summary Delete All Media Assets
     */
    mediaAssetsAllTypeDelete(metadata: types.MediaAssetsAllTypeDeleteMetadataParam): Promise<FetchResponse<200, types.MediaAssetsAllTypeDeleteResponse200> | FetchResponse<number, types.MediaAssetsAllTypeDeleteResponseDefault>>;
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
    recordFilesV2_ListMediaAssets(body: types.RecordFilesV2ListMediaAssetsBodyParam, metadata: types.RecordFilesV2ListMediaAssetsMetadataParam): Promise<FetchResponse<200, types.RecordFilesV2ListMediaAssetsResponse200> | FetchResponse<number, types.RecordFilesV2ListMediaAssetsResponseDefault>>;
    /**
     * **Please refer to [Read Media Asset](#operation/MediaAssets_ReadMediaAsset)**
     *
     * Gets media asset specified by id. Includes temporary download link if the media asset is
     * complete.
     *
     * @summary Read Media Asset
     * @throws FetchError<400, types.RecordFilesV2ReadMediaAssetResponse400> Bad Request
     */
    recordFilesV2_ReadMediaAsset(metadata: types.RecordFilesV2ReadMediaAssetMetadataParam): Promise<FetchResponse<200, types.RecordFilesV2ReadMediaAssetResponse200> | FetchResponse<number, types.RecordFilesV2ReadMediaAssetResponseDefault>>;
    /**
     * **Please refer to [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets)**
     *
     * Deletes multiple media assets from storage. Only media assets with status Complete or
     * Error can be deleted.
     *
     * @summary Delete Media Assets
     */
    recordFilesV2_DeleteMediaAssets(body: types.RecordFilesV2DeleteMediaAssetsBodyParam): Promise<FetchResponse<200, types.RecordFilesV2DeleteMediaAssetsResponse200> | FetchResponse<number, types.RecordFilesV2DeleteMediaAssetsResponseDefault>>;
    /**
     * Get total usage on account over a date range.
     *
     * @summary Account Total
     * @throws FetchError<400, types.AnalyticsAccountTotalResponse400> Bad Request
     */
    analytics_AccountTotal(metadata: types.AnalyticsAccountTotalMetadataParam): Promise<FetchResponse<200, types.AnalyticsAccountTotalResponse200> | FetchResponse<number, types.AnalyticsAccountTotalResponseDefault>>;
    /**
     * Get usage as a time series on account over a date range.
     * Response keys are ISO 8601 dates from requested resolution.
     *
     * @summary Account Series
     * @throws FetchError<400, types.AnalyticsAccountSeriesResponse400> Bad Request
     */
    analytics_AccountSeries(metadata: types.AnalyticsAccountSeriesMetadataParam): Promise<FetchResponse<200, types.AnalyticsAccountSeriesResponse200> | FetchResponse<number, types.AnalyticsAccountSeriesResponseDefault>>;
    /**
     * Get bandwidth and duration per country code on account over a date range.
     * Response keys are ISO 3166-1 alpha-2 country codes.
     *
     * @summary Account Geo Total
     * @throws FetchError<400, types.AnalyticsAccountGeoTotalResponse400> Bad Request
     */
    analytics_AccountGeoTotal(metadata: types.AnalyticsAccountGeoTotalMetadataParam): Promise<FetchResponse<200, types.AnalyticsAccountGeoTotalResponse200> | FetchResponse<number, types.AnalyticsAccountGeoTotalResponseDefault>>;
    /**
     * Get bandwidth, duration, publishes, and views as a time series per country code on
     * account over a date range.
     * Response keys are ISO 8601 dates from requested resolution, followed by keys for ISO
     * 3166-1 alpha-2 country codes.
     *
     * @summary Account Geo Series
     * @throws FetchError<400, types.AnalyticsAccountGeoSeriesResponse400> Bad Request
     */
    analytics_AccountGeoSeries(metadata: types.AnalyticsAccountGeoSeriesMetadataParam): Promise<FetchResponse<200, types.AnalyticsAccountGeoSeriesResponse200> | FetchResponse<number, types.AnalyticsAccountGeoSeriesResponseDefault>>;
    /**
     * Get total usage on specified streamnames over a date range.
     * Response keys are requested streamnames.
     *
     * @summary Streams Total
     * @throws FetchError<400, types.AnalyticsStreamsTotalResponse400> Bad Request
     */
    analytics_StreamsTotal(metadata: types.AnalyticsStreamsTotalMetadataParam): Promise<FetchResponse<200, types.AnalyticsStreamsTotalResponse200> | FetchResponse<number, types.AnalyticsStreamsTotalResponseDefault>>;
    /**
     * Get usage as a time series on specified streamnames over a date range.
     * Response keys are requested streamnames, followed by keys for ISO 8601 dates from
     * requested resolution.
     *
     * @summary Streams Series
     * @throws FetchError<400, types.AnalyticsStreamsSeriesResponse400> Bad Request
     */
    analytics_StreamsSeries(metadata: types.AnalyticsStreamsSeriesMetadataParam): Promise<FetchResponse<200, types.AnalyticsStreamsSeriesResponse200> | FetchResponse<number, types.AnalyticsStreamsSeriesResponseDefault>>;
    /**
     * Get bandwidth and duration per country code on specified streamnames over a date range.
     * Response keys are requested streamnames, followed by keys for ISO 3166-1 alpha-2 country
     * codes.
     *
     * @summary Streams Geo Total
     * @throws FetchError<400, types.AnalyticsStreamsGeoTotalResponse400> Bad Request
     */
    analytics_StreamsGeoTotal(metadata: types.AnalyticsStreamsGeoTotalMetadataParam): Promise<FetchResponse<200, types.AnalyticsStreamsGeoTotalResponse200> | FetchResponse<number, types.AnalyticsStreamsGeoTotalResponseDefault>>;
    /**
     * Get bandwidth, duration, publishes, and views as a time series per country code on
     * specified streamnames over a date range.
     * Response keys are requested streamnames,  followed by keys for ISO 8601 dates from
     * requested resolution, followed by keys for ISO 3166-1 alpha-2 country codes.
     *
     * @summary Streams Geo Series
     * @throws FetchError<400, types.AnalyticsStreamsGeoSeriesResponse400> Bad Request
     */
    analytics_StreamsGeoSeries(metadata: types.AnalyticsStreamsGeoSeriesMetadataParam): Promise<FetchResponse<200, types.AnalyticsStreamsGeoSeriesResponse200> | FetchResponse<number, types.AnalyticsStreamsGeoSeriesResponseDefault>>;
    /**
     * Get bandwidth and views per country code on account over a date range.
     * Response keys are ISO 3166-1 alpha-2 country codes.
     *
     * @summary Account Geo
     * @throws FetchError<400, types.AnalyticsAccountGeoResponse400> Bad Request
     */
    analytics_AccountGeo(metadata: types.AnalyticsAccountGeoMetadataParam): Promise<FetchResponse<200, types.AnalyticsAccountGeoResponse200> | FetchResponse<number, types.AnalyticsAccountGeoResponseDefault>>;
    /**
     * Get bandwidth and views per country code on specified streamnames over a date range.
     * Response keys are requested streamnames, followed by keys for ISO 3166-1 alpha-2 country
     * codes.
     *
     * @summary Streams Geo
     * @throws FetchError<400, types.AnalyticsStreamsGeoResponse400> Bad Request
     */
    analytics_StreamsGeo(metadata: types.AnalyticsStreamsGeoMetadataParam): Promise<FetchResponse<200, types.AnalyticsStreamsGeoResponse200> | FetchResponse<number, types.AnalyticsStreamsGeoResponseDefault>>;
    /**
     * Get total bandwidth for each TrackingID associated with specified streamNames over a
     * date range. Response keys are requested streamnames.
     *
     * @summary Total bandwidth per TrackingID per stream
     * @throws FetchError<400, types.AnalyticsGetTrackingTotalForStreamsResponse400> Bad Request
     */
    analytics_GetTrackingTotalForStreams(metadata: types.AnalyticsGetTrackingTotalForStreamsMetadataParam): Promise<FetchResponse<200, types.AnalyticsGetTrackingTotalForStreamsResponse200> | FetchResponse<number, types.AnalyticsGetTrackingTotalForStreamsResponseDefault>>;
    /**
     * Get bandwidth used as a time series on specified streamnames over a date range. Response
     * keys are requested streamnames, followed by keys for ISO 8601 dates from requested
     *
     * @summary Series bandwidth per TrackingID per stream
     * @throws FetchError<400, types.AnalyticsGetTrackingSeriesForStreamsResponse400> Bad Request
     */
    analytics_GetTrackingSeriesForStreams(metadata: types.AnalyticsGetTrackingSeriesForStreamsMetadataParam): Promise<FetchResponse<200, types.AnalyticsGetTrackingSeriesForStreamsResponse200> | FetchResponse<number, types.AnalyticsGetTrackingSeriesForStreamsResponseDefault>>;
    /**
     * Get total bandwidth for TrackingIDs specified on a stream-by-stream basis. Response keys
     * are requested TrackingIDs.
     *
     * @summary Total bandwidth for streams specified by TrackingID
     * @throws FetchError<400, types.AnalyticsGetTotalBandwidthForTrackingIdResponse400> Bad Request
     */
    analytics_GetTotalBandwidthForTrackingId(metadata: types.AnalyticsGetTotalBandwidthForTrackingIdMetadataParam): Promise<FetchResponse<200, types.AnalyticsGetTotalBandwidthForTrackingIdResponse200> | FetchResponse<number, types.AnalyticsGetTotalBandwidthForTrackingIdResponseDefault>>;
    /**
     * Get bandwidth information  used as a time series on specified TrackingIDs over a date
     * range on a stream-by-stream basis. Response keys are requested TrackingIDs, followed by
     * keys for ISO 8601 dates from requested
     *
     * @summary Series bandwidth for streams specified by TrackingID
     * @throws FetchError<400, types.AnalyticsGetSeriesBandwidthForTrackingIdResponse400> Bad Request
     */
    analytics_GetSeriesBandwidthForTrackingId(metadata: types.AnalyticsGetSeriesBandwidthForTrackingIdMetadataParam): Promise<FetchResponse<200, types.AnalyticsGetSeriesBandwidthForTrackingIdResponse200> | FetchResponse<number, types.AnalyticsGetSeriesBandwidthForTrackingIdResponseDefault>>;
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
    analytics_GetTotalTranscoderMinutesForAccount(metadata: types.AnalyticsGetTotalTranscoderMinutesForAccountMetadataParam): Promise<FetchResponse<200, types.AnalyticsGetTotalTranscoderMinutesForAccountResponse200> | FetchResponse<number, types.AnalyticsGetTotalTranscoderMinutesForAccountResponseDefault>>;
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
    analytics_GetSeriesTranscoderMinutesForAccount(metadata: types.AnalyticsGetSeriesTranscoderMinutesForAccountMetadataParam): Promise<FetchResponse<200, types.AnalyticsGetSeriesTranscoderMinutesForAccountResponse200> | FetchResponse<number, types.AnalyticsGetSeriesTranscoderMinutesForAccountResponseDefault>>;
    /**
     * Returns the total number of bytes used to store all media assets. The total is inclusive
     * of all contributing media types including recordings, clips, and timelines.
     *
     * @summary Usage
     */
    analytics_MediaAssetUsage(): Promise<FetchResponse<200, types.AnalyticsMediaAssetUsageResponse200> | FetchResponse<number, types.AnalyticsMediaAssetUsageResponseDefault>>;
    /**
     * Returns the number of gigabyte hours of storage used for a given date range. The total
     * is inclusive of all contributing media types including recordings, clips, and timelines.
     *
     *
     * @summary Usage Billable
     */
    analytics_MediaAssetUsageBillable(metadata: types.AnalyticsMediaAssetUsageBillableMetadataParam): Promise<FetchResponse<200, types.AnalyticsMediaAssetUsageBillableResponse200> | FetchResponse<number, types.AnalyticsMediaAssetUsageBillableResponseDefault>>;
    /**
     * Returns streams that are live or were live within the previous 60 minutes. This can help
     * monitor broadcast sources for stream duration, number of viewers, and ingest feed status
     * for overall stream health.
     *
     *
     * @summary List Recent Live Streams
     * @throws FetchError<400, types.MonitoringListRecentStreamsResponse400> Bad Request
     */
    monitoring_ListRecentStreams(metadata?: types.MonitoringListRecentStreamsMetadataParam): Promise<FetchResponse<200, types.MonitoringListRecentStreamsResponse200> | FetchResponse<number, types.MonitoringListRecentStreamsResponseDefault>>;
    /**
     * Returns the broadcast details of a specific stream by name if it was live within the
     * previous 60 minutes. This can help monitor broadcast sources for stream duration, number
     * of viewers, and ingest feed status for overall stream health.
     *
     *
     * @summary Get Live Stream
     * @throws FetchError<400, types.MonitoringGetStreamResponse400> Bad Request
     */
    monitoring_GetStream(metadata: types.MonitoringGetStreamMetadataParam): Promise<FetchResponse<200, types.MonitoringGetStreamResponse200> | FetchResponse<number, types.MonitoringGetStreamResponseDefault>>;
    /**
     * Returns the configuration of a Transcoder and any individual host instances for the
     * given transcoderId.
     *
     * @summary Get Transcoder
     * @throws FetchError<400, types.TranscoderGetTranscoderResponse400> Bad Request
     */
    transcoder_GetTranscoder(metadata: types.TranscoderGetTranscoderMetadataParam): Promise<FetchResponse<200, types.TranscoderGetTranscoderResponse200> | FetchResponse<number, types.TranscoderGetTranscoderResponseDefault>>;
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
    transcoder_UpdateTranscoder(body: types.TranscoderUpdateTranscoderBodyParam, metadata: types.TranscoderUpdateTranscoderMetadataParam): Promise<FetchResponse<200, types.TranscoderUpdateTranscoderResponse200> | FetchResponse<number, types.TranscoderUpdateTranscoderResponseDefault>>;
    /**
     * Delete the configuration of a Transcoder and any instances for it for the given
     * transcoderId. If the Transcoder is still running it will be shutdown immediately.
     *
     * @summary Delete Transcoder
     * @throws FetchError<400, types.TranscoderDeleteTranscoderResponse400> Bad Request
     */
    transcoder_DeleteTranscoder(metadata: types.TranscoderDeleteTranscoderMetadataParam): Promise<FetchResponse<200, types.TranscoderDeleteTranscoderResponse200> | FetchResponse<number, types.TranscoderDeleteTranscoderResponseDefault>>;
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
    transcoder_CreateTranscoder(body: types.TranscoderCreateTranscoderBodyParam): Promise<FetchResponse<200, types.TranscoderCreateTranscoderResponse200> | FetchResponse<number, types.TranscoderCreateTranscoderResponseDefault>>;
    /**
     * Return the Transcoders that have been configured for your account. You can use query
     * parameters to filter, sort, or paginate the results returned.
     *
     * @summary List Transcoders
     * @throws FetchError<400, types.TranscoderListTranscodersResponse400> Bad Request
     */
    transcoder_ListTranscoders(metadata: types.TranscoderListTranscodersMetadataParam): Promise<FetchResponse<200, types.TranscoderListTranscodersResponse200> | FetchResponse<number, types.TranscoderListTranscodersResponseDefault>>;
    /**
     * Enable a Transcoder by ID to accept incoming broadcast sources.
     *
     * @summary Start Transcoder
     * @throws FetchError<400, types.TranscoderStartTranscoderResponse400> Bad Request
     */
    transcoder_StartTranscoder(metadata: types.TranscoderStartTranscoderMetadataParam): Promise<FetchResponse<200, types.TranscoderStartTranscoderResponse200> | FetchResponse<number, types.TranscoderStartTranscoderResponseDefault>>;
    /**
     * Disable a Transcoder by ID so that it will shutdown and no longer accept incoming
     * broadcast sources.
     *
     * @summary Stop Transcoder
     * @throws FetchError<400, types.TranscoderStopTranscoderResponse400> Bad Request
     */
    transcoder_StopTranscoder(metadata: types.TranscoderStopTranscoderMetadataParam): Promise<FetchResponse<200, types.TranscoderStopTranscoderResponse200> | FetchResponse<number, types.TranscoderStopTranscoderResponseDefault>>;
    /**
     * Get transcoder instance information by Transcoder Instance ID. Instances can be listed
     * and filtered using the List Transcoder Instances endpoint.
     *
     * @summary Get Transcoder Instance
     * @throws FetchError<400, types.TranscoderGetTranscoderInstanceResponse400> Bad Request
     */
    transcoder_GetTranscoderInstance(metadata: types.TranscoderGetTranscoderInstanceMetadataParam): Promise<FetchResponse<200, types.TranscoderGetTranscoderInstanceResponse200> | FetchResponse<number, types.TranscoderGetTranscoderInstanceResponseDefault>>;
    /**
     * A Transcoder Instance is an individual host within a cluster that has been configured
     * based on the Transcoder settings. By default, Deleted instances are returned unless
     * specified with Status parameter. This can be used to get historical instance
     * information.
     *
     * @summary List Transcoder Instances
     * @throws FetchError<400, types.TranscoderListTranscoderInstancesResponse400> Bad Request
     */
    transcoder_ListTranscoderInstances(metadata: types.TranscoderListTranscoderInstancesMetadataParam): Promise<FetchResponse<200, types.TranscoderListTranscoderInstancesResponse200> | FetchResponse<number, types.TranscoderListTranscoderInstancesResponseDefault>>;
    /**
     * A Transcoder Profile is a pre-defined configuration for how to direct the bitrate ladder
     * in distributing individual layers.
     *
     * @summary List Transcoder Profiles
     * @throws FetchError<400, types.TranscoderListTranscoderProfilesResponse400> Bad Request
     */
    transcoder_ListTranscoderProfiles(metadata: types.TranscoderListTranscoderProfilesMetadataParam): Promise<FetchResponse<200, types.TranscoderListTranscoderProfilesResponse200> | FetchResponse<number, types.TranscoderListTranscoderProfilesResponseDefault>>;
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
    account_GetGeoCascade(): Promise<FetchResponse<200, types.AccountGetGeoCascadeResponse200> | FetchResponse<number, types.AccountGetGeoCascadeResponseDefault>>;
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
    account_UpdateGeoCascade(body: types.AccountUpdateGeoCascadeBodyParam): Promise<FetchResponse<200, types.AccountUpdateGeoCascadeResponse200> | FetchResponse<number, types.AccountUpdateGeoCascadeResponseDefault>>;
    /**
     * Default cluster and list of available clusters.
     *
     * @summary Read Clusters
     */
    cluster_GetClustersInfo(): Promise<FetchResponse<200, types.ClusterGetClustersInfoResponse200> | FetchResponse<number, types.ClusterGetClustersInfoResponseDefault>>;
    /**
     * Update default cluster on account.
     *
     * @summary Update Cluster
     * @throws FetchError<400, types.ClusterUpdateClusterInfoResponse400> Bad Request
     */
    cluster_UpdateClusterInfo(body: types.ClusterUpdateClusterInfoBodyParam): Promise<FetchResponse<200, types.ClusterUpdateClusterInfoResponse200> | FetchResponse<number, types.ClusterUpdateClusterInfoResponseDefault>>;
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
    geo_Geo(): Promise<FetchResponse<200, types.GeoGeoResponse200> | FetchResponse<number, types.GeoGeoResponseDefault>>;
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
    geo_UpdateGeo(body: types.GeoUpdateGeoBodyParam): Promise<FetchResponse<200, types.GeoUpdateGeoResponse200> | FetchResponse<number, types.GeoUpdateGeoResponseDefault>>;
    /**
     * Gets token specified by token id.
     *
     * @summary Read Token
     * @throws FetchError<400, types.PublishTokenV1ReadTokenResponse400> Bad Request
     */
    publishTokenV1_ReadToken(metadata: types.PublishTokenV1ReadTokenMetadataParam): Promise<FetchResponse<200, types.PublishTokenV1ReadTokenResponse200> | FetchResponse<number, types.PublishTokenV1ReadTokenResponseDefault>>;
    /**
     * Deletes token specified by the token's ID. The Token ID can be found using the List
     * Tokens API or in the API response of Create Token API.
     *
     * @summary Delete Token
     */
    publishTokenV1_DeleteToken(metadata: types.PublishTokenV1DeleteTokenMetadataParam): Promise<FetchResponse<200, types.PublishTokenV1DeleteTokenResponse200> | FetchResponse<number, types.PublishTokenV1DeleteTokenResponseDefault>>;
    /**
     * Update token stream information as well as updates token itself.
     *
     * @summary Update Token
     * @throws FetchError<400, types.PublishTokenV1UpdateTokenResponse400> Bad Request
     */
    publishTokenV1_UpdateToken(body: types.PublishTokenV1UpdateTokenBodyParam, metadata: types.PublishTokenV1UpdateTokenMetadataParam): Promise<FetchResponse<200, types.PublishTokenV1UpdateTokenResponse200> | FetchResponse<number, types.PublishTokenV1UpdateTokenResponseDefault>>;
    /**
     * List all tokens with specific sorting and pagination. If response array is empty, you
     * have reached the end of the list ordering.
     *
     * @summary List Tokens
     * @throws FetchError<400, types.PublishTokenV1ListTokensResponse400> Bad Request
     */
    publishTokenV1_ListTokens(metadata: types.PublishTokenV1ListTokensMetadataParam): Promise<FetchResponse<200, types.PublishTokenV1ListTokensResponse200> | FetchResponse<number, types.PublishTokenV1ListTokensResponseDefault>>;
    /**
     * List all tokens with specific sorting and pagination that matches given token name or
     * stream name. If response array is empty, you have reached the end of the list ordering.
     *
     * @summary List Tokens By Name
     * @throws FetchError<400, types.PublishTokenV1ListTokensByNameResponse400> Bad Request
     */
    publishTokenV1_ListTokensByName(metadata: types.PublishTokenV1ListTokensByNameMetadataParam): Promise<FetchResponse<200, types.PublishTokenV1ListTokensByNameResponse200> | FetchResponse<number, types.PublishTokenV1ListTokensByNameResponseDefault>>;
    /**
     * List all tokens with specific sorting and pagination that matches given cluster region.
     * If response array is empty, you have reached the end of the list ordering.
     *
     * @summary List Tokens By Cluster
     * @throws FetchError<400, types.PublishTokenV1ListTokensByClusterResponse400> Bad Request
     */
    publishTokenV1_ListTokensByCluster(metadata: types.PublishTokenV1ListTokensByClusterMetadataParam): Promise<FetchResponse<200, types.PublishTokenV1ListTokensByClusterResponse200> | FetchResponse<number, types.PublishTokenV1ListTokensByClusterResponseDefault>>;
    /**
     * Creates new token given a label and associated stream name(s). Stream names are limited
     * to 128 characters.
     *
     * @summary Create Token
     * @throws FetchError<400, types.PublishTokenV1CreateTokenResponse400> Bad Request
     */
    publishTokenV1_CreateToken(body: types.PublishTokenV1CreateTokenBodyParam): Promise<FetchResponse<200, types.PublishTokenV1CreateTokenResponse200> | FetchResponse<number, types.PublishTokenV1CreateTokenResponseDefault>>;
    /**
     * Gets the Publish Token ID of an active stream by its Stream ID. Publish Tokens for long
     * running streams published before 1st October 2022 will not be returned. If you need to
     * stop a long running stream, use the Dashboard or try republishing the stream.
     *
     * @summary Get active Publish Token ID
     */
    publishTokenV1_GetActiveTokenByStreamId(metadata: types.PublishTokenV1GetActiveTokenByStreamIdMetadataParam): Promise<FetchResponse<200, types.PublishTokenV1GetActiveTokenByStreamIdResponse200> | FetchResponse<number, types.PublishTokenV1GetActiveTokenByStreamIdResponseDefault>>;
    /**
     * Get all Publish Token IDs for active streams on the account. Publish Tokens for long
     * running streams published before 1st October 2022 will not be returned. If you need to
     * stop a long running stream, use the Dashboard or try republishing the stream.
     *
     * @summary Get all active Publish Token IDs
     */
    publishTokenV1_GetAllActiveTokensByAccount(): Promise<FetchResponse<200, types.PublishTokenV1GetAllActiveTokensByAccountResponse200> | FetchResponse<number, types.PublishTokenV1GetAllActiveTokensByAccountResponseDefault>>;
    /**
     * Disables Publish Token(s) by their Token ID. An array of Token IDs can be used for bulk
     * disable.
     *
     * @summary Disable Publish Token(s)
     */
    publishTokenV1_DisableTokens(body: types.PublishTokenV1DisableTokensBodyParam): Promise<FetchResponse<200, types.PublishTokenV1DisableTokensResponse200> | FetchResponse<number, types.PublishTokenV1DisableTokensResponseDefault>>;
    /**
     * **Please refer to [Read Media Assets](#operation/MediaAssets_ReadMediaAsset)**
     *
     * Gets file specified by record file id. Includes temporary download link.
     *
     * @summary Read File
     * @throws FetchError<400, types.RecordFilesGetRecordFileResponse400> Bad Request
     */
    recordFiles_GetRecordFile(metadata: types.RecordFilesGetRecordFileMetadataParam): Promise<FetchResponse<200, types.RecordFilesGetRecordFileResponse200> | FetchResponse<number, types.RecordFilesGetRecordFileResponseDefault>>;
    /**
     * **Please refer to [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets)**
     *
     * Deletes recorded file from storage.
     *
     * @summary Delete File
     */
    recordFiles_DeleteRecordFile(metadata: types.RecordFilesDeleteRecordFileMetadataParam): Promise<FetchResponse<200, types.RecordFilesDeleteRecordFileResponse200> | FetchResponse<number, types.RecordFilesDeleteRecordFileResponseDefault>>;
    /**
     * **Please refer to [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets)**
     *
     * Deletes multiple recorded file from storage.
     *
     * @summary Delete Files
     */
    recordFiles_DeleteRecordFiles(body: types.RecordFilesDeleteRecordFilesBodyParam): Promise<FetchResponse<200, types.RecordFilesDeleteRecordFilesResponse200> | FetchResponse<number, types.RecordFilesDeleteRecordFilesResponseDefault>>;
    /**
     * **Please refer to [Delete All Media Assets](#operation/MediaAssets_DeleteMediaAssets2)**
     *
     * Deletes all recorded files from storage.
     *
     * @summary Delete All Files
     */
    recordFiles_DeleteAllRecordFiles(): Promise<FetchResponse<200, types.RecordFilesDeleteAllRecordFilesResponse200> | FetchResponse<number, types.RecordFilesDeleteAllRecordFilesResponseDefault>>;
    /**
     * **Please refer to [List Media Assets](#operation/MediaAssets_ListMediaAssets)**
     *
     * List files for account with specific sorting and pagination. If response array is empty,
     * you have reached the end of the list ordering.
     *
     * @summary List Files
     * @throws FetchError<400, types.RecordFilesListRecordFilesResponse400> Bad Request
     */
    recordFiles_ListRecordFiles(metadata: types.RecordFilesListRecordFilesMetadataParam): Promise<FetchResponse<200, types.RecordFilesListRecordFilesResponse200> | FetchResponse<number, types.RecordFilesListRecordFilesResponseDefault>>;
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
    recordFiles_ListRecordFilesByToken(metadata: types.RecordFilesListRecordFilesByTokenMetadataParam): Promise<FetchResponse<200, types.RecordFilesListRecordFilesByTokenResponse200> | FetchResponse<number, types.RecordFilesListRecordFilesByTokenResponseDefault>>;
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
    recordFiles_ListRecordFilesByStream(metadata: types.RecordFilesListRecordFilesByStreamMetadataParam): Promise<FetchResponse<200, types.RecordFilesListRecordFilesByStreamResponse200> | FetchResponse<number, types.RecordFilesListRecordFilesByStreamResponseDefault>>;
    /**
     * **Please refer to [Usage](#operation/Account_MediaAssetUsage)**
     *
     * Get current total bytes of recorded files in storage.
     *
     * @summary Usage
     */
    recordFiles_RecordFileUsage(): Promise<FetchResponse<200, types.RecordFilesRecordFileUsageResponse200> | FetchResponse<number, types.RecordFilesRecordFileUsageResponseDefault>>;
    /**
     * **Please refer to [Usage Billable](#operation/Account_RecordFileUsageBillable)**
     *
     * Get total number of gigabyte hours of storage used within date range.
     *
     * @summary Usage Billable
     */
    recordFiles_RecordFileUsageBillable(metadata: types.RecordFilesRecordFileUsageBillableMetadataParam): Promise<FetchResponse<200, types.RecordFilesRecordFileUsageBillableResponse200> | FetchResponse<number, types.RecordFilesRecordFileUsageBillableResponseDefault>>;
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
    recordFiles_CreateRecordClip(body: types.RecordFilesCreateRecordClipBodyParam): Promise<FetchResponse<200, types.RecordFilesCreateRecordClipResponse200> | FetchResponse<number, types.RecordFilesCreateRecordClipResponseDefault>>;
    /**
     * **There is no direct replacement for this endpoint. Media assets can be retrieved using
     * [Get Media Asset](#operation/MediaAssets_ReadMediaAsset).**
     *
     * Get clip request
     *
     * @summary Get Clip Request
     */
    recordFiles_GetClipRequest(metadata: types.RecordFilesGetClipRequestMetadataParam): Promise<FetchResponse<200, types.RecordFilesGetClipRequestResponse200> | FetchResponse<number, types.RecordFilesGetClipRequestResponseDefault>>;
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
    recordFiles_DeleteClipRequestLive(metadata: types.RecordFilesDeleteClipRequestLiveMetadataParam): Promise<FetchResponse<200, types.RecordFilesDeleteClipRequestLiveResponse200> | FetchResponse<number, types.RecordFilesDeleteClipRequestLiveResponseDefault>>;
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
    recordFiles_ListClipRequests(body: types.RecordFilesListClipRequestsBodyParam, metadata: types.RecordFilesListClipRequestsMetadataParam): Promise<FetchResponse<200, types.RecordFilesListClipRequestsResponse200> | FetchResponse<number, types.RecordFilesListClipRequestsResponseDefault>>;
    /**
     * **Please refer to [List Media Assets](#operation/MediaAssets_ListMediaAssets) and query
     * with `type=timeline`**
     *
     * Indicates which streams and time frames are available for clipping.
     *
     * @summary List Available Clip Sources
     * @throws FetchError<400, types.RecordFilesListAvailableClipSourcesResponse400> Bad Request
     */
    recordFiles_ListAvailableClipSources(body: types.RecordFilesListAvailableClipSourcesBodyParam, metadata: types.RecordFilesListAvailableClipSourcesMetadataParam): Promise<FetchResponse<200, types.RecordFilesListAvailableClipSourcesResponse200> | FetchResponse<number, types.RecordFilesListAvailableClipSourcesResponseDefault>>;
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
    recordFiles_ValidateStorageProfile(body: types.RecordFilesValidateStorageProfileBodyParam): Promise<FetchResponse<200, types.RecordFilesValidateStorageProfileResponse200> | FetchResponse<number, types.RecordFilesValidateStorageProfileResponseDefault>>;
    /**
     * **Please refer to [Update Account Media Assets Expiration
     * Rules](#operation/Account_UpdateExpirationRules)**
     *
     * Update account level expiry rule for clip creation. Streams that were published outside
     * this expiry period will not be available for creating clips.
     *
     * @summary Update Clip Source Expiry Rule
     */
    recordFiles_UpdateExpiryRule(body: types.RecordFilesUpdateExpiryRuleBodyParam): Promise<FetchResponse<200, types.RecordFilesUpdateExpiryRuleResponse200> | FetchResponse<number, types.RecordFilesUpdateExpiryRuleResponseDefault>>;
    /**
     * **Please refer to [Get Account Media Assets Expiration
     * Rules](#operation/Account_GetExpirationRules)**
     *
     * Get account level expiry rule for clip creation. Streams that were published outside
     * this expiry period will not be available for creating clips.
     *
     * @summary Get Clip Source Expiry Rule
     */
    recordFiles_GetExpiryRule(): Promise<FetchResponse<200, types.RecordFilesGetExpiryRuleResponse200> | FetchResponse<number, types.RecordFilesGetExpiryRuleResponseDefault>>;
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
    recordFiles_DeleteExpiryRule(): Promise<FetchResponse<200, types.RecordFilesDeleteExpiryRuleResponse200> | FetchResponse<number, types.RecordFilesDeleteExpiryRuleResponseDefault>>;
    /**
     * **Please refer to [Delete Media Assets](#operation/MediaAssets_DeleteMediaAssets)**
     *
     * Indicates to delete via `clipSourceId`.
     *
     * @summary Delete Clip Sources
     * @throws FetchError<400, types.RecordFilesDeleteClipSourcesResponse400> Bad Request
     */
    recordFiles_DeleteClipSources(body: types.RecordFilesDeleteClipSourcesBodyParam): Promise<FetchResponse<204, types.RecordFilesDeleteClipSourcesResponse204> | FetchResponse<number, types.RecordFilesDeleteClipSourcesResponseDefault>>;
    /**
     * Will force an active stream for the given streamId to be disconnected immediately. The
     * publishing token should also be disabled, otherwise the client may attempt to re-connect
     * and begin publishing again.
     *
     *
     * @summary Stop Stream by ID
     * @throws FetchError<400, types.StreamStopStreamResponse400> Bad Request
     */
    stream_StopStream(body: types.StreamStopStreamBodyParam): Promise<FetchResponse<200, types.StreamStopStreamResponse200> | FetchResponse<number, types.StreamStopStreamResponseDefault>>;
    /**
     * Will force all active streams associated with an account to disconnect immediately. The
     * publishing token(s) should also be disabled, otherwise the client may attempt to
     * re-connect and begin publishing again.
     *
     *
     * @summary Stop All Streams
     * @throws FetchError<400, types.StreamStopByAccountResponse400> Bad Request
     */
    stream_StopByAccount(): Promise<FetchResponse<200, types.StreamStopByAccountResponse200> | FetchResponse<number, types.StreamStopByAccountResponseDefault>>;
    /**
     * Gets token specified by token id.
     *
     * @summary Read Token
     * @throws FetchError<400, types.SubscribeTokenV1ReadTokenResponse400> Bad Request
     */
    subscribeTokenV1_ReadToken(metadata: types.SubscribeTokenV1ReadTokenMetadataParam): Promise<FetchResponse<200, types.SubscribeTokenV1ReadTokenResponse200> | FetchResponse<number, types.SubscribeTokenV1ReadTokenResponseDefault>>;
    /**
     * Deletes token specified by the token's ID. The Token ID can be found using the List
     * Tokens API or in the API response of Create Token API.
     *
     * @summary Delete Token
     */
    subscribeTokenV1_DeleteToken(metadata: types.SubscribeTokenV1DeleteTokenMetadataParam): Promise<FetchResponse<200, types.SubscribeTokenV1DeleteTokenResponse200> | FetchResponse<number, types.SubscribeTokenV1DeleteTokenResponseDefault>>;
    /**
     * Update token stream information as well as updates token itself.
     *
     * @summary Update Token
     * @throws FetchError<400, types.SubscribeTokenV1UpdateTokenResponse400> Bad Request
     */
    subscribeTokenV1_UpdateToken(body: types.SubscribeTokenV1UpdateTokenBodyParam, metadata: types.SubscribeTokenV1UpdateTokenMetadataParam): Promise<FetchResponse<200, types.SubscribeTokenV1UpdateTokenResponse200> | FetchResponse<number, types.SubscribeTokenV1UpdateTokenResponseDefault>>;
    /**
     * List all tokens with specific sorting and pagination. If response array is empty, you
     * have reached the end of the list ordering.
     *
     * @summary List Tokens
     * @throws FetchError<400, types.SubscribeTokenV1ListTokensResponse400> Bad Request
     */
    subscribeTokenV1_ListTokens(metadata: types.SubscribeTokenV1ListTokensMetadataParam): Promise<FetchResponse<200, types.SubscribeTokenV1ListTokensResponse200> | FetchResponse<number, types.SubscribeTokenV1ListTokensResponseDefault>>;
    /**
     * List all tokens with specific sorting and pagination that matches given token name or
     * stream name. If response array is empty, you have reached the end of the list ordering.
     *
     * @summary List Tokens By Name
     * @throws FetchError<400, types.SubscribeTokenV1ListTokensByNameResponse400> Bad Request
     */
    subscribeTokenV1_ListTokensByName(metadata: types.SubscribeTokenV1ListTokensByNameMetadataParam): Promise<FetchResponse<200, types.SubscribeTokenV1ListTokensByNameResponse200> | FetchResponse<number, types.SubscribeTokenV1ListTokensByNameResponseDefault>>;
    /**
     * Creates new token given a label and associated stream name(s). Stream names are limited
     * to 128 characters.
     *
     * @summary Create Token
     * @throws FetchError<400, types.SubscribeTokenV1CreateTokenResponse400> Bad Request
     */
    subscribeTokenV1_CreateToken(body: types.SubscribeTokenV1CreateTokenBodyParam): Promise<FetchResponse<200, types.SubscribeTokenV1CreateTokenResponse200> | FetchResponse<number, types.SubscribeTokenV1CreateTokenResponseDefault>>;
    /**
     * Webhook url and details used on account.
     *
     * @summary Read Webhook
     */
    webhooks_Get(metadata: types.WebhooksGetMetadataParam): Promise<FetchResponse<200, types.WebhooksGetResponse200> | FetchResponse<number, types.WebhooksGetResponseDefault>>;
    /**
     * Update webhook url, events to signal, or refresh signing secret.
     *
     * @summary Update Webhook
     * @throws FetchError<400, types.WebhooksUpdateWebhookResponse400> Bad Request
     */
    webhooks_UpdateWebhook(body: types.WebhooksUpdateWebhookBodyParam, metadata: types.WebhooksUpdateWebhookMetadataParam): Promise<FetchResponse<200, types.WebhooksUpdateWebhookResponse200> | FetchResponse<number, types.WebhooksUpdateWebhookResponseDefault>>;
    /**
     * Removes all webhook data for account.
     *
     * @summary Remove Webhook
     */
    webhooks_RemoveWebhook(metadata: types.WebhooksRemoveWebhookMetadataParam): Promise<FetchResponse<200, types.WebhooksRemoveWebhookResponse200> | FetchResponse<number, types.WebhooksRemoveWebhookResponseDefault>>;
    /**
     * Iterative call to list webhooks on account.
     *
     * @summary List Webhooks
     */
    webhooks_ListWebhooks(metadata?: types.WebhooksListWebhooksMetadataParam): Promise<FetchResponse<200, types.WebhooksListWebhooksResponse200> | FetchResponse<number, types.WebhooksListWebhooksResponseDefault>>;
    /**
     * Add new webhook on account.
     *
     * @summary Add Webhook
     * @throws FetchError<400, types.WebhooksAddWebhookResponse400> Bad Request
     */
    webhooks_AddWebhook(body: types.WebhooksAddWebhookBodyParam): Promise<FetchResponse<200, types.WebhooksAddWebhookResponse200> | FetchResponse<number, types.WebhooksAddWebhookResponseDefault>>;
}
declare const createSDK: SDK;
export = createSDK;
