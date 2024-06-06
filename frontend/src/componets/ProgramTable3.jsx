// /* eslint-disable react/prop-types */
// import { useEffect, useMemo, useState, useCallback } from 'react';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Switch from '@mui/material/Switch';
// import { baseURL } from '../socket';
// import useCRUD from '../services/channelServiec';
// import { toast } from 'react-toastify';
// import socket from '../socket';
// import { formatDuration } from '../utils/utils';

// const ProTable = ({
//   openModal,
//   setId,
//   setDeleteId,
//   setTitle,
//   setDuration,
//   setDescription,
//   setCategory,
//   setType,
//   setVideoUrl,
//   setChannel,
// }) => {
//   const [data, setData] = useState([]);
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefetching, setIsRefetching] = useState(false);
//   const [rowCount, setRowCount] = useState(0);

//   // Table state
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [sorting, setSorting] = useState([]);
//   const [columnFilterFns,setColumnFilterFns]=useState([])
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 5,
//   });

//   const { toglerStatus } = useCRUD(`${baseURL}/api/movie`);

//   const handleDelete = useCallback((row) => {
//     openModal();
//     setDeleteId(row.id);
//   }, [openModal, setDeleteId]);

//   const handleUpdate = useCallback((row) => {
//     openModal();
//     setId(row.id);
//     setTitle(row.title);
//     setDuration(Number(row.duration));
//     setDescription(row.description);
//     setCategory(Number(row.categoryId));
//     setType(Number(row.typeId));
//     setVideoUrl(row.videoUrl);
//     setChannel(Number(row.channelId));
//   }, [openModal, setId, setTitle, setDuration, setDescription, setCategory, setType, setVideoUrl, setChannel]);

//   const updateStatusHandler = useCallback(async (id) => {
//     try {
//       await toglerStatus(id, 'datachange');
//     } catch (error) {
//       toast.error(error?.data?.message || error.message);
//     }
//   }, [toglerStatus]);

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     setIsRefetching(true);
  
//     const url = new URL('/api/movie/admin', 'http://localhost:4000');
//     url.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`);
//     url.searchParams.set('size', `${pagination.pageSize}`);
  
     
//     const mergedArr = columnFilters.map(item => {
//       if (item.id in columnFilterFns) {
//         return { ...item, mode: columnFilterFns[item.id] };
//       }
//       return item;
//     });
    
//     console.log(mergedArr);
//     url.searchParams.set('filters', JSON.stringify(mergedArr ?? []));
//     url.searchParams.set('globalFilter', globalFilter ?? '');
//     url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
  
//     try {
//       const response = await fetch(url.href);
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const json = await response.json();
  
//       if (!json.data || !json.meta) {
//         throw new Error('Response format is incorrect');
//       }
  
//       setData(json.data);
//       setRowCount(json.meta.totalRowCount || 0);
//       setIsError(false);
//     } catch (error) {
//       setIsError(true);
//       setRowCount(0);
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//       setIsRefetching(false);
//     }
//   }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting,columnFilterFns]);

//   useEffect(() => {
//     socket.on('onDataChange', fetchData);
//     console.log(columnFilterFns)
//     fetchData();
//     return () => {
//       socket.off('onDataChange', fetchData);
//     };
//   }, [fetchData,columnFilterFns]);



//   const columns = useMemo(() => [
//     { accessorKey: 'id', header: '#id',filterVariant:'number' ,filterFn:'equal',size: 15,columnFilterModeOptions: ['between', 'lessThan', 'greaterThan','equals',"lessThanOrEqualTo","greaterThanOrEqualTo"],  },
//     { accessorKey: 'title', header: 'Title', size: 30,filterFn:'fuzzy' ,columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith', 'endsWith','equals'] },
//     { accessorKey: 'duration',filterSelectOptions: [
//       { label: '1h', value: 1 * 60 * 60 * 1000} ,
//       { label: '2h', value: 2 * 60 * 60 * 1000 },
//       { label: '3h', value: 3 * 60 * 60 * 1000 },
//     ],
//     filterVariant: 'select' ,header: 'Duration', size: 30, columnFilterModeOptions: [ 'lessThan', 'greaterThan'] ,Cell: ({ row }) => formatDuration(row.original.duration) },
//     { accessorKey: 'description', header: 'Description', size: 30,filterFn:'fuzzy', columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith', 'endsWith','equals'] },
//     {
//       accessorKey: 'status', header: 'Status', size: 30, enableColumnFilterModes: false,columnFilterModeOptions: ['equals'],
//       accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'),
//       filterVariant: 'checkbox',
//       Cell: ({ row }) => (
//         <Switch
//           checked={Boolean(row.original.status)}
//           onChange={() => updateStatusHandler(row.original.id)}
//           inputProps={{ 'aria-label': 'controlled' }}
//         />
//       ),
//     },
//     {
//       id: 'actions', header: 'Actions', size: 50,
//       Cell: ({ row }) => (
//         <div>
//           <IconButton color="primary" onClick={() => handleUpdate(row.original)} aria-label="edit">
//             <EditIcon />
//           </IconButton>
//           <IconButton color="secondary" onClick={() => handleDelete(row.original)} aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ], [handleDelete, handleUpdate, updateStatusHandler]);

  

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     enableFacetedValues: true,
//     enableColumnFilterModes: true,
//     getRowId: (row) => row.id,
//     initialState: { showColumnFilters: true, showGlobalFilter: true},
//     manualFiltering: true,
//     manualPagination: true,
//     manualSorting: true,
//     muiToolbarAlertBannerProps: isError ? { color: 'error', children: 'Error loading data' } : undefined,
//     onColumnFiltersChange: setColumnFilters,
//     onGlobalFilterChange: setGlobalFilter,
//     onColumnFilterFnsChange:setColumnFilterFns,
//     onPaginationChange: setPagination,
//     onSortingChange: setSorting,
//     rowCount,
//     state: {
//       columnFilters,
//       globalFilter,
//       isLoading,
//       pagination,
//       showAlertBanner: isError,
//       showProgressBars: isRefetching,
//       sorting,
//       columnFilterFns
//     },
//   });

//   return <MaterialReactTable table={table} />;
// };

// export default ProTable;
