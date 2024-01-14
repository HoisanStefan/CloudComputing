// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ReactMarkdown from "react-markdown";

function Documentation() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} px={1.8}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <ReactMarkdown ># Documentație Proiect</ReactMarkdown>
			  
              <ReactMarkdown>
                Proiectul constă într-o arhitectură bazată pe microservicii și include mai multe
                componente pentru orchestrarea și gestionarea aplicației. Logica de business a 
				proiectului este destul de simplă. Există servicii de bază implicate: unul dedicat
				clienților și celălalt cardurilor. Ambele servicii acceptă comenzi pentru interogare 
				după ID sau de adăugare de obiecte noi. Merită menționat că există o condiție 
				esențială: fiecare client trebuie să fie asociat cu un card; în consecință, la 
				crearea unui client, este nevoie să fie furnizat și un card corespunzător care să 
				fie asociat acestuia. Acest lucru generează o interdependență între cele două servicii.
				Prin urmare, atunci când se solicită informații despre un client sau se încearcă 
				adăugarea unui client nou cu un card existent, serviciul de carduri este interogat 
				în mod automat.
              </ReactMarkdown>
			  
			  &nbsp;
              
			  <ReactMarkdown>## Server Eureka</ReactMarkdown>

              <ReactMarkdown>
                Serverul Eureka este inclus pentru a facilita descoperirea și conexiunea între
                servicii. Acesta servește ca registrul de servicii, permițând fiecărui serviciu să se
                înregistreze și să descopere alte servicii disponibile.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>## API Gateway</ReactMarkdown>

              <ReactMarkdown>
                API Gateway este responsabil pentru redirecționarea request-urilor către instanțele
                corecte ale microserviciilor cerute. Acesta include implicit o politică de load balancing
                round robin pentru a distribui uniform sarcina de lucru între instanțele
                active, menținând performanța și evitând suprasolicitarea unui singur worker.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>## Config Server</ReactMarkdown>

              <ReactMarkdown>
                Config Server permite citirea proprietăților de configurare ale serviciilor
                dependente dintr-un loc remote. Aceasta oferă flexibilitate în schimbarea
                datelor de configurare ale containerelor, iar modificările au efect la restartarea
                containerelor, eliminând necesitatea de a crea noi imagini Docker.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>## Circuit Breaker</ReactMarkdown>

              <ReactMarkdown>
                Fiecare microserviciu are un circuit breaker pentru gestionarea erorilor.
                De exemplu, avem o configurare de fail tolerance de 30%. Când acest prag este
                depășit, microserviciul intră în stadiul Half-down, acceptând un număr limitat de
                request-uri pentru recalcularea fail rate-ului. Dacă pragul continuă să fie depășit,
                serviciul se va restarta; în caz contrar, revine la statusul de UP.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>## Proxy pentru Transmiterea Datelor</ReactMarkdown>

              <ReactMarkdown>
                Fiecare microserviciu are propria sa bază de date, iar pentru transmiterea datelor
                între servicii, am implementat un proxy. Acesta permite interogarea eficientă a
                datelor, cum ar fi în cazul interogării datelor unui client și interogării
                serviciului de carduri prin intermediul proxy-ului.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>## Interfață PHPMyAdmin</ReactMarkdown>

              <ReactMarkdown>
                Am inclus o interfață pentru consola PHPMyAdmin pentru a facilita accesul și
                gestionarea bazei de date asociate proiectului.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>## Serviciu Zipkin</ReactMarkdown>

              <ReactMarkdown>
                Serviciul Zipkin este inclus pentru a asigura logarea detaliată a request-urilor
                externe și interne din aplicație, oferind o perspectivă clară asupra fluxului de
                date și a posibilelor probleme.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>## Docker Compose</ReactMarkdown>

              <ReactMarkdown>
                Pentru o gestionare eficientă a serviciilor și a dependențelor dintre acestea, am
                utilizat Docker Compose. Acesta permite crearea și pornirea tuturor serviciilor cu
                o singură comandă, asigurând o implementare simplă și consistentă, permițând ulterior
				scalarea componentelor atunci când sunt necesare mai multe resurse.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>## Client React</ReactMarkdown>

              <ReactMarkdown>
                În partea de client, am dezvoltat o aplicație în React care expune pagini pentru
                fiecare microserviciu. Aceste pagini permit accesul la endpoint-urile expuse de
                API-urile corespunzătoare. Am inclus, de asemenea, o pagină pentru documentație
                pentru a facilita înțelegerea și utilizarea serviciilor.
              </ReactMarkdown>

			  &nbsp;

              <ReactMarkdown>---</ReactMarkdown>

              <ReactMarkdown>## Instrucțiuni de pornire</ReactMarkdown>

              <ReactMarkdown>
				1. Se va rula această comandă în fiecare din modulele: *api-gateway*, *card-service*,
				*config-server*, *customer-service*, *eureka-server*
			  </ReactMarkdown>

			  <ReactMarkdown>**````mvn clean package````**</ReactMarkdown>

			  <ReactMarkdown>
				2. Se intră în folderul *react-app* și se rulează comanda:
			  </ReactMarkdown>

			  <ReactMarkdown>**````npm ci````**</ReactMarkdown>

			  <ReactMarkdown>
				3. Se intră în folderul principal *Java-Spring-Microservices* și se rulează comenzile:
			  </ReactMarkdown>

			  <ReactMarkdown>**````docker-compose build --no-cache````**</ReactMarkdown>

			  <ReactMarkdown>**````docker-compose up -d````**</ReactMarkdown>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Documentation;
