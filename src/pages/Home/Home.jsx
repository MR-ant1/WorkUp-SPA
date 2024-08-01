
import './Home.css'
import { useNavigate } from 'react-router-dom/dist'
import { login, userData } from '../../app/Slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { validate } from '../../utils/validations'
import { toast, ToastContainer } from 'react-toastify'
import { decodeToken } from 'react-jwt'
import { loginUser } from '../../services/api.calls'
import { LoginInput } from '../../common/LoginInput/LoginInput.jsx'
import { LoginButton } from '../../common/LoginButton/LoginButton.jsx'

export const Home = () => {
    const navigate = useNavigate()

    const reduxUser = useSelector(userData)

    const dispatch = useDispatch()

    useEffect(() => {
        if (reduxUser?.tokenData?.token) {
            navigate('/')
        }
    }, [reduxUser?.tokenData?.token])

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: ""
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }));
    };

    useEffect(() => {
        toast.dismiss()
        userError.emailError &&
            toast.error(userError.emailError)
        userError.passwordError &&
            toast.error(userError.passwordError)
    }, [userError])

    const loginFunction = async () => {

        try {
            const fetched = await loginUser(user);

            if (fetched.message === "Usuario logueado correctamente") {
                toast.success(fetched.message)
            } else toast.error(fetched.message)


            if (fetched.token) {
                const decoded = decodeToken(fetched.token)

                const passInfo = {
                    token: fetched.token,
                    user: decoded
                };
                setTimeout(() => {
                    dispatch(login({ tokenData: passInfo }))
                    navigate("/")
                }, 1500)
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='container'>
            <div className='formContainer'>
               <LoginInput
                     className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                         }`}
                     type={"email"}
                     placeholder={"email"}
                     name={"email"}
                     value={user.email || ""}
                     changeFunction={inputHandler}
                     blurFunction={checkError}
               />

                <LoginInput
                        className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"password"}
                        placeholder={"password"}
                        name={"password"}
                        value={user.password || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />

                    <LoginButton
                        className={"loginButtonDesign"}
                        title={"Login"}
                        emitFunction={loginFunction}
                    />
            </div>

            <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </div>
    )
}