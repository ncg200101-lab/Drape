import { Grid, Typography } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const armour = GenS3Link('landing/images/client/brands/armour');
const asos = GenS3Link('landing/images/client/brands/asos');
const bonobos = GenS3Link('landing/images/client/brands/bonobos');
const boss = GenS3Link('landing/images/client/brands/boss');
const brooks = GenS3Link('landing/images/client/brands/brooks');
const gap = GenS3Link('landing/images/client/brands/gap');
const hm = GenS3Link('landing/images/client/brands/hm');
const hurley = GenS3Link('landing/images/client/brands/hurley');
const jcrew = GenS3Link('landing/images/client/brands/jcrew');
const landsend = GenS3Link('landing/images/client/brands/landsend');
const levis = GenS3Link('landing/images/client/brands/levis');
const mango = GenS3Link('landing/images/client/brands/mango');
const nike = GenS3Link('landing/images/client/brands/nike');
const northface = GenS3Link('landing/images/client/brands/northface');
const pata = GenS3Link('landing/images/client/brands/pata');
const penguin = GenS3Link('landing/images/client/brands/penguin');
const scotch = GenS3Link('landing/images/client/brands/scotch');
const tommy = GenS3Link('landing/images/client/brands/tommy');
const uniqlo = GenS3Link('landing/images/client/brands/uniqlo');
const vans = GenS3Link('landing/images/client/brands/vans');
const vineyard = GenS3Link('landing/images/client/brands/vineyard');
const zara = GenS3Link('landing/images/client/brands/zara');

const CBrands = () => {
  return (
    <>
      <Grid container spacing={4} className="brands">
        <Grid item xs={12}>
          <Typography className="orange-bold-title">
            Brands Are Ready For You
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="brands-content">
            We are working with many brands. According to your selection we will
            ship a complete FIT Box that will FIT under your budget.
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${penguin}.webp`}
            fallback={`${penguin}.png`}
            width="100%"
            alt="brand - Penguin"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${nike}.webp`}
            fallback={`${nike}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - NIKE"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${scotch}.webp`}
            fallback={`${scotch}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - SCOTCH & SODA"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${gap}.webp`}
            fallback={`${gap}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - GAP"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${pata}.webp`}
            fallback={`${pata}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - patagonia"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${tommy}.webp`}
            fallback={`${tommy}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - Tommy Bahama"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${boss}.webp`}
            fallback={`${boss}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - BOSS"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${vineyard}.webp`}
            fallback={`${vineyard}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - vineyards vines"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${vans}.webp`}
            fallback={`${vans}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - VANS"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${hurley}.webp`}
            fallback={`${hurley}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - Hurley X"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${brooks}.webp`}
            fallback={`${brooks}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - Brooks Brothers"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${zara}.webp`}
            fallback={`${zara}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - ZARA"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${levis}.webp`}
            fallback={`${levis}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - LEVI'S"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${armour}.webp`}
            fallback={`${armour}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - UNDER ARMOUR"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${bonobos}.webp`}
            fallback={`${bonobos}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - BONOBOS"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${landsend}.webp`}
            fallback={`${landsend}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - LANDS' END"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${jcrew}.webp`}
            fallback={`${jcrew}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - J.CREW"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${asos}.webp`}
            fallback={`${asos}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - asos"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${mango}.webp`}
            fallback={`${mango}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - MANGO"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${hm}.webp`}
            fallback={`${hm}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - H&M"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${uniqlo}.webp`}
            fallback={`${uniqlo}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - UNIQLO"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DFnewImgTag
            src={`${northface}.webp`}
            fallback={`${northface}.png`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '90px' }}
            alt="brand - THE NORTH FACE"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CBrands;
