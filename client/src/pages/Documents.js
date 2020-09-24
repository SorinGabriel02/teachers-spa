import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import {
  documente,
  cerereFig,
  requestContainer,
  exemplare,
  acteStabilire,
  instiintari,
} from "./Documents.module.scss";
import cerereTip from "../assets/cerereTip.jpg";
import cerereEval from "../assets/cerere_evaluare.pdf";
import fisaMedicala from "../assets/fisa_medicala_sintetica.pdf";
import fisaPsihologica from "../assets/fisa_psihologica.pdf";
import fisaPsihopedagogica from "../assets/fisa_psihopedagogica.pdf";
import cerereDirector from "../assets/cerere_director.pdf";
import cerereTip1 from "../assets/cerere_tip_1.pdf";
import cerereTip2a from "../assets/cerere_tip_2a.pdf";
import cerereTip2b from "../assets/cerere_tip_2b.pdf";
import acordIncudere from "../assets/acord_includere_evaluare.jpg";
import acordMentinere from "../assets/acord_mentinere_integrare.jpg";

function Documents() {
  return (
    <main className={documente}>
      <h1>Certificatul de Orientare Școlară și Profesională &#40;COSP&#41;</h1>
      <section className="tooltipContainer">
        <h2>Documente necesare pentru obținerea COSP ordinul 1985/2016</h2>
        <h3>Acte necesare pentru dosar</h3>
        <div className={requestContainer}>
          <a
            href={cerereTip}
            target="_blank"
            rel="noopener noreferrer"
            className={cerereFig}
          >
            <p>Cerere Evaluare</p>
            <Popup
              trigger={() => (
                <img
                  src={cerereTip}
                  alt="cerere tip pentru evaluarea copiilor cu dizabilități"
                />
              )}
              position={"center center"}
              on={["hover"]}
              closeOnEscape
              closeOnDocumentClick
              mouseEnterDelay={250}
              contentStyle={{
                backgroundColor: "darkgray",
                zIndex: 3,
                textAlign: "center",
              }}
              overlayStyle={{
                boxShadow: "0 0 10px rgb(173, 176, 201)",
              }}
              arrow={false}
              keepTooltipInside={".tooltipContainer"}
            >
              <span>
                Click pentru a vedea imaginea detaliat într-o nouă fereastră
              </span>
            </Popup>
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
        <h3>Downloadează exemplare în format PDF</h3>
        <div className={exemplare}>
          <p>
            Adresa din antetul exemplarelor diferă de la un județ la altul.
            Aceste exemple conțin adresa din județul Iași.
          </p>
          <ul>
            <li>
              <a href={cerereEval} download>
                Cerere pentru Evaluare
              </a>
            </li>
            <li>
              <a href={fisaMedicala} download>
                Fișa Medicală Sintetică
              </a>
            </li>
            <li>
              <a href={fisaPsihologica} download>
                Fișa de Evaluare Psihologică
              </a>
            </li>
            <li>
              <a href={fisaPsihopedagogica} download>
                Fișa de Evaluare Psihopedagogică
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className={acteStabilire}>
        <h2>Acte necesare stabilirii dosarului de sprijin financiar</h2>
        <p>
          Eleviii incluși în cadrul unui program de sprijin educațional al unei
          instituții incluzive pot beneficia de un sprijin financiar
          corespondent cu frecvența acestora la ore, conform legislației:
        </p>
        <ul>
          <li>
            <p>
              Drepturi/Beneficii de asistență socială pentru copiii cu CES
              prevăzute de Legea nr. 1/2011, cu modificările și completările
              ulterioare, Euro 200, Burse sociale, “Cornul şi laptele”, Legea
              272/2004
            </p>
          </li>
          <li>
            <p>
              Legea 6/2012- pentru modificarea și completarea OUG 96/2002
              privind acordarea de produse lactate și de panificație pentru
              elevii claselor I-VIII
            </p>
          </li>
          <li>
            <p>HG 904/2014, art. 129, Anexa 1</p>
          </li>
          <li>
            <p>
              HG 391/2016- drepturi aferente copiilor/elevilor/tinerilor cu
              cerințe educaționale speciale integrați în învățământul de masă
            </p>
          </li>
        </ul>
        <p>
          După obținerea certificatului de orientare școlară și profesională,
          părinții pot întocmi un dosar la secretariatul școlii în intervale
          anterior comunicate, dosar ce va conține următoarele documente:
        </p>
        <ul>
          <li>
            <p>
              Cerere tip adresată directorului instituției.{" "}
              <a href={cerereDirector} download>
                Downloadează în format PDF &#40;județul Iași&#41;
              </a>
            </p>
          </li>
          <li>
            <p>Cerere tip</p>
            <ul style={{ listStyle: "initial" }}>
              <li>
                <p>
                  1{" "}
                  <a href={cerereTip1} download>
                    Downloadează în format PDF
                  </a>
                </p>
              </li>
              <li>
                <p>
                  2a{"  "}
                  <a href={cerereTip2a} download>
                    Downloadează în format PDF
                  </a>
                </p>
              </li>
              <li>
                <p>
                  2b{"  "}
                  <a href={cerereTip2b} download>
                    Downloadează în format PDF
                  </a>
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>Copie după buletinele părinților/tutorelui legal </p>
          </li>
          <li>
            <p>
              Copie certificat de naștere copil si copie dupa buletinul
              elevului/ei &#40;daca este cazul&#41;
            </p>
          </li>
          <li>
            <p>
              Copie după certificatul de orientare școlară și profesională
              &#40;cosp&#41;
            </p>
          </li>
          <li>
            <p>
              Copie certificat de încadrare în grad de handicap &#40;daca este
              cazul&#41;{" "}
            </p>
          </li>
          <li>
            <p>Copie extras cont</p>
          </li>
        </ul>
      </section>
      <section className={instiintari}>
        <h2>Înștiințări gererale</h2>
        <p>
          Există deasemenea și două fișe ce exprimă acordul părintelui în
          vederea includerii, respectiv menținerii în cadrul programului de
          sprijin educațional.
        </p>
        <aside>
          <a href={acordIncudere} target="_blank" rel="noopener noreferrer">
            <img
              src={acordIncudere}
              alt="Acordul părintelui în vederea includerii în programul de sprijin educațional"
            />
          </a>
          <a href={acordMentinere} target="_blank" rel="noopener noreferrer">
            <img
              src={acordMentinere}
              alt="Acordul părintelui în vederea menținerii în programul de sprijin educațional"
            />
          </a>
        </aside>
      </section>
    </main>
  );
}

export default Documents;
