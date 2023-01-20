import CreateUser from './Components/UserForm/CreateUser'
import UpdateUser from './Components/UserForm/UpdateUser'
import SearchUsers from './Components/UserForm/SearchUser';
import EmailAllUsers from './Components/UserEmail/EmailAllUser';

function App() {
  return (
    <div>
       <h1>FLASK CRUD APP</h1>
        <CreateUser />
        <UpdateUser />
        <SearchUsers />
        <EmailAllUsers />
    </div>
  );
}

export default App;
