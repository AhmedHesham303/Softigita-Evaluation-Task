type addPaginationToUrlProps = {
  url: string;
  page: string;
  size: string;
};
export const addPaginationToUrl = ({
  url,
  page,
  size,
}: addPaginationToUrlProps) => {
  return `${url}?page%5Bnumber%5D=${page}&page%5Bsize%5D=${size}`;
};
