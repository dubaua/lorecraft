export const Routes = {
  root: '/',
};

type Keys = keyof typeof Routes;

export type RouteType = (typeof Routes)[Keys];
