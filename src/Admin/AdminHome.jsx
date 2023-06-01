import React from "react";
import { useTranslation } from "react-i18next";
import "../../src/App.css";
import YoutubeEmbed from "../components/YoutubeEmbed";

function AdminHome() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <h1>
        {t(
          "Enjoy your real-time VoiceBox from Eleven Labs sounds, and you wont believe the result."
        )}
      </h1>
      <br />
      <br />
      <YoutubeEmbed embedId="lNE7K60H4fg" />
      <br />
      <br />
    </div>
  );
}

export default AdminHome;
