import { useEffect } from "react";

function AdUnit() {
  useEffect(() => {
    // <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="col-md-8">
      {/* <h3 className="pb-4 mb-4 fst-italic border-bottom">Adsense ads</h3> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9166716457553506"
        data-ad-slot="6593416244"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdUnit;
