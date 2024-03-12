import {
  ILink,
  IRequestParams,
  IServiceConfig,
  IServiceRequestOptions,
  Service,
  request,
  stringifyDatetime,
} from '@ogcapi-js/shared';
import { JSONSchema7 } from 'json-schema';

/**
 * configuration for a OGC Processes API service
 */
export interface IProcessesServiceConfig extends IServiceConfig {}

/**
 * OGC Features API processes class
 */
export class ProcessesService extends Service {
  /**
   * Get a list of processes
   * @param options options
   */
  async getProcesses(
    options: IGetProcessesRequest = {}
  ): Promise<IProcessesResponse> {
    const url: string = `${this.baseUrl}/processes`;
    const params: IRequestParams = Object.assign({}, options.params);
    if ('limit' in options) {
      params.limit = options.limit;
    }
    const result: IProcessesResponse = await request({ url, params });
    return result;
  }

  /**
   * Get a process by its id.
   * @param processId process id
   * @param options options
   */
  async getProcess(
    processId: string,
    options: IServiceRequestOptions = {}
  ): Promise<IProcess> {
    const url: string = `${this.baseUrl}/processes/${processId}`;
    const result: IProcess = await request({
      url,
      signal: options.signal,
      params: options.params,
    });
    return result;
  }

  /**
   * Execute a process by its id.
   * @param processId process id
   * @param options options
   */
  async executeProcess<T extends TProcessRequestExecutionMode>(
    processId: string,
    options: IExecuteProcessOptions<T>
  ): Promise<TExecuteProcessResponse<T>> {
    if (options.response === 'raw') {
      throw new Error('"raw" response mode is not supported yet.');
    }

    const url: string = `${this.baseUrl}/processes/${processId}/execution`;
    const params: IRequestParams = Object.assign(
      {
        inputs: options.inputs,
        outputs: options.outputs,
      },
      options.params
    );

    const headers: Record<string, string> = {
      'content-type': 'application/json',
    };
    if (options.mode === 'async') {
      headers['prefer'] = 'respond-async';
    }

    const result = await request({
      url,
      headers,
      params,
      signal: options.signal,
      method: 'POST',
    });
    return result as TExecuteProcessResponse<T>;
  }

  /**
   * Get a list of jobs
   * @param options options
   */
  async getJobs(options: IGetJobsOptions = {}): Promise<IJobsResponse> {
    const url: string = `${this.baseUrl}/jobs`;
    const params: IRequestParams = Object.assign({}, options.params);
    if ('limit' in options) {
      params.limit = options.limit;
    }
    if (options.status) {
      params.status = options.status;
    }
    if (options.datetime) {
      params.datetime = stringifyDatetime(options.datetime);
    }
    const result: IJobsResponse = await request({
      url,
      params,
      signal: options.signal,
    });
    return result;
  }

  /**
   * Get a job by its id
   * @param jobId: job id
   * @param options options
   */
  async getJob(
    jobId: string,
    options: IServiceRequestOptions = {}
  ): Promise<IJobInfo> {
    const url: string = `${this.baseUrl}/jobs/${jobId}`;
    const params: IRequestParams = Object.assign({}, options.params);
    const result: IJobInfo = await request({
      url,
      params,
      signal: options.signal,
    });
    return result;
  }

  /**
   * Get a jobs results by its id
   *
   * note: only JSON results are supported.
   *
   * @param jobId: job id
   * @param options options
   */
  async getJobResults(
    jobId: string,
    options: IServiceRequestOptions = {}
  ): Promise<TJobResult> {
    const url: string = `${this.baseUrl}/jobs/${jobId}`;
    const params: IRequestParams = Object.assign({}, options.params);
    const result: TJobResult = await request({
      url,
      params,
      signal: options.signal,
    });
    return result;
  }

  /**
   * Dismiss a job by its id
   * @param jobId: job id
   * @param options options
   */
  async dismissJob(
    jobId: string,
    options: IServiceRequestOptions = {}
  ): Promise<IJobInfo> {
    const url: string = `${this.baseUrl}/jobs/${jobId}`;
    const params: IRequestParams = Object.assign({}, options.params);
    const result: IJobInfo = await request({
      url,
      params,
      signal: options.signal,
      method: 'DELETE',
    });
    return result;
  }
}

/**
 * process job control option enum
 */
export type TJobControlOption = 'sync-execute' | 'async-execute' | 'dismiss';

