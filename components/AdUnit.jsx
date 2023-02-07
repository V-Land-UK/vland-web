import { useEffect } from "react";

function AdUnit() {
  useEffect(() => {
    // <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      <ins
        //className="adsbygoogle block mx-auto w-[300px]  lg:w-[728px] h-[50px] lg:h-[90px]"
        className=" block mx-auto w-[94%]  md:h-[90px] sm:h-[60px] xxs:h-[60px] lg:h-[90px]"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9166716457553506"
        data-ad-slot="6593416244"
        data-ad-format="rectangle horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdUnit;
