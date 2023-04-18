import React from "react";

function CookiePolicy({ handleAccept }) {
  return (
    <section className="policyContainer">
      <h5>
        Profesori de Sprijin folosește cookie-uri pentru a vă îmbunătăți
        experiența. Continuând să explorați acest site sunteți de acord cu
        utilizarea acestora.
      </h5>
      <button onClick={() => handleAccept()}>Accept</button>
    </section>
  );
}

export default CookiePolicy;
