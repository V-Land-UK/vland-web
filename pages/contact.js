import React from "react";
import Back from "../components/Back";
import Layout from "../defaults/Layout";

const Contact = () => {
  return (
    <Layout title="Contact">
      <Back />
      <main className="poppins text-base font-normal lg:pt-6 lg:pb-[20vh]">
        <h1 className="text-3xl lg:text-3xl text-primary font-bold mt-4 mb-1 lg:mt-7">
          Contact
        </h1>
        
        We’d love to hear from you. Please send any enquiries, whether that be for editorial,
        advertising, or anything else to{" "}
        <a href="mailto:vlandmagazine@gmail.com" className="email_txt">
          vlandmagazine@gmail.com
        </a>
        .
        
        
      </main>
    </Layout>
  );
};

export default Contact;
