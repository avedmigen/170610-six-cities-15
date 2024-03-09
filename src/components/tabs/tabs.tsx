import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity } from '../../store/app-process/app-process.selectors';
import { changeCity } from '../../store/app-process/app-process.slice';

type TabsProps = {
  cities: string[];
};

function Tabs({ cities }: TabsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCity);

  const handleCityClick = (city: string) => {
    dispatch(changeCity({ city }));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <Link
                to={AppRoute.Main}
                className={`locations__item-link tabs__item ${
                  activeCity === city ? 'tabs__item--active' : ''
                }`}
                onClick={() => handleCityClick(city)}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
