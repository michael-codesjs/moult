type CreateMappingTemplateParams<
  T extends string,
  F extends string,
  D extends string,
  RQ extends string,
  RP extends string
> = {
  type: T,
  field: F,
  source: D,
  request?: RQ,
  response?: RP
};

type CreateMappingTemplate = <
  T extends string,
  F extends string,
  D extends string,
  RQ extends string,
  RP extends string
> (params: CreateMappingTemplateParams<T, F, D, RQ, RP>) => {
  type: T,
  field: F,
  dataSource: D,
  request: RQ extends string ? `./adapters/primary/mapping-templates/${RQ}` : false,
  response: RP extends string ? `./adapters/primary/mapping-templates/${RP}` : false,
}

export const createMappingTemplate: CreateMappingTemplate = (params) => {
  const { type, field, source, request, response } = params;
  return {
    type,
    field,
    dataSource: source,
    request: (typeof request === "string" ? `./adapters/primary/mapping-templates/${request}` : false) as any,
    response: (typeof response === "string" ? `./adapters/primary/mapping-templates/${response}` : false) as any
  };
};