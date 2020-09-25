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
          Accesează fiecare rubrică pentru a vedea detaliat articolele
          corespunzătoare.
        </p>
      </section>
      <section className={linksContainer}>
        <article className={cycle}>
          <h2>Ciclul Primar</h2>
          <ul>
            <li>
              <NavLink to="/materiale/primary1">
                Stimulare Cognitivă- Limba și Literatura Română
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/primary2">
                Stimulare Cognitivă- Matematică
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/primary3">
                Structuri Perceptiv-Motrice: Formă, Mărime, Culoare
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/primary4">
                Orientare și Organizare Spațio-Temporală
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/primary5">Dezvoltare Personală</NavLink>
            </li>
          </ul>
        </article>
        <article className={cycle}>
          <h2>Ciclul Gimnazial</h2>
          <ul>
            <li>
              <NavLink to="/materiale/gymnasium1">
                Stimulare Cognitivă- Limba și Literatura Română
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/gymnasium2">
                Stimulare Cognitivă- Matematică
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/gymnasium3">
                Structuri Perceptiv-Motrice: Formă, Mărime, Culoare
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/gymnasium4">
                Orientare și Organizare Spațio-Temporală
              </NavLink>
            </li>
            <li>
              <NavLink to="/materiale/gymnasium5">Dezvoltare Personală</NavLink>
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
