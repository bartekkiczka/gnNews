import { Dispatch, SetStateAction } from 'react';
import './headerPopup.scss';

interface Props {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const HeaderPopup = ({ showPopup, setShowPopup }: Props) => {
  return (
    <div
      className={`header-popup__overlay ${
        !showPopup ? `header-popup__overlay-disabled` : ``
      }`}
    >
      <div
        className={`header-popup__content ${
          !showPopup ? `header-popup__content-disabled` : ``
        }`}
      >
        <div
          className="header-popup__cross"
          onClick={() => setShowPopup(false)}
        ></div>
        <p>
          Jeżeli chodzi o największą trudność, to projekt tak na prawdę w ogóle
          mi jej nie sprawił. Sprawił mi natomiast ogromną ilość frajdy - bardzo
          lubię pisać tego typu strony i zadania, które faktycznie są związane z
          pracą Front End Developera.
        </p>
      </div>
    </div>
  );
};

export default HeaderPopup;
