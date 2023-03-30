import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Countries } from '../../helpers/Countries';
import { CountryType } from '../../types/country';
import './navigation.scss';

const Navigation = () => {
  const [selectedCountry, setSelectedCountry] = useState(-1);
  const { t } = useTranslation();
  const params = useParams();

  useEffect(() => {
    const country = Countries.find(
      (country) => country.name === params.country
    );
    if (country) setSelectedCountry(Countries.indexOf(country));
  }, [params.country]);

  return (
    <div className="navigation">
      {Countries.map((country: CountryType, index: number) => {
        return (
          <a href={`/country/${country.name}`} target="_self" key={index}>
            <div
              className={`navigation__country ${
                selectedCountry === index ? `navigation__country-selected` : ``
              }`}
            >
              <div className="navigation__country-flag-wrapper">
                <img
                  src={country.flagImg}
                  width={'auto'}
                  height={30}
                  alt="flag"
                />
              </div>
              <p>{t(country.label)}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Navigation;
