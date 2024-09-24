/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Turnstile } from "@marsidev/react-turnstile";
import axios from "axios";
import { useState } from "react";
import { env } from "~/configs/environment";

const validCaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState();
  const handleTokenReceived = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/verify-captcha",
        {
          token: token,
        }
      );

      if (response.data.success) {
        console.log("CAPTCHA passed!");
      } else {
        console.log("CAPTCHA failed. Try again.");
      }
    } catch (error) {
      console.error("Error verifying CAPTCHA:", error);
    }
  };

  return (
    <div>
      <Turnstile
        siteKey={env.SITE_KEY}
        options={{ theme: "light", action: "login", execution: "render" }}
        onSuccess={(token) => handleTokenReceived(token)}
        onError={() => setCaptchaToken(null)}
      />
    </div>
  );
};

export default validCaptcha;
