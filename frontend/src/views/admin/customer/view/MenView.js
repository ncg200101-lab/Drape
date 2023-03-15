import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Divider,
  Grid,
  Box,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  TextField,
  TextareaAutosize
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';

//-- component
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import ColorRect from 'views/client/component/profile/ColorRect';
import ColorCircular from 'views/client/component/profile/ColorCircular';
import Profession from 'views/client/component/profile/Profession';
import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import PriceSelectGroup from 'views/client/component/profile/PriceSelectGroup';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import ImageSelectorRadioGroup from 'views/client/component/profile/ImageSelectorRadioGroup';
import ImageSelectorCheckbox from 'views/client/component/profile/ImageSelectorCheckbox';
import DFnewImgTag from 'utils/DFnewImgTag';
import BrandSelector from 'views/client/component/profile/BrandSelector';
import InfoTable from './InfoTable';

//-- action
import {
  mGetBasicInfo,
  mGetStyleFit,
  mGetPriceRange,
  mGetStyleCustom
} from 'actions/profile';

const Logo = GenS3Link('landing/images/logo');
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
const TypicallyWork_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/typically-work-1'
);
const TypicallyWork_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/typically-work-2'
);
const TypicallyWork_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/typically-work-3'
);
const CasualShirt_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/casual-shirt-1'
);
const CasualShirt_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/casual-shirt-2'
);
const ButtonShirt_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/button-shirt-1'
);
const ButtonShirt_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/button-shirt-2'
);
const Jeans_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/jeans-1'
);
const Jeans_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/jeans-2'
);
const Jeans_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/jeans-3'
);
const Jeans_4 = GenS3Link(
  'landing/images/client/profile/men/style-fit/jeans-4'
);
const Bottom_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/bottom-1'
);
const Bottom_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/bottom-2'
);
const Shorts_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/shorts-1'
);
const Shorts_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/shorts-2'
);
const Shorts_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/shorts-3'
);
const Shorts_4 = GenS3Link(
  'landing/images/client/profile/men/style-fit/shorts-4'
);
const OutFit_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit1'
);
const OutFit_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit2'
);
const OutFit_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit3'
);
const OutFit_4 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit4'
);
const OutFit_5 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit5'
);
const OutFit_6 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit6'
);
const OutFit_7 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit7'
);
const OutFit_8 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit8'
);
const OutFit_9 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit9'
);
const OutFit_10 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit10'
);
const OutFit_11 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit11'
);
const OutFit_12 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit12'
);
const OutFit_13 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit13'
);
const OutFit_14 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit14'
);
const OutFit_15 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit15'
);
const OutFit_16 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit16'
);
const OutFit_17 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit17'
);
const OutFit_18 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit18'
);
const OutFit_19 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit19'
);
const OutFit_20 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit20'
);
const penguin = GenS3Link('landing/images/client/brands/penguin');
const nike = GenS3Link('landing/images/client/brands/nike');
const scotch = GenS3Link('landing/images/client/brands/scotch');
const gap = GenS3Link('landing/images/client/brands/gap');
const pata = GenS3Link('landing/images/client/brands/pata');
const tommy = GenS3Link('landing/images/client/brands/tommy');
const boss = GenS3Link('landing/images/client/brands/boss');
const vineyard = GenS3Link('landing/images/client/brands/vineyard');
const vans = GenS3Link('landing/images/client/brands/vans');
const hurley = GenS3Link('landing/images/client/brands/hurley');
const brooks = GenS3Link('landing/images/client/brands/brooks');
const zara = GenS3Link('landing/images/client/brands/zara');
const levis = GenS3Link('landing/images/client/brands/levis');
const armour = GenS3Link('landing/images/client/brands/armour');
const bonobos = GenS3Link('landing/images/client/brands/bonobos');
const landsend = GenS3Link('landing/images/client/brands/landsend');
const jcrew = GenS3Link('landing/images/client/brands/jcrew');
const oldnavy = GenS3Link('landing/images/client/brands/oldnavy');
const uniqlo = GenS3Link('landing/images/client/brands/uniqlo');
const northface = GenS3Link('landing/images/client/brands/northface');
const hm = GenS3Link('landing/images/client/brands/hm');
const eagle = GenS3Link('landing/images/client/brands/eagle');
const ragbone = GenS3Link('landing/images/client/brands/ragbone');
const bensharma = GenS3Link('landing/images/client/brands/bensharma');
const express = GenS3Link('landing/images/client/brands/express');
const polo = GenS3Link('landing/images/client/brands/polo');
const dillard = GenS3Link('landing/images/client/brands/dillard');
const macys = GenS3Link('landing/images/client/brands/macys');
const nm = GenS3Link('landing/images/client/brands/nm');
const urban = GenS3Link('landing/images/client/brands/urban');
const nordstrom = GenS3Link('landing/images/client/brands/nordstrom');

