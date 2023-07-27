import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Vote } from "./components/Vote";
import { VoteSetting  } from "./components/VoteSetting";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/vote',
    element: <Vote />
  },
  {
    path: '/voteset/3664120',
    element: <VoteSetting />
  }
];

export default AppRoutes;
