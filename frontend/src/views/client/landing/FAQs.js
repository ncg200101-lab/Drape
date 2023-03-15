import CFAQs from '../components/FAQs';

const result = [
  {
    title: 'How many Fits come in a Drape Fit Box?',
    content: 'There are 6 Fits of each Drape Fit Box.'
  },
  {
    title: 'How many Drape Fit Box do I get each month?',
    content:
      "We have subscription plan that include per month, every two month, every three months. To get your next Fit Box, keep what you love from your previous Fit Box and return rest in the USPS prepaid return envelop provided for you and drop it in the mail. As soon as you are eligible, we'll send you an email letting you know it's time to pick out the next Fit Box."
  },
  {
    title: 'How are my items chosen?',
    content:
      "First take your style quiz and your stylist will analyze your profile as per your age, size and budget. Stylist will handpicked and make a perfect style Fit Box for you. You can pin, screenshot and share what you love most from our social media platforms and share it with your Stylist. Add your Instagram or Facebook username to your style profile! Remember to follow us on Facebook, Instagram, Pinterest and Twitter to get the latest styles and sneak peeks of what's new at DRAPE FIT."
  },
  {
    title: 'What sizes do you carry?',
    content:
      "We currently carry women's sizes 0-12, XS-XL and waist size 24-32. We also offer maternity or plus size at this time. We currently offer men's sizes S, M, L, XL, XXL and waist size 30-34. We also provide Big & Tall Sizes. We currently offer kid's size newborn - 4T and Boy & Girl 5-14."
  },
  {
    title: 'How is the billing policy?',
    content:
      'For your first box, a $20 styling fee will be charged as soon as you order. For each subsequently scheduled box, a $20 styling fee will be charged after your Stylist begins styling your FIT Box.'
  },
  {
    title: 'What if I need a break or want to change my plan?',
    content:
      'There is no commitment with Drape Fit. You can change, pause or cancel your subscription at any time. Or you can email us to support@drapefit.com to pause your subscription.'
  }
];

const FAQs = () => {
  return <CFAQs propsValue={result} />;
};

export default FAQs;
