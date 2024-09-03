import './App.css';
import { View } from './components/fetch_user/User';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddUser } from './components/add_user/CreateUser';
import { Updateuser } from './components/update_user/UpdateUser';
import { Login } from './components/login_user/Login';



function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <View />
    },
    {
      path: "/add",
      element: <AddUser />
    },

    {
      path: "/edit/:id",
      element:<Updateuser/>
    },

    {
      path: "/login",
      element:<Login/>
    },

  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>

    </div>
  );
}

export default App;
