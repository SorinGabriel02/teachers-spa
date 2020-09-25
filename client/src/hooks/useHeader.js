function useHeader() {
  // choose the header for posts pages by pageName
  const chooseHeader = (pageName) => {
    switch (pageName) {
      case "news":
        return "Secțiunea noutăți";
      case "primary1":
        return "Ciclul Primar - Stimulare Cognitivă - Limba și Literatura Română";
      case "primary2":
        return "Ciclul Primar - Stimulare Cognitivă - Matematică";
      case "primary3":
        return "Ciclul Primar - Structuri Perceptiv-Motrice: Formă, Mărime, Culoare";
      case "primary4":
        return "Ciclul Primar - Orientare și Organizare Spațio-Temporală";
      case "primary5":
        return "Ciclul Primar - Dezvoltare Personală";
      case "gymnasium1":
        return "Ciclul Gimnazial - Stimulare Cognitivă - Limba și Literatura Română";
      case "gymnasium2":
        return "Ciclul Gimnazial - Stimulare Cognitivă - Matematică";
      case "gymnasium3":
        return "Ciclul Gimnazial - Structuri Perceptiv-Motrice: Formă, Mărime, Culoare";
      case "gymnasium4":
        return "Ciclul Gimnazial - Orientare și Organizare Spațio-Temporală";
      case "gymnasium5":
        return "Ciclul Gimnazial - Dezvoltare Personală";
      default:
        return "";
    }
  };

  return [chooseHeader];
}

export default useHeader;
