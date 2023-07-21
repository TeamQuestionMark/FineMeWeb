export const SESSION_STORAGE_KEY = {
  nickname: (stageId: number, userId: number) =>
    `nickname@stage${stageId}-user${userId}`,
};
