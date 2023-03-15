import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
  TextField,
  useTheme
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
import ImageSelectorRadioGroup from 'views/client/component/profile/ImageSelectorRadioGroup';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import Profession from 'views/client/component/profile/Profession';
import ColorCircular from 'views/client/component/profile/ColorCircular';
import DFnewLogger from 'utils/DFnewLogger';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import CustomCheckboxBtn from '../../component/profile/CustomCheckboxBtn';
import CustomCheckboxLarge from '../../component/profile/CustomCheckboxLarge';
import { FirstUpper } from 'utils/FirstUpper';
import DFnewImgTag from 'utils/DFnewImgTag';

//-- action
import { wEditBasicInfo, wGetBasicInfo } from 'actions/profile';

const Basic_Info = GenS3Link(
  'landing/images/client/profile/women/basic-info/basic-info'
);
const Shape_1 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-1'
);
const Shape_2 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-2'
);
const Shape_3 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-3'
);
const Shape_4 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-4'
);
const Shape_5 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-5'
);
const Belly_1 = GenS3Link(
  'landing/images/client/profile/women/basic-info/leady-belly1'
);
const Belly_2 = GenS3Link(
  'landing/images/client/profile/women/basic-info/leady-belly2'
);
const Belly_3 = GenS3Link(
  'landing/images/client/profile/women/basic-info/leady-belly3'
);
const Belly_4 = GenS3Link(
  'landing/images/client/profile/women/basic-info/leady-belly4'
);
const Women_Size_Chart = GenS3Link(
  'landing/images/client/profile/women/women-size-chart'
);

