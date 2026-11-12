
import Pagination from '../../common/Pagination.jsx';
import { PAGE_SIZES } from './documentFilters';

function DocumentPagination({
  total,
  current,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  return (
    <Pagination
      page={current}
      pageSize={pageSize}
      total={total}
      onPageChange={onPageChange}
      itemLabel="documents"
      showPageNumbers
      pageSizeOptions={PAGE_SIZES}
      onPageSizeChange={onPageSizeChange}
    />
  );
}

export default DocumentPagination;
