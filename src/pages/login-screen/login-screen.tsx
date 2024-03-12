import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Locations from '../../components/login-screen/locations/locations';
import LoginForm from '../../components/login-screen/login-form/login-form';
import Header from '../../components/ui/header/header/header';
import { Cities } from '../../const';

function LoginScreen(): JSX.Element {
  const randomCityKey =
    Object.keys(Cities)[Math.floor(Math.random() * Object.keys(Cities).length)];

  const [randomCity, setRandomCity] = useState(randomCityKey);

  useEffect(() => {
    setRandomCity(randomCityKey);
  }, [randomCityKey]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities :: Login</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <Locations randomCity={randomCity} />
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
