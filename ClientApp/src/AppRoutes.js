import { VoteWrapper } from "./components/VoteWrapper";
import { AdminLoginWrapper } from "./components/AdminLoginWrapper";


const AppRoutes = [
  {
    index: true,
    element: <VoteWrapper />
  },
  {
    path: '/admin',
    element: <AdminLoginWrapper />
  }
];

export default AppRoutes;
