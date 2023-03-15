import MaterialReactTable from 'material-react-table';

import DFnewLogger from 'utils/DFnewLogger';

const Table = (propsValue) => {
  DFnewLogger('Table/propsValue:', propsValue);
  return (
    <MaterialReactTable
      columns={propsValue.columns}
      data={propsValue.data}
      enableRowNumbers
      enablePagination
      rowNumberMode="original"
      defaultColumn={{
        minSize: 30,
        maxSize: 400,
        size: 50
      }}
      enableStickyHeader
      muiTableHeadProps={{ sx: { zIndex: 1 } }}
      muiTableContainerProps={{ sx: { maxHeight: '50vh' } }}
      {...propsValue}
    />
  );
};

export default Table;
