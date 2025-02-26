import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";



export default function Login() {
  const axiosApi = useAxios()
  const { googleSignIn, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleGoogle = () => {
    googleSignIn()
      .then(data => {
        const user = {
          email: data.user.email,
          name: data.user.displayName,
        };
        console.log("Registered Email", user)
        axiosApi.post('/users', user)
          .then(res => {
            console.log("user response", res.data)
          })
          .catch(err => {
            console.log("error", err)
          })
        navigate('/')
      })
      .catch(err => {
        console.log("error", err)
      })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-white">
      <div className="glass-card p-8 rounded-xl max-w-md w-full mx-4 space-y-6 ">
        <h1 className="text-3xl font-bold text-center text-foreground">
          Task Management
        </h1>
        <p className="text-center text-muted-foreground">
          Sign in to manage your tasks
        </p>
        <div className="flex justify-center">
          <button onClick={handleGoogle}
            className="btn bg-white text-black border-[#e5e5e5] w-3/4">

            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