/**
 * process job control option enum
 */
export type TOutputTransmissionMode = 'value' | 'reference';

/**
 * process execution mode enum
 */
export type TProcessRequestExecutionMode = 'async' | 'sync';

/**
 * process response mode enum
 */
export type TProcessRequestResponseMode = 'raw' | 'document';

/**
 * process summary
 */
export interface IProcessSummary extends Record<string, any> {
  /**
   * process id
   */
  id: string;
  /**
   * process version
   */
  version: string;
  /**
   * process title
   */
  title: string;
  /**
   * process description
   */
  description?: string;
  /**
   * process keywords
   */
  keywords?: string[];
  /**
   * process job control options
   */
  jobControlOptions: TJobControlOption[];
  /**
   * process output transmissions
   */
  outputTransmission: TOutputTransmissionMode[];
  /**
   * process links
   */
  links: ILink[];
}

/**
 * response for the get processes request
 */
export interface IProcessesResponse {
  /**
   * processes
   */
  processes: IProcessSummary[];
  /**
   * links
   */
  links: ILink[];
}

/**
 * meta data
 */
export interface IProcessMetaData {
  /**
   * title
   */
  title?: string;
  /**
   * role
   */
  role?: string;
  /**
   * href
   */
  href?: string;
}

/**
 * additional parameters
 */
export interface IProcessAdditionalParameters {
  /**
   * additional parameter name
   */
  name: string;
  /**
   * additional parameter value
   */
  value: any;
}

/**
 * description type for inputs and outputs
 */
interface IProcessDescriptionType extends IProcessMetaData {
  /**
   * input title
   */
  title?: string;
  /**
   * input description
   */
  description?: string;
  /**
   * input keywords
   */
  keywords?: string[];
  /**
   * input metadata
   */
  metadata?: IProcessMetaData[];
  /**
   * additional input parameters
   */
  parameters?: IProcessAdditionalParameters[];
}

/**
 * extended JSON schema
 */
export type TExtendedSchema = JSONSchema7 & {
  /**
   * content schema
   */
  contentSchema?: string;
};

/**
 * process schema
 */
export type TProcessSchema = Omit<
  TExtendedSchema,
  'oneOf' | 'allOf' | 'anyOf'
> &
  (
    | {
        oneOf?: TExtendedSchema[];
      }
    | {
        allOf?: TExtendedSchema[];
      }
    | {
        anyOf?: TExtendedSchema[];
      }
  );

/**
 * process input
 */
export interface IProcessInputDescription extends IProcessDescriptionType {
  /**
   * input schema
   */
  schema: TProcessSchema;
  /**
   * minimum occurrences of input
   * @default 1
   */
  minOccurs?: number;
  /**
   * maximum occurrences of input
   * @default 1 when not 'unbounded'
   */
  maxOccurs?: number | 'unbounded';
}

/**
 * process output
 */
export interface IProcessOutputDescription extends IProcessDescriptionType {
  /**
   * output schema
   */
  schema: TProcessSchema;
}

/**
 * describes a processes inputs
 */
export type TProcessInputs = Record<string, IProcessInputDescription>;

/**
 * describes a processes outputs
 */
export type TProcessOutputs = Record<string, IProcessOutputDescription>;

/**
 * process
 */
export interface IProcess extends IProcessSummary {
  /**
   * inputs
   */
  inputs: TProcessInputs;
  /**
   * outputs
   */
  outputs: TProcessOutputs;
}

/**
 * process format
 */
export interface IProcessFormat {
  /**
   * media type
   */
  mediaType?: string;
  /**
   *  encoding
   */
  encoding?: string;
}

export interface IGetProcessesRequest extends IServiceRequestOptions {
  /**
   * number of processes to return
   */
  limit?: number;
}

/**
 * bbox value
 */
export type TProcessBBoxValue = {
  bbox: number[];
  // tuples can not be used with tsdx @see https://github.com/jaredpalmer/tsdx/issues/1033#issuecomment-977135211
  // | readonly [number, number, number, number]
  // | readonly [number, number, number, number, number, number];
  crs: string;
};

/**
 * object value
 */
export interface IProcessObjectValue {
  // allow nested objects
  [key: string]:
    | IProcessObjectValue
    | TProcessPrimitiveValue
    | TProcessArrayValue;
}

/**
 * primitive value
 */
