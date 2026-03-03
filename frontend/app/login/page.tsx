// "use client";

// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div>
//       <h2>HRMS Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//         <br />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";

// export default function LoginPage() {
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       await login(email, password); // ✅ Correct usage
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500">
//       <div className="bg-white p-10 rounded-xl shadow-xl w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">HRMS Login</h2>

//         {error && (
//           <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
//             {error}
//           </div>
//         )}

//         <input
//           className="w-full border p-2 mb-3 rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="w-full border p-2 mb-4 rounded"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500">
      <div className="bg-white p-10 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">HRMS Login</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