const MenView = () => {
  //-- hooks
  const dispatch = useDispatch();
  const { mBasicInfo, mStyleFit, mPriceRange, mStyleCustom } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(mGetBasicInfo());
    dispatch(mGetStyleFit());
    dispatch(mGetPriceRange());
    dispatch(mGetStyleCustom());
  }, [dispatch]);
  //-- params
  const initBasicInfo = {
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
  const initStyleFit = {
    typicalWear2Work: [],
    casualShirts: [],
    btnUpShirts: [],
    jeans: [],
    bottoms: [],
    shorts: [],
    colors: [],
    outfits: [],
    fitIssues: []
  };
  const iTypicallyWear2Work = {
    title: 'What do you typically wear to work?',
    gallery: [
      {
        title: 'Casual',
        image: TypicallyWork_1
      },
      {
        title: 'Business Casual',
        image: TypicallyWork_2
      },
      {
        title: 'Formal',
        image: TypicallyWork_3
      }
    ]
  };
  const iCasualShirts = {
    title: 'Your casual shirts to fit?',
    mandatory: true,
    gallery: [
      {
        title: 'Slim',
        image: CasualShirt_1
      },
      {
        title: 'Regular',
        image: CasualShirt_2
      }
    ]
  };
  const iBtnUpShirts = {
    title: 'How do you like your button-up shirts to fit?',
    mandatory: true,
    gallery: [
      {
        title: 'Slim',
        image: ButtonShirt_1,
        content:
          'Fitted through the chest, trim through the waist, tapered sleeves'
      },
      {
        title: 'Regular',
        image: ButtonShirt_2,
        content: 'Relaxed through the chest, waist, armholes & sleeves'
      }
    ]
  };
  const iJeans = {
    title: 'How do you like your jeans to fit?',
    mandatory: true,
    gallery: [
      {
        title: 'Straight',
        image: Jeans_1
      },
      {
        title: 'Slim',
        image: Jeans_2
      },
      {
        title: 'Skinny',
        image: Jeans_3
      },
      {
        title: 'Relaxed',
        image: Jeans_4
      }
    ]
  };
  const iBottoms = {
    title: 'Bottoms',
    mandatory: true,
    gallery: [
      {
        title: 'Tighter Fitting',
        image: Bottom_1
      },
      {
        title: 'More Relaxed',
        image: Bottom_2
      }
    ]
  };
  const iShorts = {
    title: 'How long do you prefer your shorts?',
    mandatory: true,
    gallery: [
      {
        title: 'Upper Thigh',
        image: Shorts_1
      },
      {
        title: 'Lower Thigh',
        image: Shorts_2
      },
      {
        title: 'Above Thigh',
        image: Shorts_3
      },
      {
        title: 'At The Knee',
        image: Shorts_4
      }
    ]
  };
  const iOutfits = {
    title: 'Tell us which of these outfits would you prefer to wear?',
    mandatory: true,
    gallery: [
      {
        title: '',
        image: OutFit_1
      },
      {
        title: '',
        image: OutFit_2
      },
      {
        title: '',
        image: OutFit_3
      },
      {
        title: '',
        image: OutFit_4
      },
      {
        title: '',
        image: OutFit_5
      },
      {
        title: '',
        image: OutFit_6
      },
      {
        title: '',
        image: OutFit_7
      },
      {
        title: '',
        image: OutFit_8
      },
      {
        title: '',
        image: OutFit_9
      },
      {
        title: '',
        image: OutFit_10
      },
      {
        title: '',
        image: OutFit_11
      },
      {
        title: '',
        image: OutFit_12
      },
      {
        title: '',
        image: OutFit_13
      },
      {
        title: '',
        image: OutFit_14
      },
      {
        title: '',
        image: OutFit_15
      },
      {
        title: '',
        image: OutFit_16
      },
      {
        title: '',
        image: OutFit_17
      },
      {
        title: '',
        image: OutFit_18
      },
      {
        title: '',
        image: OutFit_19
      },
      {
        title: '',
        image: OutFit_20
      }
    ]
  };
  const iFitIssues = [
    'Long Arms',
    'Short Arms',
    'Thick Arms',
    'Broad Shoulders',
    'Man Boobs',
    'Big Belly',
    'Big Butt',
    'Small Butt',
    'Thunder Things',
    'Thick Neck',
    'Short Torso',
    'Long Torso',
    'Broad Chest',
    'Very Skinny',
    'Skinny Legs'
  ];
  const initPriceRange = {
    budgetShirts: '',
    budgetTeesPolos: '',
    budgetSweatersShirts: '',
    budgetPantsDenim: '',
    budgetShorts: '',
    budgetShoes: '',
    budgetOuterwear: '',
    accTiesLabel: 0,
    accBeltsLabel: 0,
    accWalletsBagsLabel: 0,
    accSunglassesLabel: 0,
    accHatsLabel: 0,
    ugSocksLabel: 0,
    ugUnderwearLabel: 0,
    ugGroomingLabel: 0
  };
  const wears = [
    {
      title: 'SHIRTS',
      value: 'budgetShirts',
      prices: ['Under $50', '$50 - $75', '$75 - $100', '$100 - $125', '$125+']
    },
    {
      title: 'TEES & POLOS',
      value: 'budgetTeesPolos',
      prices: ['Under $30', '$30 - $50', '$50 - $70', '$70 - $90', '$90+']
    },
    {
      title: 'SWEATERS & SWEATSHIRTS',
      value: 'budgetSweatersShirts',
      prices: ['Under $50', '$50 - $75', '$75 - $100', '$100 - $125', '$125+']
    },
    {
      title: 'PANTS & DENIM',
      value: 'budgetPantsDenim',
      prices: ['Under $75', '$75 - $100', '$100 - $125', '$125 - $175', '$175+']
    },
    {
      title: 'SHORTS',
      value: 'budgetShorts',
      prices: ['Under $40', '$40 - $60', '$60 - $80', '$80 - $100', '$100+']
    },
    {
      title: 'SHOES',
      value: 'budgetShoes',
      prices: ['Under $75', '$75 - $125', '$125 - $175', '$175 - $250', '$250+']
    },
    {
      title: 'OUTERWEAR',
      value: 'budgetOuterwear',
      prices: ['Under $75', '$75 - $125', '$125 - $175', '$175 - $250', '$250+']
    }
  ];
  const accessories = [
    {
      title: 'TIES',
      value: 'accTiesLabel',
      prices: ['I want the best', '$40 - $60', 'Up to $80', 'Up to $100']
    },
    {
      title: 'BELTS',
      value: 'accBeltsLabel',
      prices: ['I want the best', '$30 - $50', 'Up to $70', 'Up to $90']
    },
    {
      title: 'WALLETS, BAGS',
      value: 'accWalletsBagsLabel',
      prices: ['I want the best', '$25 - $50', 'Up to $75', 'Up to $100']
    },
    {
      title: 'SUNGLASSES',
      value: 'accSunglassesLabel',
      prices: [
        'I want the best',
        '$40 - $60',
        'Up to $80',
        'Up to $100',
        '$100 - $150'
      ]
    },
    {
      title: 'HATS',
      value: 'accHatsLabel',
      prices: ['I want the best', '$30 - $50', 'Up to $70']
    }
  ];
  const underwear = [
    {
      title: 'SOCKS',
      value: 'ugSocksLabel',
      prices: ['I want the best', '$10 - $25', 'Up to $35', 'Up to $45']
    },
    {
      title: 'UNDERWEAR',
      value: 'ugUnderwearLabel',
      prices: ['I want the best', '$10 - $25', 'Up to $35', 'Up to $45']
    },
    {
      title: 'GROOMING',
      value: 'ugGroomingLabel',
      prices: ['I want the best', '$10 - $25', 'Up to $35', 'Up to $45']
    }
  ];
  const initStyleCustom = {
    favBrandStoreLabel: [],
    addlComments: '',
    dsgnImgUrl1st: '',
    dsgnImgUrl2nd: '',
    dsgnImgUrl3rd: ''
  };
  const iBrands = [
    penguin,
    nike,
    scotch,
    gap,
    pata,
    tommy,
    boss,
    vineyard,
    vans,
    hurley,
    brooks,
    zara,
    levis,
    armour,
    bonobos,
    landsend,
    jcrew,
    oldnavy,
    uniqlo,
    northface,
    hm,
    eagle,
    ragbone,
    bensharma,
    express,
    polo,
    dillard,
    macys,
    nm,
    urban,
    nordstrom
  ];

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Profile</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <InfoTable />
        <Box className="fx-sm-padding">
          <Formik
            initialValues={mBasicInfo === null ? initBasicInfo : mBasicInfo}
            enableReinitialize
          >
            {({
              errors,
              handleBlur,
              handleChange,
              setFieldValue,
              touched,
              values
            }) => (
              <Form noValidate>
                <Grid container columnSpacing={4} padding="20px">
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
                            <FormControl fullWidth>
                              <InputLabel>
                                ft. <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <Select
                                disabled
                                size="small"
                                label="ft. *"
                                value={values.heightFt}
                                name="heightFt"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                disabled
                                size="small"
                                label="in."
                                value={values.heightIn}
                                name="heightIn"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                        <FormControl fullWidth>
                          <InputLabel>
                            lbs. <span style={{ color: 'red' }}>*</span>
                          </InputLabel>
                          <OutlinedInput
                            disabled
                            size="small"
                            label="lbs. *"
                            value={values.weightLbs}
                            type="number"
                            name="weightLbs"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
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
                          Your birthday? <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disabled
                              className="small-date-picker"
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
                          disabled
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
                      What size do you prefer?
                    </Typography>
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
                            <FormControl fullWidth>
                              <Select
                                disabled
                                size="small"
                                name="waistSizeNum"
                                value={values.waistSizeNum}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                disabled
                                size="small"
                                name="waistSizeLabel"
                                value={values.waistSizeLabel}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                            <FormControl fullWidth>
                              <Select
                                disabled
                                size="small"
                                name="shirtSizeNo"
                                value={values.shirtSizeNo}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                disabled
                                size="small"
                                name="shirtSizeLabel"
                                value={values.shirtSizeLabel}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                disabled
                                size="small"
                                name="bottomSizeNo"
                                value={values.bottomSizeNo}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                            <FormControl fullWidth>
                              <Select
                                disabled
                                size="small"
                                name="inseamSizeNum"
                                value={values.inseamSizeNum}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                {iInseam.map((item, index) => (
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
                          Shoe size?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <FormControl fullWidth>
                              <Select
                                disabled
                                size="small"
                                name="shoeSizeNum"
                                value={values.shoeSizeNum}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                disabled
                                size="small"
                                name="shoeSizeLabel"
                                value={values.shoeSizeLabel}
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                      disabled
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
                      disabled
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
                      disabled
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
                      You social media profiles will help your personal Stylist
                      to know you better.
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
                              disabled
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
                </Grid>
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={mStyleFit == null ? initStyleFit : mStyleFit}
            enableReinitialize
          >
            {({ errors, handleBlur, handleChange, touched, values }) => (
              <Form noValidate>
                <Grid container columnSpacing={4} padding="20px">
                  <Grid item xs={12}>
                    <ImageSelectorCheckbox
                      disabled
                      content={iTypicallyWear2Work}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="typicalWear2Work"
                      value={values.typicalWear2Work}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageSelectorCheckbox
                      disabled
                      content={iCasualShirts}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="casualShirts"
                      value={values.casualShirts}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageSelectorCheckbox
                      disabled
                      content={iBtnUpShirts}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="btnUpShirts"
                      value={values.btnUpShirts}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageSelectorCheckbox
                      disabled
                      content={iJeans}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="jeans"
                      value={values.jeans}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageSelectorCheckbox
                      disabled
                      content={iBottoms}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="bottoms"
                      value={values.bottoms}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageSelectorCheckbox
                      disabled
                      content={iShorts}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="shorts"
                      value={values.shorts}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ColorRect
                      disabled
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="colors"
                      value={values.colors}
                      subject="you"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageSelectorCheckbox
                      disabled
                      content={iOutfits}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="outfits"
                      value={values.outfits}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Any fit issues to take note of?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomCheckboxBtn
                      disabled
                      part={iFitIssues}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="fitIssues"
                      value={values.fitIssues}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={mPriceRange == null ? initPriceRange : mPriceRange}
            enableReinitialize
          >
            {({ errors, handleBlur, handleChange, touched, values }) => (
              <Form noValidate>
                <Grid container padding="20px">
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Help Us Know your Budget
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PriceRadioGroup
                      disabled
                      wears={wears}
                      value={values}
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Accessories
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PriceSelectGroup
                      disabled
                      value={values}
                      initValue={accessories}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Underwear & Grooming
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PriceSelectGroup
                      disabled
                      value={values}
                      initValue={underwear}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={
              mStyleCustom == null ? initStyleCustom : mStyleCustom
            }
            enableReinitialize
          >
            {({
              errors,
              handleBlur,
              handleChange,
              setFieldValue,
              touched,
              values
            }) => (
              <Form noValidate>
                <Grid container padding="20px">
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Please do click to upload any reference images / design
                      you want your stylist to work for you
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Typography
                          className="basic-info-sub-title"
                          align="center"
                        >
                          First Design
                        </Typography>
                        <Box>
                          <DFnewImgTag
                            src={
                              values.dsgnImgUrl1st
                                ? `${Logo}.png`
                                : `${Logo}.png`
                            }
                            height="100%"
                            width="100%"
                            lzheight={'100%'}
                            alt="Drape Fit Inc."
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Typography
                          className="basic-info-sub-title"
                          align="center"
                        >
                          Second Design
                        </Typography>
                        <Box>
                          <DFnewImgTag
                            src={
                              values.dsgnImgUrl2nd
                                ? `${Logo}.png`
                                : `${Logo}.png`
                            }
                            height="100%"
                            width="100%"
                            lzheight={'100%'}
                            alt="Drape Fit Inc."
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Typography
                          className="basic-info-sub-title"
                          align="center"
                        >
                          Third Design
                        </Typography>
                        <Box>
                          <DFnewImgTag
                            src={
                              values.dsgnImgUrl3rd
                                ? `${Logo}.png`
                                : `${Logo}.png`
                            }
                            height="100%"
                            width="100%"
                            lzheight={'100%'}
                            alt="Drape Fit Inc."
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Brand or store you prefer to shop
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <BrandSelector
                      disabled
                      brands={iBrands}
                      name="favBrandStoreLabel"
                      value={values.favBrandStoreLabel}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Add additional comments
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        disabled
                        placeholder="add additional comments ..."
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '100px',
                          padding: '15px',
                          borderColor: '#ccc',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                        value={values.addlComments}
                        name="addlComments"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </>
  );
};

export default MenView;
