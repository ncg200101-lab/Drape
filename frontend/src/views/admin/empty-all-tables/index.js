import { Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  Chip,
  Box,
  Paper,
  Button,
  Divider
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

const EmptyAllTables = () => {
  const tables = [
    { name: 'batch_mailing_reports', count: 7053 },
    { name: 'blog_category', count: 4 },
    { name: 'blog_comments', count: 79 },
    { name: 'blog_rating', count: 19 },
    { name: 'blog_tag', count: 1 },
    { name: 'blogs', count: 17 },
    { name: 'career_dynamic', count: 299 },
    { name: 'catelogs', count: 11 },
    { name: 'chat_category_images', count: 23, mandatory: true },
    { name: 'chat_messages', count: 0 },
    { name: 'clients_birthday', count: 724 },
    { name: 'clothing_categories_we_avoid', count: 0 },
    { name: 'comment_scndreply', count: 9 },
    { name: 'comments_reply', count: 13 },
    { name: 'custom_desine', count: 129 },
    { name: 'customer_product_review', count: 153 },
    { name: 'customer_stylist', count: 18 },
    { name: 'deliver_date', count: 584 },
    { name: 'email_preferences', count: 2 },
    { name: 'fabrics_or_embellishments', count: 0 },
    { name: 'fit_cut', count: 0 },
    { name: 'flaunt_arms', count: 0 },
    { name: 'giftcard', count: 7 },
    { name: 'help_desks', count: 48075 },
    { name: 'in_colors', count: 30 },
    { name: 'in_product_type', count: 44 },
    { name: 'in_rack', count: 61 },
    { name: 'influencers', count: 13 },
    { name: 'kid_clothing_type', count: 134 },
    { name: 'kid_focus_on_sending', count: 0 },
    { name: 'kid_purchase_clothing', count: 0 },
    { name: 'kid_styles', count: 126 },
    { name: 'kids_details', count: 300 },
    { name: 'kids_personality', count: 0 },
    { name: 'kids_pricing_shoping', count: 0 },
    { name: 'kids_primary', count: 0 },
    { name: 'kids_size_fit', count: 134 },
    { name: 'lets_plan_your_first_fix', count: 348 },
    { name: 'matching_case', count: 1141 },
    { name: 'men_accessories', count: 590 },
    { name: 'men_fit', count: 131 },
    { name: 'men_stats', count: 167 },
    { name: 'men_style', count: 176 },
    { name: 'men_style_sphere_selections', count: 131 },
    { name: 'mens_brands', count: 1144 },
    { name: 'my_item', count: 0 },
    { name: 'news', count: 7 },
    { name: 'notifications', count: 541 },
    { name: 'offer_promocode', count: 23 },
    { name: 'pages', count: 40, mandatory: true },
    { name: 'payment_card_details', count: 359 },
    { name: 'payment_getways', count: 1468 },
    { name: 'paymentmode', count: 1 },
    { name: 'payments', count: 503 },
    { name: 'personalized_fix', count: 168 },
    { name: 'products', count: 1289 },
    { name: 'promocode', count: 10 },
    { name: 'rather_downplay', count: 0 },
    { name: 'refer_friends', count: 18 },
    { name: 'sales_not_applicable_state', count: 8 },
    { name: 'settings', count: 71, mandatory: true },
    { name: 'shipping_address', count: 369 },
    { name: 'size_chart', count: 169 },
    { name: 'social_media', count: 4, mandatory: true },
    { name: 'style_quizs', count: 0 },
    { name: 'supply_deduct', count: 890 },
    { name: 'supply_product_categories', count: 2 },
    { name: 'supply_products', count: 11 },
    { name: 'supply_users', count: 1 },
    { name: 't_shirts_would_wear', count: 0 },
    { name: 'test_debasish', count: 26032 },
    { name: 'typically_wear_men', count: 167 },
    { name: 'under_maintenance', count: 1 },
    { name: 'usage_products', count: 1805 },
    { name: 'user_applied_code_order_review', count: 10 },
    { name: 'user_details', count: 545 },
    { name: 'user_extra_items', count: 11 },
    { name: 'user_mail_template_giftcode', count: 2 },
    { name: 'user_mail_template_promocode', count: 10 },
    { name: 'user_uses_giftcode', count: 4 },
    { name: 'user_uses_offer_code', count: 35 },
    { name: 'user_uses_promocode', count: 16 },
    { name: 'users', count: 622, mandatory: true },
    { name: 'wallets', count: 386 },
    { name: 'wear_type', count: 0 },
    { name: 'wemen_jeans_length', count: 0 },
    { name: 'wemen_style_sphere_selections', count: 1142 },
    { name: 'women_color_avoid', count: 0 },
    { name: 'women_fabrics_avoid', count: 0 },
    { name: 'women_heel_hight_prefer', count: 1355 },
    { name: 'women_incorporate_wardrobe', count: 0 },
    { name: 'women_information', count: 168 },
    { name: 'women_jeans_rise', count: 0 },
    { name: 'women_jeans_style', count: 152 },
    { name: 'women_price', count: 0 },
    { name: 'women_prints_avoid', count: 0 },
    { name: 'women_rather_downplay', count: 0 },
    { name: 'women_shoe_prefer', count: 1355 },
    { name: 'women_style', count: 168 },
    { name: 'women_typical_purchase_cloth', count: 0 },
    { name: 'your_child_fix', count: 0 },
    { name: 'your_child_personality', count: 0 },
    { name: 'your_proportions', count: 0 }
  ];
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Promocode Listing</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="#ff0000">
              All (*) fields tables are should be not delete
            </Typography>
          </Grid>
          {tables.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <span>
                <strong>{item?.name}</strong>{' '}
                <Chip size="small" label={`${item?.count}`} />
                {item?.mandatory ? (
                  <span style={{ color: 'red' }}> *</span>
                ) : null}
              </span>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button className="admin-submit-btn error">Empty All Tables</Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default EmptyAllTables;
