# Maltuna-Tech memoria

## Aurkibidea
- [Sarrera](#sarrera)
- [Helburuak](#helburuak)
  - [Helburu orokorrak](#helburuak)
  - [Helburu espezifikoak](#helburuak)
- [Zereginak eta kronograma](#zereginak-eta-kronograma)
- [Baliabideak](#baliabideak)
  - [Baliabide pertsonalak](#pertsonalak)
  - [Baliabide materialak](#materialak)
- [Instalazio prozesua](#instalazio-prozezua)
- [Bibliografia](#bibliografia)
- [Izandako arazoak eta aurre egiteko modua](#izandako-arazoak-eta-aurre-egiteko-modua)
- [Ondorioak (etorkizuneko aldaketak)](#ondorioak-etorkizuneko-aldaketak)
- [Creative Commons lizentzia](#creative-commons-lizentzia)
- [Eranskinak](#eranskinak)

---

## Sarrera
Gu 7POINTS.net gara, Migel altuna LHII ikastetxean sorturiko taldea. Proiektu hau, gure enpresak unibertsitateko ikasleen artean antzeman duen beharrizan zehatz bati erantzuteko jaio da.

Zehazki, pisu partekatuetan bizi diren ikasleek eguneroko kudeaketan izaten dituzten zailtasunak identifikatu ditugu: etxeko zereginak antolatzea, gastuak modu garden batean banatzea eta 
elkarbizitzaren koordinazio orokorra. Gaur egungo tresnek ez dituzte behar hauek modu bateratuan asetzen. Hori dela eta, guk, talde bezala, hutsune hori betetzeko web aplikazio bat 
garatzea erabaki dugu, ikasleen bizi-kalitatea eta antolakuntza hobetzeko asmoz.

---

## Helburuak
<p align="justify">
 Erronka honen helburu nagusia, pisu partekatuen kudeaketarako plataforma bakar eta bateratu bat sortzea izan da. Aplikazio honek ikasleen elkarbizitza erranzten du, gatazkak murriztuz eta ordena eskainiz.
</p>

<p align="justify">
 Bertan, erabiltzaileek etxebizitzaren funtzionamendua kontrolatzeko aukera izango dute. Funtzio nagusien artean, etxeko zereginen banaketa eta gastuen edo ordainketen kontrola nabarmentzen dira. 
  Horretarako, sistema bat garatuko da non informazio guztia argi eta eskuragarri egongo den pisu kide guztientzat.
</p>

<p align="justify">
  Alderdi teknikoari dagokionez, soluzio sendo eta eskalagarri bat eraikitzeko teknologia aurreratuak erabili ditugu.
  Frontend-a garatzeko <strong>React</strong> framework-a aukeratu da, interfaze arin eta dinamiko bat lortzeko. 
  Backend-aren logika eta API zerbitzuak kudeatzeko, berriz, <strong>Laravel</strong> erabili dugu. 
  Eta bukatzeko, sistemaren bihotza, datuen bilketarako eta finantza-kudeaketarako, <strong>Odoo</strong> izan da, honek ematen duen potentziala aprobetxatuz.
</p>

<p align="justify"> 
  Azpiegitura eta garapen ingurunea ere ez dira atzean geratu. 
  Proiektua <strong>AWS</strong> ingurunean hedatzea aurreikusi da segurtasuna eta eskalagarritasuna bermatzeko, eta garapen taldearen lana bateratzeko <strong>Docker</strong> erabili dugu. 
</p>

<p align="justify">
  Azkenik, diseinuaren kalitatea eta irisgarritasuna lehenetsi dira. Webguneak itxura garbia eta erakargarria izateaz gain, erabiltzeko erraza izan behar du edozein profilentzat. 
  Horregatik, <strong>WCAG</strong> (Web Content Accessibility Guidelines) gidalerroak jarraitu dira. Helburu hori bermatzeko, <strong>EqualWeb</strong> tresna erabili dugu, aplikazioa pertsona guztientzat irisgarria eta eskuragarria dela ziurtatuz.
</p>

<p align="justify">
  Beraz, helburua pisu partekatuen kudeaketarako webgune bat sortzea izan da, aipaturiko atal guztiak errespetatuz.
</p>

---

## Zereginak eta kronograma
<p align="justify">
  Proiektu hau aurrera eramateko, hainbat fase eta ataza burutu behar izan ditugu. Lehen fasea planifikazioari eta prestakuntzari eskaini genion. 
  Bertan, talde-kontratua zehaztu eta proiektuaren arkitektura definitzeko diagramak egin genituen. Odoo eta React teknologien garrantzia, prestakuntza tekniko espezifikoa ere jaso genuen hasieran. 
  Gainera, interfazearen diseinuak eta prototipoak landu genituen, bezeroari gure lehen prototipo eta ideiak aurkezteko, eta feedbacka jasotzeko.
<p align="justify">
  Ondoren, Bezeroaren iritzia jaso ostean, zuzenketak egin, eta webgunea sortzen hasi ginen. Horretarako, lehenik, guztia prestatu genuen. GitHub, Laravel, npm... Ostean garapenarekin hasteko. Denbora guztian garapenean aritu gara, tarte batzuetan dokumentazioa pixkanaka garatuz. Azken bi asteetan, hedapena, dokumentazioan falta zena, eta aurkezpena egin genituen, baita webgunea bukatu ere.
</p>
<p align="justify">  
Guztia egokiago ulertzeko eta azaltzeko, ona hemen gure 2 hilabeteen kronograma. Bertan izan ditugun ataza guztiak agertzen dira.
</p>

<img width="618" height="576" alt="image" src="https://github.com/user-attachments/assets/3249a944-eb53-4081-aa7f-1b35d24fe549" />


[Kronograma taula (sakatu ikusteko)](https://docs.google.com/spreadsheets/d/1sXf_X2KMIcV0g3PMzPIAHPnXWcYshLkmOSNpX8OekdU/edit?usp=sharing)

---

## Baliabideak

### Pertsonalak
  Pertsonalen aldetik taldekideak bakarrik aritu gara. Hiru zehazki:
- **Arduraduna eta koordinatzailea:** Igor Viyuela
- **Langilea:** Iker Eguizabal
- **Langilea:** Luken Franco

### Materialak
  **Kasu hontan, gure taldean, proiektu honi aurre egiteko, hainbat baliabide erabili ditugu.**
- **Baliabide material fisikoak:**
   Windows ordenagailuak, saguak eta monitoreak.
- **GitHub:**
  Kodea partekatzeko eta talde bezala lan egiteko ezinbestekoa izan da. Bertsioen kontrola eramateko erabili dugu.
- **Markdown:**
  GitHub barruko fitxategi mota bat da, bertan dokumentazioa eta estilo gida egin ditugu.
- **GitBash:**
  Git-eko aldaketak egiteko: Merge-ak eta Adar berriak sortzeko erabili izan dugu proiektu hau garatzean.
- **Docker:**
  Garapen ingurune bateratu eta errepikagarri bat lortzeko. Horri esker, taldekide guztiok konfigurazio berarekin lan egin ahal izan dugu.
- **VisualStudio Code:**
  Web Aplikazioa garatzeko erabili dugu IDE hau.
- **Momentu batzuetan, AI erabili dugu, zehazki hauek:**
    - **Chatgpt:**
     Garapenari aurre egiteko.
    - **Gemini:**
     Garatzen ikasteko eta batez ere erroeak konpontzeko.
- **W3 Schools:**
   Zalantzak argitzeko..
- **Dokumentazio ofizialak::**
   Laravel, React eta Odoo-ren dokumentazio ofizialak etengabe kontsultatu ditugu funtzionalitateak zuzen inplementatzeko.
- **Google Paketea:**
   Dokumentu guztiak partekatzeko, elkar komunikazioa hobetzeko, planifikazioa egiteko.
- **Datu basea:**
   SQL Lite
- **Webgunearen garapenerako, haibat baliabide erabili ditugu:**
  - **Laravel:** Framework bezala, profesionaltasuna, ordena eta segurtasuna mantentzeko.
  - **Odoo:** Sistemaren bihotza. Datuak kudeatzeko, zereginak gordetzeko eta finantza-kudeaketarako erabili dugu.
  - **React:** Webgunearen estiloak egoki egiteko.
  - **Kode lengoaiak:** hainbat erabili ditugu, laravelek dituenetaz gain, ala nola;
    - **Backend-erako:** PHP eta Python.
    - **Frontend-erako:** Tailwind CSS eta TypeScipt.
    - **Konfiguraziorako:** Shell edo Bash.
    - **EqualWeb:** Webgunearen irisgarritasuna bermatzeko eta WCAG gidalerroak betetzen laguntzeko.
  - **Scriptak:** JSON eta YAML.
  - **Datu basea:** PostgreSQL.
- **AWS:**
  Proiektuaren hedapenerako eta azpiegitura kudeatzeko. Bertan ostatatu dugu gure aplikazioa, eskalagarritasuna bermatuz.
- **Canva eta Figma:**
  Prototipo eta maketazioak egiteko.
- **Moodle:**
  Entregak egiteko, eta informazioa lortzeko.

---

## Instalazio prozezua
<p align="justify">
  Gure proiektuarekin lan egiteko, hainbat puntu izan behar dira kontuan. Honetarako oso komenigarria da erabiliko ditugun programen dokumentazioak edo tutorialak ikustea.
Kasu honetan hurrengoak izango dira instalatzerako orduan <strong>kontuan izan</strong> behar ditugun gauzak:
</p>

1. **PHP:**
   - Gure ordenagailuaren PHP bertsioa 8.1 edo altuagoa izan behar da.
2. **Composer:**
   - Gure composer bertxioa 2.0 izan behar da.
3. **Node.js:**
   - Gure Node.js-en bertsioa 18 izan behar da
4. **NPM edo Yarn:**
   - Gure kasuan NPM instalatzea gomendatzen dugu. Alaber Yarn ere erabili daiteke
5. **SQL Lite:**
   - Datu base bezala, SQL Lite instalatzea gomendatzen dugu. Alaber, Laravelekin kompatiblea den edozein datu base erabili daiteke.
6. **Git:**
   - Git-eko biltegiarekin lan egiteko, Git instalatu behar da.
7. **VSCode:**
   - Gure kasuan VSCode instalatzeko gomendatzen dugu IDE bezala.

### Instalazioa
Gauza guzti hauek kontuan izanik, orain nola instalatu azalduko dugu.

#### 1. Pausua: PHP

<p align="justify">
Lehenik PHP instalatuta dugun begiratu behar dugu. Horretarako, gure <i>C:</i> Karpetara joan behar gara. Bertan, <i>php8.1</i> karpeta aurkitu behar dugu. Hori edo altuago bat agertzen bazaizu, jada PHP egokia duzu. Bestalde, <i>php4.3</i> edo <i>php5.4</i> bezalakoak agertze bazaizkizu, PHPren bertsio zaharkitua duzu, eta ezingo duzu Laravelekin erabili. Horretarako, desinstalatu egin behar duzu. Karpeta ezabatu ezkero nahikoa da.
</p>


Jarraian, instalatu gabea baduzu, Powershell zabaldu eta hurrengoak idatzi:
Lehenik PHP 8.1 instalatuko dugu:
```
Invoke-WebRequest -Uri "https://windows.php.net/downloads/releases/archives/php-8.1-Win32-vs16-x64.zip" -OutFile "$env:USERPROFILE\Downloads\php81.zip"
```
Ondoren, PHP-rentzako karpeta sortu eta bertan zabalduko dugu:
```
New-Item -ItemType Directory -Path "C:\php81" -Force
Expand-Archive -Path "$env:USERPROFILE\Downloads\php81.zip" -DestinationPath "C:\php81"
```
Jarraian, PHP-a konfiguratuko dugu sistemaren PATH atalean agertzeko:
```
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\php81", [EnvironmentVariableTarget]::Machine)
```
PHP-a egoki instalatu den jakiteko:
```
php -v
```
Hurrengoa edo antzekoa jartzen badizu, egoki instalatu da:
```
PHP 8.1.x (cli) (built: ...)
```
Azkenik, Laravelekin erabiltzeko konfiguratuko dugu. Honetarako:
```
Copy-Item "C:\php81\php.ini-development" "C:\php81\php.ini"
notepad C:\php81\php.ini
```
Honek php.ini zabalduko dizu. Bertan hurrengoa bilatu eta hasieran duten ```;``` guztiak ezabatu
```
;extension=curl
;extension=mbstring
;extension=bcmath
;extension=xml
;extension=mysqli
;extension=openssl
;extension=pdo_mysql
```
Azkenik gorde eta jada PHP egoki instalatuta eta konfiguratuta izango duzu.

#### 2. Composer

<p align="justify">
Composerra PHP-rekin lan egiteko beharrezkoa den dependentzien kudeaketarako balio duen kudeatzaile bat da. Hau gabe, ezin da lan egin Laravelen. Composerra instalatuta baduzu, hurrengo komandoa jarri powershellen bertsioa jakiteko:
</p>

```
composer -V
```
Hurrengoa jartzen badizu, egoki instalatuta duzu.
```
Composer version 2.x.x 2025-...
```
Ez bazaizu agertzen edo bertsio desegokia baduzu, hurrengoa jarri daukazun composerra ezabatzeko:
```
Remove-Item -Recurse -Force "C:\ProgramData\ComposerSetup" -ErrorAction SilentlyContinue
```
Azkenik, instalatu composer bertsio egokian:
```
Invoke-WebRequest -Uri "https://getcomposer.org/installer" -OutFile "$env:USERPROFILE\Downloads\composer-setup.php"
```
Berriz konprobatu composerra, bertsio egokian instalatu den jakiteko.

#### 3. Node.js eta NPM
<p align="justify">
Node.js gure JS kodeak nabigatzailetik kanpo exekutatzeko balio du. Hau da, zerbitzari aldeak JS-eko kode atalekin egingo lirateke. Bestalde, NPM-ek <i>Node Package Manager</i> esan nahi du, eta Node.js-en paketean kudeatzeko balio du.
</p>

Bertsioak jakiteko:
```
node -v
npm -v
```
Hurrengoa bezalakoa ematen badizu, egoki instalatuta daude.
```
v18.20.2
10.8.2
```
Egoki instalatu ez badira edo ez badituzu, ezabatu egin behar dituzu. Honetarako:
```
Remove-Item -Recurse -Force "C:\nodejs"
```


Ondoren, instalatu egin behar dituzu:
Node.js-entzako:
```
Invoke-WebRequest -Uri "https://nodejs.org/dist/latest-lts/win-x64/node.exe" -OutFile "C:\nodejs\node.exe"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\nodejs", [EnvironmentVariableTarget]::Machine)
```
NPM-rentzako:
```
Invoke-WebRequest -Uri "https://registry.npmjs.org/npm/-/npm-10.8.2.tgz" -OutFile "$env:USERPROFILE\Downloads\npm.tgz"
tar -xzf "$env:USERPROFILE\Downloads\npm.tgz" -C "C:\nodejs"
```
Berriz begiratu egoki instalatu dituzun.

#### 5. VSCode
VSCode guk erabili dugun IDE-a da. Nabigatzailetik bertatik instalatu dezakezu [.exe](https://code.visualstudio.com/Download) bezala, ondoren ordenagailuan izateko.
Jada baduzu ez duzu ezer egin behar. Bestela, ez baduzu eta powershell bidez instalatu nahi baduzu hurrengoa egin:
Instalatzeko:
```
winget install --id Microsoft.VisualStudioCode -e --source winget
```
Ondoren instalatuta dagoela begiratu:
```
code --version
```
Hurrengoa edo antzeko bat agertu behar da:
```
1.95.2
```
Ezabatu egin behar baduzu:
```
winget uninstall --id Microsoft.VisualStudioCode -e
```

#### 6. Git
Git gure GitHub-eko biltegiarekin lan egiteko balio du. Bere [webgunetik](https://git-scm.com/install/) instalatu daiteke, VSCode bezala;

Ahala ere, powersheletik egin nahi baduzu:
Instalatzeko:
```
winget install --id Git.Git -e --source winget
```
Egoki instalatu den jakiteko:
```
git --version
```
Hurrengoa edo antzekoa agertu behar da:
```
git version 2.47.0.windows.1
```
Desinstalatu behar baduzu:
```
winget uninstall --id Git.Git -e
```


#### 7. SQL Lite

<p align="justify">
Azkenik, SQL Lite Laravel proiektua sortzean instalatu daiteke proiektu guztiarekin batera, eta VSCoden honekin lan egiteko extentsio bat instalatu ezkero, nahikoa izango litzake lan egiteko. Bestela, instalatu nahi baduzu:
instalatzeko:
</p>

```
Invoke-WebRequest -Uri "https://www.sqlite.org/2025/sqlite-tools-win32-x86-3420000.zip" -OutFile "$env:USERPROFILE\Downloads\sqlite.zip"
New-Item -ItemType Directory -Force -Path "C:\sqlite"
Expand-Archive -Path "$env:USERPROFILE\Downloads\sqlite.zip" -DestinationPath "C:\sqlite"
```
Egoki instalatu den jakiteko:
```
sqlite3 --version
```
Hurrengoa edo antzekoa agertu behar da:
```
3.42.0 2025-10-01 ...
```
Ezabatu egin behar baduzu:
```
Remove-Item -Recurse -Force "C:\sqlite"
```
### Ondoren zer?
<p align="justify">
Guzti hau baduzu, jada Laravelekin lan egin dezakezu. Proiektu honetan lan egiteko, Git-en bidez biltegia jaitsi, eta instalatutako baliabideekin garapena egin dezakezu. Esan bezala, zalantzarik izanez gero, dokumentazioetara edo tutorialetara jo konponbideak erraz aurkitzeko.
</p>
---

## Bibliografia

### Konpetentzia aztertzeko:
Gure aplikazioa garatzeko, merkatuan dauden antzeko irtenbideak aztertu ditugu:
- OurHome (Zereginak kudeatzeko). [Esteka](https://play.google.com/store/apps/details?id=com.elusios.ourhome&hl=eu)
- Flatastic (Pisu partekatuen antolakuntzarako). [Esteka](https://www.flatastic-app.com/en/)
- Splitwise (Gastuak partekatzeko eta kudeatzeko). [Esteka](https://www.splitwise.com/)

### Software eta tresnak
- **Laravel Frameworka instalatzeko prozezua eta laguntza**. [Esteka](https://laravel.com/docs/12.x/installation)
- **React liburutegiaren informazio ofiziala**. [Esteka](https://es.react.dev/)
- **Docker Dokumentazioa, inguruneak kudeatzeko dokuentazioa**.  [Esteka](https://docs.docker.com/)
- **AWS hedapenerako informazioa**.  [Esteka](https://aws.amazon.com/es/documentation//)
- **GitHub, proiektuarekin lan egiteko**. [Esteka](https://github.com/Luken1919/Maltuna_Tech)  
- **GitBash, Git erabiltzeko**. [Esteka](https://git-scm.com/book/es/v2/Ap%C3%A9ndice-A:-Git-en-otros-entornos-Git-con-Bash)  
- **Moodle**. [Esteka](https://moodle.imaltuna.com/?redirect=0)
- **EqualWeb, irisgarritasuna tresna eta gida**. [Esteka](https://www.equalweb.com/)
- **Adimen Artifiziala**:  
  - Deepseek: [Esteka](https://deepseek.com)  
  - ChatGPT: [Esteka](https://chat.openai.com)  
  - Gemini: [Esteka](https://gemini.google.com/?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024esES_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gclsrc=aw.ds&gad_source=1&gad_campaignid=20437330500&gbraid=0AAAAApk5Bhl86qeba-qejJjt7NzphAlby&gclid=CjwKCAiA_dDIBhB6EiwAvzc1cE_Sc4JaXQh6ZFDbAtSC-Ear5DZq7C9FgoG1xyDYXyl19wKBkcKl8xoCvhoQAvD_BwE&hl=es)
- **W3Schools**. [Esteka](https://www.w3schools.com/)
- **Laravel Dokumentazioa**. [Esteka](https://laravel.com/)  
- **Stack Overflow**. [Esteka](https://stackoverflow.com)
- **Atal batzuk ulertzeko, youtubeko tutorialak erabili ditugu**.[Esteka](https://www.youtube.com/)

---

## Izandako arazoak eta aurre egiteko modua

Proiektu hau garatzerakoan, hainbat arazo edo oztopo izan ditugu.

<ol align="justify">

  <li>
  Lehenik nabarigarria izan da talde bezala, hasieran izan ditugun ezagutza falten erruz galduriko denbora. Honen erruz, denborarekin pixka bat estututa aritu gara momentu batzuetan, Laravel eta barruko bestelako teknologiei buruzko informazioa lortu behar izan dugulako proiektuarekin jarraitzeko.
  </li>
  
  <li>
    Bestalde, nabaria izan da, gure hasieran entregatutako estilo gidaren kalitate falta. Izan ere, bezeroak esan bezala, webgunearen bozetoa eta ondorioz prototipoa ere, kalitate txikikoak ziren, itxusiak eta itxura zaharkitutakoak. Ondorioz, beharrezkoa izan zen, oraingo webgunea lortzeko, berriz diseinua egitea.
  </li>
  
  <li>
    Bestalde, programekin eta bertsioekin arazoak izan ditugu, izan ere, gure PHP-ren bertsio zaharkitua zegoen, eta aurrera jarraitzeko, eta Laravelekin lan egiteko, bertsio berriak instalatu egin behar izan ditugu. Gainera, Conposer edo npm bezalako programekin arazoak izan ditugu, eta berriz instalatu behar izan ditugu lana modu egokian egiteko.
  </li>
  
  <li>
    Azkenik, GitHub-en konfigurazioarekin arazoak izan ditugu. Izan ere, hasieran genuen Git-eko biltegian, arazoak izan genituen erramekin, oso nahastuak eta desordenatuak geratu ziren. Honen erruz, berriz sortu behar izan genuen biltegia eta ondorioz, Laravel proiektua ere berriz hasi izan behar genuen.
  </li>

</ol>

---

## Ondorioak (etorkizuneko aldaketak)
<div align="justify"
  
- **Nola aritu gara talde-lanean:** Talde bezala oso ondo moldatu gara eta komunikazioa etengabea izan da. Hirurok lan karga handia izan dugu, batez ere arkitektura konplexua delako (Frontend, Backend eta ERP), baina gorabeherak izan arren, elkar lagunduz aurrera atera dugu. Oso pozik geratu gara prozesuarekin eta lortutako emaitzarekin.

- **Nola aritu gara Erronkan:** Erronka tekniko handia izan da. Bereziki, Odoo-rekin lan egitea aurreikusi genuen baino askoz konplexuagoa egin zaigu. Hasieran uste genuen integrazioa errazagoa izango zela, baina sistemaren konfigurazioak eta React zein Laravel-ekin lotzeak lan-karga handia eta zailtasun ugari ekarri dizkigu. Hala ere, dokumentazioa sakon aztertuz eta ordu asko sartuz, oztopo horiek gainditu eta eskatutako premisa guztiak betetzen dituen aplikazioa garatzea lortu dugu.

- **Nola aritu gara denbora kudeaketarekin:** Denboralizazioaren aldetik, gorabeherak izan ditugu. Hasierako fasean, azpiegitura prestatzen eta Odoo ulertzen uste baino denbora gehiago eman genuen. Izan ere, Laravel eta Odooren arteko konexioa egitea guztiz berria zen guretzat, eta prozesu hori ikasteak eta gauzatzeak garapeneko denbora estutu zuen erronkaren erdialdean. Hala ere, azken txanpan erritmoa bizkortu genuen, eta epeak gainean izan arren, entregak garaiz eta forma egokian egitea lortu dugu.

- **Etorkizunerako aldaketak:** Etorkizunera begira, denbora hasieran hobeto aprobetxatzea beharrezkoa dela esango genuke. Bereziki, Odoo-ren kasuan, uste genuen baino askoz erronka handiagoa izan da; hasieran erraza izango zela pentsatu arren, guretzat oso konplexua suertatu da. Hori dela eta, etorkizunean teknologia berri hauek sakontzeko denbora gehiago eskainiko genuke hasieratik. Horrela, teoria hobeto barneratuz, proiektua lasaiago eta modu eraginkorragoan garatzeko aukera izango genuke, azken uneko estutasunak saihestuz.

</div>
---

## Creative commons lizentzia

Lan hau **Creative Commons Atribuzioa-Ez Komertziala-Partekatu Berdin 4.0 Nazioarteko Lizentziapean (CC BY-NC-SA 4.0)** dago.

- **Aitortza (BY):** Egilearen izena edo taldea aipatu behar da.  
- **Ez Komertziala (NC):** Ezin da erabili helburu komertzialetarako.  
- **Partekatu Berdin (SA):** Deribatutako lanek lizentzia bera mantendu behar dute.

**© 7POINT.net.**

[Ikusi lizentzia osoa](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.eu)

---

## Eranskinak

### **Karpeta:**
- Drive esteka: [Link](https://drive.google.com/drive/folders/1mnVMMpEphaCkoRdTYek5OXRFzeXGY1oz)
- .Zip deskarga: [Deskargatu](https://github.com/user-attachments/files/23531564/Maltuna.Tech.Eranskinak.zip)

### **PDF-ak:**

1. Eranskina; Talde kontratua:
    - Drive: [Link](https://drive.google.com/drive/folders/1NQCcqtcX-SqGx1VBCEvuxA3C75cwZEf-)
    - PDF: [Deskargatu](https://github.com/user-attachments/files/23522804/Maltuna.tech.Talde.kontratua.pdf)
2. Eranskina; Entitate-erlazioa:
    - Drive: [Link](https://drive.google.com/drive/folders/1pl7hrufuYFQyGJFC3rQK1s3z9BGvxhI1)
    - PDF: [Deskargatu](https://github.com/user-attachments/files/23522846/Maltuna.Tech.E-R.diagrama.drawio.pdf)
3. Eranskina; Eredu erlazionala:
    - Drive: [Link](https://drive.google.com/drive/folders/1Xtw6IF9mHqcukaziGYPeDC2rTFloSVBO)
    - PDF: [Deskargatu](https://github.com/user-attachments/files/23522852/Maltuna.Tech.E_R.diagrama.drawio.pdf)
4. Eranskina; Erabilpen kasu diagrama:
    - Drive: [Link](https://drive.google.com/drive/folders/1c1Aj3issTbXsjea1dpup5Mxix256LCm-)
    - PDF: [Deskargatu](https://github.com/user-attachments/files/23522854/Maltuna.Tech.UML.eskema.drawio.pdf)

---


  
