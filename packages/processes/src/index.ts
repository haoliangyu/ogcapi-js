import {
  ILink,
  IRequestParams,
  IServiceConfig,
  IServiceRequestOptions,
  Service,
  request,
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
    const url: string = `${this._baseUrl}/processes`;
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
    const url: string = `${this._baseUrl}/processes/${processId}`;
    const result: IProcess = await request({ url, params: options.params });
    return result;
  }

  /**
   * Execute a process by its id.
   * @param processId process id
   * @param options options
   */
  async executeProcess<T extends TProcessRequestExecutionMode>(
    processId: string,
    options: IExecuteProcessRequest<T>
  ): Promise<TExecuteProcessResponse<T>> {
    const url: string = `${this._baseUrl}/processes/${processId}/execute`;
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
      headers['Prefer'] = 'respond-async';
    }

    if (options.response === 'raw') {
      throw new Error('"raw" response mode is not supported yet.');
    }

    const result = await request({ url, params });
    return result as TExecuteProcessResponse<T>;
  }

  /**
   * Get a list of jobs
   * @param options options
   */
  async getJobs(options: IGetJobsRequest = {}): Promise<IJobsResponse> {
    const url: string = `${this._baseUrl}/processes`;
    const params: IRequestParams = Object.assign({}, options.params);
    if ('limit' in options) {
      params.limit = options.limit;
    }
    const result: IJobsResponse = await request({ url, params });
    return result;
  }

  // /**
  //  * Get a job by its id
  //  * @param jobId: job id
  //  * @param options options
  //  */
  // async getJob(jobId: string, options: IServiceRequestOptions = {}) {}

  // /**
  //  * Get a jobs results by its id
  //  * @param jobId: job id
  //  * @param options options
  //  */
  // async getJobResults(jobId: string, options: IServiceRequestOptions = {}) {}

  // /**
  //  * Dismiss a job by its id
  //  * @param jobId: job id
  //  * @param options options
  //  */
  // async dismissJob(jobId: string, options: IServiceRequestOptions = {}) {}
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

type TProcessArgs = Record<string, JSONSchema7>;

/**
 * * describes a processes inputs
 */
export type TProcessInputs = TProcessArgs;

/**
 * describes a processes outputs
 */
export type TProcessOutputs = TProcessArgs;

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

export type TProcessBBoxValue = {
  bbox:
    | [number, number, number, number]
    | [number, number, number, number, number, number];
  crs: string;
};

export interface IProcessObjectValue {
  // allow nested objects
  [key: string]: IProcessObjectValue | TProcessPrimitiveValue;
}

export type TProcessPrimitiveValue = string | number | boolean;

export type TProcessArrayValue =
  | string[]
  | number[]
  | boolean[]
  | TProcessPrimitiveValue[]
  | IProcessQualifiedValue[]
  // allow nested arrays
  | TProcessArrayValue[];

export interface IProcessQualifiedValue extends IProcessFormat {
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

export type TProcessRequestOutputs = Record<string, IProcessRequestOutput>;

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

export interface IExecuteProcessRequest<T extends TProcessRequestExecutionMode>
  extends IServiceRequestOptions {
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
 * sync job result
 */
export type TSyncJobResult = Record<string, TProcessValue>;

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
  status: EJobStatus;
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
export enum EJobStatus {
  accepted = 'accepted',
  running = 'running',
  successful = 'successful',
  failed = 'failed',
  dismissed = 'dismissed',
}

export interface IGetJobsRequest extends IServiceRequestOptions {
  /**
   * number of jobs to return
   */
  limit?: number;
  /**
   * filter jobs by status
   */
  status?: EJobStatus | EJobStatus[];
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
