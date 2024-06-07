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
import { formatDuration } from '../utils/utils';

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
}) => {
  //manage our own state for stuff we want to pass to the API
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [columnFilterFns,setColumnFilterFns]=useState({id:'equals'
    ,title:'fuzzy',
    description:'fuzzy',
    duration:'fuzzy',
    status:'equals',
  })
  const clomunVariants={
    id:'number',
    title:'text',
    description:'text',
    duration:'number',
    status:'checkbox'
  }
  const characterOperators = [
    "equals",
    "startsWith",
    "endsWith",
    "contains",
    "notEquals",
    "fuzzy",
  ]
  
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
  }, [openModal, setId, setTitle, setDuration, setDescription, setCategory, setType, setVideoUrl, setChannel]);

  const updateStatusHandler = useCallback(async (id) => {
    try {
      await toglerStatus(id, 'datachange');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }, [toglerStatus]);
  //consider storing this code in a custom hook (i.e useFetchUsers)
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
      let mergedArr = columnFilters.map(item => {
        if (item.id in columnFilterFns) {
          return { ...item, mode: columnFilterFns[item.id] };
        }
        return item;
      });

       //now we  merege the merged array with the columnvariants
      mergedArr = mergedArr.map(item => {
        if (item.id in clomunVariants) {
          return { ...item, variant: clomunVariants[item.id] };
        }
        return item;
      }
      );
      fetchURL.searchParams.set(
        'start',
        `${pagination.pageIndex * pagination.pageSize}`,
      );
      fetchURL.searchParams.set('size', `${pagination.pageSize}`);
      fetchURL.searchParams.set('filters', JSON.stringify(mergedArr ?? []));
      fetchURL.searchParams.set('globalFilter', globalFilter ?? '');
      fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

      //use whatever fetch library you want, fetch, axios, etc
      const response = await fetch(fetchURL.href);
      const json = await response.json();
      return json;
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });

  const numberAndDateOperators = [
    "equals",
    "lessThan",
    "greaterThan",
    "lessThanOrEqualTo",
    "greaterThanOrEqualTo",
    "between",
    "notEquals",
    "betweenInclusive",
  ]

  const columns = useMemo(() => [
    { accessorKey: 'id', header: '#id',filterVariant:'number' ,filterFn:'equal',size: 15, columnFilterModeOptions:numberAndDateOperators  },
    { accessorKey: 'title', header: 'Title', size: 30 ,columnFilterModeOptions: characterOperators },
    { accessorKey: 'duration',size:15,filterSelectOptions: [
     
      { label: '1h', value: 1 * 60 * 60 * 1000} ,
      { label: '2h', value: 2 * 60 * 60 * 1000 },
      { label: '3h', value: 3 * 60 * 60 * 1000 },
    ],
    filterVariant: 'select' ,header: 'Duration', columnFilterModeOptions: [ 'fuzzy','lessThan', 'greaterThan'] ,Cell: ({ row }) => formatDuration(row.original.duration) },
    { accessorKey: 'description', header: 'Description', size: 30, columnFilterModeOptions:characterOperators },
    {
      accessorKey: 'status', header: 'Status', size: 30, columnFilterModeOptions: ['equals'] ,
      accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'),
      filterVariant: 'checkbox',
      Cell: ({ row }) => (
        <Switch
          checked={Boolean(row.original.status)}
          onChange={() => updateStatusHandler(row.original.id)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      ),
    },
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
}) => (
  <QueryClientProvider client={queryClient}>
    <Example openModal={openModal} setId={setId} setDeleteId={setDeleteId} setTitle={setTitle} setDuration={setDuration} setDescription={setDescription} setCategory={setCategory} setType={setType} setVideoUrl={setVideoUrl} setChannel={setChannel} />
  </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;