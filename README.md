# Book-tracker

Веб-приложение для поиска книг через Google Books и добавления понравившихся в избранное с сохранением между сессиями.

## Демо

Проект задеплоен в двух вариантах:

- **Netlify**: https://book-tracker510.netlify.app/
- **GitHub Pages**: https://hasket510.github.io/book-tracker/

## Возможности

- **Каталог и поиск**  
  Страница `/bookList`: запрос к [Google Books API](https://www.googleapis.com/books/v1/volumes), стартовый каталог формируется из актуальных новинок (`orderBy=newest`), подгрузка следующих страниц по 10 книг (бесконечный скролл через `IntersectionObserver`).

- **Избранное**  
  Добавление и удаление книг на карточках каталога; список избранного на `/favorites`. Состояние хранится в `localStorage` (Zustand `persist`), дубликаты по `id` отфильтровываются.

- **Тема оформления**  
  Светлая / тёмная / системная тема (`next-themes`), переключатель в шапке.

- **Карточки книг**  
  Обложка (`next/image`, домен `books.google.com` в `next.config`), название, авторы, описание; при отсутствии обложки — заглушка из `public/images/notFound.png`.

## Технологии

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **SCSS-модули**
- **TanStack Query**
- **Zustand**
- **next-themes**

## Начало работы

### 1. Клонировать репозиторий

```bash
git clone https://github.com/Hasket510/book-tracker.git
cd book-tracker
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Запуск dev-сервера

```bash
npm run dev
```

## Структура проекта

```text
src/
  app/
    layout.tsx              # провайдеры темы и React Query, шрифты
    page.tsx                # главная
    page.module.scss
    styles/
      globals.scss          # глобальные стили
      variables.scss
      themes/
        light.scss
        dark.scss
    providers/
      TanStackQueryProvider.tsx
    bookList/
      page.tsx              # каталог
      BookListView/         # поиск и список
    favorites/
      page.tsx              # избранное
      FavoritesView/

  components/
    Header/                 # логотип, навигация, тема
    SearchForm/
    BookCard/               # карточка в каталоге с кнопкой избранного
    BookCardBase/
    FavoritesCard/
    Loader/
    ThemeToggle/

  hooks/
    useList.ts              # запрос к Google Books, infinite query

  store/
    store.ts                # Zustand + localStorage

  types/
    books.ts

  constants/
    navigation.ts           # пункты меню (/bookList, /favorites)
```

## Идеи для развития

- **Фильтры и сортировка** - язык, диапазон дат, релевантность вместо только «новые».
- **Локализация** - второй язык (например, en) и переключатель в UI.
