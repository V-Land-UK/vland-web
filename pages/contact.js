import React from "react";
import Back from "../components/Back";
import Layout from "../defaults/Layout";

const Contact = () => {
  return (
    <Layout title="Contact us">
      <Back />
      <main className="poppins text-base font-normal lg:pt-6 lg:pb-[20vh]">
        <h1 className="text-3xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7">
          Contact
        </h1>
        <h1 className="text-2xl lg:text-2xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          Editorial
        </h1>
        If you are a business, event, public relations, or organization you can
        submit a story for consideration. Please send your pitch and press
        release to{" "}
        <a href="mailto:press@v-land.com" className="email_txt">
          press@v-landuk.com
        </a>
        .
        <p className="mt-2">
          If you are an individual who would like to submit an SEO-optimised
          article for consideration, please send it to{" "}
          <a href="mailto:submissions@v-land.com" className="email_txt">
            submissions@v-landuk.com
          </a>
          .
        </p>
        <h1 className="text-2xl lg:text-2xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          Advertising
        </h1>
        For more information about advertising on our website and our social
        media accounts, email{" "}
        <a href="mailto:advertising@v-land.com" className="email_txt">
          advertising@v-landuk.com
        </a>
        .
        <h1 className="text-2xl lg:text-2xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          General comments and questions
        </h1>
        Comments and questions? Send an email to{" "}
        <a href="mailto:contact@v-land.com" className="email_txt">
          contact@v-landuk.com
        </a>
        .
      </main>
    </Layout>
  );
};

export default Contact;
