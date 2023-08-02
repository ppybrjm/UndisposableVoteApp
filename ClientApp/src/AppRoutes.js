import { FetchData } from "./components/FetchData";
import { VoteWrapper } from "./components/Vote";
import { VoteSetting  } from "./components/VoteSetting";


const AppRoutes = [
  {
    index: true,
    element: <VoteWrapper />
  },
  {
    path: '/voteset/3664120',
    element: <VoteSetting />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
