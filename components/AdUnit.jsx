import { useEffect } from "react";

function AdUnit() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <ins
        //className="adsbygoogle block mx-auto w-[300px]  lg:w-[728px] h-[50px] lg:h-[90px]"
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9166716457553506"
        data-ad-slot="6593416244"
        // data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdUnit;
