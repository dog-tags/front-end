import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return <PrivateRoute component={Dashboard} />;
}
