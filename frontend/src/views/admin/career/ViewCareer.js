import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEdit,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import 'yup-phone';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="Edit" arrow>
      <Button
        className="admin-table-btn edit"
        onClick={() => {
          DFnewLogger('Table/edit_action');
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </Tooltip>
    <Tooltip title="Delete" arrow>
      <Button
        className="admin-table-btn delete"
        onClick={() => {
          DFnewLogger('Table/delete_action');
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </Button>
    </Tooltip>
  </div>
);

const columns = [
  {
    accessorKey: 'school',
    header: 'School'
  },
  {
    accessorKey: 'degree',
    header: 'Degree'
  },
  {
    accessorKey: 'discipline',
    header: 'Discipline'
  },
  {
    accessorKey: 'aboutJob',
    header: 'About Job'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const ViewCareer = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        school: faker.address.streetName() + ' ' + 'College',
        degree: faker.helpers.arrayElement(['MCA', 'MSC(IT)', 'BCA']),
        discipline: faker.name.jobType(),
        aboutJob: 'Application Testing',
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Career Dynamic Listing</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default ViewCareer;