export type TProcessPrimitiveValue =
  | string
  | number
  | boolean
  | IProcessObjectValue;

/**
 * array value
 */
export type TProcessArrayValue =
  | string[]
  | number[]
  | boolean[]
  | TProcessPrimitiveValue[]
  | IProcessQualifiedValue[]
  // allow nested arrays
  | TProcessArrayValue[];

/**
 * qualified value
 */
export interface IProcessQualifiedValue extends IProcessFormat {
  /**
   * the value
   */
  value:
    | ILink
    | TProcessPrimitiveValue
    | TProcessArrayValue
    | IProcessObjectValue
    | TProcessBBoxValue;
}

/**
 * input/result value for process/job
 */
export type TProcessValue =
  | ILink
  | TProcessPrimitiveValue
  | TProcessBBoxValue
  | TProcessArrayValue
  | IProcessQualifiedValue;

/**
 * inputs for executing a job
 */
export type TProcessRequestInputs = Record<string, TProcessValue>;

/**
 * execute process output
 */
export interface IProcessRequestOutput {
  /**
   * output format
   */
  format?: IProcessFormat;
  /**
   * output transmission mode
   */
  transmissionMode?: TOutputTransmissionMode;
}

/**
 * execute process outputs
 */
export type TProcessRequestOutputs = Record<string, IProcessRequestOutput>;

/**
 * job subscriber
 */
export interface IProcessSubscriber {
  /**
   * URI called on success.
   */
  successUri: string;
  /**
   * URI called on progress.
   */
  inProgressUri?: string;
  /**
   * URI called on failure.
   */
  failedUri?: string;
}

/**
 * request parameters to execute a process
 */
export interface IExecuteProcessOptions<
  T extends TProcessRequestExecutionMode | unknown = unknown
> extends IServiceRequestOptions {
  /**
   * process inputs
   */
  inputs: TProcessRequestInputs;
  /**
   * process outputs
   */
  outputs: TProcessRequestOutputs;
  /**
   * process execution mode
   */
  mode?: T;
  /**
   * process response mode
   *
   * note: takes only affect when @see mode is 'async'
   */
  response?: TProcessRequestResponseMode;
  /**
   * process subscriber info
   */
  subscriber?: IProcessSubscriber;
}

/**
 * response for the execute process request
 */
export type TExecuteProcessResponse<
  T extends TProcessRequestExecutionMode
> = T extends 'async'
  ? TAsyncJobResult
  : T extends 'sync'
  ? TSyncJobResult
  : TAsyncJobResult | TSyncJobResult;

/**
 * job result
 */
export type TJobResult = Record<string, TProcessValue>;

/**
 * sync job result
 */
export type TSyncJobResult = TJobResult;

/**
 * async job result
 */
export type TAsyncJobResult = IJobInfo;

/**
 * describes a job
 */
export interface IJobInfo {
  type: 'process';
  /**
   * job id
   */
  jobID: string;
  /**
   * job status
   */
  status: TJobStatus;
  /**
   * process id of job
   */
  processID?: string;
  /**
   * job message
   */
  message?: string;
  /**
   * job created date as date-time
   */
  created?: string;
  /**
   * job started date as date-time
   */
  started?: string;
  /**
   * job finished date as date-time
   */
  finished?: string;
  /**
   * job updated date as date-time
   */
  updated?: string;
  /**
   * job progress from 0 to 100
   */
  progress?: number;
  /**
   * job links
   */
  links?: ILink[];
}

/**
 * job status enum
 */
export type TJobStatus =
  | 'accepted'
  | 'running'
  | 'successful'
  | 'failed'
  | 'dismissed';

/**
 * request parameters to get jobs from a collection
 */
export interface IGetJobsOptions extends IServiceRequestOptions {
  /**
   * number of jobs to return
   */
  limit?: number;
  /**
   * filter jobs by status
   */
  status?: TJobStatus | TJobStatus[];
  /**
   * filter jobs by min duration
   */
  minDuration?: number;
  /**
   * filter jobs by max duration
   */
  maxDuration?: number;
  /**
   * filter jobs by process IDs
   */
  processIds?: string | string[];
  /**
   * filter jobs by created date
   */
  datetime?: string;
}

/**
 * response for the get jobs request
 */
export interface IJobsResponse {
  /**
   * jobs
   */
  jobs: IJobInfo[];
  /**
   * links
   */
  links: ILink[];
}
