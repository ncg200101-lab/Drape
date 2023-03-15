import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Divider,
  Grid,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  useTheme,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';

//-- component
import GenS3Link from 'utils/GenS3Link';
import DFnewLogger from 'utils/DFnewLogger';
import { FirstUpper } from 'utils/FirstUpper';
import ColorCircular from 'views/client/component/profile/ColorCircular';
import Profession from 'views/client/component/profile/Profession';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import ImageSelectorRadioGroup from 'views/client/component/profile/ImageSelectorRadioGroup';
import DFnewImgTag from 'utils/DFnewImgTag';

//-- action
import { mEditBasicInfo, mGetBasicInfo } from 'actions/profile';

const Basic_Info = GenS3Link(
  'landing/images/client/profile/men/basic-info/basic-info'
);
const Shape_1 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-1'
);
const Shape_2 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-2'
);
const Shape_3 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-3'
);
const Shape_4 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-4'
);
const Shape_5 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-5'
);
const Men_Size_Chart = GenS3Link(
  'landing/images/client/profile/men/men-size-chart'
);

const BasicInfo = () => {
  //-- hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let saveReturn = false;
  const { mBasicInfo } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('mGetBasicInfo________________________');
    dispatch(mGetBasicInfo());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  localStorage.setItem('fitFor', 1);
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'Please complete your basic information that will help us get started to have a best FIT for you',
    image: Basic_Info
  };
  const initVal = {
    heightFt: 0,
    heightIn: 0,
    weightLbs: '',
    birthday: new Date(),
    isParent: '',
    waistSizeNum: 0,
    waistSizeLabel: 0,
    shirtSizeNo: 0,
    shirtSizeLabel: 0,
    bottomSizeNo: 0,
    inseamSizeNum: 0,
    shoeSizeNum: 0,
    shoeSizeLabel: '',
    professionLabel: '',
    bodyShapeLabel: '',
    skinToneLabel: '',
    snsLinkedin: '',
    snsInstagram: '',
    snsTwitter: '',
    snsPinterest: ''
  };
  const year = new Date();
  const minBirthYear = year.getFullYear() - 18;
  const maxBirthYear = year.getFullYear() - 120;
  const iHeightFt = ['--', '4', '5', '6'];
  const iHeightIn = [
    '--',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11'
  ];
  const iWaistSizeNum = [
    '--',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '36',
    '38',
    '40',
    '42',
    '44',
    '46',
    '48'
  ];
  const iWaistSizeLabel = [
    '--',
    'Sometimes too small',
    'Just right',
    'Sometimes too big'
  ];
  const iShirtSizeNo = ['--', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const iShirtSizeLabel = [
    '--',
    'Sometimes too small',
    'Just right',
    'Sometimes too big'
  ];
  const iBottom = ['--', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const iInseam = ['--', '28', '30', '32', '34', '36'];
  const iShoeSizeNum = [
    '--',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
    '14',
    '15',
    '16'
  ];
  const iShoeSizeLabel = ['Narrow', 'Medium', 'Wide', 'Extra Wide'];
  const iBodyShapeLabel = [
    {
      title: 'Trapezoid',
      image: Shape_1
    },
    {
      title: 'Rectangle',
      image: Shape_2
    },
    {
      title: 'Triangle',
      image: Shape_3
    },
    {
      title: 'Oval',
      image: Shape_4
    },
    {
      title: 'Inverted Triangle',
      image: Shape_5
    }
  ];
  const iSocialProfile = [
    {
      title: 'LINKEDIN PROFILE',
      content: 'e.g. www.linkedin.com/in/username',
      value: 'linkedin'
    },
    {
      title: 'INSTAGRAM HANDLE',
      content: 'e.g. drapefit',
      value: 'instagram'
    },
    {
      title: 'TWITTER HANDLE',
      content: 'e.g. drapefit',
      value: 'twitter'
    },
    {
      title: 'PINTEREST HANDLE',
      content: 'e.g. drapefit',
      value: 'pinterest'
    }
  ];
  //-- for select component
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 220
      }
    }
  };

  return (
    <>
      <NavTabs />
      <Divider />
      <Grid className="profile" container>
        <Grid item xs={12} md={3}>
          <Left propsValue={left} />
        </Grid>
        <Divider
          orientation="horizontal"
          style={{ backgroundColor: '#eee', width: '1px' }}
        />
        <Grid item xs={12} md={8}>
          <Grid container>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link to="/welcome/basic-info/men" style={{ color: '#ff6c00' }}>
                Basic Information
              </Link>
            </Grid>
            <Grid
              className={`gray-border breadcrumb-tab ${
                user?.pStatus < 1 ? 'disabled' : ''
              }`}
              item
              xs={12}
              sm={3}
            >
              <Link to="/welcome/style-fit/men" style={{ color: '#232f3e' }}>
                Style Fit
              </Link>
            </Grid>
            <Grid
              className={`gray-border breadcrumb-tab ${
                user?.pStatus < 2 ? 'disabled' : ''
              }`}
              item
              xs={12}
              sm={3}
            >
              <Link to="/welcome/price-range/men" style={{ color: '#232f3e' }}>
                Price Range
              </Link>
            </Grid>
            <Grid
              className={`gray-border breadcrumb-tab ${
                user?.pStatus < 3 ? 'disabled' : ''
              }`}
              item
              xs={12}
              sm={3}
            >
              <Link to="/welcome/style-custom/men" style={{ color: '#232f3e' }}>
                Custom Design & Brands
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Formik
              initialValues={mBasicInfo === null ? initVal : mBasicInfo}
              enableReinitialize
              validationSchema={Yup.object().shape({
                heightFt: Yup.number()
                  .min(1, 'Please fill the height in feet')
                  .max(3)
                  .required('Please fill the height in feet'),
                weightLbs: Yup.number()
                  .min(10, 'Please enter a value greater than or equal to 10')
                  .max(999, 'Please enter a value less than or equal to 999')
                  .required('Sharing your weight helps us get the right fit'),
                birthday: Yup.date()
                  .min(
                    new Date(`01/01/${maxBirthYear}`),
                    'Please provide certain age'
                  )
                  .max(
                    new Date(`01/01/${minBirthYear}`),
                    'Please provide certain age'
                  )
                  .typeError('Please provide certain age')
                  .required('Please provide certain age'),
                waistSizeNum: Yup.number()
                  .min(1, 'Please select waist size num')
                  .required('Please select waist size num'),
                shirtSizeNo: Yup.number()
                  .min(1, 'Please select shirt size num')
                  .max(7)
                  .required('Please select shirt size num'),
                inseamSizeNum: Yup.number()
                  .min(1, 'Please select inseam size')
                  .required('Please select inseam size')
              })}
              onSubmit={async (values) => {
                DFnewLogger('Men Basic Info/submit:', values);
                if (saveReturn) {
                  dispatch(mEditBasicInfo(values));
                  saveReturn = false;
                } else {
                  dispatch(mEditBasicInfo(values, navigate));
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Grid container columnSpacing={4} padding="20px">
                    <Grid item xs={12}>
                      <Typography className="basic-info-bold-title">
                        Welcome {FirstUpper(user?.firstName)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            What is your height?{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <FormControl
                                fullWidth
                                error={Boolean(
                                  touched.heightFt && errors.heightFt
                                )}
                              >
                                <InputLabel>
                                  ft. <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <Select
                                  size="small"
                                  label="ft. *"
                                  // autoFocus={Boolean(
                                  //   touched.heightFt && errors.heightFt
                                  // )}
                                  ref={(errFocus) => {
                                    Boolean(
                                      touched.heightFt && errors.heightFt
                                    ) &&
                                      errFocus &&
                                      errFocus.focus();
                                  }}
                                  value={values.heightFt}
                                  name="heightFt"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iHeightFt.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
                                <InputLabel>in.</InputLabel>
                                <Select
                                  size="small"
                                  label="in."
                                  value={values.heightIn}
                                  name="heightIn"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iHeightIn.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          {touched.heightFt && errors.heightFt && (
                            <FormHelperText id="helper-text" error>
                              {errors.heightFt}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            What is your weight?{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            fullWidth
                            error={Boolean(
                              touched.weightLbs && errors.weightLbs
                            )}
                          >
                            <InputLabel>
                              lbs. <span style={{ color: 'red' }}>*</span>
                            </InputLabel>
                            <OutlinedInput
                              size="small"
                              label="lbs. *"
                              autoFocus={Boolean(
                                touched.weightLbs && errors.weightLbs
                              )}
                              value={values.weightLbs}
                              type="number"
                              name="weightLbs"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            {touched.weightLbs && errors.weightLbs && (
                              <FormHelperText id="helper-text" error>
                                {errors.weightLbs}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your birthday?{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            error={Boolean(touched.birthday && errors.birthday)}
                            fullWidth
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                className="small-date-picker"
                                autoFocus={Boolean(
                                  touched.birthday && errors.birthday
                                )}
                                name="birthday"
                                value={values.birthday}
                                onChange={(value) => {
                                  const date = new Date(Date.parse(value));
                                  setFieldValue('birthday', date);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                            {touched.birthday && errors.birthday && (
                              <FormHelperText id="helper-text" error>
                                {errors.birthday}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Are you a parent?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <RadioButtonGroup
                            group={['Yes', 'No']}
                            name="isParent"
                            value={values.isParent}
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Typography className="basic-info-title">
                        What size do you prefer?
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} className="v-center-h-right">
                      <Link
                        className="df-size-chart"
                        onClick={() => showModal()}
                      >
                        Drape Fit Size Chart
                      </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-sub-title">
                            Waist size? <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <FormControl
                                error={Boolean(
                                  touched.waistSizeNum && errors.waistSizeNum
                                )}
                                fullWidth
                              >
                                <Select
                                  size="small"
                                  autoFocus={Boolean(
                                    touched.waistSizeNum && errors.waistSizeNum
                                  )}
                                  name="waistSizeNum"
                                  value={values.waistSizeNum}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iWaistSizeNum.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="waistSizeLabel"
                                  value={values.waistSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iWaistSizeLabel.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          {touched.waistSizeNum && errors.waistSizeNum && (
                            <FormHelperText id="helper-text" error>
                              {errors.waistSizeNum}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-sub-title">
                            Shirt size? <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <FormControl
                                error={Boolean(
                                  touched.shirtSizeNo && errors.shirtSizeNo
                                )}
                                fullWidth
                              >
                                <Select
                                  size="small"
                                  autoFocus={Boolean(
                                    touched.shirtSizeNo && errors.shirtSizeNo
                                  )}
                                  name="shirtSizeNo"
                                  value={values.shirtSizeNo}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iShirtSizeNo.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="shirtSizeLabel"
                                  value={values.shirtSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iShirtSizeLabel.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          {touched.shirtSizeNo && errors.shirtSizeNo && (
                            <FormHelperText id="helper-text" error>
                              {errors.shirtSizeNo}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className="basic-info-sub-title">
                                Bottom size?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="bottomSizeNo"
                                  value={values.bottomSizeNo}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iBottom.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className="basic-info-sub-title">
                                Inseam size?{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                error={Boolean(
                                  touched.inseamSizeNum && errors.inseamSizeNum
                                )}
                                fullWidth
                              >
                                <Select
                                  size="small"
                                  autoFocus={Boolean(
                                    touched.inseamSizeNum &&
                                      errors.inseamSizeNum
                                  )}
                                  name="inseamSizeNum"
                                  value={values.inseamSizeNum}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iInseam.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {touched.inseamSizeNum &&
                                  errors.inseamSizeNum && (
                                    <FormHelperText id="helper-text" error>
                                      {errors.inseamSizeNum}
                                    </FormHelperText>
                                  )}
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-sub-title">
                            Shoe size?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="shoeSizeNum"
                                  value={values.shoeSizeNum}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iShoeSizeNum.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="shoeSizeLabel"
                                  value={values.shoeSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iShoeSizeLabel.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        What is your profession?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Profession
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        value={values.professionLabel}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        Tell us your body shape?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorRadioGroup
                        content={iBodyShapeLabel}
                        value={values.bodyShapeLabel}
                        setFieldValue={setFieldValue}
                        name="bodyShapeLabel"
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        Tell us your skin tone?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ColorCircular
                        touched={touched}
                        errors={errors}
                        value={values.skinToneLabel}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        You social media profiles will help your personal
                        Stylist to know you better.
                      </Typography>
                    </Grid>
                    {iSocialProfile.map((item, index) => (
                      <Grid key={index} item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-sub-title">
                              {item.title}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>{item.content}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <OutlinedInput
                                size="small"
                                type="text"
                                name={`sns${FirstUpper(item.value)}`}
                                value={values[`sns${FirstUpper(item.value)}`]}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid className="h-align-center" item xs={12}>
                      <Button
                        type="submit"
                        disableElevation
                        disabled={isSubmitting}
                        className="profile-gradient-btn"
                      >
                        NEXT: STYLE FIT&nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faLongArrowRight} />
                      </Button>
                    </Grid>
                    <Grid className="h-align-center" item xs={12}>
                      <Typography
                        className="save-return"
                        onClick={() => {
                          saveReturn = true;
                          handleSubmit();
                        }}
                      >
                        SAVE AND RETURN &rsaquo;&rsaquo;
                      </Typography>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        title="Drape Fit Size Chart"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="700px"
      >
        <DFnewImgTag
          src={`${Men_Size_Chart}.webp`}
          fallback={`${Men_Size_Chart}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '204px' }}
          alt="Men Size Chart"
        />
      </Modal>
    </>
  );
};

export default BasicInfo;
