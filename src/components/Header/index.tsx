import Select from 'react-select';
import HamburgerMenu from './HamburgerMenu';
import HeaderPopup from './HeaderPopup/HeaderPopup';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../enums/Languages';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { NewsViewModes } from '../../enums/NewsViewModes';
import { changeNewsView } from '../../store/news';
import { RootState } from '../../store/store';
import './header.scss';

const Header = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showMobileSlider, setShowMobileSlider] = useState<boolean>(false);
  const { i18n, t } = useTranslation();
  const newsViewModeState = useAppSelector(
    (state: RootState) => state.news.newsViewMode
  );
  const dispatch = useAppDispatch();

  const languageOptions = [
    { value: Languages.POLISH, label: t('header.polish') },
    { value: Languages.ENGLISH, label: t('header.english') },
  ];

  const handleChangeLanguage = useCallback(
    (data: string) => {
      i18n.changeLanguage(data);
    },
    [i18n]
  );

  const handleChangeNewsViewMode = (viewMode: string) => {
    dispatch(changeNewsView(viewMode));
  };

  const headerViewModes = (): JSX.Element => {
    return (
      <div className="header__view-modes">
        <div
          className={`header__view-modes-list ${
            newsViewModeState === NewsViewModes.LIST
              ? `header__view-modes-list-selected`
              : ``
          }`}
          onClick={() => handleChangeNewsViewMode(NewsViewModes.LIST)}
        >
          {[1, 2, 3, 4].map((e: number, index: number) => {
            return (
              <div
                className="header__view-modes-list-element"
                key={index}
              ></div>
            );
          })}
        </div>
        <div
          className={`header__view-modes-tile ${
            newsViewModeState === NewsViewModes.TILES
              ? `header__view-modes-tile-selected`
              : ``
          }`}
          onClick={() => handleChangeNewsViewMode(NewsViewModes.TILES)}
        >
          {[1, 2, 3, 4].map((e: number, index: number) => {
            return (
              <div
                className="header__view-modes-tile-element"
                key={index}
              ></div>
            );
          })}
        </div>
      </div>
    );
  };

  const headerPopup = (): JSX.Element => {
    return (
      <div className="header__popup-btn">
        <button onClick={() => setShowPopup(true)}>Popup</button>
      </div>
    );
  };

  const headerLanguages = (): JSX.Element => {
    return (
      <div className="header__languages">
        <Select
          options={languageOptions}
          styles={{
            container: (baseStyles, state) => ({
              ...baseStyles,
              cursor: 'pointer',
            }),
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#1e7ac9',
              primary25: '#dbdbdb',
            },
          })}
          isSearchable={false}
          onChange={(e) => {
            if (e) handleChangeLanguage(e.value);
          }}
          value={languageOptions.find(
            (option) => option.value === i18n.language
          )}
        />
      </div>
    );
  };

  return (
    <div className="header">
      <div className="header__name">
        <a href="/" target="_self">
          gnNews
        </a>
      </div>
      <HeaderPopup {...{ showPopup, setShowPopup }} />
      <div className="header__desktop">
        {headerViewModes()}
        {headerPopup()}
        {headerLanguages()}
      </div>
      <div className="header__mobile">
        <HamburgerMenu {...{ showMobileSlider, setShowMobileSlider }} />
      </div>
      <div
        className={`header__mobile-slider ${
          showMobileSlider ? `header__mobile-slider-visible` : ``
        }`}
      >
        <HamburgerMenu {...{ showMobileSlider, setShowMobileSlider }} />
        {headerViewModes()}
        {headerPopup()}
        {headerLanguages()}
      </div>
    </div>
  );
};

export default Header;
