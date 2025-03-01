# Globetrotter

# Globetrotter Challenge

## Project Description

Globetrotter Challenge is an interactive web-based game that tests players' knowledge of famous destinations around the world. Built with Next.js and React, this application offers an engaging user experience with a mix of trivia, fun facts, and geographical guessing.

## Features

1. **User Registration**: Players can create a profile with a username to track their scores.
2. **Interactive Gameplay**: Users are presented with cryptic clues about various destinations and must guess the correct location.
3. **Score Tracking**: The game keeps track of correct and incorrect answers for each user.
4. **Fun Facts**: After each guess, players are presented with interesting facts about the destination.
5. **Challenge Friends**: Users can share their scores and challenge friends to beat them.
6. **Responsive Design**: The game is fully responsive and works on both desktop and mobile devices.

## Technical Stack

- **Frontend**: React, Next.js
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **API**: Next.js API Routes
- **Data Storage**: File-based JSON (simulating a database)

## Project Structure

- `app/`: Contains the main application pages and API routes
  - `page.tsx`: Home page
  - `username/page.tsx`: Username registration page
  - `game/page.tsx`: Main game page
  - `about/page.tsx`: How to play instructions
  - `challenge/[username]/page.tsx`: Challenge page for sharing scores
  - `api/`: API routes for user management and game data
- `components/`: Reusable React components
  - `ui/`: UI components (buttons, cards, etc.)
  - `share-modal.tsx`: Modal for sharing scores
- `data/`: Contains the destinations data
- `lib/`: Utility functions
- `public/`: Static assets

## How It Works

1. **User Flow**:
   - Users start on the home page and can choose to start the game or view instructions.
   - New users enter a username before playing.
   - The main game presents destinations to guess, tracks scores, and provides feedback.
   - Users can share their scores and challenge friends.

2. **Game Mechanics**:
   - Destinations are randomly selected from a predefined list.
   - Users are given clues and must choose from multiple options.
   - Correct answers are rewarded with fun facts and confetti animations.

3. **Data Management**:
   - User data (usernames and scores) is stored using a simple file-based system.
   - Destination data is stored in a static TypeScript file, simulating a database.

4. **API Integration**:
   - Next.js API routes handle user registration, score updates, and fetching game data.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Enhancements

- Implement user authentication for more secure profiles
- Add a leaderboard feature
- Expand the destination database
- Introduce difficulty levels
- Add timed challenges

## Contributing

Contributions to the Globetrotter Challenge are welcome! Please refer to the contributing guidelines for more information.

## License

This project is licensed under the MIT License.

