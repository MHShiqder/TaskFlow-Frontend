import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Login from "../../Pages/Login";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";

const Home = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()

    }
    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold text-center my-5">TaskEasy</h1>
            </div>
            {
                !user ?
                    <Login></Login>
                    :
                    <>
                        <TaskList></TaskList>
                        <TaskForm></TaskForm>
                    </>

            }
            <div className="flex justify-center">
                <button className="btn btn-wide bg-gray-300 my-5" onClick={handleLogOut}>logout</button>
            </div>
        </div>
    );
};

export default Home;