const BasicInfo = () => {
  //-- hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let saveReturn = false;
  const { wBasicInfo } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('wGetBasicInfo_____________________');
    dispatch(wGetBasicInfo());
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
  localStorage.setItem('fitFor', 0);
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
    bodyType: '',
    braSizeNum: 0,
    braSizeLabel: 0,
    shirtBlouseSizeNo: 0,
    shirtBlouseSizeLabel: 0,
    jacketSize: 0,
    dressSizeNo: 0,
    dressSizeLabel: 0,
    skirtSize: 0,
    pantsSize: 0,
    jeansSize: 0,
    bottomSize: 0,
    shoeSizeNum: 0,
    shoesStyleLabel: [],
    heelHeightLabel: [],
    professionLabel: '',
    skinToneLabel: '',
    bodyShowingOff: [],
    bodyKeepCovered: [],
    sizeShoulders: 0,
    sizeArms: 0,
    sizeHips: 0,
    sizeLegs: 0,
    isPregnant: '',
    dueDate: new Date(),
    maternityFit: 0,
    looseFitted: 0,
    maternityPants: '',
    snsLinkedin: '',
    snsInstagram: '',
    snsTwitter: '',
    snsPinterest: ''
  };
  const addDays = (date, days) => {
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    return date;
  };
  const year = new Date();
  const minBirthYear = year.getFullYear() - 18;
  const maxBirthYear = year.getFullYear() - 120;
  const minDueDate = addDays(new Date(), -1);
  const maxDueDate = addDays(new Date(), 280);
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
  const iBodyShapeLabel = [
    {
      title: 'Inverted Triangle',
      image: Shape_1
    },
    {
      title: 'Triangle',
      image: Shape_2
    },
    {
      title: 'Rectangle',
      image: Shape_3
    },
    {
      title: 'Hourglass',
      image: Shape_4
    },
    {
      title: 'Apple',
      image: Shape_5
    }
  ];
  const iBraSizeNum = [
    '--',
    '30',
    '32',
    '34',
    '36',
    '38',
    '40',
    '42',
    '44',
    '46'
  ];
  const iBraSizeLabel = [
    '--',
    'AA',
    'A',
    'B',
    'C',
    'D',
    'DD',
    'DDD',
    'F',
    'G',
    'H'
  ];
  const iShirtBlouseSizeNo = [
    {
      type: 0,
      value: '--'
    },
    {
      type: 1,
      value: "Women's Sizes"
    },
    {
      type: 0,
      value: '2'
    },
    {
      type: 0,
      value: '4'
    },
    {
      type: 0,
      value: '6'
    },
    {
      type: 0,
      value: '8'
    },
    {
      type: 0,
      value: '10'
    },
    {
      type: 0,
      value: '12'
    },
    {
      type: 1,
      value: "Women's Plus Sizes"
    },
    {
      type: 0,
      value: '14W'
    },
    {
      type: 0,
      value: '16W'
    },
    {
      type: 0,
      value: '18W'
    },
    {
      type: 0,
      value: '20W'
    },
    {
      type: 0,
      value: '22W'
    },
    {
      type: 0,
      value: '24W'
    }
  ];
  const iShirtBlouseSizeLabel = [
    {
      type: 0,
      value: '--'
    },
    {
      type: 1,
      value: 'Recommended for 2'
    },
    {
      type: 0,
      value: 'S (2 - 4)'
    },
    {
      type: 1,
      value: "Women's Sizes"
    },
    {
      type: 0,
      value: 'S (2 - 4)'
    },
    {
      type: 1,
      value: "Women's Sizes"
    },
    {
      type: 0,
      value: 'XXS (00)'
    },
    {
      type: 0,
      value: 'XS (0)'
    },
    {
      type: 0,
      value: 'S (2 - 4)'
    },
    {
      type: 0,
      value: 'M (6 - 8)'
    },
    {
      type: 0,
      value: 'L (10 - 12)'
    },
    {
      type: 0,
      value: 'XL (14)'
    },
    {
      type: 0,
      value: 'XXL (16)'
    },
    {
      type: 1,
      value: "Women's Plus Sizes"
    },
    {
      type: 0,
      value: '1X (14W - 16W)'
    },
    {
      type: 0,
      value: '2X (18W - 20W)'
    },
    {
      type: 0,
      value: '3X (22W - 24W)'
    }
  ];
  const iJacketSize = [
    '--',
    'XS (0 - 2)',
    'S (2 - 4)',
    'M (6 - 8)',
    'L (10 - 12)',
    'XL (14)',
    '1X (14W - 16W)',
    '2X (18W - 20W)',
    '3X (22W - 24W)'
  ];
  const iDressSizeNo = iShirtBlouseSizeNo;
  const iDressSizeLabel = [
    {
      type: 0,
      value: '--'
    },
    {
      type: 0,
      value: 'L (10 - 12)'
    },
    {
      type: 1,
      value: "Women's Sizes"
    },
    {
      type: 0,
      value: 'XXS (00)'
    },
    {
      type: 0,
      value: 'XS (0)'
    },
    {
      type: 0,
      value: 'S (2 - 4)'
    },
    {
      type: 0,
      value: 'M (6 - 8)'
    },
    {
      type: 0,
      value: 'L (10 - 12)'
    },
    {
      type: 0,
      value: 'XL (14)'
    },
    {
      type: 0,
      value: 'XXL (16)'
    },
    {
      type: 1,
      value: "Women's Plus Sizes"
    },
    {
      type: 0,
      value: '1X (14W - 16W)'
    },
    {
      type: 0,
      value: '2X (18W - 20W)'
    },
    {
      type: 0,
      value: '3X (22W - 24W)'
    }
  ];
  const iSkirtSize = [
    '--',
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    '1X',
    '2X',
    '3X',
    '4X'
  ];
  const iPantsSize = [
    {
      type: 0,
      value: '--'
    },
    {
      type: 1,
      value: "Women's Sizes"
    },
    {
      type: 0,
      value: '000'
    },
    {
      type: 0,
      value: '00'
    },
    {
      type: 0,
      value: '0'
    },
    {
      type: 0,
      value: '2'
    },
    {
      type: 0,
      value: '4'
    },
    {
      type: 0,
      value: '6'
    },
    {
      type: 0,
      value: '8'
    },
    {
      type: 0,
      value: '10'
    },
    {
      type: 0,
      value: '12'
    },
    {
      type: 1,
      value: "Women's Plus Sizes"
    },
    {
      type: 0,
      value: '14W'
    },
    {
      type: 0,
      value: '16W'
    },
    {
      type: 0,
      value: '18W'
    },
    {
      type: 0,
      value: '20W'
    },
    {
      type: 0,
      value: '22W'
    },
    {
      type: 0,
      value: '24W'
    }
  ];
  const iJeansSize = [
    {
      type: 0,
      value: '--'
    },
    {
      type: 1,
      value: "Women's Sizes"
    },
    {
      type: 0,
      value: '00'
    },
    {
      type: 0,
      value: '0'
    },
    {
      type: 0,
      value: '2'
    },
    {
      type: 0,
      value: '4'
    },
    {
      type: 0,
      value: '6'
    },
    {
      type: 0,
      value: '8'
    },
    {
      type: 0,
      value: '10'
    },
    {
      type: 0,
      value: '12'
    },
    {
      type: 1,
      value: "Women's Plus Sizes"
    },
    {
      type: 0,
      value: '14W'
    },
    {
      type: 0,
      value: '16W'
    },
    {
      type: 0,
      value: '18W'
    },
    {
      type: 0,
      value: '20W'
    },
    {
      type: 0,
      value: '22W'
    },
    {
      type: 0,
      value: '24W'
    }
  ];
  const iBottomSize = [
    '--',
    'XS (0 - 2)',
    'S (2 - 4)',
    'M (6 - 8)',
    'L (10 - 12)',
    'XL (14)',
    '1X (14W - 16W)',
    '2X (18W - 20W)',
    '3X (22W - 24W)',
    '4X (26W - 28W)'
  ];
  const iShoeSizeNum = [
    '--',
    '4',
    '4.5',
    '5',
    '5.5',
    '6',
    '6.5',
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
    '13'
  ];
  const iShoesStyleLabel = {
    title: 'Which style of shoes do you prefer? (Select all that apply)',
    items: [
      'Pumps',
      'Sandals',
      'Sneakers',
      'Boots & Booties',
      'Loafers & Flats',
      'Wedges',
      'Clogs & Mules',
      'Platforms'
    ]
  };
  const iHeelHeightLabel = {
    title: 'Which heel height do you prefer?(Select all that apply)',
    items: [
      'Flat(Under 1")',
      'Low(1"-2")',
      'Mid(2"-3")',
      'High(3"-4")',
      'Ultra High(4.5"+)'
    ]
  };
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
  const iSizeArms = [
    '--',
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    '1X',
    '2X',
    '3X'
  ];
  const iBodyPart = [
    'Arms',
    'Bust',
    'Stomach',
    'Back',
    'Waist',
    'Hips / Butt',
    'Legs'
  ];
  //-- if pregnant
  const iMaternityForm = ['--', '7', '8', '9', '10'];
  const iMaternityPants = [
    {
      image: Belly_1,
      content: ' Regular pants with an under-the-belly type'
    },
    {
      image: Belly_2,
      content: 'All-around stretch to give light support'
    },
    {
      image: Belly_3,
      content: 'Elastic side panels'
    },
    {
      image: Belly_4,
      content: 'Fits over bump for maximum support'
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
              <Link to="/welcome/basic-info/women" style={{ color: '#ff6c00' }}>
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
              <Link to="/welcome/style-fit/women" style={{ color: '#232f3e' }}>
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
              <Link
                to="/welcome/price-range/women"
                style={{ color: '#232f3e' }}
              >
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
              <Link
                to="/welcome/style-custom/women"
                style={{ color: '#232f3e' }}
              >
                Custom Design & Brands
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Formik
              initialValues={wBasicInfo === null ? initVal : wBasicInfo}
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
                    new Date(`12/31/${minBirthYear}`),
                    'Please provide certain age'
                  )
                  .typeError('Please provide certain age')
                  .required('Please provide certain age'),
                shirtBlouseSizeNo: Yup.number()
                  .min(1, 'Please select shirt and blouse size num')
                  .max(14)
                  .required('Please select shirt and blouse size num'),
                dressSizeNo: Yup.number()
                  .min(1, 'Please select dress size num')
                  .max(14)
                  .required('Please select dress size num'),
                pantsSize: Yup.number()
                  .min(1, 'Please select pants size')
                  .max(19)
                  .required('Please select pants size'),
                bottomSize: Yup.number()
                  .min(1, 'Please select bottom size')
                  .max(9)
                  .required('Please select bottom size'),
                dueDate: Yup.date()
                  .min(minDueDate, 'Please input valid date')
                  .max(maxDueDate, 'Please enter date within 40 weeks')
              })}
              onSubmit={async (values) => {
                DFnewLogger('Women Basic Info/submit:', values);
                if (saveReturn) {
                  dispatch(wEditBasicInfo(values));
                  saveReturn = false;
                } else {
                  dispatch(wEditBasicInfo(values, navigate));
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
                                  autoFocus={Boolean(
                                    touched.heightFt && errors.heightFt
                                  )}
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
                            <FormHelperText
                              id="standard-weight-helper-text--signup"
                              error
                            >
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
                              <FormHelperText
                                id="standard-weight-helper-text--signup"
                                error
                              >
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
                              <FormHelperText
                                id="standard-weight-helper-text--signup"
                                error
                              >
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
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        What is your body type?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorRadioGroup
                        content={iBodyShapeLabel}
                        value={values.bodyType}
                        setFieldValue={setFieldValue}
                        name="bodyType"
                        touched={touched}
                        errors={errors}
                      />
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
                            Bra size?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="braSizeNum"
                                  value={values.braSizeNum}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iBraSizeNum.map((item, index) => (
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
                                  name="braSizeLabel"
                                  value={values.braSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iBraSizeLabel.map((item, index) => (
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
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-sub-title">
                            Shirt & Blouse size?{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <FormControl
                                error={Boolean(
                                  touched.shirtBlouseSizeNo &&
                                    errors.shirtBlouseSizeNo
                                )}
                                fullWidth
                              >
                                <Select
                                  size="small"
                                  autoFocus={Boolean(
                                    touched.shirtBlouseSizeNo &&
                                      errors.shirtBlouseSizeNo
                                  )}
                                  name="shirtBlouseSizeNo"
                                  value={values.shirtBlouseSizeNo}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iShirtBlouseSizeNo.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={index}
                                      disabled={item.type === 0 ? false : true}
                                    >
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="shirtBlouseSizeLabel"
                                  value={values.shirtBlouseSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iShirtBlouseSizeLabel.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={index}
                                      disabled={item.type === 0 ? false : true}
                                    >
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          {touched.shirtBlouseSizeNo &&
                            errors.shirtBlouseSizeNo && (
                              <FormHelperText
                                id="standard-weight-helper-text--signup"
                                error
                              >
                                {errors.shirtBlouseSizeNo}
                              </FormHelperText>
                            )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-sub-title">
                            Jacket size?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <Select
                              size="small"
                              name="jacketSize"
                              value={values.jacketSize}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {iJacketSize.map((item, index) => (
                                <MenuItem key={index} value={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-sub-title">
                            Dress size? <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <FormControl
                                error={Boolean(
                                  touched.dressSizeNo && errors.dressSizeNo
                                )}
                                fullWidth
                              >
                                <Select
                                  size="small"
                                  autoFocus={Boolean(
                                    touched.dressSizeNo && errors.dressSizeNo
                                  )}
                                  name="dressSizeNo"
                                  value={values.dressSizeNo}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iDressSizeNo.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={index}
                                      disabled={item.type === 0 ? false : true}
                                    >
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="dressSizeLabel"
                                  value={values.dressSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iDressSizeLabel.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={index}
                                      disabled={item.type === 0 ? false : true}
                                    >
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          {touched.dressSizeNo && errors.dressSizeNo && (
                            <FormHelperText
                              id="standard-weight-helper-text--signup"
                              error
                            >
                              {errors.dressSizeNo}
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
                                Skirt size?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="skirtSize"
                                  value={values.skirtSize}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iSkirtSize.map((item, index) => (
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
                                Pants size?{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                error={Boolean(
                                  touched.pantsSize && errors.pantsSize
                                )}
                                fullWidth
                              >
                                <Select
                                  size="small"
                                  autoFocus={Boolean(
                                    touched.pantsSize && errors.pantsSize
                                  )}
                                  name="pantsSize"
                                  value={values.pantsSize}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iPantsSize.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={index}
                                      disabled={item.type === 0 ? false : true}
                                    >
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {touched.pantsSize && errors.pantsSize && (
                                  <FormHelperText
                                    id="standard-weight-helper-text--signup"
                                    error
                                  >
                                    {errors.pantsSize}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className="basic-info-sub-title">
                                Jeans size?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="jeansSize"
                                  value={values.jeansSize}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iJeansSize.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={index}
                                      disabled={item.type === 0 ? false : true}
                                    >
                                      {item.value}
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
                                Bottom size?{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                error={Boolean(
                                  touched.bottomSize && errors.bottomSize
                                )}
                                fullWidth
                              >
                                <Select
                                  size="small"
                                  name="bottomSize"
                                  autoFocus={Boolean(
                                    touched.bottomSize && errors.bottomSize
                                  )}
                                  value={values.bottomSize}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iBottomSize.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {touched.bottomSize && errors.bottomSize && (
                                  <FormHelperText
                                    id="standard-weight-helper-text--signup"
                                    error
                                  >
                                    {errors.bottomSize}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                          </Grid>
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
                            What is your shoe size?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
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
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckboxLarge
                        content={iShoesStyleLabel}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        name="shoesStyleLabel"
                        value={values.shoesStyleLabel}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckboxLarge
                        content={iHeelHeightLabel}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        name="heelHeightLabel"
                        value={values.heelHeightLabel}
                      />
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
                        What parts of your body are you comfortable showing off?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckboxBtn
                        part={iBodyPart}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="bodyShowingOff"
                        value={values.bodyShowingOff}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        What parts of your body do you like to keep covered?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckboxBtn
                        part={iBodyPart}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="bodyKeepCovered"
                        value={values.bodyKeepCovered}
                      />
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
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className="basic-info-sub-title">
                                Shoulders?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="sizeShoulders"
                                  value={values.sizeShoulders}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iJeansSize.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={index}
                                      disabled={item.type === 0 ? false : true}
                                    >
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className="basic-info-sub-title">
                                Arms?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="sizeArms"
                                  value={values.sizeArms}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iSizeArms.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className="basic-info-sub-title">
                                Hips?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="sizeHips"
                                  value={values.sizeHips}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iJeansSize.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={index}
                                      disabled={item.type === 0 ? false : true}
                                    >
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className="basic-info-sub-title">
                                Legs?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="sizeLegs"
                                  value={values.sizeLegs}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iBraSizeNum.map((item, index) => (
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
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Are you pregnant?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <RadioButtonGroup
                            group={['Yes', 'No']}
                            name="isPregnant"
                            value={values.isPregnant}
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
                    {values.isPregnant !== 0 ? (
                      <></>
                    ) : (
                      <>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            What is your due date?
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                className="small-date-picker"
                                name="dueDate"
                                value={values.dueDate}
                                onChange={(value) => {
                                  const date = new Date(Date.parse(value));
                                  setFieldValue('dueDate', date);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                            {touched.dueDate && errors.dueDate && (
                              <FormHelperText
                                id="standard-weight-helper-text--signup"
                                error
                              >
                                {errors.dueDate}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your maternity fit?
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <FormControl fullWidth>
                            <Select
                              size="small"
                              name="maternityFit"
                              value={values.maternityFit}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {iMaternityForm.map((item, index) => (
                                <MenuItem key={index} value={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Loose Fitted mix of both
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <FormControl fullWidth>
                            <Select
                              size="small"
                              name="looseFitted"
                              value={values.looseFitted}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {iMaternityForm.map((item, index) => (
                                <MenuItem key={index} value={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Please select the maternity pants style you prefer
                            to wear?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorRadioGroup
                            content={iMaternityPants}
                            value={values.maternityPants}
                            setFieldValue={setFieldValue}
                            name="maternityPants"
                            touched={touched}
                            errors={errors}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                      </>
                    )}
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
          src={`${Women_Size_Chart}.webp`}
          fallback={`${Women_Size_Chart}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '173px' }}
          alt="Women Size Chart"
        />
      </Modal>
    </>
  );
};

export default BasicInfo;
