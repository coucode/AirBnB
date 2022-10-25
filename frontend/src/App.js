import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import SpotDetail from "./components/SpotDetail";
import Listings from "./components/ListingsPage"
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="page">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <div className="splashContainer">
              <SplashPage />
            </div>
          </Route>
          <Route exact path="/spots/:id">
            <div className="spotContainer">
              <SpotDetail />
            </div>
          </Route>
          <Route exact path="/listings">
            <div className="listingContainer">
              <Listings />

            </div>
          </Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
}

export default App;