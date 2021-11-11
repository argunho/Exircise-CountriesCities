# Inlämningsuppgift: Städer och länder

[Demo](https://argunho.github.io/Exircise-CountriesCities/){:target="_blank" rel="noopener"}
### Functions

01. Function setCountriesMenu()     = Körs sidan start eller omstart                        
02. Function checkMenuList()        = Körs i flera funktionen och kontrollerar meny länks, 
                                            lägger till och tar bort extra länk för besökta städer
03. Function getCities()            = Körs vid klick på land i menyn att öppna undermeny med städer respektive land
04. Function getCityInfo()          = Körs vid klick på stad i undermenyn att öppna vy med stads informationen
05: Function setVistedList()        = Körs vid klick på knapp att märka staden som besökt stad och att spara information 
                                            i localStorage och lägga eller ta bort stad från besökta listan
06. Function getPopulations()       = Körs vid klick på länken i undermeny för Besökta länder att räkna ut total antal
                                            stadsinvånare i alla besökta städer
07. Function reset()                = Körs att återställa alla ändringar i koden
08. Function clearHistroy()         = Körs vid klick på knappen Rensa historik att rensa all sparad information i localStorage
                                            och samt återställa ändringar
09. Function setOpacity()           = Körs i två funktionen att slippa skriva samma kod två gånger och avsett för att öka 
                                            vy opacity från 0 till 1 småningom


Mina tanke och syfte med beskrivan funktionerna ovan

01. Function setCountriesMenu()     = Förberedda sidan för användare med rätt strukturerad meny
                                      Kontrollera behövs eller inte visa Återställning knap vid omstart
                                      Raderar sparad nyckelord "current" i localStorage varje gång när sidan startas, vad är det
                                             för "current" - detta sparas först i funktionen getCities() för att kontrollera
                                             var meny med land namnet redan klickat eller inte, vi upprepande klick stänger öppnad undermeny
02. Function checkMenuList()        = Tanke med denna, att kolla i localStorage finns besökta städer eller inte, varje gång när fiktionen körs 
                                             raderas meny och ställas på nytt. Om det finns besökta länder som sparad de läggs till en extra
                                             objekt i lands listan och kommer med detta visas en extra block i menyn att visa besökta länder. Vid fall 
                                             om användare rensar historik eller raderar land från besökta sidan körs funktionen igen. Samt avsett funktionen    
                                             för design också, lägger ill. meny länkar speciella class för respektive land
03. Function getCities()            = Denna menyn avsett att öppna undermenyn med rätt listan av städer som tillhör till den land som var klickad.
                                      Här sparas nyckelord "current" som jag pratade om innan och lägger till vissa class namn till elemnter att göra
                                             den fint och funktionella vid klick på Besökta länder lägger till städer lista extra länk at kolla på invånarens antal.
04. Function getCityIfo()        = Söker denna stad som motsvarar id som var mottagen, lägger till elementen som var tagen getElementById
                                             och i funktionen körs tre andra funktioner som har sitt eget syfte.
05. Function setVisitedList()       = Tar emot stad id att lägga till localStorage besökta listan eller tar bort den genom att rensa hela besökta listan från localStorage
                                             och lägger till den på nytt. När markeras eller avmarkeras stade bytes lite design på knappen. Samt funktionen 
                                             när denna körs i getCitiesInfo() avsett att kontrollera vid sidans start eller omstart var detta stad sparad 
                                             innan eller inte om den är hittad som sparad, då blir knappen ”Besökta” med design som redan klickad


                                                                                                                           
Resten av funktionerna redan beskrivna ovan
