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
  useTheme
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    accessorKey: 'tagName',
    header: 'Tag Name'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const BlogTag = () => {
  const theme = useTheme();
  const selectBlogType = [
    "Drape Fit's 8 Best Fall Outfit Ideas",
    'How To Dress Your Bump - Maternity Style Evolution',
    'Wedding Anniversary Gifts - Shop Around',
    'Kids Summer Style',
    'Fashionable And Smart Winter Wear Collection For Kids',
    'How Can You Use Custom Box Packaging',
    "Men's Summer Fashion Shirts By Sylvie",
    'The Perfect Gift For That Perfect Man',
    'Wardrobe Essentials For That Perfect Man',
    'Holiday Sytle For Men'
  ];
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
    for (let i = 0; i < 1; i++) {
      info.push({
        tagName: 'Design, Development',
        category: '',
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Add Blog Tag</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            tagName: '',
            selectBlog: ''
          }}
          validationSchema={Yup.object().shape({
            tagName: Yup.string()
              .min(3)
              .max(30)
              .required('Author Name is required'),
            blogTitle: Yup.string()
              .min(3)
              .max(255)
              .required('Blog Title is required'),
            selectBlog: Yup.number()
              .min(0)
              .max(3)
              .required('Please select account type'),
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
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.tagName && errors.tagName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-tagName">
                      Author Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-tagName"
                      value={values.tagName}
                      name="tagName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.tagName && errors.tagName && (
                      <FormHelperText id="helper-text" error>
                        {errors.tagName}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Typography>
                    <span style={{ color: '#ff0000' }}>Note: </span>For multiple
                    name please use comma(,)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.selectBlog && errors.selectBlog)}
                    sx={{
                      ...theme.typography.customSelect
                    }}
                  >
                    <InputLabel>
                      Select Blog <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      value={values.selectBlog}
                      name="selectBlog"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      MenuProps={selectProps}
                    >
                      {selectBlogType.map((item, index) => (
                        <MenuItem key={index} value={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.selectBlog && errors.selectBlog && (
                      <FormHelperText
                        id="standard-weight-helper-text--signup"
                        error
                      >
                        {errors.selectBlog}
                      </FormHelperText>
                    )}
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

export default BlogTag;
