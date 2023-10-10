import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import mockupUserData from "../Mockup_data/Userdata";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.some((userData) => userData.email === email);

    if (user) {
      setError("Email is already registered.");
    } else if (password === confirmpass) {
      const newUserId = existingUsers.length + 1;
      const newUser = {
        id: newUserId,
        email: email,
        username: name,
        password: password,
      };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      navigate("/");
      alert("Register Successfully.");
    } else {
      setError("Password doesn't match.");
    }

    setEmail("");
    setName("");
    setPassword("");
    setConfirmPass("");
  };

  return (
    <>
      <div className="h-screen text-white flex justify-center items-center bg-cover bg-[url('https://theagiledirector.com/images/kanban-blambarde-BYNC-small.jpg')] ">
        <div className="bg-slate-800 border border-slate-400 rounded-md p-10 shadow-lg backdrop-blur-md bg-opacity-30 w-1/4">
          <h2 className="flex justify-end	">Kanban Board</h2>
          <h1 className="text-4xl font-bold text-white text-center mb-6 ">
            Sign Up
          </h1>
          <form onSubmit={handleSubmitRegister} className="flex flex-col">
            <label className="relative mt-3 mb-2" htmlFor="email">
              <b>Email</b>
            </label>
            <input
              className="block w-70 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="Example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="relative mt-3 mb-2" htmlFor="name">
              <b>Name</b>
            </label>
            <input
              className="block w-70 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
              type="text"
              name="name"
              id="name"
              placeholder="Tirakorn Non"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="relative mt-3 mb-2" htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className="block w-70 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
              type="password"
              placeholder="Password"
              name="psw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="relative mt-3 mb-2" htmlFor="confirm-psw">
              <b>Confirm Password</b>
            </label>
            <input
              className="block w-70 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none"
              type="password"
              placeholder="Confirm-Password"
              name="confirm-psw"
              value={confirmpass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />

            <button
              className="w-full font-medium mt-5 rounded-full bg-white text-purple-500 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white py-2 transition-colors duration-500"
              type="submit"
            >
              Register
            </button>
            <div className="flex text-center justify-center my-4 gap-1 ">
              <p>If you have an account</p>
              <Link className="text-red-500" to="/">
                Login!
              </Link>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Register;
