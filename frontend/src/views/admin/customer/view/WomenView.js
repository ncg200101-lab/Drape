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
  TextareaAutosize,
  Button,
  Breadcrumbs
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';

//-- component
import BrandSelector from 'views/client/component/profile/BrandSelector';
import ColorRect from 'views/client/component/profile/ColorRect';
import ColorCircular from 'views/client/component/profile/ColorCircular';
import CustomCheckbox from 'views/client/component/profile/CustomCheckbox';
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import CustomCheckboxLarge from 'views/client/component/profile/CustomCheckboxLarge';
import CustomRadioGroup from 'views/client/component/profile/CustomRadioGroup';
import DFnewImgTag from 'utils/DFnewImgTag';
import DFnewLogger from 'utils/DFnewLogger';
import GenS3Link from 'utils/GenS3Link';
import ImageSelectorCheckbox from 'views/client/component/profile/ImageSelectorCheckbox';
import ImageSelectorCheckboxWide from 'views/client/component/profile/ImageSelectorCheckboxWide';
import ImageSelectorRadioGroup from 'views/client/component/profile/ImageSelectorRadioGroup';
import ImageSelectorWithRadioGroup from 'views/client/component/profile/ImageSelectorWithRadioGroup';
import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import Profession from 'views/client/component/profile/Profession';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import RadioButtonImage from 'views/client/component/profile/RadioButtonImage';
import { FirstUpper } from 'utils/FirstUpper';
import InfoTable from './InfoTable';
import GenFileName from 'utils/GenFileName';

//-- action
import {
  wGetBasicInfo,
  wGetStyleFit,
  wGetPriceRange,
  wGetStyleCustom
} from 'actions/profile';
import { SET_LOADING } from 'actions/types';

const Logo = GenS3Link('landing/images/logo');
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
const Inspiration_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-1'
);
const Inspiration_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-2'
);
const Inspiration_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-3'
);
const Inspiration_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-4'
);
const Inspiration_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-5'
);
const DressLength_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/dress-length-1'
);
const DressLength_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/dress-length-2'
);
const DressLength_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/dress-length-3'
);
const DressLength_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/dress-length-4'
);
const TopHalf_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-half-1'
);
const TopHalf_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-half-2'
);
const TopHalf_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-half-3'
);
const PantLength_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-length-1'
);
const PantLength_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-length-2'
);
const PantLength_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-length-3'
);
const PantRise_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-rise-1'
);
const PantRise_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-rise-2'
);
const PantRise_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-rise-3'
);
const PantStyle_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-1'
);
const PantStyle_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-2'
);
const PantStyle_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-3'
);
const PantStyle_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-4'
);
const PantStyle_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-5'
);
const AppareType_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-1'
);
const AppareType_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-2'
);
const AppareType_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-3'
);
const AppareType_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-4'
);
const AppareType_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-5'
);
const AppareType_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-6'
);
const AppareType_7 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-7'
);
const BottomType_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-1'
);
const BottomType_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-2'
);
const BottomType_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-3'
);
const BottomType_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-4'
);
const BottomType_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-5'
);
const BottomType_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-6'
);
const BottomType_7 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-7'
);
const TopType_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-type-1'
);
const TopType_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-type-2'
);
const TopType_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-type-3'
);
const AvoidPattern_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-1'
);
const AvoidPattern_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-2'
);
const AvoidPattern_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-3'
);
const AvoidPattern_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-4'
);
const AvoidPattern_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-5'
);
const AvoidPattern_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-6'
);
const DenimStyle_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/denim-1'
);
const DenimStyle_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/denim-2'
);
const DenimStyle_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/denim-3'
);
const DenimStyle_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/denim-4'
);
const OutFit_0 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-1'
);
const OutFit_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-2'
);
const OutFit_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-3'
);
const OutFit_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-4'
);
const OutFit_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-5'
);
const OutFit_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-6'
);
const OutFit_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-7'
);
const OutFit_7 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-8'
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

