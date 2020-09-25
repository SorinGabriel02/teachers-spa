import React from "react";
import { NavLink } from "react-router-dom";

import {
  materials,
  headerSection,
  linksContainer,
  cycle,
} from "./Materials.module.scss";

function Materials() {
  return (
    <main className={materials}>
      <section className={headerSection}>
        <h1>
          Această pagină conține fișe de lucru clasificate pe domenii de
          intervenție
        </h1>
        <p>
          Accesați fiecare rubrică pentru a vedea detaliat informațiile
          corespunzătoare.
        </p>
      </section>
      <section className={linksContainer}>
        <article className={cycle}>
          <h2>Ciclul primar</h2>
          <ul>
            <li>
              <NavLink to="/materiale/primary1">
                Stimulare cognitivă- Limba și literatura română
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/primary2">
                Stimulare cognitivă- Matematică
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/primary3">
                Structuri perceptiv-motrice: formă, mărime, culoare
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/primary4">
                Orientare și organizare spațio-temporală
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/primary5">Dezvoltare personală</NavLink>
            </li>
          </ul>
        </article>
        <article className={cycle}>
          <h2>Ciclul gimnazial</h2>
          <ul>
            <li>
              <NavLink to="/materiale/gymnasium1">
                Stimulare cognitivă- Limba și literatura română
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/gymnasium2">
                Stimulare cognitivă- Matematică
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/gymnasium3">
                Structuri perceptiv-motrice: formă, mărime, culoare
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/gymnasium4">
                Orientare și organizare spațio-temporală
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/gymnasium5">Dezvoltare personală</NavLink>
            </li>
          </ul>
        </article>
      </section>
      <section className={headerSection}>
        <p>
          Materialele pot fi folosite drept suport în antrenarea unor capacități
          latente și conectarea noilor cunoștințe pe baza cunoștințelor ancoră,
          exercițiile constante ducând la automatizarea deprinderilor de lucru:
          desprinderi de scris- citit, calcul și formarea psihomotricității.
          Exercițiile de dezvoltare personală vor conduce la o mai bună
          conștientizare a emoțiilor personale, identificarea, discriminarea și
          gestionarea acestora, promovând o bună evoluție inter și
          intra-personală.
        </p>
      </section>
    </main>
  );
}

export default Materials;
