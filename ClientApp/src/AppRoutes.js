import { FetchData } from "./components/FetchData";
import { Vote } from "./components/Vote";
import { VoteSetting  } from "./components/VoteSetting";


const AppRoutes = [
  {
    index: true,
    element: <Vote />
  },
  {
    path: '/voteset/3664120',
    element: <VoteSetting />
  },
  {
    path: '/fetchdata',
    element: <FetchData />
  }
];

export default AppRoutes;
