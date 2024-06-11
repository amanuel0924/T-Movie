/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useState,useCallback, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { IconButton } from '@mui/material';

import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'; //note: this is TanStack React Query V5
import socket, { baseURL } from '../socket';
import useCRUD from '../services/channelServiec';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import { formatDuration, mergeFilterDatatype, mergeFilterfn, mergeFiterVariant,checkboxModes,numberDateTimeModes,selectModes,multiSelectModes } from '../utils/utils';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
const Example = ({
  openModal,
  setId,
  setDeleteId,
  setTitle,
  setDuration,
  setDescription,
  setCategory,
  setType,
  setVideoUrl,
  setChannel,
  setReleased,
}) => {
  
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const [columnFilterFns,setColumnFilterFns]=useState({
    id:'equals',
    title:'fuzzy',
    description:'fuzzy',
    duration:'lessThan',
    status:'equals',
    released:'equals',
    typeId:'equals'
  })
  const columnDataTypes = {
    id: 'number',
    title: 'string',
    description: 'string',
    duration: 'number',
    status: 'boolean',
    released: 'date',
    typeId:'array'
  };
  const customeGlobalFilter=JSON.stringify({columuns:['title','description'],value:globalFilter})

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { toglerStatus } = useCRUD(`${baseURL}/api/movie`);

  const handleDelete = useCallback((row) => {
    openModal();
    setDeleteId(row.id);
  }, [openModal, setDeleteId]);

  const handleUpdate = useCallback((row) => {
    openModal();
    setId(row.id);
    setTitle(row.title);
    setDuration(Number(row.duration));
    setDescription(row.description);
    setCategory(Number(row.categoryId));
    setType(Number(row.typeId));
    setVideoUrl(row.videoUrl);
    setChannel(Number(row.channelId));
    setReleased(row.released);
  }, [openModal, setId, setTitle, setDuration, setDescription, setCategory, setType, setVideoUrl, setChannel,setReleased]);

  const updateStatusHandler = useCallback(async (id) => {
    try {
      await toglerStatus(id, 'datachange');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }, [toglerStatus]);
 
  const {
    data: { data = [], meta } = {}, //your data and api response will probably be different
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      'table-data',
      columnFilters, //refetch when columnFilters changes
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const fetchURL = new URL(
        '/api/movie/admin',
           `${baseURL}`,
      );

      //merege the merged array with thecolumnFilterFns 
      let mergedArr = mergeFilterfn(columnFilters,columnFilterFns)
      //merege the merged array with the columnDatatype
      mergedArr = mergeFilterDatatype (mergedArr,columnDataTypes)
      fetchURL.searchParams.set(
        'start',
        `${pagination.pageIndex * pagination.pageSize}`,
      );
      fetchURL.searchParams.set('size', `${pagination.pageSize}`);
      fetchURL.searchParams.set('filters', JSON.stringify(mergedArr ?? []));
      fetchURL.searchParams.set('globalFilter', customeGlobalFilter ?? '');
      fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));
      const response = await fetch(fetchURL.href);
      const json = await response.json();
      return json;
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });

  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'id' ,size: 15, columnFilterModeOptions:numberDateTimeModes,   },
    { accessorKey: 'title', header: 'Title', size: 30  },
    { accessorKey: 'duration',size:15,filterSelectOptions: [
      { label: '1h', value: 1 * 60 * 60 * 1000} ,
      { label: '2h', value: 2 * 60 * 60 * 1000 },
      { label: '3h', value: 3 * 60 * 60 * 1000 },
    ],
    columnFilterModeOptions:selectModes,
    filterVariant: 'select' ,header: 'Duration',Cell: ({ row }) => formatDuration(row.original.duration) },
    { accessorKey: 'description', header: 'Description', size: 30,},
    { 
      accessorKey: 'status', header: 'Status', size: 30, columnFilterModeOptions: checkboxModes,
      accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'),
      filterVariant: 'checkbox',
      Cell: ({ row }) => (
        <Switch
          checked={Boolean(row.original.status)}
          onChange={() => updateStatusHandler(row.original.id)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      ),
    },{accessorKey:'typeId',header:'Type',filterVariant:'multi-select',  filterSelectOptions: [ 
      { label: 'Live TV', value: 1},
      { label: 'Movies', value: 2},
      { label: 'TV Shows', value: 3 },
      { label: 'Sports', value: 2},],columnFilterModeOptions:multiSelectModes, size: 30,}
    ,{
      accessorKey: 'released',
      columnFilterModeOptions:numberDateTimeModes,
      header: 'Released', size: 30,filterVariant:"date",Cell: ({ row }) => new Date( row.original.released ).toLocaleDateString()},
    {
      id: 'actions', header: 'Actions', size: 50, enableColumnFilter:false,
      Cell: ({ row }) => (
        <div>
          <IconButton color="primary" onClick={() => handleUpdate(row.original)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(row.original)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ], [handleDelete, handleUpdate, updateStatusHandler]);
   console.log(globalFilter)
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
     enableColumnFilterModes: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnFilterFnsChange:setColumnFilterFns,
    onSortingChange: setSorting,
    rowCount: meta?.totalRowCount ?? 0,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
      columnFilterFns
    },
  });

  useEffect(() => {
    socket.on('onDataChange', refetch);
    refetch
    console.log(columnFilterFns,columnFilters)
    return () => {
      socket.off('onDataChange', refetch);
    };
  }, [refetch,columnFilterFns,columnFilters])

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = ({
  openModal,
  setId,
  setDeleteId,
  setTitle,
  setDuration,
  setDescription,
  setCategory,
  setType,
  setVideoUrl,
  setChannel,
  setReleased,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <QueryClientProvider client={queryClient}>
    <Example openModal={openModal} setId={setId} setReleased={setReleased} setDeleteId={setDeleteId} setTitle={setTitle} setDuration={setDuration} setDescription={setDescription} setCategory={setCategory} setType={setType} setVideoUrl={setVideoUrl} setChannel={setChannel} />
  </QueryClientProvider>
  </LocalizationProvider>
);

export default ExampleWithReactQueryProvider;