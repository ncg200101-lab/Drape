import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Tooltip,
  useTheme,
  Divider
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faDashboard,
  faEdit,
  faTrashCan,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

library.add(fab);

const SocialMedia = () => {
  const theme = useTheme();
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
      <Tooltip title="Deactive" arrow>
        <Button
          className="admin-table-btn deactive"
          onClick={() => {
            DFnewLogger('Table/deactive_action');
          }}
        >
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </Button>
      </Tooltip>
    </div>
  );

  const data = [
    {
      name: 'facebook',
      icon: <FontAwesomeIcon icon={['fab', 'facebook']} />,
      link: 'https://www.facebook.com/drapefitinc',
      action: action_btn
    },
    {
      name: 'instagram',
      icon: <FontAwesomeIcon icon={['fab', 'instagram']} />,
      link: 'https://www.instagram.com/drapefitinc',
      action: action_btn
    },
    {
      name: 'pinterest',
      icon: <FontAwesomeIcon icon={['fab', 'pinterest']} />,
      link: 'https://www.pinterest.com/drapefitinc',
      action: action_btn
    },
    {
      name: 'twitter',
      icon: <FontAwesomeIcon icon={['fab', 'twitter']} />,
      link: 'https://www.twitter.com/drapefitinc',
      action: action_btn
    }
  ];

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'icon',
      header: 'Icon'
    },
    {
      accessorKey: 'link',
      header: 'Link'
    },
    {
      accessorKey: 'action',
      header: 'Action'
    }
  ];
  const [tableData, setTableData] = useState(data);
  DFnewLogger(tableData);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Social Icon Listing</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            name: '',
            link: '',
            icon: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(30).required('Name is required'),
            link: Yup.string().min(10).max(50).required('Link is required'),
            icon: Yup.string().min(10).max(50).required('Icon is required')
          })}
          onSubmit={async (values) => {
            DFnewLogger(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">
                    All (*) fields are mandatory
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-name">
                      Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText id="helper-text" error>
                        {errors.name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.link && errors.link)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-link">
                      Link <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-link"
                      value={values.link}
                      name="link"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.link && errors.link && (
                      <FormHelperText id="helper-text" error>
                        {errors.link}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.icon && errors.icon)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-icon">
                      Icon <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-icon"
                      value={values.icon}
                      name="icon"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.icon && errors.icon && (
                      <FormHelperText id="helper-text" error>
                        {errors.icon}
                      </FormHelperText>
                    )}
                    <FormHelperText id="helper-text" disabled>
                      Example:{' '}
                      {"<FontAwesomeIcon icon={['fab', 'pinterest']} />"}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className="admin-submit-btn"
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      <Box className="table-border">
        <Table
          data={tableData}
          columns={columns}
          enableRowOrdering
          enableSorting={false}
          muiTableBodyRowDragHandleProps={({ table }) => ({
            onDragEnd: () => {
              const { draggingRow, hoveredRow } = table.getState();
              if (hoveredRow && draggingRow) {
                tableData.splice(
                  hoveredRow.index,
                  0,
                  tableData.splice(draggingRow.index, 1)[0]
                );
                setTableData([...tableData]);
              }
            }
          })}
        />
      </Box>
    </>
  );
};

export default SocialMedia;
