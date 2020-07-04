import React from "react";
import AppHeader from "@components/AppHeader";
import AppContent from "@components/AppContent";
import { TalentsProvider } from "@hooks/useTalents";
import paths from "@util/data";

import styles from "./App.module.scss";

const App = () => {
  return (
    <TalentsProvider points={6} paths={paths}>
      <div className={styles.App}>
        <AppHeader />
        <AppContent />
      </div>
    </TalentsProvider>
  );
};

export default App;
