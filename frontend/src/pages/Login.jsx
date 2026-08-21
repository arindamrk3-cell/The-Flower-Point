import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../Admin/services/authServices";
import { Navigate } from "react-router-dom";
const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await loginAdmin(form);

            localStorage.setItem(
                "token",
                response.token
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(response.data)
            );

            navigate("/admin/dashboard");

        }

        catch(err){

            console.log(err);

            alert("Invalid Email or Password");

        }

        finally{

            setLoading(false);

        }

    };
    const token = localStorage.getItem("token");

if (token) {
    return <Navigate to="/admin/manage-designs" replace />;
}

    return(

<section className="flex min-h-screen items-center justify-center bg-gray-100">

<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">

<h1 className="mb-8 text-center text-3xl font-bold">

Flower Point Admin

</h1>

<form
onSubmit={handleSubmit}
className="space-y-5"
>

<input

type="email"

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

className="w-full rounded-xl border p-4"

required

/>

<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

className="w-full rounded-xl border p-4"

required

/>

<button

type="submit"

disabled={loading}

className="w-full rounded-xl bg-rose-700 py-4 text-white"

>

{loading ? "Logging In..." : "Login"}

</button>

</form>

</div>

</section>

);

};

export default Login;