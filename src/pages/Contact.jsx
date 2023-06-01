import React from "react";
import { useTranslation } from "react-i18next";
import Herotext from "../../src/assets/Herotext";
import { ContactUs } from "./ContactUs";
import PhoneIcon from "../../src/assets/phone-icon.png.png";

const Contact = () => {
  const { t } = useTranslation();

  const couses = [
    {
      title: t("Sales"),
      desc: t(
        "Expert sales assistance for all customers. Our sales team is dedicated to providing expert guidance to customers"
      ),
      phn: "+372 555 155 155",
    },
    {
      title: t("Complaints"),
      desc: t(
        "We take customer satisfaction seriously and strive to address any complaints in a timely and efficient manner"
      ),
      phn: "+372 555 123 123",
    },
  ];

  return (
    <section>
      {/* <Herotext textt="Contact us" /> */}
      <div className="py-16">
        <h2 className="text-5xl text-gray-700 font-semibold text-center pb-5">
          {t("We're here to help you")}
        </h2>
        <div className="flex flex-col md:flex-row md:justify-between gap-10 w-[85%] mx-auto">
          {couses.map((cause) => (
            <div
              className="text-center bg-gray-50 rounded-lg flex flex-col gap-3 py-10 px-5 md:flex-1"
              key={cause.title}
            >
              <h3 className="text-gray-900 font-semibold text-2xl">
                {cause.title}
              </h3>
              <p className="text-lg text-gray-700">{cause.desc}</p>
              <div className="flex items-center justify-center">
                <img
                  src={PhoneIcon}
                  alt="Phone Icon"
                  className="w-6 h-6 mr-2"
                />
                <a
                  href={`tel:${cause.phn}`}
                  className="text-sky-500 font-semibold text-xl"
                >
                  {cause.phn}
                </a>
              </div>
            </div>
          ))}
          <div className="text-center bg-gray-50 rounded-lg flex flex-col gap-3 py-10 px-5 md:flex-1">
            <ContactUs title={t("Email Us")} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
