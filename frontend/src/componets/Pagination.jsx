/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const Paginate = ({ page, total }) => {
  const navigate = useNavigate();

  const handleChange = (event, value) => {
    navigate(`/admin/program/${value}`);
  };

  return (
    page > 0 && (
      <Pagination
        count={total}
        page={page}
        onChange={handleChange}
      />
    )
  );
};



export default Paginate;
