import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { I18nextProvider, useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Step from "./components/Step";
import BottomLead from "./components/BottomLead";
import Footer from "./components/Footer";
import logo from "./assets/logo.png";
import Rectangle_3 from "./assets/Rectangle_3.png";
import Rectangle_4 from "./assets/Rectangle_4.png";
import Rectangle_5 from "./assets/Rectangle_5.png";
import Chatgpt from "./pages/Chatgpt";
import { ContactUs } from "./pages/ContactUs";
import { CartSumContextProvider } from "./Store/CartSumContext";
import Cart from "./components/cart/Cart";
import ProductsPage from "./Store/ProductsPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Contact from "./pages/Contact";
import AdminHome from "./Admin/AdminHome";
import { AuthContext } from "./Store/AuthContext";

import "..//src/App.css";
import YoutubeEmbed from "..//src/components/YoutubeEmbed";

function App() {
  const { t, i18n } = useTranslation();
  const [question, setQuestion] = useState("");
  const { loggedIn } = useContext(AuthContext);

  const data = {
    hero: {
      appType: t("Chatbox"),
      tagLine: t(
        "Why do hard work when you can simply use the help of a chatbox"
      ),
      description: t("Try our Chatbox and Voicebox"),
      mainActionText: <Link to="/chatbox">{t("Chatbox")}</Link>,
      extraActionText: <Link to="/contact">{t("Voicebox")}</Link>,
    },
    step1: {
      title: t("Chatbox"),
      heading: t("You can use ChatBox completely free of charge."),
      description: t(
        "You can try the ChatBox app for free, but to use VoiceBox, you need to register. An account is created with your email and a desired password."
      ),
      img: Rectangle_3,
      alternate: false,
    },
    step2: {
      title: t("Reigster and try out"),
      heading: t(
        "Human Sounding Voice Robot Assistant That Speaks ANY Language"
      ),
      description: t("Top companies already tested Beta version of it.."),
      img: Rectangle_4,
      alternate: true,
    },
    step3: {
      title: t("We have many trainings and products available for purchase."),
      heading: t(
        "If you liked Chatbox, check out our new solution called VoiceBox."
      ),
      description: t(
        "You can select and add all the products to your shopping cart below. Register, pay, and use."
      ),
      img: Rectangle_5,
      alternate: false,
    },
    bottomLead: {
      actionText: t("Download the app now."),
      description: t(
        "Available on your favourite store. Start your premium experience now."
      ),
      mainActionText: t("Playstore"),
      extraActionText: t("App Store"),
    },
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const handleScrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const askQuestion = (questionText) => {
    setQuestion(questionText);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="box-border">
        <Navbar logo={logo} handleScrollToSection={handleScrollToSection} />

        <Routes>
          <Route path="/contact" element={<Contact />} />

          <Route path="/cart" element={<Cart />} />
          {loggedIn === true ? (
            <Route path="/admin" element={<AdminHome />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>

        <Hero
          appType={data.hero.appType}
          tagLine={data.hero.tagLine}
          description={data.hero.description}
          mainActionText={data.hero.mainActionText}
          extraActionText={data.hero.extraActionText}
          handleScrollToSection={handleScrollToSection}
        />

        <div
          id="divider"
          className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto"
        ></div>

        <div
          id="faq"
          className="pt-20 mb-20 text-3xl font-semibold text-center text-blue-800 lg:font-bold"
        >
          {t("How the Chatbox working?")}
        </div>

        <Step
          title={data.step1.title}
          heading={data.step1.heading}
          description={data.step1.description}
          img={data.step1.img}
          alternate={data.step1.alternate}
        />

        <Step
          title={data.step2.title}
          heading={data.step2.heading}
          description={data.step2.description}
          img={data.step2.img}
          alternate={data.step2.alternate}
        >
          <Link to="/cart">
            <img src={data.step2.img} alt="" />
          </Link>
        </Step>
        <div id="chatbox">
          <Chatgpt question={question} />
        </div>

        <Step
          title={data.step3.title}
          heading={data.step3.heading}
          description={data.step3.description}
          img={data.step3.img}
          alternate={data.step3.alternate}
        />
        <div id="prices">
          <ProductsPage />
        </div>
        {/* <BottomLead
          actionText={data.bottomLead.actionText}
          description={data.bottomLead.description}
          mainActionText={data.bottomLead.mainActionText}
          extraActionText={data.bottomLead.extraActionText}
        /> */}
        <YoutubeEmbed embedId="JKwaxpILRkg" />
        <Contact />

        <Footer logo={logo} />
      </div>
    </I18nextProvider>
  );
}

export default App;
