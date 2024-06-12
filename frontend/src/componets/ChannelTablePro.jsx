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
import { mergeFilterDatatype, mergeFilterfn } from '../utils/utils';
import {checkboxModes,ranges } from '../utils/utils';


const Example = ({
    openModal,
    setName,
    setId,
    setDeleteId,
  }) => {
  //manage our own state for stuff we want to pass to the API
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [columnFilterFns,setColumnFilterFns]=useState({
    id:'betweenInclusive',
    name:'fuzzy',
    status:'equals',
  })
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const customVariantsTypes = {
    id: 'number',
    name: 'text',
    status: 'checkbox',
  };
  const customeGlobalFilter=JSON.stringify({columuns:['name'],value:globalFilter})

  const {toglerStatus}=useCRUD(`${baseURL}/api/channel`)
  const handleDelete = useCallback(
    (row) => {
      openModal();
      setDeleteId(row.id);
    },
    [openModal, setDeleteId]
  );

  const handleUpdate = useCallback(
    (row) => {
      openModal();
      setName(row.name);
      setId(row.id);
    },
    [openModal, setName, setId]
  );

  const updateStatusHandler = useCallback(
    async(id, ) => {
    try {
      await toglerStatus(id,'datachange')
     } catch (error) {
       toast.error(error?.data?.message || error.message)
     }
   },
   [toglerStatus]); 
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
        '/api/channel/admin',
           `${baseURL}` //use your own API URL,
      );
          //merege the merged array with thecolumnFilterFns 
          let mergedArr = mergeFilterfn(columnFilters,columnFilterFns)
             mergedArr = mergeFilterDatatype (mergedArr,customVariantsTypes)

      fetchURL.searchParams.set(
        'start',
        `${pagination.pageIndex * pagination.pageSize}`,
      );
      fetchURL.searchParams.set('size', `${pagination.pageSize}`);
      fetchURL.searchParams.set('filters', JSON.stringify(mergedArr ?? []));
      fetchURL.searchParams.set('globalFilter', customeGlobalFilter ?? '');
      fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

      //use whatever fetch library you want, fetch, axios, etc
      const response = await fetch(fetchURL.href);
      const json = await response.json();
      return json;
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });

const columns = useMemo(
    () => [
        {
          accessorKey: 'id', header: 'id' ,size: 15, filterVariant: 'range-slider', columnFilterModeOptions:ranges
          ,muiFilterSliderProps: {
            marks: true,
            max: 7, //custom max (as opposed to faceted max)
            min: 1, //custom min (as opposed to faceted min)
            step: 1,
            valueLabelFormat: (value) =>
              value.toLocaleString(),
          }
        },
        { accessorKey: 'name', header: 'Name', size: 30 ,filterVariant:'autocomplete'},
        {
                accessorKey: 'status', header: 'Status', size: 30, columnFilterModeOptions:checkboxModes ,
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
            <IconButton
              color="primary"
              onClick={() => handleUpdate(row.original)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(row.original)}
              aria-label="delete"
            >
            <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    [handleDelete, handleUpdate, updateStatusHandler]
  );


  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    enableColumnFilterModes: true,
    enableFacetedValues: true,
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
    return () => {
      socket.off('onDataChange', refetch);
    };
  }, [refetch,columnFilterFns,columnFilters])

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const ChannelProTable = ({
  openModal,
  setName,
  setId,
  setDeleteId,
}) => (
  <QueryClientProvider client={queryClient}>
    <Example openModal={openModal} setName={setName} setId={setId} setDeleteId={setDeleteId} />
  </QueryClientProvider>
);

export default ChannelProTable;