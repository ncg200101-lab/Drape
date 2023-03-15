import { useEffect } from 'react';
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

//-- component
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import CustomCheckbox from 'views/client/component/profile/CustomCheckbox';
import ColorRect from 'views/client/component/profile/ColorRect';
import DFnewLogger from 'utils/DFnewLogger';
import NavTabs from '../../component/profile/NavTabs';
import DFnewImgTag from 'utils/DFnewImgTag';

//-- action
import { kEditBasicInfo, kGetBasicInfo } from 'actions/kids';

const Basic_Info = GenS3Link(
  'landing/images/client/profile/kids/basic-info/basic-info'
);
const Basic_Info_Boy = GenS3Link(
  'landing/images/client/profile/kids/basic-info/basic-info-boy'
);
const Basic_Info_Girl = GenS3Link(
  'landing/images/client/profile/kids/basic-info/basic-info-girl'
);

const BasicInfo = () => {
  //-- get item from localstorage
  const order = localStorage.getItem('order');
  //-- hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveReturn = false;
  const { user } = useSelector((state) => state.auth);
  const { kBasicInfo } = useSelector((state) => state.kids);
  useEffect(() => {
    DFnewLogger('kGetBasicInfo______________________________');
    dispatch(kGetBasicInfo(order));
  }, [dispatch, order]);
  //-- params
  const year = new Date();
  const maxBirthYear = year.getFullYear() - 18;
  DFnewLogger(year);
  year.setDate(year.getDate() - 1);
  DFnewLogger(year);
  const initVal = {
    name: '',
    birthday: new Date(),
    lookingFor: '',
    relationShip: '',
    heightFt: 0,
    heightIn: 0,
    weightLbs: '',
    childPersonality: [],
    preferedSize: '',
    colors: []
  };
  const iHeightFt = ['--', '1', '2', '3', '4', '5', '6'];
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
  const iChildPersonality = {
    title: 'Your Child Personality?',
    items: [
      'Thoughtful',
      'Sporty',
      'Shy',
      'Outgoing',
      'Artistic',
      'Chatty',
      'Bookworm',
      'Curious',
      'Sassy',
      'Funny',
      'Independent',
      'Kind',
      'Daredevil',
      'Serious',
      'Adventurous',
      'Confident'
    ]
  };
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
      <Formik
        initialValues={kBasicInfo === null ? initVal : kBasicInfo}
        enableReinitialize
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Please fill the kid name'),
          birthday: Yup.date()
            .min(
              new Date(`01/01/${maxBirthYear}`),
              'Please provide certain age'
            )
            .max(year, 'Please provide certain age')
            .typeError('Please provide certain age')
            .required('Please provide certain age'),
          heightFt: Yup.number()
            .min(1, 'Please fill the height in feet')
            .max(6)
            .required('Please fill the height in feet'),
          weightLbs: Yup.number()
            .min(10, 'Please enter a value greater than or equal to 10')
            .max(999, 'Please enter a value less than or equal to 999')
            .required('Sharing weight helps us get the right fit'),
          lookingFor: Yup.number()
            .min(0)
            .max(1)
            .required('Please provide kid gender'),
          relationShip: Yup.number()
            .min(0)
            .max(2)
            .required('Please provide relationship')
        })}
        onSubmit={async (values) => {
          DFnewLogger('Kids Basic Info/submit:', values);
          DFnewLogger('saveReturn:', saveReturn);
          if (saveReturn) {
            dispatch(kEditBasicInfo(values, order));
            saveReturn = false;
          } else {
            dispatch(kEditBasicInfo(values, order, navigate));
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
            <NavTabs />
            <Divider />
            <Grid className="profile" container>
              <Grid item xs={12} md={3}>
                <Grid container padding="10px 30px">
                  <Grid item xs={12} sm={8} md={12}>
                    <Typography
                      className="basic-info-title"
                      sx={{
                        textAlign: { xs: 'center', sm: 'start', md: 'center' }
                      }}
                    >
                      Hi {FirstUpper(user?.firstName)}
                    </Typography>
                    <Typography
                      className="basic-info-content"
                      sx={{
                        textAlign: { xs: 'center', sm: 'start', md: 'center' }
                      }}
                    >
                      Please complete your child basic information that will
                      help us get started to have a best FIT for you
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} md={12}>
                    <DFnewImgTag
                      src={`${
                        values.lookingFor === 0
                          ? Basic_Info_Girl
                          : values.lookingFor === 1
                          ? Basic_Info_Boy
                          : Basic_Info
                      }.webp`}
                      fallback={`${
                        values.lookingFor === 0
                          ? Basic_Info_Girl
                          : values.lookingFor === 1
                          ? Basic_Info_Boy
                          : Basic_Info
                      }.jpg`}
                      width="100%"
                      lzheight={`auto`}
                      style={{
                        minHeight: '118px',
                        border: '2px solid #232f3e'
                      }}
                      alt="best FIT for you"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Divider
                orientation="horizontal"
                style={{ backgroundColor: '#eee', width: '1px' }}
              />
              <Grid item xs={12} md={8}>
                <Grid container>
                  <Grid
                    className="gray-border breadcrumb-tab"
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link
                      to="/welcome/basic-info/kids"
                      style={{ color: '#ff6c00' }}
                    >
                      Basic Information
                    </Link>
                  </Grid>
                  <Grid
                    className={`gray-border breadcrumb-tab ${
                      user?.kids[order - 1]?.kStatus < 1 ? 'disabled' : ''
                    }`}
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link
                      to={`/welcome/style-fit/kids/${
                        kBasicInfo?.lookingFor === 0 ? 'girl' : 'boy'
                      }`}
                      style={{ color: '#232f3e' }}
                    >
                      Style Fit
                    </Link>
                  </Grid>
                  <Grid
                    className={`gray-border breadcrumb-tab ${
                      user?.kids[order - 1]?.kStatus < 2 ? 'disabled' : ''
                    }`}
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link
                      to={`/welcome/price-range/kids/${
                        kBasicInfo?.lookingFor === 0 ? 'girl' : 'boy'
                      }`}
                      style={{ color: '#232f3e' }}
                    >
                      Price Range
                    </Link>
                  </Grid>
                  <Grid
                    className={`gray-border breadcrumb-tab ${
                      user?.kids[order - 1]?.kStatus < 3 ? 'disabled' : ''
                    }`}
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link
                      to={`/welcome/style-custom/kids/${
                        kBasicInfo?.lookingFor === 0 ? 'girl' : 'boy'
                      }`}
                      style={{ color: '#232f3e' }}
                    >
                      Custom Design & Brands
                    </Link>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid container columnSpacing={4} padding="20px">
                    <Grid item xs={12}>
                      <Typography className="basic-info-bold-title">
                        Welcome Your first child
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your Child Name?{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                          >
                            <InputLabel>
                              Name <span style={{ color: 'red' }}>*</span>
                            </InputLabel>
                            <OutlinedInput
                              size="small"
                              label="Name *"
                              autoFocus={Boolean(touched.name && errors.name)}
                              type="text"
                              name="name"
                              value={values.name}
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
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your Child Birthday?{' '}
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
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            FIT you are looking for?{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <RadioButtonGroup
                            group={["Girl's Product", "Boy's Product"]}
                            name="lookingFor"
                            value={values.lookingFor}
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Relationship with your child?{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <RadioButtonGroup
                            group={['Father', 'Mother', 'Other']}
                            name="relationShip"
                            value={values.relationShip}
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
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your Child Height?{' '}
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
                                {touched.heightFt && errors.heightFt && (
                                  <FormHelperText id="helper-text" error>
                                    {errors.heightFt}
                                  </FormHelperText>
                                )}
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
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your Child Weight?{' '}
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
                    <Grid item xs={12}>
                      <CustomCheckbox
                        content={iChildPersonality}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        name="childPersonality"
                        value={values.childPersonality}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            What size does your child prefer to wear?
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <RadioButtonGroup
                            group={['Bottom Size', 'Top Size', 'Shoe Size']}
                            name="preferedSize"
                            value={values.preferedSize}
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
                      <ColorRect
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="colors"
                        value={values.colors}
                        subject="your child"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid className="h-align-center" item xs={12}>
                      <Button
                        type="submit"
                        disableElevation
                        disabled={isSubmitting}
                        className="profile-gradient-btn"
                        onClick={() => {
                          saveReturn = false;
                        }}
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
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BasicInfo;
