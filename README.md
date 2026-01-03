# IT Recruitment Platform

Profesjonalna platforma webowa wspierająca proces rekrutacji programistów. System umożliwia kompleksowe zarządzanie rekrutacją, weryfikację umiejętności technicznych poprzez kompilację kodu w czasie rzeczywistym oraz automatyczne generowanie rankingów kandydatów.

Projekt zrealizowany w architekturze mikroserwisowej z pełną konteneryzacją (Docker), demonstrujący nowoczesne podejście do tworzenia skalowalnych aplikacji biznesowych.

---

## Szybki Start (Quick Start)

Aplikacja została zaprojektowana w idei "Infrastructure as Code". Całe środowisko (Baza danych, Backend, Frontend) uruchamiane jest jedną komendą.

Wymagania: Docker

1. Sklonuj repozytorium.
2. W katalogu głównym uruchom:

    docker-compose up --build

System automatycznie:
- Pobierze obraz bazy danych MSSQL.
- Zbuduje obrazy dla API (.NET) oraz Frontendu (React).
- Skonfiguruje wewnętrzną sieć i wolumeny danych.

Dostęp do serwisów po uruchomieniu:
- Frontend: http://localhost:3000
- API: http://localhost:5116
- Baza danych: localhost:1433

---

## Technologie

Projekt wykorzystuje standardy przemysłowe używane w komercyjnych projektach enterprise.

- **Backend:** .NET 8 (C#)
- **Frontend:** React, TypeScript, Vite
- **Baza Danych:** Microsoft SQL Server (MSSQL 2022)
- **DevOps:** Docker, Docker Compose, Multi-stage builds

---

## Architektura i Infrastruktura

System składa się z trzech odseparowanych kontenerów, zarządzanych przez `docker-compose.yml`.

### 1. Database Service (db)
Kontener SQL Server. Wykorzystuje trwały wolumen (`mssql-data`) do przechowywania danych użytkowników, ofert i wyników testów, co zapobiega utracie danych po restarcie kontenera.

### 2. Backend Service (api)
REST API odpowiedzialne za logikę biznesową.
- Posiada wbudowany mechanizm oczekiwania na gotowość bazy danych (`depends_on`).
- Łączy się z bazą poprzez ConnectionString wstrzykiwany jako zmienna środowiskowa.
- Obsługuje logikę kompilacji kodu przesłanego przez kandydatów.

### 3. Frontend Service (frontend)
Interfejs użytkownika typu SPA (Single Page Application).
- Działa na porcie 3000.
- Komunikuje się z API w celu pobierania danych i wysyłania rozwiązań zadań.

---

## Kluczowe Funkcjonalności

Aplikacja rozwiązuje problem weryfikacji kompetencji technicznych, eliminując potrzebę zewnętrznych narzędzi.

**Code Execution Engine**
Kluczowy moduł systemu. Kandydat rozwiązuje zadania programistyczne w przeglądarce. Kod jest wysyłany do serwera, kompilowany i uruchamiany w izolowanym środowisku, a wynik (lub błędy kompilacji) wracają do użytkownika i egzaminatora.

**System Ról**
- Kandydat: Aplikacja na oferty, upload CV, testy online.
- Egzaminator: Tworzenie zadań, weryfikacja kodu, ocena CV.
- Administrator: Zarządzanie systemem.

**Algorytm Rankingu**
Wsparcie decyzji rekrutacyjnych poprzez automatyczny ranking. System wylicza ocenę końcową na podstawie:
1. Oceny CV.
2. Oceny wykonanych zadań programistycznych.

---

## Obsługa Docker

Aby zatrzymać aplikację i usunąć kontenery, użyj polecenia:

    docker-compose down

Konfiguracja zmiennych środowiskowych (hasła, connection stringi) znajduje się w pliku `docker-compose.yml`, co ułatwia zarządzanie konfiguracją bez konieczności modyfikacji kodu źródłowego.