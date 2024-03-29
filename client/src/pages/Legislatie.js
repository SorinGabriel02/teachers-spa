import React from "react";

import ordin5555 from "../assets/ordin_5555_2011.pdf";
import ordin5573 from "../assets/ordin_5573_2011.pdf";
import ordin762 from "../assets/ordin_762_2007.pdf";
import ordin5574 from "../assets/ordin_5574_2011.pdf";
import ghid from "../assets/ghid_invatamant_special.pdf";
import ordonanta141 from "../assets/ordonanta_141_2020.pdf";
import metodologie from "../assets/metodologie_cadru.pdf";

function Legislatie() {
  return (
    <main className={"legislation"}>
      <h1>Legislație Aferentă</h1>
      <section>
        <h2>
          ORDIN nr. 5.545 din 10 septembrie 2020 pentru aprobarea
          Metodologiei-cadru privind desfășurarea activităților didactice prin
          intermediul tehnologiei și al internetului, precum și pentru
          prelucrarea datelor cu caracter personal. "Prezenta metodologie-cadru
          reglementează modalitatea de desfășurare a activităților didactice
          prin intermediul tehnologiei și al internetului, precum și prelucrarea
          datelor cu caracter personal ale participanților la acest tip de
          activități."
        </h2>
        <p>
          Vizitează{" "}
          <a
            href="http://legislatie.just.ro/Public/DetaliiDocumentAfis/229929?fbclid=IwAR2zPBs_c7CvGJ9cOZZyFX_zLIPNZf6ZTrsaigSFD0DSnKXwzdG7qzv7tgM"
            target="_blank"
            rel="noreferrer noopener"
          >
            legislatie.just.ro
          </a>{" "}
          pentru detalii
        </p>
      </section>
      <section>
        <h2>
          Metodologie - Cadru privind desfășurarea activităţilor didactice prin
          intermediul tehnologiei şi al internetului, precum și pentru
          prelucrarea datelor cu caracter personal
        </h2>
        <a href={metodologie} download>
          Downloadează în format PDF
        </a>
      </section>
      <section>
        <h2>
          Ordonanța de urgență nr. 141/2020 privind instituirea unor măsuri
          pentru buna funcționare a sistemului de ı̂nvățământ și pentru
          modificarea și completarea Legii educației naționale nr. 1/2011
        </h2>
        <a href={ordonanta141} download>
          Downloadează în format PDF
        </a>
      </section>
      <section>
        <h2>
          Metodologia privind evaluarea, asistența psihoeducațională, orientarea
          școlară și orientarea profesională a copiilor, a elevilor și a
          tinerilor cu cerințe educaționale speciale din 13.12.2011
        </h2>
        <p>
          Vizitează{" "}
          <a
            href="https://lege5.ro/Gratuit/gi4doobrgu/metodologia-privind-evaluarea-asistenta-psihoeducationala-orientarea-scolara-si-orientarea-profesionala-a-copiilor-a-elevilor-si-a-tinerilor-cu-cerinte-educationale-speciale-din-13122011?pid=59652347#p-59652347"
            target="_blank"
            rel="noreferrer noopener"
          >
            lege5.ro
          </a>{" "}
          pentru detalii
        </p>
      </section>
      <section>
        <h2>
          Ordin 5805/2016 privind aprobarea metodologiei pentru evaluarea şi
          intervenţia integrată în vederea încadrării copiilor cu dizabilităţi
          în grad de handicap, a orientării şcolare şi profesionale a copiilor
          cu cerinţe educaţionale speciale, precum şi în vederea abilitării şi
          reabilitării copiilor cu dizabilităţi şi/sau cerinţe educaţionale
          speciale
        </h2>
        <p>
          Vizitează{" "}
          <a
            href="https://lege5.ro/Gratuit/gi4doobrgu/metodologia-privind-evaluarea-asistenta-psihoeducationala-orientarea-scolara-si-orientarea-profesionala-a-copiilor-a-elevilor-si-a-tinerilor-cu-cerinte-educationale-speciale-din-13122011?pid=59652347#p-59652347"
            target="_blank"
            rel="noreferrer noopener"
          >
            lege5.ro
          </a>{" "}
          pentru detalii
        </p>
      </section>
      <section>
        <h2>
          Ordin nr. 5555/2011 Regulamentul privind organizarea şi funcţionarea
          CJRAE
        </h2>
        <a href={ordin5555} download>
          Downloadează în format PDF
        </a>
      </section>
      <section>
        <h2>
          Ordin nr. 5573/2011 Regulamentul de organizare și funcționare a
          învatamantului special și special integrat
        </h2>
        <a href={ordin5573} download>
          Downloadează în format PDF
        </a>
      </section>
      <section>
        <h2>
          Ordin nr. 762/2007 pentru aprobarea criteriilor medico-psihosociale pe
          baza cărora se stabileşte încadrarea în grad de handicap
        </h2>
        <a href={ordin762} download>
          Downloadează în format PDF
        </a>
      </section>
      <section>
        <h2>
          Ordin nr. 5574/2011 Metodologia privind organizarea serviciilor de
          sprijin pentru copiii cu CES
        </h2>
        <a href={ordin5574} download>
          Downloadează în format PDF
        </a>
      </section>
      <section>
        <h2>
          Ghid pentru desfășurarea activităților educaționale și
          terapeutic-recuperatorii în învățământul special și special integrat,
          Anul școlar 2020-2021, Ministerul Educației și Cercetării
        </h2>
        <a href={ghid} download>
          Downloadează în format PDF
        </a>
      </section>
    </main>
  );
}

export default Legislatie;
