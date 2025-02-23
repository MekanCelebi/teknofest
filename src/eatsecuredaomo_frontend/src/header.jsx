import React, { useState } from "react";
import { createActor, eatsecuredaomo_backend } from "../../declarations/eatsecuredaomo_backend/index.js";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import Box from "@mui/material/Box";

export default function Header() {
  const [greet, setGreet] = useState("");
  let actor = eatsecuredaomo_backend;

  const handleGreet = async (e) => {
    e.preventDefault();
    try {
      const greeting = await actor.greet();
      console.log(greeting);
      setGreet(greeting);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943",
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const agent = new HttpAgent({ identity });
          actor = createActor(process.env.CANISTER_ID_EATSECUREDAOMO_BACKEND, {
            agent,
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      gap={5}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
      }}
      sx={{ pb: 3, borderRadius: "10px" }}
    >
      <img
  src="/logo.png"
  alt="Your logo"
  width="1000000"
  style={{ borderRadius: "30%", paddingLeft: "80px" }}
/>

      <div>
        <button onClick={handleLogin}>Login!</button> <br />
        <br />
        <button onClick={handleGreet}>Click Me!</button> <br/><br/><br/>
        {greet}
      </div>
    </Box>
  );
}
