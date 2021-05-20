# Do Roboty
Jest to aplikacja do zarządzania listą rzeczy do zrobienia. Projekt został opracowany przy wykorzystaniu node.js, silnika szablonów ejs, javascriptu oraz css. Baza danych opiera się na MongoDB.
Aplikacja umożliwia wykonywanie operacji CRUD zarówno na listach, jak i na poszczególnych pozycjach w liście, tzn. można zarówno dodawać, edytować nazwę jak i usuwać listy oraz pozycje w listach.
Wykonywanie wszystkich operacji na listach odbywa się przy użyciu klasycznych przycisków, natomiast na pozycjach w liście przy pomocy różnych mechanizmów np. usuwanie odbywa się poprzez kliknięcie checkboxu natomiast zmiana nazwy odbywa się poprzez dwukrotne kliknięcie danej pozycji, wówczas aplikacja wchodzi w tryb edycji, co zostało przedstawione poniżej.

<img src="https://i.imgur.com/iwGz4DZ.gif" alt="operation in do roboty app">

<h4>Instalacja projektu</h4>
Po pobraniu projektu należy wpisać w terminalu komendę:
<pre><code>npm install</code></pre>
następnie:
<pre><code>node server</code></pre>
Baza danych działa na zewnętrznym serwerze w oparciu o MongoDB Atlas.
Strona główna aplikacji jest dostępna domyślnie na porcie 3000.