import { FetchData } from "./components/FetchData";
import { VoteWrapper } from "./components/VoteWrapper";
import { VoteSetting  } from "./components/VoteSetting";


const AppRoutes = [
  {
    index: true,
    element: <VoteWrapper />
  },
  {
    path: '/voteset/3664120',
    element: <VoteSetting />
  }
];

export default AppRoutes;
