export const RouteParams = {
  id: 'id',
} as const;

type Keys = keyof typeof RouteParams;

export type RouteParamsType = (typeof RouteParams)[Keys];
