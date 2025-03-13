
BOOK HUB: A REACT DISCOVERY APP  

OVERVIEW  
Book Hub is an interactive book discovery platform built with React, TypeScript, Redux, and TailwindCSS. It allows users to explore a vast collection of books, browse by categories, and maintain a personal library. The project features a seamless dark and light theme toggle, animated UI components, and smooth navigation.  

FEATURES  

- Book Discovery – Browse books by genres, bestsellers, trending, and new releases.  
- Personal Library – Add and remove books from your personal collection.  
- Dark and Light Mode – Integrated theme switcher for personalized reading experience.  
- Search Functionality – Quickly find books by title or author.  
- Author Profiles – Learn about featured authors.  
- Smooth Animations – Built-in Framer Motion animations for enhanced UX.  
- Dynamic API Fetching – Fetches book and author data dynamically.  
- Fully Responsive – Works seamlessly across desktop and mobile.  

TECH STACK  

Technology - Purpose  
React - Component-based UI  
TypeScript - Strongly-typed JavaScript  
Redux Toolkit - State management  
Framer Motion - Smooth animations  
Tailwind CSS - Modern styling framework  
React Router - Navigation and routing  
Lottie - JSON-based animations  
Vite - Fast development server  
ESLint and Prettier - Code linting and formatting  

PROJECT STRUCTURE  

BookHub  
src  
- assets - Static assets (images, icons, animations)  
- components  
  - Header.tsx - Main navigation bar  
  - Footer.tsx - Footer with contact and social links  
  - HomePage.tsx - Landing page  
  - BookDetails.tsx - Individual book details  
  - Library.tsx - User's personal book collection  
  - Authors.tsx - Featured authors section  
  - BooksSection.tsx - Category-based book browsing  
- context  
  - ThemeProvider.tsx - Dark and light mode logic  
- ReduxStore  
  - store.ts - Redux store configuration  
  - bookSlice.ts - Books state management  
  - librarySlice.ts - User library state management  
- utils  
  - animations.ts - Framer Motion animation settings  
  - books.ts - TypeScript types for books  
  - SearchBar.tsx - Search functionality  
- main.tsx - App entry point  
- App.tsx - Main application wrapper  
- index.css - Global styles  
package.json - Dependencies and scripts  
tailwind.config.js - TailwindCSS configuration  
tsconfig.json - TypeScript configuration  
vite.config.ts - Vite configuration  
README.md - Project documentation  

INSTALLATION AND SETUP  

1. Clone the Repository  
git clone [https://github.com/your-username/book-hub.git  ](https://github.com/ALU-BSE/summative-a-react-discovery-app-MaryNayram.git)
cd book-hub  

2. Install Dependencies  
npm install  

3. Start the Development Server  
npm run dev  
App will run at http://localhost:5173  

THEME MODE  

Toggle Dark and Light mode via the sun or moon button in the navigation bar.  
Theme preference is stored in localStorage for persistence.  

API ENDPOINTS  

The app fetches book and author data from an API. Modify fetch URLs inside bookSlice.ts, librarySlice.ts, and AuthorsComponent.tsx if needed.  

GET /api/books - Fetch all books  
GET /api/books/:id - Fetch book by ID  
GET /api/authors - Fetch all authors  

REDUX STATE MANAGEMENT  

The app uses Redux Toolkit to manage the global state.  
- bookSlice.ts - Manages book categories, fetching, and selected books.  
- librarySlice.ts - Manages user's personal book collection.  

ANIMATIONS AND UX  

- Framer Motion is used for smooth transitions.  
- Lottie animations for loading and empty states.  
- Swiper.js for interactive book carousels.  
