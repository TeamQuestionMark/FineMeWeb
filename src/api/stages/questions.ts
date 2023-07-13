import { Question } from '@/types/stage';
import api, { Pagination, ResponseData } from '../instance';

export const get = async (
  stageNo: number,
  page: number,
  pageSize: number = 5,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  const { data } = await api.get<ResponseData<Pagination<Question[]>>>(
    `/stages/${stageNo}/questions?${params}`,
  );
  return data.data;
};
