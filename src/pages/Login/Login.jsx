
import { Checkbox, TextField } from '@mui/material';
import useAuth from './../../hooks/useAuth';
import { Bloodtype } from '@mui/icons-material';
import {  red } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const { signIn, user } = useAuth();
    const loginNavigate = useNavigate()
   
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password)
        signIn(email,password)
        .then(res => {
            toast.success("Login successful");
            loginNavigate('/')

        })
        .catch(error => {
            toast.error(`${error}`);
            console.log(error)
        })

    }
    
    return (
      <body className="dark:bg-slate-900 bg-[#C91C1C]/5 flex h-[100vh] items-center py-16">
        <main className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="justify-center text-4xl flex items-center font-bold text-gray-800 dark:text-white">
                  Login <Bloodtype sx={{ mr: 1, fontSize: "35px",color:'red' }} />
                </h1>
              </div>

              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-y-8">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      size="small"
                      name="email"
                    />
                    <TextField
                      id="outlined-basic"
                      label="password"
                      variant="outlined"
                      size="small"
                      name="password"
                      type="password"
                    />

                    <div>
                      <div className="flex items-center">
                        <div className="flex">
                          <Checkbox
                            {...label}
                            defaultChecked
                            sx={{
                              color: red[800],
                              "&.Mui-checked": {
                                color: red[600],
                              },
                            }}
                          />
                        </div>
                        <div className="ms-1">
                          <label
                            htmlFor="remember-me"
                            className="text-sm dark:text-white"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account yet ?
                        <a
                          className="text-red-700 mx-2 font-semibold border-b-2 border-red-700"
                          href="/register"
                        >
                          Sign up here
                        </a>
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </body>
    );
};

export default Login;