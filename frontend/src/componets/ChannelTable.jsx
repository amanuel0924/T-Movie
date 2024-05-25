/* eslint-disable react/prop-types */
import { useMemo, useCallback,  } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import useCRUD from '../services/channelServiec';
import { toast } from 'react-toastify';
import { baseURL } from '../socket';


const ChannelTable = ({
  data = [], 
  openModal,
  setName,
  setId,
  setDeleteId,
}) => {
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
      toast.success("chanel updated succesfully")
     } catch (error) {
       toast.error(error?.data?.message || error.message)
     }
   },
   [toglerStatus]); 
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#id',
        size: 30,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 30,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 30,
        Cell: ({ row }) => (
          <Switch
            checked={Boolean(row.original.status)}
            onChange={() => updateStatusHandler(row.original.id)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 30,
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
    manualPagination: false,
    paginationDisplayMode: 'default',
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
      disabled: true,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default ChannelTable;
