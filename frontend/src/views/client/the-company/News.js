import { Link } from 'react-router-dom';
import { Typography, Grid, Divider } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import CAbout from '../components/About';
import DFnewImgTag from 'utils/DFnewImgTag';

const Executive = GenS3Link('landing/images/client/post/executive');
const Vote = GenS3Link('landing/images/client/post/vote');
const Kids = GenS3Link('landing/images/client/post/kids');
const Box = GenS3Link('landing/images/client/post/box');
const Holiday = GenS3Link('landing/images/client/post/holiday');
const Men = GenS3Link('landing/images/client/post/men');
const Spring = GenS3Link('landing/images/client/post/spring');
const PlusSize = GenS3Link('landing/images/client/post/plus-size');
const Coming = GenS3Link('landing/images/client/post/coming');

const news = [
  {
    title: 'Drape Fit the science of style',
    date: 'Posted by Drape Fit, 30 August, 22',
    image: Executive
  },
  {
    title: 'Houston, Texas: 2nd Nov, 2020 : GO VOTE! #Election2020',
    date: 'Posted by drapefit.com, 02 November, 20',
    image: Vote
  },
  {
    title: 'Drape Fit launching the Kids Personal Styling services',
    date: 'Posted by drapefit.com, 04 August, 20',
    image: Kids
  },
  {
    title:
      'Look Stylish Throughout Your Pregnancy With Drape Fit Maternity Fits',
    date: 'Posted by Drape Fit, 17 April, 20',
    image: Box
  },
  {
    title: 'Holiday Fashion For Adults...',
    date: 'Posted by Fox59.com, 27 December, 19',
    image: Holiday
  },
  {
    title: '10 Best Dressed Men Of The Week.',
    date: 'Posted by Nytimes.com, 24 December, 19',
    image: Men
  },
  {
    title: 'Top 13 Spring Collections 2020.',
    date: 'Posted by Nytimes.com, 24 December, 19',
    image: Spring
  },
  {
    title:
      "Age and Size doesn't matter. More Plus-Size Walked At Fashion Week.",
    date: 'Posted by Nytimes.com, 24 December, 19',
    image: PlusSize
  },
  {
    title: '2020 is Coming: How will it Look?',
    date: 'Posted by Nytimes.com, 24 December, 19',
    image: Coming
  }
];

const result = {
  link: 'Home',
  typo: 'News',
  title: {
    first: '',
    last: 'NEWS'
  },
  content: (
    <>
      <Grid className="h-align-center" container spacing={4}>
        {news.map((item, index) => (
          <>
            <Grid key={index} item xs={10} sm={6} lg={7}>
              <Link className="post-title">{item.title}</Link>
              <Link className="post-read-more">Read more...</Link>
              <Typography className="post-date">{item.date}</Typography>
            </Grid>
            <Grid item xs={10} sm={4} lg={3}>
              <DFnewImgTag
                src={`${item.image}.webp`}
                fallback={`${item.image}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '60px' }}
                alt={item.title}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  )
};

const News = () => {
  return <CAbout propsValue={result} />;
};

export default News;
