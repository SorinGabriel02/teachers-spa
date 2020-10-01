import React from "react";

import "./CookiePolicy.scss";

function CookiePolicy({ handleAccept }) {
  return (
    <section className="policyContainer">
      <h5>
        Profesori de Sprijin folosește cookie-uri pentru a va îmbunătăți
        experiența. Continuând să explorați acest site sunteți de acord cu
        utilizarea acestora.
      </h5>
      <button onClick={() => handleAccept()}>Accept</button>
    </section>
  );
}

export default CookiePolicy;
