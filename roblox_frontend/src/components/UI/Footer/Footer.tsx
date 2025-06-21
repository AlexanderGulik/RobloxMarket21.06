import React from 'react';
import classes from './Footer.module.css';
import { Link } from 'react-router';
import { CommonService } from '../../../utils/CommonService';

const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.FooterItem_1}>© Roblox Market - RM Shop {new Date().getFullYear()}</div>
      <div className={`${classes.flex} ${classes.FooterItem_2}`}>
        <Link to="/termofuse">
          <div className={classes.Link}>Пользовательское соглашение</div>
        </Link>
        <Link to="/privacypolicy">
          <div className={classes.Link}>Политика конфиденциальности</div>
        </Link>
      </div>
      <div className={classes.FooterItem_3} onClick={CommonService.scrollToTop}>
        <span className={classes.BackToTop}>
          Back to top <span className={classes.Arrow}>&#8593;</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
