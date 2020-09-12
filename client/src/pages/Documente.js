import React from "react";

import {
  documente,
  cerereFig,
  requestContainer,
} from "./Documente.module.scss";
import cerereTip from "../assets/cerereTip.jpg";

function Documente() {
  return (
    <main className={documente}>
      <h1>Certificatul de Orientare Școlară și Profesională &#40;COSP&#41;</h1>
      <section>
        <h2>Documente necesare pentru obținerea COSP ordinul 1985/2016</h2>
        <h3>Acte necesare pentru dosar</h3>
        <div className={requestContainer}>
          <a
            href={cerereTip}
            target="_blank"
            rel="noopener noreferrer"
            className={cerereFig}
          >
            <p>Exemplu Cerere</p>
            <img
              src={cerereTip}
              alt="cerere tip pentru evaluarea copiilor cu dizabilități"
            />
          </a>
          <ul>
            <li>
              <p>Dosar cu şină plastic/carton;</p>
            </li>
            <li>
              <p>
                Cererea părintelui/tutorelui legal adresată Comisiei de
                orientare şcolară şi profesională &#40;tip&#41;;
              </p>
            </li>
            <li>
              <p>
                Acte de identitate părinţi/tutore legal &#40;copie xerox&#41;
                &#40;copie sentinţă divorţ/certificat de deces/încredințare
                tutela/ copie după sentința judecatoreasca dacă sunteți tutore
                legal - dacă este cazul&#41;;
              </p>
            </li>
            <li>
              <p>
                Acte de identitate copil/elev/tânăr &#40;certificat de naştere
                și/sau C.I.&#41; &#40;copie xerox&#41;;
              </p>
            </li>
            <li>
              <p>
                Certificat medical tip A5 cu parafă&#40;copie xerox&#41; de la
                medicul neuropsihiatru și/sau medic specialist pe afecțiuni
                &#40;valabilitate între 3 luni-4ani&#41;;
              </p>
            </li>
            <li>
              <p>
                Fişă medicală sintetică &#40;tip&#41; &#40;copie xerox&#41;
                eliberată de medicul de familie cu toate diagnosticele prevăzute
                în certificatele/scrisorile medicale &#40;tip&#41;
                &#40;valabilitate 1 an&#41;;
              </p>
            </li>
            <li>
              <p>
                Fișă de evaluare psihologică &#40;copie xerox&#41; – eliberată
                de psiholog cu drept de liberă practică, cu atestat în
                psihologie clinică &#40;valabilitate maxim 3 luni&#41;;
              </p>
            </li>
            <li>
              <p>
                Anchetă socială &#40;copie xerox&#41;– eliberată de D.A.C.
                Primăria de care aparține domiciliul &#40;valabilitate între 3-6
                luni&#41;;
              </p>
            </li>
            <li>
              <p>
                Fişă psihopedagogică pentru elevul cu dizabilități și/sau
                cerințe educaționale speciale – eliberată de unitatea de
                învățământ &#40;tip, copie xerox&#41;;
              </p>
            </li>
            <li>
              <p>
                Adeverință de elev/preșcolar, eliberată de unitatea de
                învățământ;
              </p>
            </li>
            <li>
              <p>
                Foaie matricolă &#40;copie xerox&#41;, eliberată de unitatea de
                învățământ;
              </p>
            </li>
            <li>
              <p>Recomandare CIEC – dacă este cazul;</p>
            </li>
            <li>
              <p>
                Certificatul de încadrare în grad handicap, hotărâre, contract
                cu familia și planul de servicii personalizat &#40;copie
                xerox&#41;;
              </p>
            </li>
            <li>
              <p>
                Certificatul de orientare şcolară şi profesională &#40;la
                reorientare&#41;. &#40;copie xerox&#41;
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2>Acte necesare stabilirii dosarului de sprijin financiar</h2>
        <p>Coming soon...</p>
      </section>
    </main>
  );
}

export default Documente;
