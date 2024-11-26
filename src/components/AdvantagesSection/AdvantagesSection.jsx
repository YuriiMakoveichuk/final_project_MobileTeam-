import rectangleMobile from "../../img/woman/Rectangle-mobile.jpg";
import rectangleMobile2x from "../../img/woman/Rectangle-mobile@2x.jpg";
import rectangleDesktop from "../../img/woman/Rectangle-desktop.jpg";
import rectangleDesktop2x from "../../img/woman/Rectangle-desktop@2x.jpg";
import rectangleTablet from "../../img/woman/Rectangle-tablet.jpg";
import rectangleTablet2x from "../../img/woman/Rectangle-tablet@2x.jpg";

import girl1 from "../../img/people/girl-1.jpg";
import boy from "../../img/people/boy.jpg";
import girl2 from "../../img/people/girl-2.jpg";
import boy2x from "../../img/people/boy@2x.jpg";
import girl12x from "../../img/people/girl-1@2x.jpg";
import girl22x from "../../img/people/girl-2@2x.jpg";

import css from "./AdvantagesSection.module.css";

function AdvantagesSection() {
  return (
    <div className={css.background}>
      <div className={css.imageContainer}>
        <div className={css.imageWoman}></div>
        {/* <img
          srcSet={`${rectangleMobile} 1x, ${rectangleMobile2x} 2x`}
          src={rectangleMobile}
          alt="Women drinking water"
        /> */}

        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`${rectangleDesktop} 1x, ${rectangleDesktop2x} 2x`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${rectangleTablet} 1x, ${rectangleTablet2x} 2x`}
          />
          <source
            media="(max-width: 767.98px)"
            srcSet={`${rectangleMobile} 1x, ${rectangleMobile2x} 2x`}
          />
          <img
            className={css.womanimg}
            src={rectangleDesktop}
            alt="woman drink water"
            loading="lazy"
          />
        </picture>

        <div className={css.customerSection}>
          <div className={css.customerPhotos}>
            <div className={css.customerPhotosContainer}>
              <div className={css.photoContainer}>
                <img
                  className={css.customerPhoto}
                  srcSet={`${girl2} 1x, ${girl22x} 2x`}
                  src={girl2}
                  alt="girl1"
                />
              </div>

              <div className={css.photoContainer}>
                <img
                  className={css.customerPhoto}
                  srcSet={`${boy} 1x, ${boy2x} 2x`}
                  src={boy}
                  alt="boy"
                />
              </div>

              <div className={css.photoContainer}>
                <img
                  className={css.customerPhoto}
                  srcSet={`${girl1} 1x, ${girl12x} 2x`}
                  src={girl1}
                  alt="girl2"
                />
              </div>
            </div>
            <p className={css.customerText}>
              Our{" "}
              <span className={css.highlightText}>
                happy
                <br />
              </span>
              customers
            </p>
          </div>
        </div>

        <div className={css.TextSection}>
          <div className={css.TextBox}>
            <div className={css.iconCircle}></div>
            <p className={css.Text}>Habit drive</p>
          </div>

          <div>
            <p className={css.statistics}>View statistics</p>
          </div>
          <div>
            <p className={css.rate}>Personal rate setting</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvantagesSection;
