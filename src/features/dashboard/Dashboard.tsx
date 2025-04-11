import { DIALER_SERVER } from "@/lib/constants";
import { useEffect } from "react";
import Dispositions from "../dispositions/Dispositions";

type Props = {};

export default function Dashboard({}: Props) {
  useEffect(() => {
    const iframe = document.getElementById("myIframe");
    if (iframe && iframe.contentWindow) {
      const iframeDoc = iframe.contentWindow.document;
      iframe.onload = () => {
        const el = iframeDoc.querySelector("table");
        if (el) el.style.display = "none";
      };
    }
  }, []);

  const onIframeLoad = (event) => {
    // Check if the iframe is loaded
    try {
      const iframe = event.target;
      const style = document.createElement("style");
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.body.style.backgroundColor = "#1339b8";
      console.log("Same origin access?", !!iframe.contentDocument);
      if (iframe.contentDocument) {
        console.log("Access granted to iframe content");
        // Your style injection code here
      }
      style.textContent = `
            .navigation-bar { display: none !important; }
            #header { display: none !important; }
            /* Add other selectors you want to hide */
            body { background-color: #1339b8 !important; }
            img { display: none !important; }
          `;

      // Only works if same-origin policy allows it
      if (iframe.contentDocument) {
        iframe.contentDocument.head.appendChild(style);
      }
    } catch (error) {
      // Handle cross-origin errors
      console.error("Could not modify iframe content due to cross-origin restrictions", error);
    }
  };

  return (
    <div>
      <Dispositions />
      <div>
        <iframe
          src={`http://${DIALER_SERVER}/vicidial/realtime_report.php`}
          width="100%"
          height="500"
          style={{ border: "none" }}
          title="Real Time Reports"
          onLoad={onIframeLoad}
        />
      </div>
    </div>
  );
}
