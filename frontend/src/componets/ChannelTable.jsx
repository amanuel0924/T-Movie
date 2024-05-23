/* eslint-disable react/prop-types */
import { useMemo ,useCallback} from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




const ChannelTable = ({data,openModal,setName,setId,setDeleteId}) => {

    const handleDelete = useCallback((row) => {
        openModal();
        setDeleteId(row.id )
      }, [openModal,setDeleteId ]);
     
  const handlenUpdate = useCallback((row) => {
    openModal();
    setName(row.name);
    setId(row.id);
  }, [openModal, setName, setId]);
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
        id: 'actions',
        header: 'Actions',
        size: 30,
        Cell: ({ row }) => (
          <div>
            <IconButton
              color="primary"
              onClick={() => handlenUpdate(row.original)}
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
    [handleDelete, handlenUpdate ]
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
        disabled:true
      }
    
  });

  return <MaterialReactTable  table={table} />;
};



export default ChannelTable;