const WomenView = () => {
  const dispatch = useDispatch();
  const downloadPdf = async () => {
    try {
      dispatch({
        type: SET_LOADING
      });
      console.log('_____________________________________');
      const element = document.getElementById('p-content');
      const clsSMName = 'fx-sm-padding';
      const clsLGName = 'fx-lg-padding';
      const rmClsSMEl = element.querySelector(`.${clsSMName}`);
      const rmClsLGEl = element.querySelector(`.${clsLGName}`);
      rmClsSMEl.classList.remove(clsSMName);
      rmClsLGEl.classList.remove(clsLGName);
      rmClsLGEl.classList.add(clsSMName);
      const opt = {
        margin: [10, 10, 10, 10],
        filename: GenFileName('not_paid_women_profile'),
        image: { quality: 0.98 },
        html2canvas: { scale: 1, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          dispatch({ type: SET_LOADING });
          rmClsSMEl.classList.add(clsSMName);
          rmClsLGEl.classList.remove(clsSMName);
          rmClsLGEl.classList.add(clsLGName);
        });
    } catch (e) {
      DFnewLogger(e);
    }
  };
  const { wBasicInfo, wStyleFit, wPriceRange, wStyleCustom } = useSelector(
    (state) => state.profile
  );
  useEffect(() => {
    dispatch(wGetBasicInfo());
    dispatch(wGetStyleFit());
    dispatch(wGetPriceRange());
    dispatch(wGetStyleCustom());
  }, [dispatch]);
  const initBasicInfo = {
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
  const initStyleFit = {
    styleInspiration: [],
    dressLength: [],
    topHalf: [],
    pantLength: [],
    pantRise: [],
    pantStyle: [],
    appareType: [],
    bottomType: [],
    topType: [],
    avoidPattern: [],
    colors: [],
    mostlyNeutralsColor: [],
    mostlyColorfulColor: [],
    mostlyLightsColor: [],
    missingFit: [],
    dressupOccasion: '',
    missingCloset: [],
    denimStyle1: 1,
    denimStyle2: 1,
    denimStyle3: 1,
    denimStyle4: 1,
    outFit: [],
    outFitRadio0: '',
    outFitRadio1: '',
    outFitRadio2: '',
    outFitRadio3: '',
    outFitRadio4: '',
    outFitRadio5: '',
    outFitRadio6: '',
    outFitRadio7: ''
  };
  const iStyleInspiration = {
    title: '',
    gallery: [
      {
        title: 'Bohemian',
        image: Inspiration_1
      },
      {
        title: 'Casual',
        image: Inspiration_2
      },
      {
        title: 'Classic',
        image: Inspiration_3
      },
      {
        title: 'Edgy',
        image: Inspiration_4
      },
      {
        title: 'Trendy',
        image: Inspiration_5
      }
    ]
  };
  const iDressLength = {
    title: 'How do you like your clothing to fit?',
    subtitle: 'Dress length',
    gallery: [
      {
        title: 'Mini',
        image: DressLength_1
      },
      {
        title: 'Short',
        image: DressLength_2
      },
      {
        title: 'Midi',
        image: DressLength_3
      },
      {
        title: 'Maxi',
        image: DressLength_4
      }
    ]
  };
  const iTopHalf = {
    subtitle: 'Top half',
    gallery: [
      {
        title: 'Fitted',
        image: TopHalf_1
      },
      {
        title: 'Straight',
        image: TopHalf_2
      },
      {
        title: 'Loose',
        image: TopHalf_3
      }
    ]
  };
  const iPantLength = {
    subtitle: 'Pant Length',
    gallery: [
      {
        title: 'Ankle',
        image: PantLength_1
      },
      {
        title: 'Regular',
        image: PantLength_2
      },
      {
        title: 'Long',
        image: PantLength_3
      }
    ]
  };
  const iPantRise = {
    subtitle: 'Pant Rise',
    gallery: [
      {
        title: 'Low Rise',
        image: PantRise_1
      },
      {
        title: 'Mid Rise',
        image: PantRise_2
      },
      {
        title: 'High Rise',
        image: PantRise_3
      }
    ]
  };
  const iPantStyle = {
    subtitle: 'Pant Style',
    gallery: [
      {
        title: 'Skinny',
        image: PantStyle_1
      },
      {
        title: 'Straight',
        image: PantStyle_2
      },
      {
        title: 'Bootcut',
        image: PantStyle_3
      },
      {
        title: 'Relaxed',
        image: PantStyle_4
      },
      {
        title: 'Wide Leg',
        image: PantStyle_5
      }
    ]
  };
  const iAppareType = {
    title: 'Which types of appare would you like to receive?',
    gallery: [
      {
        title: 'Dresses / Jumpsuits',
        image: AppareType_1
      },
      {
        title: 'Tops',
        image: AppareType_2
      },
      {
        title: 'Bottoms',
        image: AppareType_3
      },
      {
        title: 'Denim',
        image: AppareType_4
      },
      {
        title: 'Sweaters',
        image: AppareType_5
      },
      {
        title: 'Jackets',
        image: AppareType_6
      },
      {
        title: 'Accessories',
        image: AppareType_7
      }
    ]
  };
  const iBottomType = {
    title: 'Which types of bottoms would you like to receive?',
    gallery: [
      {
        title: 'Skirts',
        image: BottomType_1
      },
      {
        title: 'Striped Shorts',
        image: BottomType_2
      },
      {
        title: 'Capri Jeans',
        image: BottomType_3
      },
      {
        title: 'Cargo Pant',
        image: BottomType_4
      },
      {
        title: 'Checked Pant',
        image: BottomType_5
      },
      {
        title: 'Palazzo',
        image: BottomType_6
      },
      {
        title: 'Denim Shorts',
        image: BottomType_7
      }
    ]
  };
  const iTopType = {
    title: 'Which types of tops would you like to receive?',
    gallery: [
      {
        title: 'Sleevelss',
        image: TopType_1
      },
      {
        title: 'Shorts Sleeve',
        image: TopType_2
      },
      {
        title: 'Long Sleeve',
        image: TopType_3
      }
    ]
  };
  const iAvoidPattern = {
    title: 'What patterns should you avoid?',
    mandatory: true,
    gallery: [
      {
        title: 'Lace',
        image: AvoidPattern_1
      },
      {
        title: 'Animal Print',
        image: AvoidPattern_2
      },
      {
        title: 'Tribal',
        image: AvoidPattern_3
      },
      {
        title: 'Polka Dot',
        image: AvoidPattern_4
      },
      {
        title: 'Stripes',
        image: AvoidPattern_5
      },
      {
        title: 'Floral',
        image: AvoidPattern_6
      }
    ]
  };
  const iMostlyNeutralsColor = {
    title: 'Which colors do you tend to mostly wear?',
    subtitle: 'NEUTRALS',
    items: ['Black', 'Grey', 'Navy', 'Beige', 'White']
  };
  const iMostlyColorfulColor = {
    subtitle: 'COLOR',
    items: ['Red', 'Blue', 'Yellow', 'Purple']
  };
  const iMostlyLightsColor = {
    subtitle: 'LIGHTS',
    items: ['White', 'Sand', 'Pastels']
  };
  const iMissingFit = [
    'Sweaters',
    'Blouses',
    'Jeans',
    'Pants',
    'Skirts',
    'Dresses'
  ];
  const iDressupOccasion = [
    'Business Casual / Work',
    'Cocktail / Wedding / Special',
    'Most of the time',
    'Around once or twice a week',
    'Around once or twice a month',
    'Date Night / Night Out',
    'Laid Back Casual',
    'Rarely'
  ];
  const iMissingCloset = {
    title: 'What do you feel is missing from your closet?',
    items: ['Sweaters', 'Blouses', 'Jeans', 'Pants', 'Skirts', 'Dresses']
  };
  const iDenimStyle1 = {
    content: ['Yes', 'Maybe', 'Never'],
    image: DenimStyle_1
  };
  const iDenimStyle2 = {
    content: ['Yes', 'Maybe', 'Never'],
    image: DenimStyle_2
  };
  const iDenimStyle3 = {
    content: ['Yes', 'Maybe', 'Never'],
    image: DenimStyle_3
  };
  const iDenimStyle4 = {
    content: ['Yes', 'Maybe', 'Never'],
    image: DenimStyle_4
  };
  const iOutFit = [
    OutFit_0,
    OutFit_1,
    OutFit_2,
    OutFit_3,
    OutFit_4,
    OutFit_5,
    OutFit_6,
    OutFit_7
  ];
  const initPriceRange = {
    budgetTops: '',
    budgetBottoms: '',
    budgetOuterwear: '',
    budgetJeans: '',
    budgetJewelry: '',
    budgetAccessories: '',
    budgetDress: ''
  };
  const wears = [
    {
      title: 'TOPS',
      value: 'budgetTops',
      prices: ['Under $50', '$50 - $75', '$75 - $100', '$100 - $125', '$125+']
    },
    {
      title: 'BOTTOMS',
      value: 'budgetBottoms',
      prices: ['Under $30', '$30 - $50', '$50 - $70', '$70 - $90', '$90+']
    },
    {
      title: 'OUTERWEAR',
      value: 'budgetOuterwear',
      prices: ['Under $50', '$50 - $75', '$75 - $100', '$100 - $125', '$125+']
    },
    {
      title: 'JEANS',
      value: 'budgetJeans',
      prices: ['Under $75', '$75 - $100', '$100 - $125', '$125 - $175', '$175+']
    },
    {
      title: 'JEWELRY',
      value: 'budgetJewelry',
      prices: ['Under $40', '$40 - $60', '$60 - $80', '$80 - $100', '$100+']
    },
    {
      title: 'ACCESSORIES',
      value: 'budgetAccessories',
      prices: ['Under $75', '$75 - $125', '$125 - $175', '$175 - $250', '$250+']
    },
    {
      title: 'DRESS',
      value: 'budgetDress',
      prices: ['Under $75', '$75 - $125', '$125 - $175', '$175 - $250', '$250+']
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
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Link to="/dfadmin/customer/not-paid-list" className="home-link">
              Not Paid List
            </Link>
            <Typography className="home-link current">View Profile</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">View Profile</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <div id="p-content">
          <InfoTable />
          <Box className="fx-sm-padding">
            <Formik
              initialValues={wBasicInfo === null ? initBasicInfo : wBasicInfo}
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
                            Your birthday?{' '}
                            <span style={{ color: 'red' }}>*</span>
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
                        What is your body type?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorRadioGroup
                        disabled
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
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        What size do you prefer?
                      </Typography>
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
                                  disabled
                                  size="small"
                                  name="braSizeNum"
                                  value={values.braSizeNum}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  disabled
                                  size="small"
                                  name="braSizeLabel"
                                  value={values.braSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                              <FormControl fullWidth>
                                <Select
                                  disabled
                                  size="small"
                                  name="shirtBlouseSizeNo"
                                  value={values.shirtBlouseSizeNo}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  disabled
                                  size="small"
                                  name="shirtBlouseSizeLabel"
                                  value={values.shirtBlouseSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                              disabled
                              size="small"
                              name="jacketSize"
                              value={values.jacketSize}
                              onBlur={handleBlur}
                              onChange={handleChange}
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
                              <FormControl fullWidth>
                                <Select
                                  disabled
                                  size="small"
                                  name="dressSizeNo"
                                  value={values.dressSizeNo}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  disabled
                                  size="small"
                                  name="dressSizeLabel"
                                  value={values.dressSizeLabel}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  disabled
                                  size="small"
                                  name="skirtSize"
                                  value={values.skirtSize}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                              <FormControl fullWidth>
                                <Select
                                  disabled
                                  size="small"
                                  name="pantsSize"
                                  value={values.pantsSize}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  disabled
                                  size="small"
                                  name="jeansSize"
                                  value={values.jeansSize}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                              <FormControl fullWidth>
                                <Select
                                  disabled
                                  size="small"
                                  name="bottomSize"
                                  value={values.bottomSize}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                >
                                  {iBottomSize.map((item, index) => (
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
                            What is your shoe size?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
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
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckboxLarge
                        disabled
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
                        disabled
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
                        What parts of your body are you comfortable showing off?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckboxBtn
                        disabled
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
                        disabled
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
                                  disabled
                                  size="small"
                                  name="sizeShoulders"
                                  value={values.sizeShoulders}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  disabled
                                  size="small"
                                  name="sizeArms"
                                  value={values.sizeArms}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  disabled
                                  size="small"
                                  name="sizeHips"
                                  value={values.sizeHips}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  disabled
                                  size="small"
                                  name="sizeLegs"
                                  value={values.sizeLegs}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                            disabled
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
                                disabled
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
                              disabled
                              size="small"
                              name="maternityFit"
                              value={values.maternityFit}
                              onBlur={handleBlur}
                              onChange={handleChange}
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
                              disabled
                              size="small"
                              name="looseFitted"
                              value={values.looseFitted}
                              onBlur={handleBlur}
                              onChange={handleChange}
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
                            disabled
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
              initialValues={wStyleFit == null ? initStyleFit : wStyleFit}
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
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        Style Inspiration{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iStyleInspiration}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="styleInspiration"
                        value={values.styleInspiration}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iDressLength}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="dressLength"
                        value={values.dressLength}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iTopHalf}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="topHalf"
                        value={values.topHalf}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iPantLength}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="pantLength"
                        value={values.pantLength}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iPantRise}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="pantRise"
                        value={values.pantRise}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iPantStyle}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="pantStyle"
                        value={values.pantStyle}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckboxWide
                        disabled
                        content={iAppareType}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="appareType"
                        value={values.appareType}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iBottomType}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="bottomType"
                        value={values.bottomType}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iTopType}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="topType"
                        value={values.topType}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        Please tell us the OutFit you prefer to wear.{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorWithRadioGroup
                        disabled
                        content={iOutFit}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        name="outFit"
                        rname="outFitRadio"
                        value={values}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageSelectorCheckbox
                        disabled
                        content={iAvoidPattern}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="avoidPattern"
                        value={values.avoidPattern}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
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
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckbox
                        disabled
                        content={iMostlyNeutralsColor}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        name="mostlyNeutralsColor"
                        value={values.mostlyNeutralsColor}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckbox
                        disabled
                        content={iMostlyColorfulColor}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="mostlyColorfulColor"
                        value={values.mostlyColorfulColor}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckbox
                        disabled
                        content={iMostlyLightsColor}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        name="mostlyLightsColor"
                        value={values.mostlyLightsColor}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        What do you feel is missing from your FIT?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckboxBtn
                        disabled
                        part={iMissingFit}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="missingFit"
                        value={values.missingFit}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="basic-info-title">
                        Would you wear any of these denim styles?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4}>
                          <RadioButtonImage
                            disabled
                            group={iDenimStyle1}
                            name="denimStyle1"
                            value={values.denimStyle1}
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                          <RadioButtonImage
                            disabled
                            group={iDenimStyle2}
                            name="denimStyle2"
                            value={values.denimStyle2}
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                          <RadioButtonImage
                            disabled
                            group={iDenimStyle3}
                            name="denimStyle3"
                            value={values.denimStyle3}
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                          <RadioButtonImage
                            disabled
                            group={iDenimStyle4}
                            name="denimStyle4"
                            value={values.denimStyle4}
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
                        How often do you dress up for the following occasions?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomRadioGroup
                        disabled
                        name="dressupOccasion"
                        value={values.dressupOccasion}
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        content={iDressupOccasion}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomCheckbox
                        disabled
                        content={iMissingCloset}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        name="missingCloset"
                        value={values.missingCloset}
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
              initialValues={wPriceRange == null ? initPriceRange : wPriceRange}
              enableReinitialize
            >
              {({ errors, handleChange, isSubmitting, touched, values }) => (
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
                  </Grid>
                </Form>
              )}
            </Formik>
            <Formik
              initialValues={
                wStyleCustom == null ? initStyleCustom : wStyleCustom
              }
              enableReinitialize
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
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
                              src={values?.dsgnImgUrl1st || `${Logo}.webp`}
                              fallback={values?.dsgnImgUrl1st || `${Logo}.png`}
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
                              src={values?.dsgnImgUrl2nd || `${Logo}.webp`}
                              fallback={values?.dsgnImgUrl2nd || `${Logo}.png`}
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
                              src={values?.dsgnImgUrl3rd || `${Logo}.webp`}
                              fallback={values?.dsgnImgUrl3rd || `${Logo}.png`}
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
        </div>
      </Paper>
      <Button className="admin-submit-btn" onClick={downloadPdf}>
        Print
      </Button>
    </>
  );
};

export default WomenView;
