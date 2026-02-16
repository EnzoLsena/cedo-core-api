export class PageList<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;

  constructor(
    items: T[],
    totalCount: number,
    currentPage: number,
    pageSize: number,
  ) {
    this.items = items;
    this.totalCount = totalCount;
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.totalPages = Math.ceil(totalCount / pageSize);
  }
}
