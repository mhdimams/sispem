import { useEffect, useState } from 'react';
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import Routes from "./pages"
import './App.scss';

function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useEffect(() => {
    setupRootStore().then(setRootStore)
  }, [])

  if (!rootStore) return null

  return (
    <RootStoreProvider value={rootStore}>
      <Routes />
    </RootStoreProvider>
  );
}

export default App;
