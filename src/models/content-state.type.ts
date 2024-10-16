export const ContentState = {
  Archived: -1,
  Unpublished: 0,
  Published: 1,
} as const;

type Keys = keyof typeof ContentState;

export type ContentStateType = (typeof ContentState)[Keys];
