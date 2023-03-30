import { Dispatch, SetStateAction } from 'react';

interface Props {
  showMobileSlider: boolean;
  setShowMobileSlider: Dispatch<SetStateAction<boolean>>;
}

const HamburgerMenu = ({ showMobileSlider, setShowMobileSlider }: Props) => {
  return (
    <div
      className="header__mobile-hamburger"
      onClick={() => setShowMobileSlider(!showMobileSlider)}
    >
      {[1, 2, 3].map((e: number, index: number) => {
        return (
          <div className="header__mobile-hamburger-element" key={index}></div>
        );
      })}
    </div>
  );
};

export default HamburgerMenu;
