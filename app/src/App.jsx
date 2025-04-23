import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearch = async (event) => {
    setSearch(event.target.value);
    if (event.target.value === "null") {
      setUser(null);
    }
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const response = await axios.get(
        `https://api.github.com/users/${event.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };
  return (
    <div className="my-0 mx-auto md:w-[1200px] min-h-[90vh] text-center flex flex-col justify-center items-center">
      <h2 className=" text-3xl mb-3">GitHub Finder ✨</h2>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        className="border border-gray-300 rounded-lg p-2 mb-7"
        placeholder="Search.."
      />

      {user && (
        <div className="flex flex-col justify-center items-center shadow-lg p-4 w-[300px]">
          <img
            className="w-40 h-40 rounded-full"
            src={user.avatar_url}
            alt="profle-pic"
          />
          <p className="text-center mt-3">{user.name}</p>
          <p className="text-center mt-1 text-gray-500">{user.login}</p>
          <div className="flex gap-x-4 mt-2">
            <p>Followers: {user.followers}</p>
            <span>Following: {user.following}</span>
          </div>

          <a
            href={user.html_url}
            className="text-blue-400 mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profile link
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
