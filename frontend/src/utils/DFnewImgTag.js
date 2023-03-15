import LazyLoad from 'react-lazy-load';
import { useLocation } from 'react-router';

import DFnewLogger from './DFnewLogger';
import GlobalEnv from 'configs/GlobalEnv';
import MyEnvConfig from 'configs/MyEnvConfig';

const baseurl = GlobalEnv.isDebug
  ? `${MyEnvConfig.baseurl.dev}/dfstatic`
  : `${MyEnvConfig.baseurl.prod}/dfstatic`;

const DFnewImgTag = ({ src, fallback, alt, lzheight = '100%', ...rest }) => {
  const location = useLocation();
  const noImageBase64 = `data:image/webp;base64,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`;
  let errFlag = true;

  return (
    <LazyLoad height={lzheight}>
      {location.pathname.includes('/dfadmin') ? (
        <img
          src={`${fallback?.replace(
            'https://new-drapefit-bucket.s3.ap-south-1.amazonaws.com/landing/images',
            baseurl
          )}`}
          alt={alt}
          onError={(e) => {
            try {
              if (errFlag) {
                errFlag = false;
                e.target.src = noImageBase64;
              }
            } catch (e) {
              DFnewLogger(e);
            }
          }}
          {...rest}
        />
      ) : (
        <picture>
          <source srcSet={src} />
          <img
            // src={fallback}
            src={`${fallback?.replace(
              'https://new-drapefit-bucket.s3.ap-south-1.amazonaws.com/landing/images',
              baseurl
            )}`}
            alt={alt}
            onError={(e) => {
              try {
                if (errFlag) {
                  errFlag = false;
                  e.target.parentNode.childNodes[0].srcset = noImageBase64;
                  e.target.src = noImageBase64;
                }
              } catch (e) {
                DFnewLogger(e);
              }
            }}
            {...rest}
          />
        </picture>
      )}
    </LazyLoad>
  );
};

export default DFnewImgTag;
