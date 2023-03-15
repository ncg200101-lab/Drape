import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  faGaugeHigh,
  faEdit,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Select,
  MenuItem,
  TextareaAutosize,
  useTheme
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';
import { faker } from '@faker-js/faker';

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
    accessorKey: 'authorName',
    header: 'Author Name'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'createdDate',
    header: 'Created Date'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const Blog = () => {
  const theme = useTheme();
  const categoryType = ['Men', 'Women', 'Kids', 'General Information'];
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 220
      }
    }
  };
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        authorName: faker.name.fullName(),
        title: faker.lorem.sentence(),
        category: faker.helpers.arrayElement([
          'General Information',
          'Kids',
          'Men',
          'Women'
        ]),
        createdDate:
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          ' ' +
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Add Blog</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            avatar: '',
            authorName: '',
            authorDescription: '',
            category: '',
            blogTitle: '',
            blogImage: '',
            blogDescription: ''
          }}
          validationSchema={Yup.object().shape({
            authorName: Yup.string()
              .min(3)
              .max(30)
              .required('Author Name is required'),
            blogTitle: Yup.string()
              .min(3)
              .max(255)
              .required('Blog Title is required'),
            category: Yup.number()
              .min(0)
              .max(3)
              .required('Please select catetory'),
            blogDescription: Yup.string()
              .min(20)
              .max(255)
              .required('Blog Description is required')
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
                <Grid item xs={12} sm={6} className="v-align-center">
                  <Upload
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={handleChange}
                  >
                    <Button
                      className="upload-btn"
                      variant="outlined"
                      startIcon={
                        <FontAwesomeIcon
                          icon={faArrowUpFromBracket}
                          style={{ fontSize: '15px' }}
                        />
                      }
                    >
                      Avatar Upload <span style={{ color: 'red' }}>*</span>
                    </Button>
                  </Upload>
                </Grid>
                <Grid item xs={12} sm={6} className="v-align-center">
                  <Upload
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={handleChange}
                  >
                    <Button
                      className="upload-btn"
                      variant="outlined"
                      startIcon={
                        <FontAwesomeIcon
                          icon={faArrowUpFromBracket}
                          style={{ fontSize: '15px' }}
                        />
                      }
                    >
                      Blog Image Upload <span style={{ color: 'red' }}>*</span>
                    </Button>
                  </Upload>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.authorName && errors.authorName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-authorName">
                      Author Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-authorName"
                      value={values.authorName}
                      name="authorName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.authorName && errors.authorName && (
                      <FormHelperText id="helper-text" error>
                        {errors.authorName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.blogTitle && errors.blogTitle)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-blogTitle">
                      Blog Title <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-blogTitle"
                      value={values.blogTitle}
                      name="blogTitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.blogTitle && errors.blogTitle && (
                      <FormHelperText id="helper-text" error>
                        {errors.blogTitle}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    sx={{ ...theme.typography.customInput }}
                  >
                    <TextareaAutosize
                      placeholder="Author Description"
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
                      value={values.authorDescription}
                      name="authorDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.category && errors.category)}
                    sx={{
                      ...theme.typography.customSelect
                    }}
                  >
                    <InputLabel>
                      Category <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      value={values.category}
                      name="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      MenuProps={selectProps}
                    >
                      {categoryType.map((item, index) => (
                        <MenuItem key={index} value={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.category && errors.category && (
                      <FormHelperText
                        id="standard-weight-helper-text--signup"
                        error
                      >
                        {errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    sx={{ ...theme.typography.customInput }}
                  >
                    <TextareaAutosize
                      placeholder="Blog Description"
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
                      value={values.blogDescription}
                      name="blogDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    className="admin-submit-btn"
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default Blog;
