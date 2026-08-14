import { useState } from "react"
function App() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [gender, setGender]= useState("")
  const [email ,setEmail]=useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e) => {

  e.preventDefault()

  // Checking all fields
  if (
    name === "" ||
    username === "" ||
    gender === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Fill in all the fields")
    return
  }

  // Check password length
  if (password.length < 8) {
    alert("Password must be at least 8 characters")
    return
  }

  // Check username length
  if (username.length < 4) {
    alert("Username must be at least 4 characters")
    return
  }

  // Check username characters
  const usernamePattern = /^[a-zA-Z0-9_]+$/

  if (!usernamePattern.test(username)) {
    alert("Username can only contain letters, numbers and underscore")
    return
  }

  // Check passwords
  if (password !== confirmPassword) {
    alert("Passwords do not match! Try again")
    return
  }

  // Send data to backend
  try {

    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          username,
          gender,
          email,
          password
        })
      }
    )

    const data = await response.json()

    // Show backend response
    alert(data.message)

  } catch (error) {

    alert("Could not connect to the server")

  }
}

  return (
    //main page container
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">

    {/*grey box containing for registration form*/}
      <div className="bg-gray-100 p-10 rounded-lg shadow-md w-[550px]">

        {/*page heading*/}
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

      {/*registration form*/}
        <form onSubmit={handleSubmit}>
          
         {/* name field */}
          <label className="block mb-2">
            Name
          </label>

          <input
            type="text"
            placeholder="enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />
          
           {/* username field */}
          <label className="block mb-2">
            Username
          </label>

          <input
          type="text"
          placeholder="enter your username"
          value={username}
            onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          />
         
          {/*gender field*/}
          <label className="block mb-2">
          Gender
          </label>
          
          <div className="flex gap-6 mb-4">

             {/* Male option */}
             <label className="flex items-center gap-2">
             <input
               type="radio"
                name="gender"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
               />
               Male
                </label>

               {/* Female option */}
                <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                   value="female"
                   onChange={(e) => setGender(e.target.value)}
                />
                  Female
               </label>
           
          </div>
        
          {/* Email field */}
          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
              placeholder="enter your email"
              value={email}
             onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />
           
           {/* password field */}  
          <label className="block mb-2">
            Password
          </label>

          <input
            type="password"
              placeholder="enter your password"
              value={password}
             onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

           {/* confirm password field */}
          <label className="block mb-2">
            Confirm Password
          </label>

          <input
            type="password"
              placeholder="confirm your password"
              value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded mb-6"
          />
       
           {/* register button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  )
}

export default App