import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
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
  useTheme
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEdit,
  faTrashCan,
  faArrowUpFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Upload } from 'antd';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Executive = GenS3Link('landing/images/client/post/executive');
const Vote = GenS3Link('landing/images/client/post/vote');
const Kids = GenS3Link('landing/images/client/post/kids');
const Holiday = GenS3Link('landing/images/client/post/holiday');
const Men = GenS3Link('landing/images/client/post/men');
const Spring = GenS3Link('landing/images/client/post/spring');
const PlusSize = GenS3Link('landing/images/client/post/plus-size');
const Coming = GenS3Link('landing/images/client/post/coming');

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
    accessorKey: 'newsName',
    header: 'News Name'
  },
  {
    accessorKey: 'postBy',
    header: 'Post By'
  },
  {
    accessorKey: 'newsImage',
    header: 'News Image'
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

const News = () => {
  const theme = useTheme();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 7; i++) {
      info.push({
        newsName: faker.lorem.sentence(),
        postBy: faker.helpers.arrayElement([
          'Nytimes.com',
          'drapefit.com',
          'Fox59.com'
        ]),
        newsImage: faker.helpers.arrayElement([
          <DFnewImgTag
            src={`${Executive}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />,
          <DFnewImgTag
            src={`${Vote}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />,
          <DFnewImgTag
            src={`${Kids}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />,
          <DFnewImgTag
            src={`${Holiday}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />,
          <DFnewImgTag
            src={`${Men}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />,
          <DFnewImgTag
            src={`${Spring}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />,
          <DFnewImgTag
            src={`${PlusSize}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />,
          <DFnewImgTag
            src={`${Coming}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />
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
        comment: faker.lorem.sentences(2),
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  let minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">News</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            newsName: '',
            newsLink: '',
            postBy: '',
            blogImage: ''
          }}
          validationSchema={Yup.object().shape({
            newsName: Yup.string()
              .min(10)
              .max(20)
              .required('PromoCode is required'),
            postBy: Yup.string().min(5).max(30).required('Post By is required'),
            newsLink: Yup.string()
              .min(5)
              .max(30)
              .required('News Link is required')
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
                    error={Boolean(touched.newsName && errors.newsName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-name">
                      News Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-name"
                      value={values.newsName}
                      name="newsName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.newsName && errors.newsName && (
                      <FormHelperText id="helper-text" error>
                        {errors.newsName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.newsLink && errors.newsLink)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-name">
                      News Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-name"
                      value={values.newsLink}
                      name="newsLink"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.newsLink && errors.newsLink && (
                      <FormHelperText id="helper-text" error>
                        {errors.newsLink}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.postBy && errors.postBy)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-name">
                      News Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-name"
                      value={values.postBy}
                      name="postBy"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.postBy && errors.postBy && (
                      <FormHelperText id="helper-text" error>
                        {errors.postBy}
                      </FormHelperText>
                    )}
                  </FormControl>
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
                <Grid item xs={12}>
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

export default News;
