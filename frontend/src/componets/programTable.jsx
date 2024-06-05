// /* eslint-disable react/prop-types */
// import { useMemo, useCallback } from 'react';
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from 'material-react-table';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Switch from '@mui/material/Switch';
// import useCRUD from '../services/channelServiec';
// import { toast } from 'react-toastify';
// import { baseURL } from '../socket';
// const ProgramTable = ({
//   data = [], 
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
//   const {toglerStatus }=useCRUD(`${baseURL}/api/movie`)

//   const handleDelete = useCallback(
//     (row) => {
//       openModal();
//       setDeleteId(row.id);
//     },
//     [openModal, setDeleteId]
//   );

//   const handleUpdate = useCallback(
//     (row) => {
//       openModal();
//       setId(row.id);
//       setTitle(row.title);
//       setDuration(Number(row.duration) );
//       setDescription(row.description);
//       setCategory(Number(row.categoryId));
//       setType(Number(row.typeId));
//       setVideoUrl(row.videoUrl);
//       setChannel(Number(row.channelId));
//     },
//     [openModal, setId, setTitle, setDuration, setDescription, setCategory, setType, setVideoUrl, setChannel]
//   );
//   const updateStatusHandler = useCallback(
//      async(id, ) => {
//      try {
//        await toglerStatus(id,'datachange')
//        toast.success("movie updated succesfully")
//       } catch (error) {
//         toast.error(error?.data?.message || error.message)
//       }
//     },
//     [toglerStatus]); 

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'id',
//         header: '#id',
//         size: 30,
//       },
//       {
//         accessorKey: 'title',
//         header: 'Title',
//         size: 30,
//       },
      
//       {
//         accessorKey: 'duration',
//         header: 'Duration',
//         size: 30,
//       },
//       {
//         accessorKey: 'description',
//         header: 'Description',
//         size: 30,
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         size: 30,
//         Cell: ({ row }) => (
//           <Switch
//             checked={Boolean(row.original.status)}
//             onChange={() => updateStatusHandler(row.original.id)}
//             inputProps={{ 'aria-label': 'controlled' }}
//           />
//         ),
//       },
//       {
//         id: 'actions',
//         header: 'Actions',
//         size: 30,
//         Cell: ({ row }) => (
//           <div>
//             <IconButton
//               color="primary"
//               onClick={() => handleUpdate(row.original)}
//               aria-label="edit"
//             >
//               <EditIcon />
//             </IconButton>
//             <IconButton
//               color="secondary"
//               onClick={() => handleDelete(row.original)}
//               aria-label="delete"
//             >
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         ),
//       },
//     ],
//     [handleDelete, handleUpdate, updateStatusHandler]
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     manualPagination: false,
//     paginationDisplayMode: 'default',
//     muiPaginationProps: {
//       color: 'secondary',
//       rowsPerPageOptions: [10, 20, 30],
//       shape: 'rounded',
//       variant: 'outlined',
//       disabled: true,
//     },
//   });

//   return <MaterialReactTable table={table} />;
// };

// export default ProgramTable;
