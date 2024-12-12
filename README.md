# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# CV Prosjekt for Eksamen i JavaScript Rammeverk

## Dependencies
*   "jspdf": "^2.5.2",
*   "react": "^18.3.1",
*   "react-dom": "^18.3.1",
*   "react-router-dom": "^7.0.2"

## Table of Contents
1. Project Description
2. Features and funtionality
3. API Documentation

### Project Description

Login as admin with username: admin and password: admin

**Root**
* Src
* index.html

**Components**
1. Admin 
    1. AdminDashboard: Er for at admin bruker skal ha mulighet til å bytte mellom å administere CV og administrere brukere. 
    2. CVManagement: 
       * Admin kan se alle CV som er lagd av brukere og selv opprette CV. Når admin oppretter CV, vil listen over CV usynliggjøres inntil prossesen er ferdig med å opprette eller de velger å kansellere opprettingen av CV.
       * Når admin bruker hovrer musepeker over et navn vil funksjonalitet som se CV, redigere CV, Tilpass CV (for å eksportere til pdf) og slette CV synliggjøres   som valgmuligheter
       * Slette funksjonalitet bruker ConfirmationModal i UI-Popup mappen. Dette er for at admin ikke med uhell sletter et cv og må derfor bekrefte at dette var handlingen de ville ta.
       * 'Handle' funksjoner håndterer states og sørger for at riktig riktig handling blir kontrollert for at siden skal fungere som forventet. Det blir kalt på mer kompleks funksjonalitet i en egen custom Hooks, da disse funksjonene gjenbrukes for vanlige brukere som også skal kunne opprette, oppdatere, se og slette CV.
    3. UserManagement:
       * Admin skal kunne opprette, oppdatere, se og slette CV. en useEffect blir brukt for å laste inn brukere på siden for admin å se.
       * Oppretting gjøres ved å fylle ut alle felt og trykke opprett. Dette vil kalle handleCreateUser som kaller API Post requesten og håndterer tilstanden til brukeren lokalt.
       * Oppdatering gjøres ved å trykke rediger, hvilket kaller handleEditUser. Ved å trykke lagre blir handleUpdateUser kalt. I denne funksjonen blir id slettet for å ikke skape errors i oppdatering.
       * Avbryt av redigering vil kalle handleCancelEdit som gjør om input felt til tekst.
       * Slette vil også bruke confirmation pup up for å bekrefte valget.
2. CV
    1. CvCustomizer er komponent for at brukeren skal kunne toggle skills, references, education til å brukes i CV som de kan eksportere til pdf. Det er to valgmuligheter, standard skjema eller moderne. 
    2. CVForm er komponent for skjemaet skal deles for både admin bruker og vanlig bruker til å fylle inn. 
       * Søkeforslag for ferdigheter og institusjoner er lagt til. Når brukeren skriver vil de dukke opp og de kan trykke på valgmuligheter for å autofylle.
       * CvView er komponent for hvis brukeren vil se informasjonen i CV på nettsiden. Denne toggles ved at brukeren trykker på se CV.
3. Annet
   1. LoginForm importerer context funksjoner og venter på om de er suksessfulle for å navigere enten admin eller vanlig bruker til riktig side.
   2. ProtectedRoute sørger for at det er bruker med riktig rolle for å få tilgang til enten admin-dashboard eller user-dashboard.
   3. UserDashboard er for vanlig bruker skal kunne opprette, se, oppdatere og slette et eller flere CV. Alle CV bruker oppretter vil admin få tilgang til å kunne se, redigere, tilpasse til pdf eller slette fra databasen. 
      * Bruker kan kun se CV de selv har laget, ved å legge inn en Created By: username i objektet som blir lagret i databasen.
**Andre Mapper**
1. Context: AuthContext kontrollerer hvilken bruker logger på og passerer ned logout funksjonalitet, samt finner brukere fra databasen over opprettede brukere som admin er ansvarlig for.
2. Style: Hover effekter og standard vite styling til utseendet på nettsiden. 
3. Hooks: UseCvs er hjelpefunksjoner for som blir delt mellom userDashboard og CVManagement. Disse burde blitt navngitt med handle for å gjøre det mer forståelig. 
4. Test: test av CV form og api kall for CV passerer.
5. Utils: fetcher mot crudcrud. Inndelt i en fil for CV crud funksjonalitet og andre for users crud funksjonalitet. I tillegg til en ExportTopdf fil.


