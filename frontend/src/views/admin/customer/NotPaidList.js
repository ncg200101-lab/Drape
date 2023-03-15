import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import {
  Button,
  Box,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextareaAutosize,
  Tooltip,
  Grid,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEnvelope,
  faEye,
  faTrashCan,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';
import { process } from '@progress/kendo-data-query';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';

import DFnewLogger from 'utils/DFnewLogger';
import GenFileName from 'utils/GenFileName';
import Table from 'ui-component/Table';

const NotPaidList = () => {
  const [tableData, setTableData] = useState([]);
  const [excelName, setExcelName] = useState('');
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        fullName: faker.name.fullName(),
        email: faker.internet.email(),
        account: faker.helpers.arrayElement([
          'Stylist',
          'Inventory',
          'QA',
          'Support Guy'
        ]),
        created:
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          ' ' +
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
        kidsName: faker.name.fullName(),
        gender: faker.helpers.arrayElement(['Women', 'Men', 'Kids'])
      });
    }
    setTableData(info);
  }, []);
  let updateData = [];
  let rowNum = 0;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      const action_btn = (
        <div
          key={index}
          style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
        >
          <Tooltip title="Review" arrow>
            <Link to="/dfadmin/customer/women-view">
              <Button
                className="admin-table-btn password"
                onClick={() => {
                  DFnewLogger('Table/review_action');
                }}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Email" arrow>
            <Button
              className="admin-table-btn edit"
              onClick={() => {
                handleEditDialog();
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} />
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
      rowNum++;
      return {
        ...item,
        no: rowNum,
        action: action_btn
      };
    });
  }
  const columns = [
    {
      accessorKey: 'no',
      header: '#',
      enableColumnFilter: false,
      enableSorting: false
    },
    {
      accessorKey: 'fullName',
      header: 'Full Name'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'account',
      header: 'Assign Customer Stylist'
    },
    {
      accessorKey: 'created',
      header: 'Created Date'
    },
    {
      accessorKey: 'kidsName',
      header: 'Kids Name'
    },
    {
      accessorKey: 'gender',
      header: 'Gender'
    },
    {
      accessorKey: 'action',
      header: 'Action',
      enableColumnFilter: false,
      enableSorting: false
    }
  ];
  const _exportExcel = useRef(null);
  const exportEXCEL = () => {
    if (_exportExcel.current) {
      setExcelName(GenFileName('not_paid_customer_list'));
      _exportExcel.current.save();
    }
  };
  let data = [];
  if (tableData !== []) {
    data = process(tableData, { skip: 10 }).data;
  }
  const exportPDF = () => {
    try {
      const unit = 'pt';
      const size = 'A4'; // Use A1, A2, A3 or A4
      const orientation = 'portrait'; // portrait or landscape
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
      doc.setFontSize(15);
      const title = 'Not Paid Customer List';
      const headers = [
        [
          'Full Name',
          'Email',
          'Assign Customer Stylist',
          'Created Date',
          'Kids Name',
          'Gender'
        ]
      ];
      const data = tableData.map((item) => [
        item.fullName,
        item.email,
        item.account,
        item.created,
        item.kidsName,
        item.gender
      ]);
      const content = {
        startY: 50,
        head: headers,
        body: data
      };
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save(GenFileName('not_paid_customer_list'));
    } catch (error) {
      DFnewLogger(error);
    }
  };
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">Not Paid List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">
            Customer List Who Not Paid
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Grid container>
          <Grid item xs={12}>
            <Button className="account-no-btn" onClick={exportEXCEL}>
              EXCEL&nbsp;&nbsp;
              <FontAwesomeIcon icon={faDownload} />
            </Button>
            <Button className="account-yes-btn" onClick={exportPDF}>
              PDF&nbsp;&nbsp;
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={updateData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
      <ExcelExport fileName={excelName} data={data} ref={_exportExcel}>
        <ExcelExportColumn field="fullName" title="Full Name" />
        <ExcelExportColumn field="email" title="Email" />
        <ExcelExportColumn field="account" title="Assign Customer Stylist" />
        <ExcelExportColumn field="created" title="Created Date" />
        <ExcelExportColumn field="kidsName" title="Kids Name" />
        <ExcelExportColumn field="gender" title="Gender" />
      </ExcelExport>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">
            Are you sure to activate?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={{
              title: '',
              content: ''
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().min(6).max(30).required('Title is required'),
              content: Yup.string()
                .min(30)
                .max(3000)
                .required('Content is required')
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
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.title && errors.title)}
                    >
                      <InputLabel>
                        Title <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Title *"
                        id="outlined-title"
                        value={values.title}
                        name="title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.title && errors.title && (
                        <FormHelperText id="helper-text" error>
                          {errors.title}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.content && errors.content)}
                    >
                      <TextareaAutosize
                        placeholder="Please input the content *"
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          height: '100px',
                          minHeight: '80px',
                          padding: '1em',
                          borderColor: '#ccc',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                        value={values.content}
                        name="content"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.content && errors.content && (
                        <FormHelperText id="helper-text" error>
                          {errors.content}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button
                      className="account-no-btn"
                      onClick={handleEditDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="account-yes-btn"
                      onClick={() => {
                        handleEditDialog();
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotPaidList;
