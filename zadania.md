# Zadania

## 2022-06-22

### Zadanie 1: Dodanie nowego klienta
 - [x] Dodanie kontrolki checkbox na liście klientów
 - [x] Kliknięcie przycisku Nowy otworzy formularz w dialogu
 - [x] Refactor istnejącego formularza, dodawaie pola telefon

### Zadanie 2: Komunikat po dodaniu elementu do listy i refresh listy
 - [x] Dodać nieinwazyjny komunikat o pomyślnym dodaniu użytkownika (np. taki: https://material.angular.io/components/snack-bar/overview)
 - [x] Wykonać refresh listy

### Zadanie 3: Edycja istniejącego klienta
 - [x] Refactor formularza dodawania nowego klienta, nowa funkcjonalność - możliwości edycji istniejącego klienta
 - [x] Użycie metody putClient z clientService do aktualizacji danych na serwerze (przykład wywołania jest w clients-list.component.ts w komentarzu)
 - [x] Komunikat + refresh (refresh niepotrzebny!)

### Zadanie 4: Potwierdzenie usunięcia klienta
 - [x] Dialog w stylu: Czy na pewno chcesz usunąć klienta ...? TAK NIE
 - [x] Użycie metody deleteClient z clientService
 - [x] Komunikat + refresh

## 2022-06-24

### Zadanie 5: Czyszczenie kodu
 - [ ] Usunięcie zakomentowanych bloków kodu
 - [ ] Formatowanie kodu projektu

### Zadanie 6: Błąd wizualny w komponencie YesNoDialogComponent
 - [x] Wyrównaj przyciski do prawej

### Zadanie 7: Refaktor listy klientów
 - [x] Powiązanie modelu danych - Client z MatCheckbox w jedną strukturę SelectableElement<MatCheckbox, Client>
 - [x] Usuwanie wielu elementów z listy

 ### Zadanie 8: Refaktoryzacja toolbara
 - [x] Toolbar posiada teraz komponent checkbox Zaznacz wszystko, którego zaznaczenie spowoduje zaznaczenie wszystkich checkboxów w tabeli
 - [x] Elementy (przyciski) nie są zakodowane na sztywno, tylko są generowane na podstawie przekazanej konfiguracji
 - [x] Przyciski: Edytuj, Usuń są domyśnie wyłączone (flaga disabled = true) zmienna przekazywana jest przez konfigurację z komponentu listy

### Zadanie 9: Refactor listy klientów
 - [ ] Dodanie do listy na końcu każdego wiersza, przycisku ikony '3 kropki', która po wciśnięciu rozwija overlay panel z menu w stylu (https://material.angular.io/components/menu/examples)
 - [ ] Dodanie przycisków z ikoną i implementacja: 'Edytuj', 'Usuń', 'Duplikuj' do rozwijanego menu

### Zadanie 10: Refactor formularza edycji wielu klientów
- [ ] Formularz edycji zawiera przyciski sterujące następny, poprzedni, zapisz, anuluj
- [ ] Wszystkie zmiany są zapisywane "na boku", próba zamknięcia formularza wykrywa niezapisane zmiany i wywołuje odpowieni komunikat "Czy na pewno chcesz wyjść bez zapisania zmian?" TAK/NIE

### Zadanie 11: Nowa funkcjonalność - moduł pracowników
Celem tego zadania jest stworzenie uniwersalnej struktury 'user' oraz rozwój funkcjonalności na bieżące potrzeby (aktualnie związane z obsługą pracownika). W przyszłości wykonamy refactor i rozdzielimy unikatowe funkcjonlności, a te współdzielone zgrupujemy. Każdy użytkownik systemu może pełnić jedną lub więcej ról w systemie np. może być: pracownikiem, klientem, użytkownikiem aplikacji.

Podzadania:
 - [ ] Stworzenie modelu: pracownika (użytkownika - 'user')
 - [ ] Stworzenie "zaślepki" serwisu (mock): userService (opcjonalnie, można odrazu wykonać pełny serwis - jak Ci wygodniej)
 - [ ] Stworzenie komponentu: lista użytkowników
 - [ ] Stworzenie formularza dodawania nowego / edycji istniejącego pracownika
 - [ ] Stworzenie dialogu potwierdzającego dezaktywacje użytkownika + weryfikacja roli
 - [ ] Dodanie komunikatów potwierdzających wykonanie operacji lub błąd (snackbar)
 - [ ] Implementacja userService (CRUD)

### Zadanie 12: Nowa funkcjonalność - moduł produktów
Celem tego zadania jest stworzenie wielu drobnych funkcjonalności bezpośrednio powiązanych z usługami, które będą realizowane przez pracowników zakładu fryzjerskiego. Nazwiemy to produkty (product) i podzielimy na kategorie (category) - to kategoria będzie definiować, czy chodzi o "usługę", czy o "prodykt fizyczny" np.: odżywka do włosów dobrej marki.

Podzadania:
 - [ ] Stworzenie modelu: produkt (dla wprowadzenia pewnej uniwersalności będzie to 'product')
 - [ ] Stworzenie modelu: kategorii (category)
 - [ ] Stworzenie serwisu: productService
 - [ ] Stworzenie komponentu: lista produktów
 - [ ] Stworzenie komponentu: nowy produkt / edycja istniejącego
 - [ ] Stworzenie dialogu potwierdzającego usunięcie produktu
 - [ ] Stworzenie komponentu: kontrolka typu dropdown - wybór 1 produktu (lista elementów + zintegrowana wyszukiwarka)
 - [ ] Stworzenie komponentu: kontrolka typu multiselect - wybór wielu produktów (lista + wyszukiwarka)

### Zadanie 13: Nowa funkcjonalność - lista wizyt (apointment)
- [ ] Stworzenie modelu: wizyta (apointment)
- [ ] Stworzenie serwisu: apointmentService
- [ ] Stworzenie komponentu: lista wizyt
- [ ] Stworzenie komponentu: nowa wizyta / edycja istniejącej
- [ ] Stworzenie dialogu potwierdzającego anulowania wizyty

### Zadadnie 14: Błąd - formularz nowego klienta zapisuje pusty rekord w bazie
- [x] Nie działa formularz dodawania nowego klienta
