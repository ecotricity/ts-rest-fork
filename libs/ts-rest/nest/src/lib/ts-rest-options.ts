import { TsRestOptionsMetadataKey } from './constants';
import { ExecutionContext } from '@nestjs/common';

export type TsRestOptions = {
  jsonQuery?: boolean;
  validateResponses?: boolean;
  validateRequestHeaders?: boolean;
  validateRequestQuery?: boolean;
  validateRequestBody?: boolean;
  /**
   * When false, disables automatic request validation. Raw request values are passed to handlers.
   * Defaults to true (current behavior).
   */
  useDefaultValidation?: boolean;
};

export type EvaluatedTsRestOptions = Required<TsRestOptions>;
export type MaybeTsRestOptions = TsRestOptions | undefined | null;

const defaultOptions = {
  jsonQuery: false,
  validateResponses: false,
  validateRequestHeaders: true,
  validateRequestQuery: true,
  validateRequestBody: true,
  useDefaultValidation: true,
} satisfies EvaluatedTsRestOptions;

export const evaluateTsRestOptions = (
  globalOptions: MaybeTsRestOptions,
  context: ExecutionContext,
): EvaluatedTsRestOptions => {
  const handlerOptions = Reflect.getMetadata(
    TsRestOptionsMetadataKey,
    context.getHandler(),
  ) as MaybeTsRestOptions;

  const classOptions = Reflect.getMetadata(
    TsRestOptionsMetadataKey,
    context.getClass(),
  ) as MaybeTsRestOptions;

  return {
    ...defaultOptions,
    ...globalOptions,
    ...classOptions,
    ...handlerOptions,
  };
};
