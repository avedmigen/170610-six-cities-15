import Tabs from '../../components/common/tabs/tabs';
import Header from '../../components/ui/header/header';
import { citiesNames } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/app-process/app-process.selectors';

function ErrorScreen(): JSX.Element {
  const activeCity = useAppSelector(getCity);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={citiesNames} />
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in{' '}
                  {activeCity}
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ErrorScreen;
